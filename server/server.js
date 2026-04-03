import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { findRelevantDocs } from "./retriever.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

function buildMockAppData() {
  return {
    dashboard: {
      totalSavings: 250000000,
      estimatedReturn: 266837500,
      activeAccounts: 2,
      comboPets: [
        { name: "Mèo May Mắn", level: 8 },
        { name: "Rồng Thịnh Vượng", level: 12 },
        { name: "Chó Trung Thành", level: 5 }
      ],
      petsProgress: 65,
      goal: "Tiết kiệm mua nhà",
      savingsList: [
        {
          id: 1,
          name: "Tiết kiệm học phí",
          amount: 50000000,
          interestRate: 6.5,
          maturityDate: "15/08/2025",
          progress: 65
        },
        {
          id: 2,
          name: "Tiết kiệm mua nhà",
          amount: 200000000,
          interestRate: 7.2,
          maturityDate: "01/06/2026",
          progress: 40
        }
      ],
      streak: {
        currentMonths: 28,
        record: 28,
        daysLeft: 7
      },
      rewards: {
        pending: 1,
        locked: 9,
        nextRewardName: "Voucher Gongcha",
        nextRewardValue: 50000,
        currentLevel: 18,
        points: 1250
      }
    },
    rewards: {
      pending: 1,
      locked: 9,
      nextRewardName: "Voucher Gongcha",
      nextRewardValue: 50000,
      currentLevel: 18,
      points: 1250
    },
    streak: {
      currentMonths: 28,
      record: 28,
      daysLeft: 7
    }
  };
}

function buildDocsContext(docs) {
  if (!docs || docs.length === 0) {
    return "Không tìm thấy tài liệu bổ sung phù hợp.";
  }

  return docs
    .map((doc, index) => {
      return `[Tài liệu ${index + 1}]
Tiêu đề: ${doc.title}
Nội dung: ${doc.content}`;
    })
    .join("\n\n");
}

function buildPrompt({ message, currentPage, appData, docs }) {
  return `
Bạn là trợ lý tiết kiệm cho một app tài chính số dành cho Gen Z.

Mục tiêu:
- Trả lời bằng tiếng Việt.
- Ngắn gọn, rõ ràng, thân thiện.
- Hiểu câu hỏi theo ý nghĩa, không cần người dùng hỏi đúng nguyên văn.
- Nếu có dữ liệu cá nhân của user thì ưu tiên dùng dữ liệu đó.
- Nếu cần kiến thức nghiệp vụ thì dùng tài liệu bổ sung.
- Nếu dữ liệu không đủ, nói rõ "hiện mình chưa có dữ liệu realtime" hoặc "hiện dữ liệu chưa đủ", không được bịa.
- Không nói rằng bạn là AI.
- Không tạo tính năng ngoài những gì được cung cấp.

Ngữ cảnh hiện tại:
- Trang hiện tại: ${currentPage || "dashboard"}

Dữ liệu app của user:
${JSON.stringify(appData, null, 2)}

Tài liệu bổ sung liên quan:
${buildDocsContext(docs)}

Yêu cầu trả lời:
1. Nếu user hỏi về lãi suất, kỳ hạn, lãi kép, rút trước hạn, quy định: ưu tiên dùng tài liệu bổ sung.
2. Nếu user hỏi về điểm, reward, streak, pet, savings hiện tại: ưu tiên dùng dữ liệu app.
3. Nếu user hỏi kết hợp cả hai: kết hợp cả dữ liệu app và tài liệu bổ sung.
4. Nếu user hỏi kiểu tư vấn: trả lời thực tế, dễ hiểu, theo ngữ cảnh tài chính cá nhân.

Câu hỏi của user:
${message}
`;
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "Gemini server is running"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, currentPage, appData } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        reply: "Thiếu nội dung câu hỏi."
      });
    }

    const mergedAppData =
      appData && typeof appData === "object" && Object.keys(appData).length > 0
        ? appData
        : buildMockAppData();

    const relevantDocs = findRelevantDocs(message, 4);

    const prompt = buildPrompt({
      message,
      currentPage,
      appData: mergedAppData,
      docs: relevantDocs
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    return res.json({
      reply: response.text || "Mình chưa có câu trả lời phù hợp.",
      sources: relevantDocs.map((doc) => ({
        id: doc.id,
        title: doc.title
      }))
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return res.status(500).json({
      reply: "Có lỗi khi kết nối chatbot Gemini."
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
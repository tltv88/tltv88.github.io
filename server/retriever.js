import { knowledgeBase } from "./knowledge-base.js";

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalizeText(text)
    .split(" ")
    .filter((word) => word && word.length > 2);
}

export function findRelevantDocs(message, limit = 4) {
  const normalizedQuestion = normalizeText(message);
  const questionTokens = tokenize(message);

  const scored = knowledgeBase.map((doc) => {
    const normalizedTitle = normalizeText(doc.title);
    const normalizedContent = normalizeText(doc.content);
    const normalizedKeywords = (doc.keywords || []).map(normalizeText);

    let score = 0;

    for (const keyword of normalizedKeywords) {
      if (normalizedQuestion.includes(keyword)) {
        score += 8;
      }
    }

    for (const token of questionTokens) {
      if (normalizedTitle.includes(token)) {
        score += 4;
      }
      if (normalizedContent.includes(token)) {
        score += 2;
      }
      for (const keyword of normalizedKeywords) {
        if (keyword.includes(token)) {
          score += 3;
        }
      }
    }

    return {
      ...doc,
      score
    };
  });

  return scored
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...doc }) => doc);
}
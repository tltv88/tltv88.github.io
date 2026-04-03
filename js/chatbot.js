(function () {
    const BOT_CONFIG = {
        rates: {
            '3_months': 5.5,
            '6_months': 6.2,
            '12_months': 6.8
        },
        pointRule: {
            perAmount: 100000,
            perPoint: 10
        }
    };

    const CHAT_INTENTS = [
        {
            id: 'current_interest_rate',
            patterns: [
                'lai suat hien tai',
                'lai suat tiet kiem hien tai',
                'goi tiet kiem lai bao nhieu',
                'lai suat bay gio',
                'lai suat bao nhieu'
            ],
            handler: function () {
                return 'Hiện tại gói tiết kiệm có lãi suất 6.2%/năm cho kỳ hạn 6 tháng. Nếu gửi 5 triệu, bạn sẽ nhận khoảng 155.000đ tiền lãi. Bạn muốn mình tính thử cho số tiền khác không?';
            }
        },
        {
            id: 'interest_explain',
            patterns: [
                'lai suat la gi',
                'giai thich lai suat',
                'lai suat nghia la gi'
            ],
            handler: function () {
                return 'Lãi suất là khoản tiền ngân hàng trả thêm cho bạn khi gửi tiền. Ví dụ, gửi 1.000.000đ với lãi 6%/năm thì sau 1 năm bạn nhận thêm 60.000đ tiền lãi.';
            }
        },
        {
            id: 'highest_term_rate',
            patterns: [
                'ky han nao lai cao nhat',
                'ky han nao tot nhat',
                'gui ky han nao lai cao nhat',
                'so sanh lai suat cac ky han',
                'lai cao nhat la ky han nao'
            ],
            handler: function () {
                return 'Hiện tại: 3 tháng 5.5%, 6 tháng 6.2%, 12 tháng 6.8%. Kỳ hạn 12 tháng có lãi cao nhất. Nếu bạn không cần tiền sớm, đây là lựa chọn tối ưu.';
            }
        },
        {
            id: 'save_more_profit',
            patterns: [
                'gui bao nhieu thi loi nhieu',
                'gui bao nhieu se loi nhieu',
                'nen gui bao nhieu de loi nhieu',
                'gui it hay nhieu thi loi hon'
            ],
            handler: function () {
                return 'Bạn có thể thử gửi 10.000đ mỗi ngày. Sau 1 năm bạn tích lũy khoảng 3.65 triệu và nhận thêm khoảng 240.000đ tiền lãi. Gửi đều đặn giúp tiền tăng nhanh hơn.';
            }
        },
        {
            id: 'compound_interest',
            patterns: [
                'lai kep la gi',
                'giai thich lai kep',
                'lai suat kep la gi'
            ],
            handler: function () {
                return 'Lãi kép là khi tiền lãi được cộng vào tiền gốc để tiếp tục sinh lãi. Nhờ đó, tổng số tiền tăng nhanh hơn theo thời gian.';
            }
        },
        {
            id: 'choose_term',
            patterns: [
                'nen chon ky han bao lau',
                'nen chon ky han nao',
                'chon ky han nao phu hop',
                'nen gui bao lau'
            ],
            handler: function () {
                return 'Nếu cần tiền linh hoạt, chọn 1–3 tháng. Nếu có mục tiêu trung hạn như du lịch hoặc mua sắm, chọn 6 tháng. Nếu tích lũy dài hạn, chọn 12 tháng trở lên. Bạn đang tiết kiệm cho mục tiêu gì?';
            }
        },
        {
            id: 'term_explain',
            patterns: [
                'ky han la gi',
                'giai thich ky han',
                'ky han tiet kiem la gi'
            ],
            handler: function () {
                return 'Kỳ hạn là thời gian bạn cam kết gửi tiền trong tài khoản tiết kiệm. Trong thời gian đó bạn nhận lãi suất cao hơn. Rút sớm có thể làm giảm tiền lãi.';
            }
        },
        {
            id: 'auto_renew',
            patterns: [
                'den han co tu gui lai khong',
                'co tu gui lai khong',
                'tai tuc tu dong la gi',
                'co tu dong tai tuc khong'
            ],
            handler: function () {
                return 'Bạn có thể bật chế độ tái tục tự động. Khi đến hạn, tiền gốc và lãi sẽ được gửi tiếp sang kỳ mới để tiếp tục sinh lời. Nếu app của bạn có hỗ trợ, mình có thể hướng dẫn bạn vào đúng màn hình để bật tính năng này.';
            }
        },
        {
            id: 'early_withdraw',
            patterns: [
                'rut truoc han co sao khong',
                'rut som co sao khong',
                'rut truoc han bi gi',
                'rut truoc han'
            ],
            handler: function () {
                return 'Bạn vẫn rút được, nhưng lãi sẽ tính theo mức không kỳ hạn, thường rất thấp so với lãi suất cam kết. Nếu không gấp, bạn nên chờ đến ngày đáo hạn.';
            }
        },
        {
            id: 'partial_withdraw',
            patterns: [
                'rut mot phan duoc khong',
                'co rut mot phan duoc khong',
                'rut mot it tien duoc khong'
            ],
            handler: function () {
                return 'Có. Bạn có thể rút một phần tiền, phần còn lại vẫn tiếp tục hưởng lãi theo kỳ hạn ban đầu.';
            }
        },
        {
            id: 'withdraw_time',
            patterns: [
                'rut tien bao lau thi ve',
                'rut tien bao lau nhan duoc',
                'bao lau thi tien ve',
                'rut tien khi nao ve'
            ],
            handler: function () {
                return 'Tiền sẽ được chuyển về ví hoặc tài khoản của bạn gần như ngay lập tức, thường trong vài giây.';
            }
        },
        {
            id: 'withdraw_fee',
            patterns: [
                'rut tien co mat phi khong',
                'rut tien co ton phi khong',
                'phi rut tien',
                'rut tien co phi khong'
            ],
            handler: function () {
                return 'Không mất phí. Tuy nhiên nếu rút trước hạn, tiền lãi sẽ giảm theo quy định.';
            }
        },
        {
            id: 'urgent_money',
            patterns: [
                'minh can tien gap thi sao',
                'neu can tien gap thi sao',
                'can tien gap thi lam sao',
                'gap tien thi phai lam sao'
            ],
            handler: function () {
                return 'Bạn có thể rút trước hạn hoặc sử dụng dịch vụ vay cầm cố sổ tiết kiệm để vẫn giữ được lãi suất ban đầu. Mình có thể giúp bạn so sánh hai lựa chọn.';
            }
        },
        {
            id: 'goal_time_estimate',
            patterns: [
                'bao lau minh dat 10 trieu',
                'bao lau dat 10 trieu',
                'khi nao dat 10 trieu',
                'bao lau de dat muc tieu'
            ],
            handler: function () {
                return 'Nếu gửi 500.000đ mỗi tháng với lãi 6%/năm, bạn sẽ đạt khoảng 10 triệu sau 19 tháng. Mình có thể thiết lập theo dõi mục tiêu để nhắc bạn hàng tháng.';
            }
        },
        {
            id: 'student_saving_advice',
            patterns: [
                'minh la sinh vien nen tiet kiem sao',
                'sinh vien nen tiet kiem sao',
                'tu van tiet kiem cho sinh vien',
                'la sinh vien thi nen tiet kiem the nao'
            ],
            handler: function () {
                return 'Bạn có thể bắt đầu từ số tiền nhỏ như 10.000–20.000đ mỗi ngày, chọn kỳ hạn 3 tháng để linh hoạt và bật tự động gửi tiền. Cách này giúp bạn tích lũy mà không áp lực chi tiêu.';
            }
        },
        {
            id: 'pet_explain',
            patterns: [
                'pet trong app dung de lam gi',
                'pet la gi',
                'pet dung de lam gi'
            ],
            handler: function () {
                return 'Pet là trợ lý tiết kiệm của bạn. Mỗi khi bạn gửi tiền, hoàn thành mục tiêu hoặc duy trì thói quen tiết kiệm, Pet sẽ lớn lên và mở khóa phần thưởng. Đây là cách giúp bạn tiết kiệm đều đặn và vui hơn.';
            }
        },
        {
            id: 'pet_how_to_raise',
            patterns: [
                'lam sao de nuoi pet',
                'cach nuoi pet',
                'pet len cap nhu the nao',
                'lam sao cho pet lon len'
            ],
            handler: function () {
                return 'Bạn chỉ cần thực hiện các hoạt động tiết kiệm: gửi tiền, giữ chuỗi ngày liên tiếp, hoàn thành thử thách tuần hoặc tháng. Mỗi hành động sẽ giúp Pet tăng điểm kinh nghiệm và lên cấp.';
            }
        },
        {
            id: 'pet_level_benefit',
            patterns: [
                'pet len cap duoc gi',
                'pet len level duoc gi',
                'len cap pet co loi ich gi'
            ],
            handler: function () {
                return 'Khi Pet lên cấp, bạn nhận thêm điểm thưởng, voucher giảm giá và mở khóa các thử thách mới với lãi suất hoặc phần quà cao hơn.';
            }
        },
        {
            id: 'forgot_to_save',
            patterns: [
                'neu minh quen gui tien thi sao',
                'quen tiet kiem thi sao',
                'quen gui tien co sao khong'
            ],
            handler: function () {
                return 'Chuỗi ngày tiết kiệm có thể bị gián đoạn và Pet sẽ không nhận thêm điểm trong ngày đó. Bạn có thể bật chế độ gửi tiền tự động để duy trì thói quen.';
            }
        },
        {
            id: 'change_pet',
            patterns: [
                'co doi pet khac duoc khong',
                'doi pet khac duoc khong',
                'co thay pet duoc khong',
                'co doi skin pet duoc khong'
            ],
            handler: function () {
                return 'Có. Khi đạt cấp cao hơn, bạn có thể mở khóa thêm giao diện hoặc skin mới cho Pet trong phần phần thưởng.';
            }
        },
        {
            id: 'points_explain',
            patterns: [
                'diem thuong dung de lam gi',
                'diem la gi',
                'point dung de lam gi',
                'diem dung de lam gi'
            ],
            handler: function () {
                return 'Điểm thưởng được tích lũy khi bạn tiết kiệm hoặc hoàn thành thử thách. Bạn có thể dùng điểm để đổi voucher, quà tặng hoặc ưu đãi lãi suất.';
            }
        },
        {
            id: 'earn_points',
            patterns: [
                'lam sao de kiem diem',
                'cach kiem diem',
                'kiem diem nhu the nao'
            ],
            handler: function () {
                return 'Bạn có thể kiếm điểm bằng cách: gửi tiền tiết kiệm, duy trì chuỗi ngày liên tiếp, hoàn thành mục tiêu, và tham gia thử thách tuần hoặc tháng. Càng hoạt động nhiều, điểm càng tăng.';
            }
        },
        {
            id: 'points_per_deposit',
            patterns: [
                'gui tien thi duoc bao nhieu diem',
                'moi lan gui duoc bao nhieu diem',
                '100 nghin duoc may diem',
                'gui bao nhieu thi duoc diem'
            ],
            handler: function () {
                return 'Mỗi 100.000đ gửi vào sẽ nhận 10 điểm. Ngoài ra còn có điểm thưởng thêm nếu bạn gửi liên tục nhiều ngày.';
            }
        },
        {
            id: 'check_points',
            patterns: [
                'minh co bao nhieu diem roi',
                'toi co bao nhieu diem',
                'kiem tra diem',
                'so diem hien tai',
                'diem cua toi'
            ],
            handler: function () {
                const points = getUserPoints();
                return `Hiện tại bạn có ${points} điểm. Bạn có thể dùng điểm để đổi voucher hoặc tiếp tục tích lũy cho phần thưởng lớn hơn.`;
            }
        },
        {
            id: 'voucher_exchange',
            patterns: [
                'doi voucher nhu the nao',
                'doi voucher o dau',
                'cach doi voucher'
            ],
            handler: function () {
                return 'Bạn vào mục Phần thưởng, chọn voucher mong muốn và nhấn đổi điểm. Voucher sẽ được gửi vào ví ưu đãi của bạn để sử dụng ngay.';
            }
        },
        {
            id: 'voucher_types',
            patterns: [
                'co nhung voucher gi',
                'co voucher gi',
                'cac loai voucher',
                'hien co voucher nao'
            ],
            handler: function () {
                return 'Hiện có các loại: voucher mua sắm online, giảm giá ăn uống, hoàn tiền khi thanh toán, và ưu đãi tăng lãi suất tiết kiệm. Bạn muốn xem loại nào?';
            }
        },
        {
            id: 'points_expiry',
            patterns: [
                'diem co het han khong',
                'point co het han khong',
                'diem thuong co het han khong'
            ],
            handler: function () {
                return 'Điểm có hiệu lực trong 12 tháng kể từ ngày nhận. Bạn nên đổi thưởng sớm để không bị mất quyền lợi.';
            }
        },
        {
            id: 'interest_bonus_reward',
            patterns: [
                'co doi duoc lai suat cao hon khong',
                'doi diem lay lai suat cao hon',
                'co tang lai suat bang diem khong'
            ],
            handler: function () {
                return 'Có. Bạn có thể dùng điểm để nhận ưu đãi cộng thêm 0.2–0.5% lãi suất cho kỳ gửi tiếp theo. Đây là lựa chọn tốt nếu bạn muốn tăng lợi nhuận.';
            }
        },
        {
            id: 'weekly_challenge',
            patterns: [
                'thu thach tuan la gi',
                'giai thich thu thach tuan',
                'challenge tuan la gi'
            ],
            handler: function () {
                return 'Thử thách tuần yêu cầu bạn gửi tiết kiệm mỗi ngày hoặc đạt một số tiền mục tiêu. Hoàn thành sẽ nhận thêm điểm và quà đặc biệt.';
            }
        }
    ];

    function initChatbot() {
        const root = document.getElementById('chatbot-root');
        if (!root) return;

        if (document.getElementById('chat-toggle')) return;

        root.innerHTML = `
            <button id="chat-toggle" class="chat-toggle" aria-label="Mở chatbot">
                💬
            </button>

            <div id="chat-panel" class="chat-panel hidden">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-title">Trợ lý tiết kiệm</div>
                        <div id="chat-context" class="chat-context">Đang ở: dashboard</div>
                    </div>
                    <button id="chat-close" class="chat-close" aria-label="Đóng chatbot">✕</button>
                </div>

                <div id="chat-messages" class="chat-messages">
                    <div class="chat-message bot">
                        Xin chào 👋 Mình có thể hỗ trợ về tiết kiệm, pets, streak, rewards và các câu hỏi về lãi suất, kỳ hạn, điểm thưởng.
                    </div>
                </div>

                <div class="chat-suggestion-wrapper">
                    <div class="chat-suggestion-title">Gợi ý nhanh</div>
                    <div id="chat-suggestions" class="chat-suggestions"></div>
                </div>

                <div class="chat-input-wrapper">
                    <input
                        id="chat-input"
                        class="chat-input"
                        type="text"
                        placeholder="Nhập câu hỏi..."
                    />
                    <button id="chat-send" class="chat-send">Gửi</button>
                </div>
            </div>
        `;

        bindChatbotEvents();
        renderSuggestions();
    }

    function bindChatbotEvents() {
        const toggleBtn = document.getElementById('chat-toggle');
        const closeBtn = document.getElementById('chat-close');
        const panel = document.getElementById('chat-panel');
        const sendBtn = document.getElementById('chat-send');
        const input = document.getElementById('chat-input');

        if (!toggleBtn || !closeBtn || !panel || !sendBtn || !input) return;

        toggleBtn.addEventListener('click', function () {
            panel.classList.toggle('hidden');
            renderSuggestions();
        });

        closeBtn.addEventListener('click', function () {
            panel.classList.add('hidden');
        });

        sendBtn.addEventListener('click', function () {
            sendMessage();
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        document.addEventListener('page:changed', function () {
            renderSuggestions();

            const panelEl = document.getElementById('chat-panel');
            if (panelEl && !panelEl.classList.contains('hidden')) {
                addBotMessage(getWelcomeByPage(getCurrentPage()));
            }
        });
    }

    function getCurrentPage() {
        return sessionStorage.getItem('currentPage') || 'dashboard';
    }

    function getPageParams() {
        try {
            return JSON.parse(sessionStorage.getItem('pageParams') || '{}');
        } catch (error) {
            return {};
        }
    }

    function getAppData() {
        return window.appData || {};
    }

    function getDashboardData() {
        const appData = getAppData();
        return appData.dashboard || null;
    }

    function getRewardsData() {
        const appData = getAppData();
        return appData.rewards || appData.dashboard?.rewards || null;
    }

    function getPetsData() {
        const appData = getAppData();
        return appData.pets || null;
    }

    function getStreakData() {
        const appData = getAppData();
        return appData.streak || appData.dashboard?.streak || null;
    }

    function getUserPoints() {
        const rewardsData = getRewardsData();
        if (rewardsData && typeof rewardsData.points !== 'undefined') {
            return rewardsData.points;
        }

        return 1250;
    }

    function formatMoney(amount) {
        if (typeof window.formatCurrency === 'function') {
            return window.formatCurrency(amount);
        }

        return `${amount} đ`;
    }

    function normalizeText(text) {
        return String(text || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function detectIntent(message) {
        const normalized = normalizeText(message);

        for (let i = 0; i < CHAT_INTENTS.length; i++) {
            const intent = CHAT_INTENTS[i];
            const matched = intent.patterns.some(function (pattern) {
                return normalized.includes(pattern);
            });

            if (matched) {
                return intent;
            }
        }

        return null;
    }

    function getPageLabel(page) {
        const labels = {
            'dashboard': 'Tổng quan',
            'pets-collection': 'Pets của tôi',
            'pet-detail': 'Chi tiết Pet',
            'streak-detail': 'Combo Streak',
            'rewards-dashboard': 'Combo Rewards',
            'reward-detail': 'Chi tiết phần thưởng',
            'new-savings-goal': 'Tạo khoản tiết kiệm',
            'new-savings-pet': 'Chọn Pet đồng hành',
            'new-savings-product': 'Chọn kỳ hạn'
        };

        return labels[page] || page;
    }

    function getSuggestionsByPage(page) {
        const suggestionsMap = {
            'dashboard': [
                'Tóm tắt tình hình tiết kiệm của tôi',
                'Reward tiếp theo là gì?',
                'Streak hiện tại bao nhiêu?',
                'Pet nào gần lên level nhất?'
            ],
            'pets-collection': [
                'Tôi đang có những pet nào?',
                'Pet nào gần lên level nhất?',
                'Làm sao để pet tăng EXP nhanh?',
                'Pet nào đang bị khóa?'
            ],
            'pet-detail': [
                'Pet này có tác dụng gì?',
                'Pet này cần gì để lên level?',
                'Giải thích chỉ số của pet',
                'Pet này có hiếm không?'
            ],
            'streak-detail': [
                'Streak hiện tại là bao nhiêu?',
                'Mốc tiếp theo là gì?',
                'Còn bao lâu để nhận thưởng?',
                'Làm sao để giữ streak?'
            ],
            'rewards-dashboard': [
                'Tôi có reward nào đang chờ nhận?',
                'Reward tiếp theo là gì?',
                'Bao lâu nữa mở khóa reward?',
                'Level hiện tại của tôi là bao nhiêu?'
            ],
            'reward-detail': [
                'Reward này nhận như thế nào?',
                'Điều kiện để mở reward này là gì?',
                'Reward này có hết hạn không?',
                'Reward này đáng giá bao nhiêu?'
            ],
            'new-savings-goal': [
                'Nên chọn mục tiêu tiết kiệm nào?',
                'Mục tiêu nào dễ đạt nhất?',
                'Tạo khoản tiết kiệm mới có lợi gì?',
                'Nên bắt đầu từ bao nhiêu tiền?'
            ],
            'new-savings-pet': [
                'Nên chọn pet nào đồng hành?',
                'Pet nào phù hợp nhất?',
                'Pet nào bonus tốt hơn?',
                'Giải thích khác nhau giữa các pet'
            ],
            'new-savings-product': [
                'Kỳ hạn nào lãi tốt nhất?',
                'Nên chọn 3 tháng hay 6 tháng?',
                'Lãi suất hiện tại là bao nhiêu?',
                'Nếu gửi 5 triệu thì được bao nhiêu lãi?'
            ]
        };

        return suggestionsMap[page] || [
            'Tóm tắt trang hiện tại',
            'Giải thích tính năng này',
            'Tôi nên làm gì tiếp theo?'
        ];
    }

    function getWelcomeByPage(page) {
        const welcomes = {
            'dashboard': 'Bạn đang ở trang Tổng quan. Mình có thể tóm tắt savings, rewards, pets và streak.',
            'pets-collection': 'Bạn đang ở trang Pets. Mình có thể giúp giải thích level, bonus và tiến độ pet.',
            'pet-detail': 'Bạn đang xem chi tiết pet. Mình có thể giải thích pet này mạnh ở điểm nào.',
            'streak-detail': 'Bạn đang ở trang Streak. Mình có thể giúp bạn hiểu mốc tiếp theo và cách giữ streak.',
            'rewards-dashboard': 'Bạn đang ở trang Rewards. Mình có thể giúp kiểm tra phần thưởng đang chờ nhận.',
            'reward-detail': 'Bạn đang xem chi tiết phần thưởng. Mình có thể giải thích điều kiện nhận reward này.',
            'new-savings-goal': 'Bạn đang tạo khoản tiết kiệm mới. Mình có thể gợi ý mục tiêu phù hợp.',
            'new-savings-pet': 'Bạn đang chọn pet đồng hành. Mình có thể giúp so sánh các pet.',
            'new-savings-product': 'Bạn đang chọn kỳ hạn. Mình có thể giúp so sánh lãi suất và lợi nhuận.'
        };

        return welcomes[page] || 'Mình có thể hỗ trợ giải thích nội dung của trang hiện tại.';
    }

    function renderSuggestions() {
        const contextEl = document.getElementById('chat-context');
        const suggestionsEl = document.getElementById('chat-suggestions');

        if (!contextEl || !suggestionsEl) return;

        const currentPage = getCurrentPage();
        const pageLabel = getPageLabel(currentPage);

        contextEl.textContent = `Đang ở: ${pageLabel}`;
        suggestionsEl.innerHTML = '';

        const suggestions = getSuggestionsByPage(currentPage);

        suggestions.forEach(function (text) {
            const btn = document.createElement('button');
            btn.className = 'chat-suggestion';
            btn.type = 'button';
            btn.textContent = text;

            btn.addEventListener('click', function () {
                const input = document.getElementById('chat-input');
                if (!input) return;

                input.value = text;
                sendMessage();
            });

            suggestionsEl.appendChild(btn);
        });
    }

    function addMessage(text, sender) {
        const messagesEl = document.getElementById('chat-messages');
        if (!messagesEl) return;

        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${sender}`;
        messageEl.textContent = text;

        messagesEl.appendChild(messageEl);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addUserMessage(text) {
        addMessage(text, 'user');
    }

    function addBotMessage(text) {
        addMessage(text, 'bot');
    }

    function replaceLastThinkingMessage(newText) {
        const botMessages = document.querySelectorAll('.chat-message.bot');
        const lastBotMessage = botMessages[botMessages.length - 1];

        if (lastBotMessage && lastBotMessage.textContent === 'Đang suy nghĩ...') {
            lastBotMessage.textContent = newText;
        } else {
            addBotMessage(newText);
        }
    }

    async function sendMessage() {
        const input = document.getElementById('chat-input');
        if (!input) return;

        const text = input.value.trim();
        if (!text) return;

        addUserMessage(text);
        input.value = '';

        addBotMessage('Đang suy nghĩ...');

        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    currentPage: getCurrentPage(),
                    appData: getAppData()
                })
            });

            const data = await response.json();

            replaceLastThinkingMessage(
                data.reply || 'Mình chưa có câu trả lời phù hợp.'
            );
        } catch (error) {
            console.error('Gemini API error:', error);

            const fallbackReply = buildReply(text);
            replaceLastThinkingMessage(fallbackReply);
        }
    }

    function buildReply(message) {
        const intent = detectIntent(message);

        if (intent) {
            return intent.handler(message);
        }

        return buildContextReply(message);
    }

    function buildContextReply(message) {
        const currentPage = getCurrentPage();
        const pageParams = getPageParams();
        const lowerMessage = message.toLowerCase();
        const normalizedMessage = normalizeText(message);

        if (currentPage === 'dashboard') {
            const dashboardData = getDashboardData();

            if (
                normalizedMessage.includes('tom tat') ||
                normalizedMessage.includes('tinh hinh') ||
                normalizedMessage.includes('tiet kiem')
            ) {
                if (dashboardData) {
                    return `Bạn đang có ${formatMoney(dashboardData.totalSavings)}, dự kiến nhận ${formatMoney(dashboardData.estimatedReturn)}, hiện có ${dashboardData.activeAccounts} sổ đang gửi.`;
                }

                return 'Bạn đang ở trang Tổng quan. Tại đây mình có thể giúp bạn theo dõi tiến độ tiết kiệm, combo pets, combo streak và reward tiếp theo.';
            }

            if (normalizedMessage.includes('reward')) {
                if (dashboardData && dashboardData.rewards) {
                    return `Phần thưởng tiếp theo của bạn là ${dashboardData.rewards.nextRewardName}, giá trị ${formatMoney(dashboardData.rewards.nextRewardValue)}. Hiện bạn có ${dashboardData.rewards.pending} phần thưởng chờ nhận.`;
                }

                return 'Trên dashboard, bạn có thể xem phần thưởng tiếp theo và tiến độ mở khóa. Ở bước sau mình sẽ nối bot với dữ liệu thật để trả lời chính xác reward của bạn.';
            }

            if (normalizedMessage.includes('streak')) {
                if (dashboardData && dashboardData.streak) {
                    return `Streak hiện tại của bạn là ${dashboardData.streak.currentMonths} tháng liên tiếp, còn ${dashboardData.streak.daysLeft} ngày để chạm mốc tiếp theo.`;
                }

                return 'Mình thấy bạn đang quan tâm đến combo streak. Ở bản demo này bot đã hiểu ngữ cảnh trang, còn bước tiếp theo mình sẽ nối dữ liệu thật để bot trả đúng số streak hiện tại.';
            }

            if (normalizedMessage.includes('pet')) {
                if (dashboardData && Array.isArray(dashboardData.comboPets) && dashboardData.comboPets.length > 0) {
                    const lowestPet = dashboardData.comboPets
                        .slice()
                        .sort(function (a, b) {
                            return a.level - b.level;
                        })[0];

                    return `Pet cần ưu tiên nhất hiện tại là ${lowestPet.name} vì đang ở level ${lowestPet.level}. Tiến độ chung của combo pets là ${dashboardData.petsProgress}%.`;
                }

                return 'Ở dashboard có phần combo pets. Mình có thể giúp giải thích pet nào gần lên level hoặc pet nào đang đóng góp tốt nhất sau khi nối dữ liệu thật.';
            }

            return 'Bạn đang ở trang Tổng quan. Mình có thể giúp về savings, pets, rewards và streak.';
        }

        if (currentPage === 'pets-collection') {
            if (normalizedMessage.includes('pet nao') || normalizedMessage.includes('level')) {
                return 'Bạn đang ở trang Pets của tôi. Bản demo này đã hiểu bạn đang hỏi về pet; bước sau mình sẽ nối dữ liệu thật để xác định pet nào gần lên level nhất.';
            }

            if (normalizedMessage.includes('khoa')) {
                return 'Mình có thể hỗ trợ giải thích pet nào đang bị khóa và điều kiện mở khóa. Khi nối dữ liệu thật, bot sẽ trả lời theo bộ sưu tập của user.';
            }

            return 'Bạn đang ở trang Pets. Mình có thể giải thích bộ sưu tập pet, level và tiến độ mở khóa.';
        }

        if (currentPage === 'pet-detail') {
            const petIdText = pageParams.id ? ` cho pet mã ${pageParams.id}` : '';

            if (normalizedMessage.includes('tac dung') || normalizedMessage.includes('bonus')) {
                return `Mình có thể giải thích tác dụng và bonus${petIdText}. Ở bước sau, bot sẽ đọc đúng dữ liệu pet đang mở.`;
            }

            return `Bạn đang xem chi tiết pet${petIdText}. Mình có thể hỗ trợ giải thích level, bonus và tiến độ phát triển của pet này.`;
        }

        if (currentPage === 'streak-detail') {
            const streakData = getStreakData();

            if (normalizedMessage.includes('moc tiep theo') || normalizedMessage.includes('bao lau')) {
                if (streakData && typeof streakData.daysLeft !== 'undefined') {
                    return `Mốc tiếp theo của bạn đang đến gần. Còn khoảng ${streakData.daysLeft} ngày để đạt mốc tiếp theo.`;
                }

                return 'Bạn đang ở trang Streak. Mình có thể giúp bạn kiểm tra mốc tiếp theo và còn bao lâu để đạt được. Bước sau mình sẽ nối dữ liệu thật để trả đúng số ngày.';
            }

            if (normalizedMessage.includes('giu streak')) {
                return 'Để giữ streak, người dùng cần duy trì hành động tiết kiệm đều đặn theo logic của app. Sau khi nối backend, bot có thể nhắc chính xác việc cần làm.';
            }

            return 'Bạn đang ở trang Combo Streak. Mình có thể giải thích tiến độ, mốc tiếp theo và cách duy trì streak.';
        }

        if (currentPage === 'rewards-dashboard') {
            const rewardsData = getRewardsData();

            if (normalizedMessage.includes('cho nhan') || normalizedMessage.includes('reward nao')) {
                if (rewardsData && typeof rewardsData.pending !== 'undefined') {
                    return `Hiện tại bạn có ${rewardsData.pending} phần thưởng đang chờ nhận.`;
                }

                return 'Bạn đang ở trang Rewards. Ở bản demo, bot hiểu bạn hỏi về phần thưởng. Bước tiếp theo mình sẽ nối dữ liệu thật để bot biết reward nào đang chờ nhận.';
            }

            if (normalizedMessage.includes('mo khoa') || normalizedMessage.includes('bao lau')) {
                if (rewardsData && rewardsData.nextRewardName) {
                    return `Phần thưởng tiếp theo là ${rewardsData.nextRewardName}. Khi nối dữ liệu đầy đủ hơn, mình sẽ trả lời chính xác điều kiện mở khóa.`;
                }

                return 'Mình có thể giúp kiểm tra reward tiếp theo và điều kiện mở khóa. Khi nối dữ liệu thật, bot sẽ trả lời theo level hiện tại của user.';
            }

            return 'Bạn đang ở trang Combo Rewards. Mình có thể giải thích reward hiện tại, reward tiếp theo và điều kiện mở khóa.';
        }

        if (currentPage === 'reward-detail') {
            const rewardIdText = pageParams.id ? ` cho reward mã ${pageParams.id}` : '';

            if (lowerMessage.includes('điều kiện') || lowerMessage.includes('nhận')) {
                return `Mình có thể giải thích điều kiện nhận${rewardIdText}. Sau khi nối dữ liệu thật, bot sẽ đọc đúng phần thưởng đang xem.`;
            }

            return `Bạn đang xem chi tiết phần thưởng${rewardIdText}. Mình có thể giải thích giá trị, điều kiện và cách nhận reward này.`;
        }

        if (currentPage === 'new-savings-goal') {
            if (normalizedMessage.includes('muc tieu') || normalizedMessage.includes('nen chon')) {
                return 'Bạn đang ở bước chọn mục tiêu tiết kiệm. Mình có thể gợi ý mục tiêu theo nhu cầu như học phí, mua nhà hoặc dự phòng tài chính.';
            }

            return 'Bạn đang tạo khoản tiết kiệm mới. Mình có thể giúp chọn mục tiêu phù hợp.';
        }

        if (currentPage === 'new-savings-pet') {
            if (normalizedMessage.includes('pet nao') || normalizedMessage.includes('bonus')) {
                return 'Bạn đang chọn pet đồng hành. Mình có thể giúp so sánh các pet và bonus của từng pet sau khi nối dữ liệu thật.';
            }

            return 'Bạn đang ở bước chọn pet đồng hành. Mình có thể giúp bạn so sánh các lựa chọn.';
        }

        if (currentPage === 'new-savings-product') {
            if (
                normalizedMessage.includes('lai') ||
                normalizedMessage.includes('ky han')
            ) {
                return 'Bạn đang ở bước chọn kỳ hạn. Mình có thể hỗ trợ giải thích mức lãi suất và so sánh giữa các kỳ hạn.';
            }

            if (
                normalizedMessage.includes('5 trieu') ||
                normalizedMessage.includes('5 tr')
            ) {
                return 'Nếu bạn muốn, ở bước tiếp theo mình sẽ giúp nối logic thật để bot tự tính lợi nhuận dựa trên số tiền và kỳ hạn mà user chọn.';
            }

            return 'Bạn đang chọn sản phẩm tiết kiệm. Mình có thể giúp so sánh kỳ hạn và lãi suất.';
        }

        return 'Mình đã nhận câu hỏi của bạn. Ở bước tiếp theo mình sẽ nối chatbot với dữ liệu thật từ app để trả lời chính xác hơn.';
    }

    initChatbot();
})();
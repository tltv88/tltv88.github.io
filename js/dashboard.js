// Dashboard JavaScript

// Dữ liệu mẫu
const sampleData = {
    totalDeposit: 250000000,
    expectedReturn: 266837500,
    activeSavings: 2,
    expReward: 50,
    savingsList: [
        {
            id: 1,
            name: 'Tiết kiệm học phí',
            status: 'Đang gửi',
            maturityDate: '15/08/2025',
            interestRate: 6.5,
            totalReturn: 52437500,
            progress: 65,
            amount: 50000000
        },
        {
            id: 2,
            name: 'Tiết kiệm mua nhà',
            status: 'Đang gửi',
            maturityDate: '01/06/2026',
            interestRate: 7.2,
            totalReturn: 214400000,
            progress: 40,
            amount: 200000000
        }
    ],
    comboPets: [
        { id: 'lucky-cat', name: 'Mèo May Mắn', level: 8 },
        { id: 'dragon', name: 'Rồng Thịnh Vượng', level: 12 },
        { id: 'loyal-dog', name: 'Chó Trung Thành', level: 5 }
    ],
    petsProgress: 65,
    goal: 'Tiết kiệm mua nhà',
    streak: {
        currentMonths: 28,
        record: 28,
        currentMilestone: 15,
        nextMilestone: 24,
        progressPercent: 62.5,
        daysLeft: 7,
        status: 'Đang streak'
    },
    rewards: {
        pending: 1,
        locked: 9,
        nextRewardName: 'Voucher Gongcha',
        nextRewardValue: 50000,
        currentLevel: 18,
        levelProgressPercent: 36,
        points: 1250
    },
    totals: {
        interestBonus: 2,
        vouchers: 5,
        experiences: 1
    },
    recentActivities: [
        {
            type: 'deposit',
            title: 'Gửi tiết kiệm',
            description: 'Bạn đã gửi 5.000.000 đ',
            time: '2 giờ trước'
        },
        {
            type: 'pet',
            title: 'Pet nhận EXP',
            description: 'Mèo May Mắn +50 EXP',
            time: 'Hôm qua'
        },
        {
            type: 'reward',
            title: 'Nhận phần thưởng',
            description: 'Voucher Gongcha 50K',
            time: 'Hôm qua'
        }
    ]
};

// Khởi tạo appData cho chatbot
function syncDashboardToAppData() {
    window.appData = window.appData || {};

    window.appData.dashboard = {
        totalSavings: sampleData.totalDeposit,
        estimatedReturn: sampleData.expectedReturn,
        activeAccounts: sampleData.activeSavings,
        expReward: sampleData.expReward,
        savingsList: sampleData.savingsList,
        comboPets: sampleData.comboPets,
        petsProgress: sampleData.petsProgress,
        goal: sampleData.goal,
        streak: sampleData.streak,
        rewards: sampleData.rewards,
        totals: sampleData.totals,
        recentActivities: sampleData.recentActivities
    };

    // Cho chatbot đọc nhanh hơn từ các namespace riêng
    window.appData.rewards = sampleData.rewards;
    window.appData.streak = sampleData.streak;
}

// Load dữ liệu dashboard
function loadDashboardData() {
    syncDashboardToAppData();

    document.querySelectorAll('.stats-value').forEach((el, index) => {
        switch (index) {
            case 0:
                el.textContent = formatCurrency(sampleData.totalDeposit);
                break;
            case 1:
                el.textContent = formatCurrency(sampleData.expectedReturn);
                break;
            case 2:
                el.textContent = sampleData.activeSavings + ' số';
                break;
            case 3:
                el.textContent = '+' + sampleData.expReward;
                break;
        }
    });
}

// Khởi tạo dashboard
function initDashboard() {
    loadDashboardData();
}

initDashboard();

// Xem tất cả savings
window.viewAllSavings = function() {
    loadPage('savings-list');
};
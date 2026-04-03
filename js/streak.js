// Streak JavaScript

let streakData = {
    currentStreak: 28,
    personalRecord: 28,
    targetMonths: 24,
    completedMonths: 15
};

// Toggle lịch sử
window.toggleHistory = function() {
    const historyList = document.querySelector('.history-list');
    const button = event.target;
    
    if (historyList.classList.contains('expanded')) {
        historyList.style.maxHeight = '300px';
        historyList.classList.remove('expanded');
        button.textContent = 'Xem tất cả';
    } else {
        historyList.style.maxHeight = historyList.scrollHeight + 'px';
        historyList.classList.add('expanded');
        button.textContent = 'Thu gọn';
    }
};

// Kiểm tra và cảnh báo streak
function checkStreakWarning() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysLeft = Math.ceil((lastDay - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 7) {
        // Hiển thị cảnh báo
        showStreakWarning();
    }
}

// Hiển thị cảnh báo streak
function showStreakWarning() {
    const warning = document.createElement('div');
    warning.className = 'streak-warning-notification';
    warning.innerHTML = `
        <div class="warning-content">
            <strong>⚠️ Cảnh báo streak!</strong>
            <p>Bạn cần hoàn thành ít nhất 2/3 thói quen trong tháng này để không bị mất streak.</p>
            <button onclick="this.parentElement.parentElement.remove()">Đã hiểu</button>
        </div>
    `;
    document.body.appendChild(warning);
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    checkStreakWarning();
});
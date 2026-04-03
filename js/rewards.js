// Rewards JavaScript

// Filter phần thưởng
window.filterRewards = function(filterType) {
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter logic
    const rewardCards = document.querySelectorAll('.reward-card');
    rewardCards.forEach(card => {
        switch(filterType) {
            case 'all':
                card.style.display = 'block';
                break;
            case 'interest':
                if (card.querySelector('.reward-type.interest')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                break;
            case 'voucher':
                if (card.querySelector('.reward-type.voucher')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                break;
            case 'experience':
                if (card.querySelector('.reward-type.experience')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                break;
        }
    });
};

// Nhận thưởng
window.claimReward = function(rewardId) {
    showNotification(`Nhận phần thưởng thành công!`, 'success');
};

// Chia sẻ
window.shareReward = function() {
    if (navigator.share) {
        navigator.share({
            title: 'Phần thưởng từ Savings App',
            text: 'Mình vừa nhận được phần thưởng từ Savings App!',
            url: window.location.href
        });
    } else {
        prompt('Copy link chia sẻ:', window.location.href);
    }
};
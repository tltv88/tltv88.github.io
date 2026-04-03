// Pets JavaScript - Quản lý tất cả chức năng liên quan đến Pet

// Dữ liệu pets đầy đủ với icon
const petsData = {
    'lucky-cat': {
        id: 'lucky-cat',
        name: 'Mèo May Mắn',
        icon: '🐱',
        level: 8,
        type: 'Phổ biến',
        rarity: 'common',
        bonus: '+10% EXP mỗi lần gửi tiền',
        bonusIcon: '✨',
        happiness: 85,
        achievements: 12,
        goal: 'Tiết kiệm mua nhà',
        currentExp: 650,
        maxExp: 1000,
        evolution: 'thiếu niên',
        personality: 'Năng động, thích khám phá',
        personalityTraits: [
            { icon: '⚡', name: 'Năng động', desc: 'Thích khám phá và học hỏi điều mới' },
            { icon: '🎯', name: 'Tập trung', desc: 'Luôn hướng đến mục tiêu đã đề ra' },
            { icon: '🤝', name: 'Thân thiện', desc: 'Dễ dàng kết bạn và hợp tác' }
        ],
        evolutionIcons: {
            egg: '🥚',
            baby: '🐣',
            teen: '🐱',
            adult: '🦁',
            master: '👑'
        }
    },
    'dragon': {
        id: 'dragon',
        name: 'Rồng Thịnh Vượng',
        icon: '🐉',
        level: 12,
        type: 'Hiếm',
        rarity: 'rare',
        bonus: '+0.2% lãi suất cho mỗi số',
        bonusIcon: '📈',
        happiness: 92,
        achievements: 18,
        goal: 'Tiết kiệm du lịch',
        currentExp: 850,
        maxExp: 1000,
        evolution: 'thiếu niên',
        personality: 'Mạnh mẽ, tham vọng',
        personalityTraits: [
            { icon: '🔥', name: 'Mạnh mẽ', desc: 'Không ngại thử thách và khó khăn' },
            { icon: '👑', name: 'Tham vọng', desc: 'Luôn đặt mục tiêu cao và phấn đấu' },
            { icon: '🛡️', name: 'Bảo vệ', desc: 'Che chở cho đồng đội' }
        ],
        evolutionIcons: {
            egg: '🥚',
            baby: '🐣',
            teen: '🐉',
            adult: '🐲',
            master: '👑'
        }
    },
    'loyal-dog': {
        id: 'loyal-dog',
        name: 'Chó Trung Thành',
        icon: '🐕',
        level: 5,
        type: 'Phổ biến',
        rarity: 'common',
        bonus: '+15% bonus khi giữ streak',
        bonusIcon: '🔥',
        happiness: 70,
        achievements: 5,
        goal: 'Tiết kiệm xe máy',
        currentExp: 400,
        maxExp: 1000,
        evolution: 'bé con',
        personality: 'Chung thủy, đáng tin cậy',
        personalityTraits: [
            { icon: '❤️', name: 'Chung thủy', desc: 'Luôn đồng hành và ủng hộ bạn' },
            { icon: '🤲', name: 'Đáng tin', desc: 'Bạn có thể dựa vào' },
            { icon: '😊', name: 'Vui vẻ', desc: 'Luôn mang lại niềm vui' }
        ],
        evolutionIcons: {
            egg: '🥚',
            baby: '🐕',
            teen: '🦮',
            adult: '🐕‍🦺',
            master: '👑'
        }
    },
    'lucky-rabbit': {
        id: 'lucky-rabbit',
        name: 'Thỏ Phú Quý',
        icon: '🐰',
        level: 3,
        type: 'Phổ biến',
        rarity: 'common',
        bonus: '+20% giá trị rewards',
        bonusIcon: '🎁',
        happiness: 88,
        achievements: 15,
        goal: 'Tiết kiệm du lịch',
        currentExp: 200,
        maxExp: 1000,
        evolution: 'bé con',
        personality: 'Lanh lợi, may mắn',
        personalityTraits: [
            { icon: '🍀', name: 'May mắn', desc: 'Mang lại vận may trong mọi việc' },
            { icon: '⚡', name: 'Nhanh nhẹn', desc: 'Phản ứng nhanh với cơ hội' },
            { icon: '🎨', name: 'Sáng tạo', desc: 'Luôn có ý tưởng mới' }
        ],
        evolutionIcons: {
            egg: '🥚',
            baby: '🐰',
            teen: '🐇',
            adult: '🦌',
            master: '👑'
        }
    },
    'bear': {
        id: 'bear',
        name: 'Gấu Bảo Vệ',
        icon: '🐻',
        level: 7,
        type: 'Hiếm',
        rarity: 'rare',
        bonus: 'Cảnh báo sớm rủi ro tài chính',
        bonusIcon: '🛡️',
        happiness: 95,
        achievements: 22,
        goal: 'Quỹ khẩn cấp',
        currentExp: 500,
        maxExp: 1000,
        evolution: 'thiếu niên',
        personality: 'Bảo thủ, an toàn',
        personalityTraits: [
            { icon: '🛡️', name: 'Bảo vệ', desc: 'Luôn cảnh giác với rủi ro' },
            { icon: '🧸', name: 'Ấm áp', desc: 'Mang lại cảm giác an toàn' },
            { icon: '🤗', name: 'Đáng yêu', desc: 'Dễ thương và thân thiện' }
        ],
        evolutionIcons: {
            egg: '🥚',
            baby: '🐻',
            teen: '🧸',
            adult: '🐼',
            master: '👑'
        }
    },
    'fox': {
        id: 'fox',
        name: 'Cáo Thông Thái',
        icon: '🦊',
        level: 15,
        type: 'Huyền thoại',
        rarity: 'legendary',
        bonus: 'Quản lý 2 mục tiêu cùng lúc',
        bonusIcon: '🎯',
        happiness: 100,
        achievements: 30,
        goal: 'Đầu tư kinh doanh',
        currentExp: 900,
        maxExp: 1000,
        evolution: 'trưởng thành',
        personality: 'Thông minh, sáng tạo',
        personalityTraits: [
            { icon: '📚', name: 'Thông thái', desc: 'Hiểu biết sâu rộng về tài chính' },
            { icon: '🎨', name: 'Sáng tạo', desc: 'Luôn tìm ra giải pháp mới' },
            { icon: '🔮', name: 'Chiến lược', desc: 'Nhìn xa trông rộng' }
        ],
        evolutionIcons: {
            egg: '🥚',
            baby: '🦊',
            teen: '🦝',
            adult: '🦊👑',
            master: '👑✨'
        }
    }
};

// Danh sách pet đã sở hữu
let ownedPets = ['lucky-cat', 'dragon', 'loyal-dog'];

// Level hiện tại của user
let userLevel = 18;

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có đang ở trang pet-detail không
    const params = JSON.parse(sessionStorage.getItem('pageParams') || '{}');
    if (params.id) {
        loadPetDetail(params.id);
    }
    
    // Cập nhật trạng thái các pet bị khóa
    updateLockedPets();
});

// Cập nhật trạng thái pet bị khóa
function updateLockedPets() {
    const lockRequirements = {
        'lucky-rabbit': 20,
        'bear': 30,
        'fox': 50
    };
    
    // Cập nhật trong pets-collection
    document.querySelectorAll('.pet-card.locked').forEach(card => {
        const petName = card.querySelector('h3')?.textContent;
        if (petName) {
            const pet = Object.values(petsData).find(p => p.name === petName);
            if (pet) {
                const reqLevel = lockRequirements[pet.id];
                if (userLevel >= reqLevel) {
                    card.classList.remove('locked');
                    card.setAttribute('onclick', `loadPage('pet-detail&id=${pet.id}')`);
                    const lockOverlay = card.querySelector('.lock-overlay');
                    if (lockOverlay) lockOverlay.remove();
                }
            }
        }
    });
    
    // Cập nhật trong new-pets-grid
    document.querySelectorAll('.new-pet-card.locked').forEach(card => {
        const petName = card.querySelector('h4')?.textContent;
        if (petName) {
            const pet = Object.values(petsData).find(p => p.name === petName);
            if (pet) {
                const reqLevel = lockRequirements[pet.id];
                if (userLevel >= reqLevel) {
                    card.classList.remove('locked');
                    card.classList.add('available');
                    const lockReq = card.querySelector('.lock-requirement');
                    if (lockReq) {
                        lockReq.outerHTML = `<button class="btn btn-primary btn-small" onclick="claimPet('${pet.id}')">Nhận</button>`;
                    }
                }
            }
        }
    });
}

// Load chi tiết pet
window.loadPetDetail = function(petId) {
    const pet = petsData[petId];
    if (!pet) {
        showNotification('Không tìm thấy thông tin pet!', 'error');
        return;
    }
    
    // Cập nhật emoji
    const emojiElement = document.getElementById('pet-emoji');
    if (emojiElement) emojiElement.textContent = pet.icon;
    
    // Cập nhật tên
    const nameElement = document.getElementById('pet-name-header');
    if (nameElement) nameElement.textContent = pet.name;
    
    // Cập nhật type
    const typeElement = document.getElementById('pet-type');
    if (typeElement) typeElement.textContent = pet.type;
    
    // Cập nhật bonus
    const bonusElement = document.getElementById('pet-bonus');
    if (bonusElement) {
        bonusElement.innerHTML = `
            <span class="bonus-icon">${pet.bonusIcon}</span>
            <span>${pet.bonus}</span>
        `;
    }
    
    // Cập nhật stats
    const happinessValue = document.getElementById('happiness-value');
    if (happinessValue) happinessValue.textContent = pet.happiness + '%';
    
    const happinessBar = document.getElementById('happiness-bar');
    if (happinessBar) happinessBar.style.width = pet.happiness + '%';
    
    const achievementsValue = document.getElementById('achievements-value');
    if (achievementsValue) achievementsValue.textContent = pet.achievements;
    
    const goalValue = document.getElementById('goal-value');
    if (goalValue) goalValue.textContent = pet.goal;
    
    // Cập nhật EXP
    const expCurrent = document.getElementById('exp-current');
    if (expCurrent) expCurrent.textContent = pet.currentExp;
    
    const expMax = document.getElementById('exp-max');
    if (expMax) expMax.textContent = pet.maxExp + ' EXP';
    
    const expPercent = (pet.currentExp / pet.maxExp) * 100;
    const expBar = document.getElementById('exp-bar');
    if (expBar) expBar.style.width = expPercent + '%';
    
    const remaining = pet.maxExp - pet.currentExp;
    const expRemaining = document.getElementById('exp-remaining');
    if (expRemaining) expRemaining.textContent = remaining + ' EXP';
    
    // Cập nhật stage icon
    const stageIcon = document.getElementById('current-stage-icon');
    if (stageIcon) stageIcon.textContent = pet.evolutionIcons[pet.evolution] || pet.icon;
    
    // Cập nhật tính cách
    updatePersonalityTraits(pet);
    
    // Cập nhật level display
    const levelElement = document.querySelector('.pet-main-level');
    if (levelElement) levelElement.textContent = `Level ${pet.level}`;
    
    // Cập nhật các stage khác
    updateEvolutionStages(pet);
};

// Cập nhật tính cách
function updatePersonalityTraits(pet) {
    const personalityContainer = document.querySelector('.personality-details');
    if (!personalityContainer || !pet.personalityTraits) return;
    
    let html = '';
    pet.personalityTraits.forEach(trait => {
        html += `
            <div class="personality-trait">
                <span class="trait-icon">${trait.icon}</span>
                <div class="trait-info">
                    <h4>${trait.name}</h4>
                    <p>${trait.desc}</p>
                </div>
            </div>
        `;
    });
    
    personalityContainer.innerHTML = html;
}

// Cập nhật các giai đoạn tiến hóa
function updateEvolutionStages(pet) {
    const stages = [
        { name: 'Trứng', level: 1, icon: pet.evolutionIcons.egg },
        { name: 'Bé con', level: 5, icon: pet.evolutionIcons.baby },
        { name: 'Thiếu niên', level: 10, icon: pet.evolutionIcons.teen },
        { name: 'Trưởng thành', level: 20, icon: pet.evolutionIcons.adult },
        { name: 'Bậc thầy', level: 50, icon: pet.evolutionIcons.master }
    ];
    
    const timeline = document.querySelector('.evolution-timeline');
    if (!timeline) return;
    
    let html = '';
    stages.forEach((stage, index) => {
        let stageClass = 'evolution-stage';
        if (pet.level >= stage.level) {
            stageClass += ' completed';
        } else if (index > 0 && pet.level >= stages[index-1].level && pet.level < stage.level) {
            stageClass += ' current';
        } else {
            stageClass += ' locked';
        }
        
        html += `
            <div class="${stageClass}">
                <div class="stage-icon">${stage.icon}</div>
                <div class="stage-info">
                    <span class="stage-name">${stage.name}</span>
                    <span class="stage-level">Lv.${stage.level}</span>
                </div>
                ${pet.level >= stage.level ? '<span class="stage-check">✓</span>' : 
                  (index > 0 && pet.level >= stages[index-1].level && pet.level < stage.level) ? 
                  '<span class="stage-current">Hiện tại</span>' : 
                  '<span class="stage-lock">🔒</span>'}
            </div>
        `;
    });
    
    timeline.innerHTML = html;
}

// Claim pet mới
window.claimPet = function(petId) {
    const pet = petsData[petId];
    if (!pet) {
        showNotification('Không tìm thấy pet!', 'error');
        return;
    }
    
    // Kiểm tra xem đã có pet chưa
    if (ownedPets.includes(petId)) {
        showNotification('Bạn đã có pet này rồi!', 'warning');
        return;
    }
    
    // Kiểm tra level requirement
    const requirements = {
        'lucky-rabbit': 20,
        'bear': 30,
        'fox': 50
    };
    
    const reqLevel = requirements[petId];
    if (reqLevel && userLevel < reqLevel) {
        showNotification(`Bạn cần đạt Level ${reqLevel} để nhận pet này!`, 'warning');
        return;
    }
    
    // Thêm pet vào danh sách
    ownedPets.push(petId);
    
    // Lưu vào localStorage
    localStorage.setItem('ownedPets', JSON.stringify(ownedPets));
    
    // Hiển thị thông báo thành công
    showNotification(`🎉 Chúc mừng! Bạn đã nhận được ${pet.name}!`, 'success');
    
    // Cập nhật UI
    setTimeout(() => {
        loadPage('pets-collection');
    }, 1500);
};

// Mở modal thêm pet
window.openAddPetModal = function() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎁 Thêm Pet mới</h3>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p class="modal-description">Chọn một pet để đồng hành cùng bạn!</p>
                <div class="modal-pets-grid">
                    <div class="modal-pet-item ${userLevel >= 60 ? 'available' : 'locked'}" 
                         onclick="${userLevel >= 60 ? 'claimPet(\'phoenix\')' : 'showNotification(\'Cần Level 60 để nhận\', \'warning\')'}">
                        <div class="modal-pet-emoji">🦅</div>
                        <div class="modal-pet-info">
                            <h4>Phượng Hoàng</h4>
                            <span class="pet-type-badge legendary">Huyền thoại</span>
                            <span class="pet-requirement">Yêu cầu: Level 60</span>
                        </div>
                        ${userLevel >= 60 ? 
                          '<button class="btn btn-primary btn-small">Nhận</button>' : 
                          '<span class="lock-badge">🔒 Khóa</span>'}
                    </div>
                    
                    <div class="modal-pet-item ${userLevel >= 40 ? 'available' : 'locked'}" 
                         onclick="${userLevel >= 40 ? 'claimPet(\'whale\')' : 'showNotification(\'Cần Level 40 để nhận\', \'warning\')'}">
                        <div class="modal-pet-emoji">🐋</div>
                        <div class="modal-pet-info">
                            <h4>Cá Voi Xanh</h4>
                            <span class="pet-type-badge rare">Hiếm</span>
                            <span class="pet-requirement">Yêu cầu: Level 40</span>
                        </div>
                        ${userLevel >= 40 ? 
                          '<button class="btn btn-primary btn-small">Nhận</button>' : 
                          '<span class="lock-badge">🔒 Khóa</span>'}
                    </div>
                    
                    <div class="modal-pet-item ${userLevel >= 35 ? 'available' : 'locked'}" 
                         onclick="${userLevel >= 35 ? 'claimPet(\'panda\')' : 'showNotification(\'Cần Level 35 để nhận\', \'warning\')'}">
                        <div class="modal-pet-emoji">🐼</div>
                        <div class="modal-pet-info">
                            <h4>Gấu Trúc</h4>
                            <span class="pet-type-badge common">Phổ biến</span>
                            <span class="pet-requirement">Yêu cầu: Level 35</span>
                        </div>
                        ${userLevel >= 35 ? 
                          '<button class="btn btn-primary btn-small">Nhận</button>' : 
                          '<span class="lock-badge">🔒 Khóa</span>'}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Thêm style cho modal
    const style = document.createElement('style');
    style.textContent = `
        .modal-description {
            text-align: center;
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            font-size: 1rem;
        }
        
        .modal-pets-grid {
            display: grid;
            gap: 1rem;
        }
        
        .modal-pet-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.2rem;
            background: var(--light-bg);
            border-radius: 1rem;
            cursor: pointer;
            transition: all 0.3s;
            border: 1px solid transparent;
        }
        
        .modal-pet-item.available:hover {
            background: var(--primary-light);
            border-color: var(--primary-color);
            transform: translateX(4px);
        }
        
        .modal-pet-item.locked {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .modal-pet-emoji {
            font-size: 2.8rem;
            width: 70px;
            height: 70px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .modal-pet-info {
            flex: 1;
        }
        
        .modal-pet-info h4 {
            font-size: 1.1rem;
            margin-bottom: 0.4rem;
            color: var(--text-primary);
        }
        
        .pet-requirement {
            display: block;
            font-size: 0.8rem;
            color: var(--text-secondary);
            margin-top: 0.4rem;
        }
        
        .lock-badge {
            padding: 0.4rem 0.8rem;
            background: #E5E7EB;
            border-radius: 9999px;
            font-size: 0.8rem;
            color: #6B7280;
        }
    `;
    document.head.appendChild(style);
};

// Đóng modal
window.closeModal = function() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
};

// Filter pet theo độ hiếm
window.filterPets = function(rarity) {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    const petCards = document.querySelectorAll('.pet-card');
    petCards.forEach(card => {
        if (rarity === 'all') {
            card.style.display = 'block';
        } else {
            const cardRarity = card.dataset.rarity;
            card.style.display = cardRarity === rarity ? 'block' : 'none';
        }
    });
};

// Chọn pet
window.selectPet = function(petId) {
    const cards = document.querySelectorAll('.pet-card');
    cards.forEach(card => card.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    // Lưu pet đã chọn vào session
    const pet = petsData[petId];
    sessionStorage.setItem('selectedPet', JSON.stringify({
        id: petId,
        name: pet.name,
        icon: pet.icon,
        bonus: pet.bonus
    }));
    
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) continueBtn.disabled = false;
};

// Tính EXP cho pet
function calculatePetExp(petId, action) {
    const pet = petsData[petId];
    if (!pet) return 0;
    
    const expValues = {
        'deposit': 50,
        'streak': 20,
        'goal': 200,
        'reward': 100,
        'referral': 150
    };
    
    let exp = expValues[action] || 0;
    
    // Bonus theo pet
    if (petId === 'lucky-cat') exp = Math.floor(exp * 1.1);
    if (petId === 'loyal-dog' && action === 'streak') exp = Math.floor(exp * 1.15);
    
    return exp;
}

// Cập nhật EXP cho pet
function updatePetExp(petId, expGained) {
    const pet = petsData[petId];
    if (!pet) return;
    
    pet.currentExp += expGained;
    
    // Kiểm tra lên level
    while (pet.currentExp >= pet.maxExp) {
        pet.level++;
        pet.currentExp -= pet.maxExp;
        pet.maxExp = Math.floor(pet.maxExp * 1.5);
        
        showNotification(`🎉 ${pet.name} đã lên Level ${pet.level}!`, 'success');
        
        // Kiểm tra tiến hóa
        checkEvolution(pet);
    }
    
    // Lưu vào localStorage
    localStorage.setItem(`pet_${petId}`, JSON.stringify({
        level: pet.level,
        currentExp: pet.currentExp,
        maxExp: pet.maxExp
    }));
}

// Kiểm tra tiến hóa
function checkEvolution(pet) {
    const evolutionLevels = [1, 5, 10, 20, 50];
    const evolutionNames = ['Trứng', 'Bé con', 'Thiếu niên', 'Trưởng thành', 'Bậc thầy'];
    
    for (let i = 0; i < evolutionLevels.length; i++) {
        if (pet.level >= evolutionLevels[i]) {
            const newEvolution = evolutionNames[i];
            if (pet.evolution !== newEvolution) {
                pet.evolution = newEvolution;
                showNotification(`✨ ${pet.name} đã tiến hóa thành ${newEvolution}!`, 'success');
            }
        }
    }
}

// Lấy danh sách pet theo độ hiếm
function getPetsByRarity(rarity) {
    return Object.values(petsData).filter(pet => pet.rarity === rarity);
}

// Lấy tổng số pet đã sở hữu
function getOwnedPetsCount() {
    return ownedPets.length;
}

// Lấy tổng EXP của tất cả pet
function getTotalExp() {
    return Object.values(petsData)
        .filter(pet => ownedPets.includes(pet.id))
        .reduce((total, pet) => total + pet.currentExp, 0);
}

// Xuất functions để dùng trong các file khác
window.petsData = petsData;
window.getOwnedPetsCount = getOwnedPetsCount;
window.getTotalExp = getTotalExp;
window.calculatePetExp = calculatePetExp;
window.updatePetExp = updatePetExp;
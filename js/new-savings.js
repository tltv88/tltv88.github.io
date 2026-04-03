// New Savings JavaScript

// State cho quy trình tạo khoản mới
let savingsState = {
    goal: null,
    goalName: '',
    pet: null,
    petName: '',
    petBonus: '',
    product: null,
    amount: 0,
    term: null,
    rate: 0,
    interestMethod: 'end'
};

// Danh sách sản phẩm
const products = {
    flexible: {
        name: 'Tiết kiệm linh hoạt',
        minAmount: 1000000,
        rates: {
            1: 3.5,
            3: 4.2,
            6: 5.0,
            24: 7.0
        }
    },
    standard: {
        name: 'Tiết kiệm tiêu chuẩn',
        minAmount: 10000000,
        rates: {
            6: 5.8,
            12: 6.5,
            24: 7.0
        }
    },
    premium: {
        name: 'Tiết kiệm cao cấp',
        minAmount: 50000000,
        rates: {
            12: 7.2,
            24: 7.8,
            36: 8.2
        }
    }
};

// Danh sách pets với bonus
const petsBonus = {
    'lucky-cat': { name: 'Mèo May Mắn', bonus: '+10% EXP', exp: 50 },
    'loyal-dog': { name: 'Chó Trung Thành', bonus: '+15% streak', exp: 60 },
    'dragon': { name: 'Rồng Thịnh Vượng', bonus: '+0.2% lãi suất', exp: 80 },
    'lucky-rabbit': { name: 'Thỏ Phú Quý', bonus: '+20% rewards', exp: 55 },
    'bear': { name: 'Gấu Bảo Vệ', bonus: 'Cảnh báo rủi ro', exp: 70 },
    'fox': { name: 'Cáo Thông Thái', bonus: 'Quản lý 2 mục tiêu', exp: 100 }
};

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    const savedState = sessionStorage.getItem('savingsState');
    if (savedState) {
        savingsState = JSON.parse(savedState);
        updateSummaryInfo();
    }
    
    // Set ngày bắt đầu mặc định là hôm nay
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('start-date');
    if (dateInput) dateInput.value = today;
    
    // Lắng nghe thay đổi phương thức nhận lãi
    document.querySelectorAll('input[name="interest-method"]').forEach(radio => {
        radio.addEventListener('change', function() {
            savingsState.interestMethod = this.value;
            if (savingsState.amount > 0 && savingsState.rate > 0) {
                updatePreview();
            }
        });
    });
});

// Cập nhật thông tin tóm tắt
function updateSummaryInfo() {
    const goalMap = {
        'education': 'Tiết kiệm học phí',
        'house': 'Tiết kiệm mua nhà',
        'retirement': 'Tiết kiệm hưu trí',
        'travel': 'Tiết kiệm du lịch',
        'car': 'Tiết kiệm xe hơi',
        'emergency': 'Quỹ khẩn cấp',
        'wedding': 'Tiết kiệm cưới hỏi',
        'business': 'Tiết kiệm kinh doanh'
    };
    
    const goalElement = document.getElementById('summary-goal');
    if (goalElement && savingsState.goal) {
        goalElement.textContent = goalMap[savingsState.goal] || savingsState.goalName;
    }
    
    const petElement = document.getElementById('summary-pet');
    const bonusElement = document.getElementById('summary-bonus');
    if (petElement && savingsState.pet) {
        const pet = petsBonus[savingsState.pet];
        petElement.textContent = pet.name;
        bonusElement.textContent = pet.bonus;
    }
}

// Chọn mục tiêu
window.selectGoal = function(goalId) {
    document.querySelectorAll('.goal-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    const goalMap = {
        'education': 'Tiết kiệm học phí',
        'house': 'Tiết kiệm mua nhà',
        'retirement': 'Tiết kiệm hưu trí',
        'travel': 'Tiết kiệm du lịch',
        'car': 'Tiết kiệm xe hơi',
        'emergency': 'Quỹ khẩn cấp',
        'wedding': 'Tiết kiệm cưới hỏi',
        'business': 'Tiết kiệm kinh doanh'
    };
    
    savingsState.goal = goalId;
    savingsState.goalName = goalMap[goalId];
    
    document.getElementById('continue-btn').disabled = false;
};

// Chuyển sang bước chọn pet
window.nextToPetSelection = function() {
    sessionStorage.setItem('savingsState', JSON.stringify(savingsState));
    loadPage('new-savings-pet');
};

// Lọc pet
window.filterPets = function(rarity) {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const petCards = document.querySelectorAll('.pet-card');
    petCards.forEach(card => {
        if (rarity === 'all' || card.dataset.rarity === rarity) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Chọn pet
window.selectPet = function(petId) {
    document.querySelectorAll('.pet-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    savingsState.pet = petId;
    const pet = petsBonus[petId];
    savingsState.petName = pet.name;
    savingsState.petBonus = pet.bonus;
    
    document.getElementById('continue-btn').disabled = false;
};

// Chuyển sang bước chọn sản phẩm
window.nextToProductSelection = function() {
    sessionStorage.setItem('savingsState', JSON.stringify(savingsState));
    loadPage('new-savings-product');
};

// Chọn sản phẩm
window.selectProduct = function(productId) {
    document.querySelectorAll('.product-row').forEach(row => {
        row.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    savingsState.product = productId;
    document.getElementById('product-form').style.display = 'block';
    updateTerms(productId);
    updateMinAmountNote(productId);
};

// Cập nhật note số tiền tối thiểu
function updateMinAmountNote(productId) {
    const product = products[productId];
    const noteElement = document.getElementById('min-amount-note');
    if (noteElement) {
        noteElement.textContent = `* Số tiền tối thiểu: ${formatCurrency(product.minAmount)}`;
    }
}

// Cập nhật terms
function updateTerms(productId) {
    const product = products[productId];
    const termContainer = document.getElementById('term-options');
    
    let html = '';
    Object.keys(product.rates).forEach(months => {
        html += `
            <div class="term-option" onclick="selectTerm(${months}, ${product.rates[months]})">
                ${months} tháng
                <small>${product.rates[months]}%</small>
            </div>
        `;
    });
    
    termContainer.innerHTML = html;
}

// Chọn kỳ hạn
window.selectTerm = function(months, rate) {
    document.querySelectorAll('.term-option').forEach(term => {
        term.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    savingsState.term = months;
    savingsState.rate = rate;
    
    if (savingsState.amount > 0) {
        updatePreview();
    }
};

// Set số tiền
window.setAmount = function(amount) {
    document.getElementById('amount').value = amount.toLocaleString('vi-VN');
    savingsState.amount = amount;
    
    validateAmount();
    if (savingsState.rate > 0) {
        updatePreview();
    }
};

// Format số tiền
window.formatAmount = function(input) {
    let value = input.value.replace(/\D/g, '');
    if (value) {
        savingsState.amount = parseInt(value);
        input.value = parseInt(value).toLocaleString('vi-VN');
        
        validateAmount();
        if (savingsState.rate > 0) {
            updatePreview();
        }
    }
};

// Validate số tiền
function validateAmount() {
    if (!savingsState.product) return;
    
    const product = products[savingsState.product];
    const createBtn = document.getElementById('create-btn');
    
    if (savingsState.amount < product.minAmount) {
        createBtn.disabled = true;
        showNotification(`Số tiền tối thiểu là ${formatCurrency(product.minAmount)}`, 'warning');
    } else {
        if (savingsState.term) {
            createBtn.disabled = false;
        }
    }
}

// Tính ngày đáo hạn
function calculateMaturityDate(startDate, months) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString('vi-VN');
}

// Tính lãi suất theo phương thức nhận
function calculateInterest(amount, rate, months, method) {
    const yearlyInterest = amount * (rate / 100);
    
    switch(method) {
        case 'end':
            return yearlyInterest * (months / 12);
        case 'monthly':
            return yearlyInterest * (months / 12);
        case 'quarterly':
            return yearlyInterest * (months / 12);
        default:
            return yearlyInterest * (months / 12);
    }
}

// Cập nhật preview
function updatePreview() {
    const amount = savingsState.amount;
    const rate = savingsState.rate;
    const months = savingsState.term;
    const method = savingsState.interestMethod;
    
    const interest = calculateInterest(amount, rate, months, method);
    const total = amount + interest;
    
    const startDate = document.getElementById('start-date')?.value || new Date().toISOString().split('T')[0];
    const maturityDate = calculateMaturityDate(startDate, months);
    
    document.getElementById('display-amount').textContent = formatCurrency(amount);
    document.getElementById('display-rate').textContent = rate + '%';
    document.getElementById('display-interest').textContent = formatCurrency(interest);
    document.getElementById('display-maturity').textContent = maturityDate;
    document.getElementById('display-total').textContent = formatCurrency(total);
    
    const pet = petsBonus[savingsState.pet];
    const expValue = pet ? pet.exp : 50;
    document.getElementById('display-exp').textContent = `+${expValue} EXP`;
    
    const product = products[savingsState.product];
    if (amount >= product.minAmount) {
        document.getElementById('create-btn').disabled = false;
    }
}

// Tạo khoản tiết kiệm
window.createSavings = function() {
    const product = products[savingsState.product];
    if (savingsState.amount < product.minAmount) {
        showNotification(`Số tiền tối thiểu là ${formatCurrency(product.minAmount)}`, 'warning');
        return;
    }
    
    const savingsId = 'SV' + Date.now() + Math.random().toString(36).substr(2, 9);
    
    const newSavings = {
        id: savingsId,
        ...savingsState,
        startDate: document.getElementById('start-date')?.value || new Date().toISOString().split('T')[0],
        maturityDate: calculateMaturityDate(
            document.getElementById('start-date')?.value || new Date().toISOString().split('T')[0],
            savingsState.term
        ),
        status: 'Đang gửi',
        createdAt: new Date().toISOString(),
        transactions: []
    };
    
    const existingSavings = JSON.parse(localStorage.getItem('savingsList') || '[]');
    existingSavings.push(newSavings);
    localStorage.setItem('savingsList', JSON.stringify(existingSavings));
    
    const petExp = JSON.parse(localStorage.getItem('petExp') || '{}');
    const pet = petsBonus[savingsState.pet];
    if (pet) {
        petExp[savingsState.pet] = (petExp[savingsState.pet] || 0) + pet.exp;
        localStorage.setItem('petExp', JSON.stringify(petExp));
    }
    
    showNotification('🎉 Tạo khoản tiết kiệm thành công!', 'success');
    
    sessionStorage.removeItem('savingsState');
    
    setTimeout(() => {
        loadPage('dashboard');
    }, 1500);
};
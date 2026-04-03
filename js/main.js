// Main JavaScript file

// Biến toàn cục
let currentUser = {
    name: 'Nguyễn Văn A',
    level: 18,
    email: 'nguyenvana@email.com',
    avatar: 'https://via.placeholder.com/40'
};

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('sidebar-container', 'components/sidebar.html');
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');

    // Load dashboard mặc định
    loadPage('dashboard');

    // Setup navigation
    setupNavigation();
});

// Load component
function loadComponent(containerId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;

            // Cập nhật active nav nếu đã có page
            const currentPage = sessionStorage.getItem('currentPage') || 'dashboard';
            if (containerId === 'sidebar-container') {
                setTimeout(() => updateActiveNav(currentPage), 100);
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load page
function loadPage(pageName) {
    let page = pageName;
    let params = {};

    // Xử lý parameters
    if (pageName.includes('&')) {
        const parts = pageName.split('&');
        page = parts[0];

        parts.slice(1).forEach(part => {
            const [key, value] = part.split('=');
            params[key] = value;
        });
    }

    // Lưu page hiện tại
    sessionStorage.setItem('currentPage', page);

    if (Object.keys(params).length > 0) {
        sessionStorage.setItem('pageParams', JSON.stringify(params));
    } else {
        sessionStorage.removeItem('pageParams');
    }

    // Fetch page content
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content-area').innerHTML = html;
            updateActiveNav(page);
            updatePageTitle(page);

            // Load page specific script
            loadPageScript(page);

            // Báo cho chatbot / các module khác biết trang đã đổi
            document.dispatchEvent(new CustomEvent('page:changed', {
                detail: { page, params }
            }));

            // Scroll lên đầu
            window.scrollTo(0, 0);
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById('content-area').innerHTML =
                '<div class="error-page">Không thể tải trang</div>';
        });
}

// Load page script
function loadPageScript(pageName) {
    // Xóa script cũ
    const existingScript = document.getElementById('page-script');
    if (existingScript) {
        existingScript.remove();
    }

    // Map page name to script file
    const scriptMap = {
        'dashboard': 'dashboard.js',
        'pets-collection': 'pets.js',
        'pet-detail': 'pets.js',
        'streak-detail': 'streak.js',
        'rewards-dashboard': 'rewards.js',
        'reward-detail': 'rewards.js',
        'new-savings-goal': 'new-savings.js',
        'new-savings-pet': 'new-savings.js',
        'new-savings-product': 'new-savings.js'
    };

    const scriptFile = scriptMap[pageName];
    if (scriptFile) {
        const script = document.createElement('script');
        script.id = 'page-script';
        script.src = `js/${scriptFile}`;
        document.body.appendChild(script);
    }
}

// Setup navigation
function setupNavigation() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('[data-page]');
        if (link) {
            e.preventDefault();
            const page = link.dataset.page;
            loadPage(page);
        }
    });
}

// Update active nav
function updateActiveNav(pageName) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });
}

// Update page title
function updatePageTitle(pageName) {
    const titles = {
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

    const titleElement = document.getElementById('page-title');
    if (titleElement) {
        titleElement.textContent = titles[pageName] || 'Savings App';
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export functions to global
window.loadPage = loadPage;
window.showNotification = showNotification;
window.formatCurrency = formatCurrency;
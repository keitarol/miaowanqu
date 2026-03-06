// 页面切换功能
let currentPage = 0;

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a[data-page]');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = parseInt(this.getAttribute('data-page'));
            
            if (targetPage === currentPage) return;
            
            // 更新导航激活状态
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 页面切换动画
            const direction = targetPage > currentPage ? 'right' : 'left';
            const currentPageEl = pages[currentPage];
            const targetPageEl = pages[targetPage];
            
            if (direction === 'right') {
                currentPageEl.classList.add('slide-out-left');
                targetPageEl.style.transform = 'translateX(100%)';
            } else {
                currentPageEl.classList.add('slide-out-left');
                targetPageEl.style.transform = 'translateX(-100%)';
            }
            
            setTimeout(() => {
                currentPageEl.classList.remove('active', 'slide-out-left');
                targetPageEl.classList.add('active');
                targetPageEl.style.transform = 'translateX(0)';
                currentPage = targetPage;
                window.scrollTo(0, 0);
            }, 50);
        });
    });
});

// 回到顶部功能
window.addEventListener('scroll', function() {
    const backTop = document.getElementById('backTop');
    if (backTop) {
        if (window.scrollY > 500) {
            backTop.style.display = 'block';
        } else {
            backTop.style.display = 'none';
        }
    }
});

const backTopBtn = document.getElementById('backTop');
if (backTopBtn) {
    backTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 微信号一键复制功能
document.addEventListener('DOMContentLoaded', function() {
    const wechatElements = document.querySelectorAll('.wechat');
    wechatElements.forEach(el => {
        el.addEventListener('click', function() {
            const wechat = this.textContent.replace(/[^a-zA-Z0-9]/g, '');
            navigator.clipboard.writeText(wechat).then(() => {
                alert('微信号已复制：' + wechat);
            }).catch(err => {
                alert('复制失败，请手动记录：' + wechat);
                console.error('复制失败：', err);
            });
        });
    });
});

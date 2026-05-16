/* ========================================
   喵玩趣 - 交互脚本
   功能：页面切换、滚动动画、弹窗、复制等
   ======================================== */

let currentPage = 0;

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('a[data-page]');
  const pages = document.querySelectorAll('.page');
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav .nav-list');
  const backTop = document.getElementById('backTop');

  /* ---- 页面切换 ---- */
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetPage = parseInt(this.getAttribute('data-page'));
      if (targetPage === currentPage) return;

      // 关闭移动端菜单
      navToggle?.classList.remove('active');
      navList?.classList.remove('open');

      // 更新导航激活状态
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      // 页面切换
      const currentPageEl = pages[currentPage];
      const targetPageEl = pages[targetPage];

      currentPageEl.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease';
      currentPageEl.style.transform = targetPage > currentPage
        ? 'translateX(-40px) scale(0.96)'
        : 'translateX(40px) scale(0.96)';
      currentPageEl.style.opacity = '0';

      setTimeout(() => {
        currentPageEl.classList.remove('active');
        currentPageEl.style.transform = '';
        currentPageEl.style.opacity = '';
        currentPageEl.style.transition = '';

        targetPageEl.classList.add('active');
        currentPage = targetPage;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 400);
    });
  });

  /* ---- 汉堡菜单 ---- */
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navList.classList.toggle('open');
    });

    // 点击导航链接后关闭菜单
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navList.classList.remove('open');
      });
    });

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navToggle.classList.remove('active');
        navList.classList.remove('open');
      }
    });
  }

  /* ---- 导航栏滚动阴影增强 ---- */
  const nav = document.querySelector('.nav');
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScrollY = sy;
  }, { passive: true });

  /* ---- 回到顶部 ---- */
  if (backTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backTop.classList.add('visible');
      } else {
        backTop.classList.remove('visible');
      }
    }, { passive: true });

    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- 滚动入场动画 (Intersection Observer) ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- 微信号一键复制（自定义 Toast） ---- */
  document.querySelectorAll('.wechat').forEach(el => {
    el.addEventListener('click', function () {
      const wechat = this.textContent.replace(/[^a-zA-Z0-9_-]/g, '').trim();
      if (!wechat) return;
      navigator.clipboard.writeText(wechat).then(() => {
        showToast('✅ 微信号已复制：' + wechat, 'success');
      }).catch(() => {
        showToast('⚠️ 复制失败，请手动记录：' + wechat, 'error');
      });
    });
  });
});

/* ---- Toast 通知系统 ---- */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 3000);
}

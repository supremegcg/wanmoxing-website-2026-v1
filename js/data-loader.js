/**
 * 万摩星设计前台数据加载器
 * 从 CMS 后台 API 获取数据，动态渲染到页面
 * 
 * 使用方法：
 * 1. 在 HTML 中引入 <script src="js/data-loader.js"></script>
 * 2. 在需要动态渲染的容器上添加 data-load="portfolio" 等属性
 * 3. 页面加载后自动从 API 获取数据并渲染
 */

(function () {
  'use strict';

  // API 基础地址（CMS 后台）
  // 生产环境：https://wanmoxing-cms.vercel.app
  // 开发环境：http://localhost:3000
  const API_BASE = 'https://wanmoxing-cms.vercel.app';

  // 当前语言
  let currentLang = localStorage.getItem('lang') || 'zh';

  /**
   * 加载作品集数据
   */
  async function loadPortfolio() {
    const container = document.querySelector('[data-load="portfolio"]');
    if (!container) return;

    try {
      const response = await fetch(`${API_BASE}/api/public/portfolio`);
      if (!response.ok) throw new Error('Failed to fetch portfolio');
      
      const items = await response.json();
      
      // 清空现有内容
      container.innerHTML = '';
      
      // 渲染每个作品
      items.forEach((item, index) => {
        const card = createPortfolioCard(item, index);
        container.appendChild(card);
      });

      // 重新初始化筛选功能
      initPortfolioFilter();
      
    } catch (error) {
      console.error('加载作品集失败:', error);
      // 失败时保留原有静态内容
    }
  }

  /**
   * 创建作品卡片元素
   */
  function createPortfolioCard(item, index) {
    const div = document.createElement('div');
    div.className = `portfolio-card scale-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;
    div.dataset.category = item.category;

    const title = currentLang === 'zh' ? item.title : item.titleEn;
    const desc = currentLang === 'zh' ? item.description : item.descriptionEn;
    const categoryLabel = getCategoryLabel(item.category);

    div.innerHTML = `
      <img src="${item.thumbnail}" alt="${title}" loading="lazy">
      <div class="portfolio-card-overlay">
        <span class="label">${categoryLabel}</span>
        <div class="portfolio-card-title">${title}</div>
        <div class="portfolio-card-desc">${desc}</div>
      </div>
    `;

    return div;
  }

  /**
   * 获取分类标签
   */
  function getCategoryLabel(category) {
    const labels = {
      'power-tools': currentLang === 'zh' ? '电动工具' : 'Power Tools',
      'cleaning': currentLang === 'zh' ? '清洁家电' : 'Cleaning Appliances',
      'smart-home': currentLang === 'zh' ? '智能设备' : 'Smart Devices',
    };
    return labels[category] || category;
  }

  /**
   * 初始化作品集筛选功能
   */
  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.portfolio-filter button');
    const cards = document.querySelectorAll('.portfolio-card[data-category]');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const category = this.dataset.filter;
        cards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = '';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

  /**
   * 加载洞察文章列表
   */
  async function loadInsights() {
    const container = document.querySelector('[data-load="insights"]');
    if (!container) return;

    try {
      const response = await fetch(`${API_BASE}/api/public/insights`);
      if (!response.ok) throw new Error('Failed to fetch insights');
      
      const items = await response.json();
      
      // 清空现有内容
      container.innerHTML = '';
      
      // 渲染每篇文章
      items.forEach((item, index) => {
        const card = createInsightCard(item, index);
        container.appendChild(card);
      });

    } catch (error) {
      console.error('加载洞察文章失败:', error);
    }
  }

  /**
   * 创建文章卡片元素
   */
  function createInsightCard(item, index) {
    const div = document.createElement('article');
    div.className = `insight-card fade-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;

    const title = currentLang === 'zh' ? item.title : item.titleEn;
    const excerpt = currentLang === 'zh' ? item.excerpt : item.excerptEn;

    div.innerHTML = `
      <img src="${item.coverImage || 'images/e90817a66889fb58586a43f902c9043e.jpg'}" alt="${title}" loading="lazy">
      <div class="insight-card-content">
        <div class="insight-meta">
          <span class="insight-date">${formatDate(item.publishedAt)}</span>
        </div>
        <h3 class="insight-title">${title}</h3>
        <p class="insight-excerpt">${excerpt}</p>
        <a href="insight-detail.html?id=${item.id}" class="insight-link" data-i18n="read-more">阅读全文 →</a>
      </div>
    `;

    return div;
  }

  /**
   * 格式化日期
   */
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(currentLang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * 加载团队数据
   */
  async function loadTeam() {
    const container = document.querySelector('[data-load="team"]');
    if (!container) return;

    try {
      const response = await fetch(`${API_BASE}/api/public/team`);
      if (!response.ok) throw new Error('Failed to fetch team');
      
      const items = await response.json();
      
      container.innerHTML = '';
      
      items.forEach((item, index) => {
        const card = createTeamCard(item, index);
        container.appendChild(card);
      });

    } catch (error) {
      console.error('加载团队信息失败:', error);
    }
  }

  /**
   * 创建团队成员卡片
   */
  function createTeamCard(item, index) {
    const div = document.createElement('div');
    div.className = `team-card fade-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;

    const name = currentLang === 'zh' ? item.name : item.nameEn;
    const position = currentLang === 'zh' ? item.position : item.positionEn;
    const bio = currentLang === 'zh' ? item.bio : item.bioEn;

    div.innerHTML = `
      <div class="team-photo">
        <img src="${item.photo || 'images/万摩星logo.png'}" alt="${name}" loading="lazy">
      </div>
      <h3 class="team-name">${name}</h3>
      <p class="team-position">${position}</p>
      <p class="team-bio">${bio || ''}</p>
    `;

    return div;
  }

  /**
   * 加载网站设置
   */
  async function loadSettings() {
    try {
      const response = await fetch(`${API_BASE}/api/public/settings`);
      if (!response.ok) return;
      
      const settings = await response.json();
      
      // 更新页面标题和 meta
      if (settings.siteName) {
        document.title = document.title.replace('万摩星设计咨询', settings.siteName);
      }
      
      // 存储到全局变量，供其他脚本使用
      window.siteSettings = settings;

    } catch (error) {
      console.error('加载网站设置失败:', error);
    }
  }

  /**
   * 加载服务列表
   */
  async function loadServices() {
    const container = document.querySelector('[data-load="services"]');
    if (!container) return;

    try {
      const response = await fetch(`${API_BASE}/api/public/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      
      const items = await response.json();
      
      container.innerHTML = '';
      
      items.forEach((item, index) => {
        const card = createServiceCard(item, index);
        container.appendChild(card);
      });

    } catch (error) {
      console.error('加载服务列表失败:', error);
    }
  }

  /**
   * 创建服务卡片
   */
  function createServiceCard(item, index) {
    const div = document.createElement('div');
    div.className = `service-card fade-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;

    const title = currentLang === 'zh' ? item.title : item.titleEn;
    const desc = currentLang === 'zh' ? item.description : item.descriptionEn;

    div.innerHTML = `
      <div class="service-icon">${item.icon || ''}</div>
      <h3 class="service-title">${title}</h3>
      <p class="service-desc">${desc}</p>
    `;

    return div;
  }

  /**
   * 初始化数据加载器
   */
  function init() {
    // 监听语言切换
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const newLang = this.dataset.lang;
        if (newLang !== currentLang) {
          currentLang = newLang;
          localStorage.setItem('lang', newLang);
          // 重新加载数据
          loadAll();
        }
      });
    });

    // 首次加载
    loadAll();
  }

  /**
   * 加载所有数据
   */
  function loadAll() {
    loadSettings();
    loadPortfolio();
    loadInsights();
    loadTeam();
    loadServices();
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

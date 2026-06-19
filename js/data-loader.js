/**
 * 万摩星设计前台数据加载器
 * 从 CMS 后台 API 获取数据，动态渲染到页面
 */

(function () {
  'use strict';

  const API_BASE = 'https://wanmoxing-cms.vercel.app';
  let currentLang = localStorage.getItem('lang') || 'zh';

  /**
   * 修正图片路径：将中文子目录路径映射到根目录
   * Vercel 静态部署对中文目录名支持不佳，根目录已有同名图片
   */
  function fixImagePath(url) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    var parts = url.split('/');
    var filename = parts[parts.length - 1];
    if (url.indexOf('images/') === 0 || url.indexOf('/images/') >= 0) {
      return 'images/' + filename;
    }
    return url;
  }

  async function loadPortfolio() {
    const container = document.querySelector('[data-load="portfolio"]');
    if (!container) return;

    try {
      const response = await fetch(`${API_BASE}/api/public/portfolio`);
      if (!response.ok) throw new Error('Failed to fetch portfolio');
      const items = await response.json();

      container.innerHTML = '';

      items.forEach((item, index) => {
        const card = createPortfolioCard(item, index);
        container.appendChild(card);
      });

      initPortfolioFilter();
    } catch (error) {
      console.error('加载作品集失败:', error);
    }
  }

  function createPortfolioCard(item, index) {
    const div = document.createElement('div');
    div.className = `portfolio-card scale-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;
    div.dataset.category = item.category;

    const title = currentLang === 'zh' ? (item.nameZh || item.name) : (item.nameEn || item.name);
    const desc = currentLang === 'zh' ? (item.descriptionZh || item.description || '') : (item.descriptionEn || item.description || '');
    const categoryLabel = getCategoryLabel(item.category);
    const img = fixImagePath(item.coverImage || item.thumbnail || '');

    div.innerHTML = `
      <img src="${img}" alt="${title}" loading="lazy" onerror="this.style.display='none'">
      <div class="portfolio-card-overlay">
        <span class="label">${categoryLabel}</span>
        <div class="portfolio-card-title">${title}</div>
        <div class="portfolio-card-desc">${desc}</div>
      </div>
    `;

    return div;
  }

  function getCategoryLabel(category) {
    const labels = {
      'power-tools': currentLang === 'zh' ? '电动工具' : 'Power Tools',
      'POWER_TOOL': currentLang === 'zh' ? '电动工具' : 'Power Tools',
      'cleaning': currentLang === 'zh' ? '清洁家电' : 'Cleaning Appliances',
      'CLEANING_APPLIANCE': currentLang === 'zh' ? '清洁家电' : 'Cleaning Appliances',
      'smart-home': currentLang === 'zh' ? '智能设备' : 'Smart Devices',
      'SMART_DEVICE': currentLang === 'zh' ? '智能设备' : 'Smart Devices',
    };
    return labels[category] || category;
  }

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

  async function loadInsights() {
    const container = document.querySelector('[data-load="insights"]');
    if (!container) return;

    try {
      const response = await fetch(`${API_BASE}/api/public/insights`);
      if (!response.ok) throw new Error('Failed to fetch insights');
      const items = await response.json();

      container.innerHTML = '';

      items.forEach((item, index) => {
        const card = createInsightCard(item, index);
        container.appendChild(card);
      });
    } catch (error) {
      console.error('加载洞察文章失败:', error);
    }
  }

  function createInsightCard(item, index) {
    const div = document.createElement('article');
    div.className = `insight-card fade-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;

    const title = currentLang === 'zh' ? (item.titleZh || item.title) : (item.titleEn || item.title);
    const excerpt = currentLang === 'zh' ? (item.excerptZh || item.excerpt || '') : (item.excerptEn || item.excerpt || '');

    div.innerHTML = `
      <img src="${fixImagePath(item.coverImage) || 'images/e90817a66889fb58586a43f902c9043e.jpg'}" alt="${title}" loading="lazy">
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

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(currentLang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

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

  function createTeamCard(item, index) {
    const div = document.createElement('div');
    div.className = `team-card fade-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;

    const name = currentLang === 'zh' ? (item.nameZh || item.name) : (item.nameEn || item.name);
    const position = currentLang === 'zh' ? (item.positionZh || item.position) : (item.positionEn || item.position);
    const bio = currentLang === 'zh' ? (item.bioZh || item.bio || '') : (item.bioEn || item.bio || '');

    div.innerHTML = `
      <div class="team-photo">
        <img src="${fixImagePath(item.photo || item.avatar) || 'images/万摩星logo.png'}" alt="${name}" loading="lazy">
      </div>
      <h3 class="team-name">${name}</h3>
      <p class="team-position">${position}</p>
      <p class="team-bio">${bio}</p>
    `;

    return div;
  }

  async function loadSettings() {
    try {
      const response = await fetch(`${API_BASE}/api/public/settings`);
      if (!response.ok) return;
      const settings = await response.json();
      if (settings.siteName) {
        document.title = document.title.replace('万摩星设计咨询', settings.siteName);
      }
      window.siteSettings = settings;
    } catch (error) {
      console.error('加载网站设置失败:', error);
    }
  }

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

  function createServiceCard(item, index) {
    const div = document.createElement('div');
    div.className = `service-card fade-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;

    const title = currentLang === 'zh' ? (item.titleZh || item.title) : (item.titleEn || item.title);
    const desc = currentLang === 'zh' ? (item.descriptionZh || item.description || '') : (item.descriptionEn || item.description || '');

    div.innerHTML = `
      <div class="service-icon">${item.icon || ''}</div>
      <h3 class="service-title">${title}</h3>
      <p class="service-desc">${desc}</p>
    `;

    return div;
  }

  function init() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const newLang = this.dataset.lang;
        if (newLang !== currentLang) {
          currentLang = newLang;
          localStorage.setItem('lang', newLang);
          loadAll();
        }
      });
    });
    loadAll();
  }

  function loadAll() {
    loadSettings();
    loadPortfolio();
    loadInsights();
    loadTeam();
    loadServices();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

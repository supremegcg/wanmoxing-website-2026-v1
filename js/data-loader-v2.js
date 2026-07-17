/**
 * 万摩星设计前台数据加载器
 * 从 CMS 后台 API 获取数据，动态渲染到页面
 */

(function () {
  'use strict';

  const API_BASE = window.OMT_API_BASE || 'https://wanmoxing-cms.vercel.app';
  function getCurrentLang() {
    return localStorage.getItem('omt-lang') || localStorage.getItem('lang') || 'zh';
  }

  let currentLang = getCurrentLang();
  const FEATURED_INSIGHT_TITLE_ZH = '电动工具设计的人机工程学：如何让专业工具更易用';

  /**
   * 修正图片路径：将中文子目录路径映射到根目录
   * Vercel 静态部署对中文目录名支持不佳，根目录已有同名图片
   */
  function fixImagePath(url) {
    if (!url) return '';

    try {
      var parsed = new URL(url, window.location.href);
      var pathname = decodeURIComponent(parsed.pathname || '');
      var filename = pathname.split('/').pop();
      if (parsed.hostname === 'onemorething.com.cn' && pathname.indexOf('/images/') >= 0 && filename) {
        return 'images/' + filename;
      }
    } catch (error) {
      // Fall through to relative path handling.
    }

    var parts = url.split('/');
    var filename = parts[parts.length - 1];
    if (url.indexOf('images/') === 0 || url.indexOf('/images/') >= 0) return 'images/' + filename;
    return url;
  }

  function normalizeCategory(category) {
    const map = {
      'POWER_TOOL': 'power-tools',
      'power-tool': 'power-tools',
      'power_tools': 'power-tools',
      'power-tools': 'power-tools',
      'CLEANING_APPLIANCE': 'cleaning',
      'cleaning-appliance': 'cleaning',
      'cleaning_appliance': 'cleaning',
      'cleaning': 'cleaning',
      'SMART_DEVICE': 'smart-home',
      'smart-device': 'smart-home',
      'smart_device': 'smart-home',
      'smart-home': 'smart-home',
    };
    return map[category] || category || '';
  }

  function revealDynamicContent(container) {
    if (container.matches && container.matches('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4, .slide-left, .scale-in')) {
      container.classList.add('visible');
    }
    const animated = container.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4, .slide-left, .scale-in');
    animated.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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
      revealDynamicContent(container);

      initPortfolioFilter();
    } catch (error) {
      console.error('加载作品集失败:', error);
    }
  }

  function createPortfolioCard(item, index) {
    const div = document.createElement('div');
    div.className = `portfolio-card scale-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;
    div.dataset.category = normalizeCategory(item.category);

    const title = currentLang === 'zh' ? (item.nameZh || item.name) : (item.nameEn || item.name);
    const desc = currentLang === 'zh' ? (item.descriptionZh || item.description || '') : (item.descriptionEn || item.description || '');
    const categoryLabel = getCategoryLabel(item.category);
    const img = fixImagePath(item.coverImage || item.thumbnail || '');

    div.innerHTML = `
      <img src="${img}" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='images/万摩星logo.png';this.classList.add('image-fallback')">
      <div class="portfolio-card-overlay">
        <span class="label">${categoryLabel}</span>
        <div class="portfolio-card-title">${title}</div>
        <div class="portfolio-card-desc">${desc}</div>
      </div>
    `;

    div.style.cursor = 'pointer';
    div.addEventListener('click', function () {
      window.location.href = 'portfolio-detail.html?id=' + encodeURIComponent(item.id);
    });

    return div;
  }

  function getCategoryLabel(category) {
    category = normalizeCategory(category);
    const labels = {
      'power-tools': currentLang === 'zh' ? '电动工具' : 'Power Tools',
      'cleaning': currentLang === 'zh' ? '清洁家电' : 'Cleaning Appliances',
      'smart-home': currentLang === 'zh' ? '智能设备' : 'Smart Devices',
    };
    return labels[category] || category;
  }

  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.portfolio-filter button');
    const cards = document.querySelectorAll('.portfolio-card[data-category]');

    filterBtns.forEach(btn => {
      btn.onclick = function () {
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
      };
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
      revealDynamicContent(container);
    } catch (error) {
      console.error('加载洞察文章失败:', error);
    }
  }

  async function loadFeaturedInsight() {
    const container = document.querySelector('[data-load="featured-insight"]');
    if (!container) return;

    try {
      const response = await fetch(`${API_BASE}/api/public/insights`);
      if (!response.ok) throw new Error('Failed to fetch featured insight');
      const items = await response.json();
      if (!Array.isArray(items) || !items.length) return;

      const item = pickFeaturedInsight(items);
      if (!item) return;

      renderFeaturedInsight(container, item);
    } catch (error) {
      console.error('加载精选洞察失败:', error);
    }
  }

  function pickFeaturedInsight(items) {
    return items.find(function (item) {
      return item.titleZh === FEATURED_INSIGHT_TITLE_ZH || item.title === FEATURED_INSIGHT_TITLE_ZH;
    }) || items.find(function (item) {
      return Number(item.sortOrder) === 1;
    }) || items[0];
  }

  function renderFeaturedInsight(container, item) {
    const title = escapeHTML(currentLang === 'zh' ? (item.titleZh || item.title) : (item.titleEn || item.title));
    const excerpt = escapeHTML(currentLang === 'zh' ? (item.excerptZh || item.excerpt || '') : (item.excerptEn || item.excerpt || ''));
    const tags = Array.isArray(item.tags) ? item.tags.slice(0, 3) : [];
    const cover = fixImagePath(item.coverImage) || 'images/15.png';

    container.setAttribute('href', 'insight-detail.html?id=' + encodeURIComponent(item.id));
    container.innerHTML = `
      <div class="insights-featured-img">
        <img src="${cover}" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='images/15.png';this.classList.add('image-fallback')">
      </div>
      <div class="insights-featured-content">
        <span class="label">${currentLang === 'zh' ? '深度长文' : 'Feature'}</span>
        <h2>${title}</h2>
        <p>${excerpt}</p>
        <div class="insight-date-row">${formatDate(item.publishedAt)}</div>
        ${tags.length ? '<div class="insights-tags">' + tags.map(function (tag) {
          return '<span class="ins-tag">' + escapeHTML(tag) + '</span>';
        }).join('') + '</div>' : ''}
      </div>
    `;
    revealDynamicContent(container.parentElement || container);
  }

  function createInsightCard(item, index) {
    const div = document.createElement('article');
    div.className = `insight-card fade-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;
    div.tabIndex = 0;
    div.setAttribute('role', 'link');

    const title = currentLang === 'zh' ? (item.titleZh || item.title) : (item.titleEn || item.title);
    const excerpt = currentLang === 'zh' ? (item.excerptZh || item.excerpt || '') : (item.excerptEn || item.excerpt || '');
    const detailUrl = 'insight-detail.html?id=' + encodeURIComponent(item.id);

    div.innerHTML = `
      <img src="${fixImagePath(item.coverImage) || 'images/万摩星logo.png'}" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='images/万摩星logo.png';this.classList.add('image-fallback')">
      <div class="insight-card-content">
        <div class="insight-meta">
          <span class="insight-date">${formatDate(item.publishedAt)}</span>
        </div>
        <h3 class="insight-title">${title}</h3>
        <p class="insight-excerpt">${excerpt}</p>
        <a href="${detailUrl}" class="insight-link" data-i18n="read-more">阅读全文 →</a>
      </div>
    `;

    div.addEventListener('click', function (event) {
      if (event.target.closest('a')) return;
      window.location.href = detailUrl;
    });

    div.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.location.href = detailUrl;
      }
    });

    return div;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return '';
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
      revealDynamicContent(container);
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
        <img src="${fixImagePath(item.avatar) || 'images/万摩星logo.png'}" alt="${name}" loading="lazy" onerror="this.onerror=null;this.src='images/万摩星logo.png';this.classList.add('image-fallback')">
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
      revealDynamicContent(container);
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
      <div class="service-card-number">${item.icon || ''}</div>
      <div class="service-card-title">${title}</div>
      <div class="service-card-desc">${desc}</div>
    `;

    return div;
  }

  function init() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const newLang = this.dataset.lang;
        if (newLang !== currentLang) {
          currentLang = newLang;
          localStorage.setItem('omt-lang', newLang);
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
    loadFeaturedInsight();
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

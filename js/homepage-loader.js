/**
 * 万摩星设计首页数据加载器
 * 从 CMS 后台 API 获取数据，动态渲染首页精选内容
 */

(function () {
  'use strict';

  const API_BASE = window.OMT_API_BASE || '';
  let currentLang = localStorage.getItem('omt-lang') || localStorage.getItem('lang') || 'zh';
  let portfolioItems = [];

  /**
   * 修正图片路径
   */
  function fixImagePath(url) {
    if (!url) return '';
    if (url.startsWith('images/clients/')) return url;
    if (url.startsWith('/images/clients/')) return url.slice(1);
    try {
      const parsed = new URL(url, window.location.href);
      const pathname = decodeURIComponent(parsed.pathname || '');
      if (parsed.hostname.indexOf('blob.vercel-storage.com') >= 0) return '/api/blob/' + pathname.replace(/^\/+/, '');
      const filename = pathname.split('/').pop() || '';
      if (parsed.pathname.includes('/images/clients/')) {
        return 'images/clients/' + filename;
      }
      if (parsed.hostname.includes('onemorething.com.cn') && parsed.pathname.includes('/images/') && filename) {
        return 'images/' + filename;
      }
      if (url.startsWith('http')) return url;
    } catch (error) {
      // Fall back to filename extraction below.
    }
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename ? 'images/' + filename : '';
  }

  function normalizeCategory(category) {
    const map = {
      POWER_TOOL: 'power-tools',
      POWER_TOOLS: 'power-tools',
      power_tool: 'power-tools',
      CLEANING_APPLIANCE: 'cleaning',
      CLEANING: 'cleaning',
      cleaning_appliance: 'cleaning',
      SMART_DEVICE: 'smart-home',
      SMART_HOME: 'smart-home',
      smart_device: 'smart-home',
    };
    return map[category] || category || 'power-tools';
  }

  function revealDynamicContent(container) {
    const animated = container.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4, .slide-left, .scale-in');
    animated.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  function applyStat(selector, value, suffix) {
    var el = document.querySelector(selector);
    var numericValue = Number(value);
    if (!el || !Number.isFinite(numericValue)) return;

    var cleanValue = Math.max(0, Math.floor(numericValue));
    var cleanSuffix = suffix == null ? '' : String(suffix).slice(0, 4);
    el.dataset.target = String(cleanValue);
    el.dataset.suffix = cleanSuffix;

    if (el.textContent && el.textContent !== '0') {
      el.textContent = cleanValue + cleanSuffix;
    }
  }

  async function loadSettings() {
    try {
      const response = await fetch(`${API_BASE}/api/public/settings`);
      if (!response.ok) return;

      const settings = await response.json();
      applyStat('[data-stat-key="projects"]', settings.statProjectsValue, settings.statProjectsSuffix);
      applyStat('[data-stat-key="years"]', settings.statYearsValue, settings.statYearsSuffix);
      applyStat('[data-stat-key="brands"]', settings.statBrandsValue, settings.statBrandsSuffix);
      applyStat('[data-stat-key="satisfaction"]', settings.statSatisfactionValue, settings.statSatisfactionSuffix);
    } catch (error) {
      console.error('加载首页数字失败:', error);
    }
  }

  function createClientLogoItem(item) {
    const wrapper = document.createElement(item.websiteUrl ? 'a' : 'div');
    wrapper.className = 'partner-item';
    if (item.websiteUrl) {
      wrapper.href = item.websiteUrl;
      wrapper.target = '_blank';
      wrapper.rel = 'noopener noreferrer';
    }

    const img = document.createElement('img');
    img.src = fixImagePath(item.logoUrl);
    img.alt = item.name || 'Client logo';
    img.loading = 'lazy';
    img.onerror = function () {
      wrapper.textContent = item.name || 'CLIENT';
      wrapper.classList.add('partner-item-text');
    };
    wrapper.appendChild(img);
    return wrapper;
  }

  async function loadClientLogos() {
    const container = document.querySelector('[data-load="client-logos"]');
    if (!container) return;

    try {
      const response = await fetch(`${API_BASE}/api/public/client-logos`);
      if (!response.ok) return;

      const items = await response.json();
      if (!Array.isArray(items) || !items.length) return;

      container.innerHTML = '';
      items.forEach(function (item) {
        if (item.logoUrl) container.appendChild(createClientLogoItem(item));
      });
      revealDynamicContent(container);
    } catch (error) {
      console.error('加载客户 Logo 失败:', error);
    }
  }

  function pickBalancedFeatured(items, limit) {
    const source = items.filter(function (item) {
      return item.coverImage || item.thumbnail;
    });
    const candidates = source.length ? source : items;
    const categories = ['power-tools', 'cleaning', 'smart-home'];
    const selected = [];
    const used = new Set();

    categories.forEach(function (category) {
      const matches = candidates.filter(function (item) {
        return normalizeCategory(item.category) === category;
      });
      matches.slice(0, 2).forEach(function (item) {
        if (selected.length < limit && !used.has(item.id)) {
          selected.push(item);
          used.add(item.id);
        }
      });
    });

    candidates.forEach(function (item) {
      if (selected.length < limit && !used.has(item.id)) {
        selected.push(item);
        used.add(item.id);
      }
    });

    return selected;
  }

  function pickCategoryFeatured(items, category, limit) {
    const normalizedCategory = normalizeCategory(category);
    const matches = items.filter(function (item) {
      return normalizeCategory(item.category) === normalizedCategory;
    });
    const withImages = matches.filter(function (item) {
      return item.coverImage || item.thumbnail;
    });
    return (withImages.length ? withImages : matches).slice(0, limit);
  }

  function renderFeaturedPortfolio(container, items) {
    container.innerHTML = '';

    items.forEach(function (item, index) {
      const card = createFeaturedCard(item, index);
      container.appendChild(card);
    });
    revealDynamicContent(container);
  }

  function updateFilterAvailability(items) {
    const filterBtns = document.querySelectorAll('.portfolio-filter button');
    filterBtns.forEach(function (btn) {
      const filter = btn.dataset.filter;
      const hasItems = filter === 'all' || pickCategoryFeatured(items, filter, 1).length > 0;
      btn.disabled = !hasItems;
      btn.classList.toggle('is-disabled', !hasItems);
      if (!hasItems && btn.classList.contains('active')) {
        const allBtn = document.querySelector('.portfolio-filter button[data-filter="all"]');
        if (allBtn) allBtn.click();
      }
    });
  }

  /**
   * 加载首页精选案例（最多6个）
   */
  async function loadFeaturedPortfolio() {
    const container = document.querySelector('[data-load="featured-portfolio"]');
    if (!container) return;

    try {
      const response = await fetch(`${API_BASE}/api/public/portfolio`);
      if (!response.ok) throw new Error('Failed to fetch portfolio');
      
      const items = await response.json();
      portfolioItems = items;
      const featured = pickBalancedFeatured(items, 6);
      if (!featured.length) return;

      renderFeaturedPortfolio(container, featured);
      updateFilterAvailability(items);

      // 重新初始化筛选功能
      initPortfolioFilter();
      
    } catch (error) {
      console.error('加载精选案例失败:', error);
    }
  }

  /**
   * 创建首页案例卡片
   */
  function createFeaturedCard(item, index) {
    const div = document.createElement('div');
    div.className = `portfolio-card scale-in${index > 0 ? ' fade-in-delay-' + (index % 3) : ''}`;
    div.dataset.category = normalizeCategory(item.category);

    const title = currentLang === 'zh' ? (item.nameZh || item.name) : (item.nameEn || item.name);
    const desc = currentLang === 'zh' ? (item.descriptionZh || item.description || '') : (item.descriptionEn || item.description || '');
    const categoryLabel = getCategoryLabel(div.dataset.category);
    const img = fixImagePath(item.coverImage || item.thumbnail || '');

    div.innerHTML = `
      <img src="${img || 'images/万摩星logo.png'}" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='images/万摩星logo.png';this.classList.add('image-fallback')">
      <div class="portfolio-card-overlay">
        <span class="label">${categoryLabel}</span>
        <div class="portfolio-card-title">${title}</div>
        <div class="portfolio-card-desc">${desc}</div>
      </div>
    `;

    div.style.cursor = 'pointer';
    div.addEventListener('click', function () {
      window.location.href = item.id ? `portfolio-detail.html?id=${encodeURIComponent(item.id)}` : 'portfolio.html';
    });

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
    return labels[category] || category || '';
  }

  /**
   * 初始化作品集筛选功能（首页简化版）
   */
  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.portfolio-filter button');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.onclick = function () {
        if (this.disabled) return;
        const filter = this.dataset.filter;
        
        // 更新按钮状态
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const container = document.querySelector('[data-load="featured-portfolio"]');
        if (!container) return;

        const items = filter === 'all' ? pickBalancedFeatured(portfolioItems, 6) : pickCategoryFeatured(portfolioItems, filter, 6);
        renderFeaturedPortfolio(container, items);
      };
    });
  }

  /**
   * 加载首页服务预览
   */
  async function loadServicesPreview() {
    const container = document.querySelector('[data-load="services-preview"]');
    if (!container) return;

    try {
      const response = await fetch(`${API_BASE}/api/public/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      
      const items = await response.json();
      if (!items.length) return;
      
      container.innerHTML = '';
      
      items.forEach((item, index) => {
        const card = createServicePreviewCard(item, index);
        container.appendChild(card);
      });
      revealDynamicContent(container);
      
    } catch (error) {
      console.error('加载服务预览失败:', error);
    }
  }

  /**
   * 创建服务预览卡片
   */
  function createServicePreviewCard(item, index) {
    const div = document.createElement('div');
    div.className = `service-card fade-in${index > 0 ? ' fade-in-delay-' + (index % 4) : ''}`;

    const title = currentLang === 'zh' ? (item.titleZh || item.title) : (item.titleEn || item.title);
    const desc = currentLang === 'zh' ? (item.descriptionZh || item.description || '') : (item.descriptionEn || item.description || '');

    div.innerHTML = `
      <div class="service-card-number">${String(index + 1).padStart(2, '0')}</div>
      <div class="service-icon">${item.icon || ''}</div>
      <div class="service-card-title">${title}</div>
      <div class="service-card-desc">${desc}</div>
    `;

    return div;
  }

  /**
   * 初始化
   */
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
  }

  function loadAll() {
    loadSettings();
    loadFeaturedPortfolio();
    loadServicesPreview();
    loadClientLogos();
  }

  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      loadAll();
    });
  } else {
    init();
    loadAll();
  }
})();

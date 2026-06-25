/**
 * 万摩星设计首页数据加载器
 * 从 CMS 后台 API 获取数据，动态渲染首页精选内容
 */

(function () {
  'use strict';

  const API_BASE = window.OMT_API_BASE || 'https://wanmoxing-cms.vercel.app';
  let currentLang = localStorage.getItem('omt-lang') || localStorage.getItem('lang') || 'zh';

  /**
   * 修正图片路径
   */
  function fixImagePath(url) {
    if (!url) return '';
    try {
      const parsed = new URL(url, window.location.href);
      const filename = decodeURIComponent(parsed.pathname.split('/').pop() || '');
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
      const featured = items.slice(0, 6); // 只取前6个
      if (!featured.length) return;
      
      container.innerHTML = '';
      
      featured.forEach((item, index) => {
        const card = createFeaturedCard(item, index);
        container.appendChild(card);
      });

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
      btn.addEventListener('click', function () {
        const filter = this.dataset.filter;
        
        // 更新按钮状态
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // 筛选卡片
        const cards = document.querySelectorAll('[data-load="featured-portfolio"] .portfolio-card');
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
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
    loadFeaturedPortfolio();
    loadServicesPreview();
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

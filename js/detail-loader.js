(function () {
  'use strict';

  const API_BASE = window.OMT_API_BASE || '';
  function getCurrentLang() {
    return localStorage.getItem('omt-lang') || localStorage.getItem('lang') || 'zh';
  }

  let currentLang = getCurrentLang();

  function fixImagePath(url) {
    if (!url) return '';

    try {
      var parsed = new URL(url, window.location.href);
      var pathname = decodeURIComponent(parsed.pathname || '');
      if (parsed.hostname.indexOf('blob.vercel-storage.com') >= 0) return '/api/blob/' + pathname.replace(/^\/+/, '');
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

  function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
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

  async function loadPortfolioDetail() {
    const container = document.querySelector('[data-load="portfolio-detail"]');
    if (!container) return;

    const id = getParam('id');
    if (!id) {
      container.innerHTML = '<p>缺少项目 ID</p>';
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/public/portfolio/${id}`);
      if (!response.ok) throw new Error('Failed to fetch portfolio detail');
      const item = await response.json();

      const title = currentLang === 'zh' ? (item.nameZh || item.name) : (item.nameEn || item.name);
      const desc = currentLang === 'zh' ? (item.descriptionZh || item.description || '') : (item.descriptionEn || item.description || '');
      const content = currentLang === 'zh' ? (item.contentZh || '') : (item.contentEn || '');
      const categoryLabel = getCategoryLabel(item.category);

      let html = `
        <div class="detail-header">
          <span class="section-label">${categoryLabel}</span>
          <h1>${title}</h1>
          <p class="detail-desc">${desc}</p>
        </div>
        <div class="detail-cover">
          <img src="${fixImagePath(item.coverImage)}" alt="${title}" loading="eager" onerror="this.onerror=null;this.src='images/万摩星logo.png';this.classList.add('image-fallback')">
        </div>
      `;

      if (content) {
        html += `<div class="detail-content">${content}</div>`;
      }

      if (item.images && item.images.length > 0) {
        html += '<div class="detail-gallery">';
        item.images.forEach(function (img) {
          html += `<img src="${fixImagePath(img)}" alt="${title}" loading="lazy" onerror="this.onerror=null;this.src='images/万摩星logo.png';this.classList.add('image-fallback')">`;
        });
        html += '</div>';
      }

      html += `
        <div class="detail-back">
          <a href="portfolio.html" class="btn-primary">← 返回作品集</a>
        </div>
      `;

      container.innerHTML = html;
      document.title = title + ' — 万摩星设计咨询';
    } catch (error) {
      console.error('加载项目详情失败:', error);
      container.innerHTML = '<p>加载失败，请稍后重试。</p>';
    }
  }

  async function loadInsightDetail() {
    const container = document.querySelector('[data-load="insight-detail"]');
    if (!container) return;

    const id = getParam('id');
    if (!id) {
      container.innerHTML = '<p>缺少文章 ID</p>';
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/public/insights/${id}`);
      if (!response.ok) throw new Error('Failed to fetch insight detail');
      const item = await response.json();

      const title = currentLang === 'zh' ? (item.titleZh || item.title) : (item.titleEn || item.title);
      const content = currentLang === 'zh' ? (item.contentZh || item.content || '') : (item.contentEn || item.content || '');

      let html = `
        <div class="detail-header">
          <span class="section-label">${formatDate(item.publishedAt)}</span>
          <h1>${title}</h1>
        </div>
      `;

      if (item.coverImage) {
        html += `
          <div class="detail-cover">
            <img src="${fixImagePath(item.coverImage)}" alt="${title}" loading="eager" onerror="this.onerror=null;this.src='images/万摩星logo.png';this.classList.add('image-fallback')">
          </div>
        `;
      }

      html += `
        <div class="detail-content article">${content}</div>
        <div class="detail-back">
          <a href="insights.html" class="btn-primary">← 返回洞察</a>
        </div>
      `;

      container.innerHTML = html;
      document.title = title + ' — 万摩星设计咨询';
    } catch (error) {
      console.error('加载文章详情失败:', error);
      container.innerHTML = '<p>加载失败，请稍后重试。</p>';
    }
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

  function init() {
    loadPortfolioDetail();
    loadInsightDetail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

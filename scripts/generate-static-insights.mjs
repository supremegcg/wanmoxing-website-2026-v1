import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ORIGIN = 'https://www.onemorething.com.cn';
const API_URL = process.env.OMT_INSIGHTS_API || `${SITE_ORIGIN}/api/public/insights`;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'insights');
const DATA_DIR = path.join(ROOT, 'data');
const FALLBACK_IMAGE = '../images/万摩星logo.png';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripHtml(value) {
  return String(value ?? '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function safeDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Shanghai'
  });
}

function normalizeImageUrl(url, relative = false) {
  if (!url) return relative ? FALLBACK_IMAGE : '/images/万摩星logo.png';
  try {
    const parsed = new URL(url, SITE_ORIGIN);
    const decodedPath = decodeURIComponent(parsed.pathname || '');
    if (parsed.hostname.includes('blob.vercel-storage.com')) {
      return `/api/blob/${decodedPath.replace(/^\/+/, '')}`;
    }
    if (parsed.hostname === 'onemorething.com.cn' || parsed.hostname === 'www.onemorething.com.cn') {
      if (decodedPath.startsWith('/images/')) {
        return relative ? `..${decodedPath}` : decodedPath;
      }
      return decodedPath || url;
    }
  } catch {
    // Keep local relative paths below.
  }

  if (url.startsWith('images/')) return relative ? `../${url}` : `/${url}`;
  if (url.startsWith('/images/')) return relative ? `..${url}` : url;
  return url;
}

function normalizeContentImages(content) {
  return String(content || '').replace(/(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi, (_, before, src, after) => {
    return `${before}${escapeHtml(normalizeImageUrl(src, true))}${after}`;
  });
}

function articleUrl(id) {
  return `insights/${encodeURIComponent(id)}.html`;
}

function makeCard(item, index) {
  const title = item.titleZh || item.title || '设计洞察';
  const excerpt = item.excerptZh || item.excerpt || stripHtml(item.contentZh || item.content).slice(0, 120);
  const img = normalizeImageUrl(item.coverImage);
  const tags = Array.isArray(item.tags) ? item.tags.slice(0, 2) : [];
  return `
        <article class="insight-card fade-in${index > 0 ? ` fade-in-delay-${index % 4}` : ''}" tabindex="0" role="link" data-static-insight-card data-href="${articleUrl(item.id)}">
          <img src="${escapeHtml(img)}" alt="${escapeHtml(title)}" loading="lazy" onerror="this.onerror=null;this.src='images/万摩星logo.png';this.classList.add('image-fallback')">
          <div class="insight-card-content">
            <div class="insight-meta">
              <span class="insight-date">${escapeHtml(safeDate(item.publishedAt || item.createdAt))}</span>
            </div>
            <h3 class="insight-title">${escapeHtml(title)}</h3>
            <p class="insight-excerpt">${escapeHtml(excerpt)}</p>
            ${tags.length ? `<div class="insights-tags" style="margin-top:1rem;">${tags.map((tag) => `<span class="ins-tag">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
            <a href="${articleUrl(item.id)}" class="insight-link" data-i18n="read-more">阅读全文 →</a>
          </div>
        </article>`;
}

function makeFeatured(item) {
  const title = item.titleZh || item.title || '设计洞察';
  const excerpt = item.excerptZh || item.excerpt || stripHtml(item.contentZh || item.content).slice(0, 180);
  const img = normalizeImageUrl(item.coverImage);
  const tags = Array.isArray(item.tags) ? item.tags.slice(0, 3) : [];
  return `<a class="insights-featured fade-in" data-load="featured-insight" href="${articleUrl(item.id)}">
        <div class="insights-featured-img">
          <img src="${escapeHtml(img)}" alt="${escapeHtml(title)}" style="width:100%;height:100%;object-fit:cover;" onerror="this.onerror=null;this.src='images/万摩星logo.png';this.classList.add('image-fallback')">
        </div>
        <div class="insights-featured-content">
          <span class="label" data-i18n="ins-feat-label">深度长文</span>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(excerpt)}</p>
          <div style="margin-top:1.5rem;">${escapeHtml(safeDate(item.publishedAt || item.createdAt))}</div>
          ${tags.length ? `<div class="insights-tags" style="margin-top:1rem;">${tags.map((tag) => `<span class="ins-tag">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
        </div>
      </a>`;
}

async function updateInsightsIndex(items) {
  const file = path.join(ROOT, 'insights.html');
  let html = await fs.readFile(file, 'utf8');
  const featured = items.find((item) => Number(item.sortOrder) === 1) || items[0];
  const cards = items.map(makeCard).join('\n');

  if (featured) {
    const featuredStart = html.indexOf('      <a class="insights-featured fade-in" data-load="featured-insight"');
    const featuredEndLine = featuredStart >= 0 ? html.indexOf('\n      </a>', featuredStart) : -1;
    if (featuredStart >= 0 && featuredEndLine >= 0) {
      const featuredEnd = featuredEndLine + '\n      </a>'.length;
      html = html.slice(0, featuredStart) + '      ' + makeFeatured(featured) + html.slice(featuredEnd);
    }
  }

  const gridStart = html.indexOf('      <div class="grid-3" style="margin-top:3rem;" data-load="insights">');
  const gridEnd = gridStart >= 0 ? html.indexOf('      <div style="text-align:center;margin-top:4rem;"', gridStart) : -1;
  if (gridStart >= 0 && gridEnd >= 0) {
    html = html.slice(0, gridStart) + `      <div class="grid-3" style="margin-top:3rem;" data-load="insights">\n${cards}\n      </div>` + html.slice(gridEnd);
  }

  await fs.writeFile(file, html, 'utf8');
}
function pageShell(item) {
  const title = item.titleZh || item.title || '设计洞察';
  const content = normalizeContentImages(item.contentZh || item.content || `<p>${escapeHtml(item.excerptZh || item.excerpt || '')}</p>`);
  const description = (item.excerptZh || item.excerpt || stripHtml(content)).slice(0, 160);
  const cover = normalizeImageUrl(item.coverImage, true);
  const canonical = `${SITE_ORIGIN}/${articleUrl(item.id)}`;
  const tags = Array.isArray(item.tags) ? item.tags : [];

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} — 万摩星设计咨询</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE_ORIGIN}${normalizeImageUrl(item.coverImage)}">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" href="../images/万摩星logo.png" type="image/png">
  <style>
    .detail-header { text-align: center; padding: 4rem 0 2rem; }
    .detail-header h1 { font-size: 2.5rem; margin-top: 1rem; }
    .detail-cover { max-width: 1100px; margin: 0 auto 3rem; }
    .detail-cover img { width: 100%; border-radius: 12px; }
    .detail-content { max-width: 800px; margin: 0 auto 3rem; font-size: 1.05rem; line-height: 1.8; color: #ccc; }
    .detail-content h2, .detail-content h3 { color: #fff; margin-top: 2rem; }
    .detail-content p { margin-bottom: 1rem; }
    .detail-content img { max-width: 100%; height: auto; border-radius: 8px; }
    .detail-back { text-align: center; padding: 2rem 0 4rem; }
  </style>
</head>
<body>
  <nav class="nav">
    <a href="../index.html" class="nav-logo"><img src="../images/万摩星logo.png" alt="万摩星" style="height:100px;width:auto;"></a>
    <div class="nav-links">
      <a href="../index.html">首页</a>
      <a href="../about.html">关于我们</a>
      <a href="../services.html">服务</a>
      <a href="../portfolio.html">项目案例</a>
      <a href="../insights.html" class="active">洞察</a>
      <div class="nav-dropdown"><a href="../contact.html" class="nav-dropdown-toggle">联系我们</a><div class="nav-dropdown-menu"><a href="../contact.html">联系我们</a><a href="../contact.html#join-us">加入我们</a><a href="../contact.html#faq">常见问题</a></div></div>
    </div>
    <div class="lang-switch">
      <button class="lang-btn active" data-lang="zh">中</button>
      <span class="lang-divider">|</span>
      <button class="lang-btn" data-lang="en">EN</button>
    </div>
    <a href="../contact.html" class="nav-cta">立即咨询</a>
  </nav>

  <section class="section">
    <div class="container">
      <article>
        <div class="detail-header">
          <span class="section-label">${escapeHtml(safeDate(item.publishedAt || item.createdAt))}</span>
          <h1>${escapeHtml(title)}</h1>
          ${tags.length ? `<div class="insights-tags" style="justify-content:center;margin-top:1rem;">${tags.map((tag) => `<span class="ins-tag">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
        </div>
        <div class="detail-cover">
          <img src="${escapeHtml(cover)}" alt="${escapeHtml(title)}" loading="eager" onerror="this.onerror=null;this.src='../images/万摩星logo.png';this.classList.add('image-fallback')">
        </div>
        <div class="detail-content article">${content}</div>
        <div class="detail-back">
          <a href="../insights.html" class="btn-primary">← 返回洞察</a>
        </div>
      </article>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand-logo"><img src="../images/万摩星logo.png" alt="万摩星" style="height:32px;width:auto;margin-right:0.5rem;"><span>万摩星设计</span></div>
          <p class="footer-desc">专注工业设计，为电动工具、清洁家电与智能设备领域提供全链路设计服务。</p>
        </div>
        <div>
          <div class="footer-heading">快速导航</div>
          <div class="footer-links"><a href="../about.html">关于我们</a><a href="../services.html">设计服务</a><a href="../portfolio.html">项目案例</a><a href="../insights.html">设计洞察</a></div>
        </div>
        <div>
          <div class="footer-heading">设计服务</div>
          <div class="footer-links"><a href="../services.html">工业设计</a><a href="../services.html">产品策略</a><a href="../services.html">手板制作</a><a href="../services.html">品牌视觉</a></div>
        </div>
        <div>
          <div class="footer-heading">联系我们</div>
          <div class="footer-links"><a href="mailto:onemorethingdesign@163.com">onemorethingdesign@163.com</a></div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span class="current-year"></span> 万摩星设计咨询（苏州）有限公司. All Rights Reserved.</span>
      </div>
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
`;
}

function sitemap(items) {
  const staticPages = ['', 'about.html', 'services.html', 'portfolio.html', 'insights.html', 'contact.html'];
  const urls = [
    ...staticPages.map((page) => `${SITE_ORIGIN}/${page}`),
    ...items.map((item) => `${SITE_ORIGIN}/${articleUrl(item.id)}`)
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;
}

async function main() {
  const response = await fetch(API_URL, { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`Failed to fetch insights: ${response.status}`);
  const items = (await response.json())
    .filter((item) => item && item.id && item.published !== false)
    .sort((a, b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0));

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(DATA_DIR, { recursive: true });

  await Promise.all(items.map((item) => fs.writeFile(path.join(OUT_DIR, `${item.id}.html`), pageShell(item), 'utf8')));
  await fs.writeFile(path.join(DATA_DIR, 'insights-static.json'), `${JSON.stringify(items.map((item, index) => ({
    id: item.id,
    titleZh: item.titleZh || item.title || '',
    titleEn: item.titleEn || '',
    excerptZh: item.excerptZh || item.excerpt || stripHtml(item.contentZh || item.content).slice(0, 160),
    excerptEn: item.excerptEn || '',
    coverImage: normalizeImageUrl(item.coverImage),
    tags: Array.isArray(item.tags) ? item.tags : [],
    publishedAt: item.publishedAt || item.createdAt || null,
    sortOrder: Number(item.sortOrder) || index
  })), null, 2)}\n`, 'utf8');
  await fs.writeFile(path.join(ROOT, 'sitemap.xml'), sitemap(items), 'utf8');
  await fs.writeFile(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`, 'utf8');

  console.log(`Generated ${items.length} static insight pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});





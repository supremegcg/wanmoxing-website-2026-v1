/* =========================================
   万摩星设计 — 国际化 i18n
   ========================================= */

(function () {
  'use strict';

  var T = {
    // ====== Navigation ======
    'nav-home':     { zh: '首页', en: 'Home' },
    'nav-about':    { zh: '关于我们', en: 'About' },
    'nav-services': { zh: '服务', en: 'Services' },
    'nav-portfolio':{ zh: '项目案例', en: 'Case Studies' },
    'nav-insights': { zh: '洞察', en: 'Insights' },
    'nav-contact':  { zh: '联系我们', en: 'Contact Us' },
    'nav-contact-us': { zh: '联系我们', en: 'Contact Us' },
    'nav-join-us':  { zh: '加入我们', en: 'Join Us' },
    'nav-faq':      { zh: '常见问题', en: 'FAQ' },
    'nav-cta':      { zh: '立即咨询', en: 'Get in Touch' },

    // ====== Mobile Nav ======
    'mnav-home':     { zh: '首页', en: 'Home' },
    'mnav-about':    { zh: '关于我们', en: 'About' },
    'mnav-services': { zh: '服务', en: 'Services' },
    'mnav-portfolio':{ zh: '项目案例', en: 'Case Studies' },
    'mnav-insights': { zh: '洞察', en: 'Insights' },
    'mnav-contact':  { zh: '联系我们', en: 'Contact Us' },
    'mnav-join-us':  { zh: '加入我们', en: 'Join Us' },
    'mnav-faq':      { zh: '常见问题', en: 'FAQ' },

    // ====== Footer ======
    'foot-brand':    { zh: '万摩星设计', en: 'OMT Design' },
    'foot-desc':     { zh: '专注工业设计，为电动工具、清洁家电与智能设备领域提供全链路设计服务。', en: 'Focused on industrial design, providing full-cycle design services for power tools, cleaning appliances, and smart devices.' },
    'foot-nav':      { zh: '快速导航', en: 'Quick Links' },
    'foot-svc':      { zh: '设计服务', en: 'Design Services' },
    'foot-id':       { zh: '工业设计', en: 'Industrial Design' },
    'foot-ps':       { zh: '产品策略', en: 'Product Strategy' },
    'foot-pt':       { zh: '手板制作', en: 'Prototyping' },
    'foot-bv':       { zh: '品牌视觉', en: 'Brand Visual' },
    'foot-contact':  { zh: '联系我们', en: 'Contact Us' },
    'foot-sz-title': { zh: '苏州公司', en: 'Suzhou Office' },
    'foot-yk-title': { zh: '永康公司', en: 'Yongkang Office' },
    'foot-sz-info':  { zh: '万摩星设计咨询（苏州）有限公司<br>江苏省苏州市竹园路209号<br>中国苏州创业园4号楼1708室<br>联系人：吴先生 15850675918', en: 'OMT Design Consulting (Suzhou) Co., Ltd.<br>Rm 1708, Bldg 4, Suzhou Pioneer Park<br>No.209 Zhuyuan Rd, Suzhou, Jiangsu<br>Contact: Mr. Wu +86 15850675918' },
    'foot-yk-info':  { zh: '万摩星工业设计（永康）有限公司<br>浙江省永康市五洲路金创大厦13楼东<br>联系人：李先生 18913537782', en: 'OMT Industrial Design (Yongkang) Co., Ltd.<br>13F East, Jinchuang Bldg, Wuzhou Rd<br>Yongkang, Zhejiang<br>Contact: Mr. Li +86 18913537782' },
    'foot-wechat':   { zh: '微信', en: 'WeChat' },
    'foot-douyin':   { zh: '抖音', en: 'Douyin' },
    'foot-red':      { zh: '小红书', en: 'RED' },
    'foot-about':    { zh: '关于我们', en: 'About' },
    'foot-di':       { zh: '设计洞察', en: 'Insights' },
    'foot-online':   { zh: '在线咨询表单', en: 'Online Inquiry' },
    'foot-copyright':{ zh: ' 万摩星设计咨询（苏州）有限公司. All Rights Reserved.', en: ' OMT Design Consulting (Suzhou) Co., Ltd. All Rights Reserved.' },

    // ====== INDEX PAGE ======
    'hero-label':    { zh: '万摩星设计 · 苏州 & 永康', en: 'One More Thing Design Studio · Suzhou & Yongkang' },
    'hero-title-1':  { zh: '设计', en: 'Design' },
    'hero-accent':   { zh: '驱动', en: 'Drives' },
    'hero-title-3':  { zh: '产品价值', en: 'Product Value' },
    'hero-sub':      { zh: '专注电动工具、智能设备与清洁家电领域<br>从概念到量产，赋能中国制造走向全球', en: 'Focused on power tools, smart devices & cleaning appliances<br>From concept to mass production, empowering global manufacturing' },
    'hero-btn1':     { zh: '浏览作品', en: 'View Portfolio' },
    'hero-btn2':     { zh: '预约咨询', en: 'Book Consultation' },
    'scroll':        { zh: 'Scroll', en: 'Scroll' },

    'stat-projects': { zh: '成功项目', en: 'Projects' },
    'stat-years':    { zh: '年行业经验', en: 'Years Experience' },
    'stat-brands':   { zh: '合作品牌', en: 'Partner Brands' },
    'stat-satisfy':  { zh: '客户满意度', en: 'Client Satisfaction' },

    'sel-works':     { zh: 'Selected Works', en: 'Selected Works' },
    'feat-cases':    { zh: '精选案例', en: 'Featured Cases' },
    'feat-desc':     { zh: '深耕电动工具与清洁家电领域，为客户打造兼具功能性与美学价值的产品解决方案', en: 'Deep expertise in power tools & cleaning appliances, creating solutions that balance functionality and aesthetic value' },
    'filter-all':    { zh: '全部', en: 'All' },
    'filter-pt':     { zh: '电动工具', en: 'Power Tools' },
    'filter-ca':     { zh: '清洁家电', en: 'Cleaning Appliances' },
    'filter-sd':     { zh: '智能设备', en: 'Smart Devices' },
    'view-all':      { zh: '浏览案例', en: 'View Cases' },

    // Index portfolio cards
    'idx-p1-cat':    { zh: '电动工具', en: 'Power Tools' },
    'idx-p1-title':  { zh: 'FILPOW 锂电工具套装', en: 'FILPOW Cordless Tool Set' },
    'idx-p1-desc':   { zh: '专业级锂电工具全家桶 · CMF创新 · 人机工程优化', en: 'Professional cordless tool series · CMF innovation · Ergonomic optimization' },
    'idx-p2-cat':    { zh: '清洁家电', en: 'Cleaning Appliances' },
    'idx-p2-title':  { zh: 'LAFANE 蒸汽洗地机', en: 'LAFANE Steam Mop' },
    'idx-p2-desc':   { zh: '高温蒸汽洗地机 · 极简造型 · 场景化设计', en: 'Steam mop · Minimalist design · Scenario-based design' },
    'idx-p3-cat':    { zh: '电动工具', en: 'Power Tools' },
    'idx-p3-title':  { zh: 'BRUSHLESS 无刷圆锯', en: 'BRUSHLESS Circular Saw' },
    'idx-p3-desc':   { zh: '无刷电机圆锯 · 工业级精度 · 轻量化设计', en: 'Brushless motor circular saw · Industrial precision · Lightweight' },
    'idx-p4-cat':    { zh: '清洁家电', en: 'Cleaning Appliances' },
    'idx-p4-title':  { zh: 'DREAME 智能洗地机', en: 'DREAME Smart Mop' },
    'idx-p4-desc':   { zh: '智能洗地机 · 简约设计 · 批量上市', en: 'Smart mop · Minimalist design · Mass production' },
    'idx-p5-cat':    { zh: '清洁家电', en: 'Cleaning Appliances' },
    'idx-p5-title':  { zh: 'iF Design Award 获奖吸尘器', en: 'iF Design Award Winning Vacuum' },
    'idx-p5-desc':   { zh: 'iF Design Award · 红色概念设计 · 国际认可', en: 'iF Design Award · Red concept design · International recognition' },
    'idx-p6-cat':    { zh: '智能设备', en: 'Smart Devices' },
    'idx-p6-title':  { zh: '移动电源系列', en: 'Portable Power Station' },
    'idx-p6-desc':   { zh: '储能电源产品线 · 户外场景 · 模块化设计', en: 'Energy storage product line · Outdoor scenario · Modular design' },

    // Services section (index)
    'svc-label':     { zh: 'What We Do', en: 'What We Do' },
    'svc-title':     { zh: '设计服务', en: 'Design Services' },
    'svc-desc':      { zh: '覆盖产品全生命周期的设计能力，从战略咨询到落地交付', en: 'Full product lifecycle design capabilities, from strategy consulting to delivery' },
    'svc-1-title':   { zh: '工业设计', en: 'Industrial Design' },
    'svc-1-desc':    { zh: '从市场调研、概念草图到3D建模渲染，提供完整的工业设计解决方案。专注于电动工具、清洁家电、智能设备领域。', en: 'From market research and concept sketches to 3D modeling and rendering, providing complete industrial design solutions. Focused on power tools, cleaning appliances, and smart devices.' },
    'svc-2-title':   { zh: '产品策略', en: 'Product Strategy' },
    'svc-2-desc':    { zh: '竞品分析、用户研究、产品定位与规划。帮助品牌找到差异化切入点，制定清晰的产品路线图。', en: 'Competitive analysis, user research, product positioning and planning. Helping brands find differentiation and define clear product roadmaps.' },
    'svc-3-title':   { zh: '手板制作', en: 'Prototyping' },
    'svc-3-desc':    { zh: '快速原型制作、小批量试产支持，加速产品从设计到落地的验证流程，降低量产风险。', en: 'Rapid prototyping and small-batch pilot production support, accelerating design-to-production validation and reducing mass production risk.' },
    'svc-4-title':   { zh: '品牌视觉', en: 'Brand Visual' },
    'svc-4-desc':    { zh: '品牌形象设计、CMF（色彩·材料·工艺）研究与应用、说明书与包装设计，全方位提升产品品牌力。', en: 'Brand identity design, CMF research and application, manual and packaging design — comprehensively enhancing product brand power.' },
    'svc-all':       { zh: '了解全部服务', en: 'View All Services' },

    // About intro (index)
    'about-label':   { zh: 'About Us', en: 'About Us' },
    'about-title':   { zh: '用设计思维<br>创造持久价值', en: 'Creating Lasting Value<br>Through Design Thinking' },
    'about-p1':      { zh: '万摩星设计咨询成立于苏州，是一支由资深工业设计师、产品策略师和制造工程师组成的专业团队。团队成员拥有20年行业经验，服务过多家国际一线品牌。', en: 'OMT Design Consulting, founded in Suzhou, is a professional team of senior industrial designers, product strategists, and manufacturing engineers. Team members bring 20+ years of industry experience, having served multiple international first-tier brands.' },
    'about-p2':      { zh: '我们相信好的设计不仅是外形的优化，更是商业逻辑、用户需求与制造可行性的交汇点。每一件作品，都经过严谨的思考和精心的打磨。', en: 'We believe great design is more than aesthetic optimization — it\'s the intersection of business logic, user needs, and manufacturing feasibility. Every project undergoes rigorous thinking and meticulous refinement.' },
    'about-quote':   { zh: '"设计不是装饰，而是解决问题的方式。"', en: '"Design is not decoration, but a way of solving problems."' },
    'about-more':    { zh: '了解更多', en: 'Learn More' },
    'about-exp':     { zh: '年深耕工业设计', en: 'Years in Industrial Design' },

    // Process (index)
    'proc-label':    { zh: 'How We Work', en: 'How We Work' },
    'proc-title':    { zh: '设计流程', en: 'Design Process' },
    'proc-desc':     { zh: '结构化、可追溯、高品质交付的协作方式', en: 'Structured, traceable, high-quality delivery' },
    'proc-1-title':  { zh: '需求沟通', en: 'Requirements' },
    'proc-1-desc':   { zh: '深度了解客户品牌、产品定位、目标市场与预算，梳理设计任务书', en: 'Deep understanding of client brand, product positioning, target market and budget, defining design brief' },
    'proc-2-title':  { zh: '调研分析', en: 'Research' },
    'proc-2-desc':   { zh: '市场趋势、竞品研究、用户洞察，发现设计机会点与差异化切入点', en: 'Market trends, competitive research, user insights — discovering design opportunities and differentiation' },
    'proc-3-title':  { zh: '概念设计', en: 'Concept' },
    'proc-3-desc':   { zh: '草图创意、方案筛选、2D渲染，建立多个方向供客户评估选择', en: 'Sketch ideation, concept screening, 2D rendering — multiple directions for client evaluation' },
    'proc-4-title':  { zh: '深化设计', en: 'Detailing' },
    'proc-4-desc':   { zh: '3D建模、CMF规范、手板制作、DFM可制造性分析，反复验证优化', en: '3D modeling, CMF specs, prototyping, DFM analysis — iterative verification and optimization' },
    'proc-5-title':  { zh: '交付量产', en: 'Delivery' },
    'proc-5-desc':   { zh: '设计文档包移交、量产跟进支持，确保设计完美落地', en: 'Design document handoff, mass production follow-up, ensuring perfect design execution' },

    // Partners (index)
    'partner-label': { zh: 'Trusted By', en: 'Trusted By' },
    'partner-title': { zh: '服务客户', en: 'Clients Served' },
    'partner-desc': { zh: '与面向全球市场的电动工具、清洁家电与智能硬件品牌共同打磨产品价值', en: 'Shaping product value with power tool, cleaning appliance, and smart hardware brands for global markets' },

    // CTA (index)
    'cta-label':     { zh: 'Start a Project', en: 'Start a Project' },
    'cta-title':     { zh: '准备好开启下一个<br>设计项目了吗？', en: 'Ready to Start Your<br>Next Design Project?' },
    'cta-desc':      { zh: '从概念到落地，万摩星团队随时准备为您的产品赋能', en: 'From concept to production, the OMT team is ready to empower your product' },
    'cta-btn':       { zh: '立即联系', en: 'Contact Us' },

    // ====== ABOUT PAGE ======
    'abt-header-label':{ zh: 'About Us', en: 'About Us' },
    'abt-header-title':{ zh: '关于万摩星', en: 'About OMT Design' },
    'abt-header-desc': { zh: '用设计思维，为中国制造赋能。我们是一支专注、专业、充满热情的工业设计团队。', en: 'Empowering Chinese manufacturing through design thinking. A focused, professional, and passionate industrial design team.' },
    'abt-story-label': { zh: 'Our Story', en: 'Our Story' },
    'abt-story-title': { zh: '设计，是我们的<br>专业，也是热情', en: 'Design Is Our<br>Profession & Passion' },
    'abt-story-p1':    { zh: '万摩星设计咨询成立于苏州，由一群深耕工业设计领域20年的资深设计师共同创立。团队成员曾服务于多家国际一线品牌，在电动工具、清洁家电、智能设备领域积累了丰富的项目经验。', en: 'OMT Design Consulting was founded in Suzhou by a group of senior designers with 20+ years of deep experience in industrial design. Team members have served multiple international first-tier brands, accumulating rich project experience in power tools, cleaning appliances, and smart devices.' },
    'abt-story-p2':    { zh: '我们相信，设计不仅是创造美的外观，更是解决问题、创造价值的思维方式。每一次项目，我们都坚持以用户为中心、以商业目标为导向、以制造可行性为基础的综合设计方法论。', en: 'We believe design is not just creating beautiful appearances, but a way of thinking that solves problems and creates value. For every project, we adhere to a comprehensive design methodology centered on users, guided by business objectives, and grounded in manufacturing feasibility.' },
    'abt-story-quote': { zh: '"好的设计，是在限制中寻找自由，在约束中创造可能。"', en: '"Good design is finding freedom within constraints, creating possibilities within limitations."' },
    'abt-stat-proj':   { zh: '完成项目', en: 'Projects' },
    'abt-stat-years':  { zh: '年行业经验', en: 'Years Experience' },
    'abt-stat-team':   { zh: '核心成员', en: 'Core Members' },
    'abt-stat-office': { zh: '家公司布局', en: 'Offices' },
    'abt-yr':          { zh: '年行业深耕', en: 'Years in Industry' },

    // Two companies
    'comp-label':    { zh: 'Our Companies', en: 'Our Companies' },
    'comp-title':    { zh: '两家公司 · 双轮驱动', en: 'Two Companies · Dual Engine' },
    'comp-desc':     { zh: '苏州与永康，战略咨询与设计执行，协同为客户提供完整解决方案', en: 'Suzhou & Yongkang — strategy consulting and design execution, working together for complete solutions' },
    'comp-sz-tag':   { zh: '战略 · 咨询', en: 'Strategy · Consulting' },
    'comp-sz-name':  { zh: '万摩星设计咨询（苏州）有限公司', en: 'OMT Design Consulting (Suzhou) Co., Ltd.' },
    'comp-sz-desc':  { zh: '成立于苏州，聚焦产品战略、品牌咨询与工业设计服务。为客户提供从市场调研、概念策划到设计方案的全流程咨询支持。', en: 'Based in Suzhou, focused on product strategy, brand consulting and industrial design. Providing full-process consulting from market research to design solutions.' },
    'comp-sz-addr':  { zh: '📍 江苏省苏州市竹园路209号 中国苏州创业园4号楼1708室', en: '📍 Rm 1708, Bldg 4, Suzhou Pioneer Park, No.209 Zhuyuan Rd, Suzhou' },
    'comp-sz-contact':{ zh: '👤 联系人：吴先生 15850675918', en: '👤 Contact: Mr. Wu +86 15850675918' },
    'comp-sz-s1':    { zh: '🗂️ 产品策略与品牌咨询', en: '🗂️ Product Strategy & Brand Consulting' },
    'comp-sz-s2':    { zh: '🎨 工业设计方案输出', en: '🎨 Industrial Design Output' },
    'comp-sz-s3':    { zh: '📐 用户研究与市场分析', en: '📐 User Research & Market Analysis' },
    'comp-sz-btn':   { zh: '联系苏州公司', en: 'Contact Suzhou Office' },
    'comp-yk-tag':   { zh: '执行 · 落地', en: 'Execution · Delivery' },
    'comp-yk-name':  { zh: '万摩星工业设计（永康）有限公司', en: 'OMT Industrial Design (Yongkang) Co., Ltd.' },
    'comp-yk-desc':  { zh: '依托永康作为"中国电动工具之都"的产业优势，专注设计执行、手板制作与量产跟进。贴近制造端，确保设计方案的高质量落地。', en: 'Leveraging Yongkang\'s position as "China\'s Power Tool Capital," focused on design execution, prototyping, and mass production follow-up. Close to manufacturing, ensuring high-quality design delivery.' },
    'comp-yk-addr':  { zh: '📍 浙江省永康市五洲路金创大厦13楼东', en: '📍 13F East, Jinchuang Bldg, Wuzhou Rd, Yongkang, Zhejiang' },
    'comp-yk-contact':{ zh: '👤 联系人：李先生 18913537782', en: '👤 Contact: Mr. Li +86 18913537782' },
    'comp-yk-s1':    { zh: '🔧 手板制作与小批量试产', en: '🔧 Prototyping & Small-batch Production' },
    'comp-yk-s2':    { zh: '🏭 供应链资源对接', en: '🏭 Supply Chain Integration' },
    'comp-yk-s3':    { zh: '✅ DFM可制造性优化', en: '✅ DFM Optimization' },
    'comp-yk-btn':   { zh: '联系永康公司', en: 'Contact Yongkang Office' },

    // Team
    'team-label':    { zh: 'Our People', en: 'Our People' },
    'team-title':    { zh: '核心团队', en: 'Core Team' },
    'team-desc':     { zh: '经验丰富的设计师与工程师团队，每个人都是各自领域的专家', en: 'Experienced designers and engineers — each an expert in their field' },
    'team-1-name':   { zh: '顾老师', en: 'Mr. Gu' },
    'team-1-role':   { zh: '创始人 / 设计总监', en: 'Founder / Design Director' },
    'team-1-bio':    { zh: '20年工业设计经验，专注电动工具与清洁家电领域，服务多家国际一线品牌。', en: '20+ years in industrial design, focused on power tools and cleaning appliances, serving international first-tier brands.' },
    'team-2-role':   { zh: '资深工业设计师', en: 'Senior Industrial Designer' },
    'team-2-bio':    { zh: '8年+工业设计经验，擅长CMF研究与产品策略，熟悉电动工具产品开发全流程。', en: '8+ years in industrial design, skilled in CMF research and product strategy, familiar with power tool development.' },
    'team-3-role':   { zh: '结构工程总监', en: 'Structural Engineering Director' },
    'team-3-bio':    { zh: '机械工程背景，10年+产品结构设计经验，精通注塑、钣金、压铸等工艺。', en: 'Mechanical engineering background, 10+ years in structural design, expert in injection molding, sheet metal, die casting.' },
    'team-4-role':   { zh: '品牌策略师', en: 'Brand Strategist' },
    'team-4-bio':    { zh: '品牌咨询背景，擅长产品定位、市场分析与品牌视觉体系建设。', en: 'Brand consulting background, skilled in product positioning, market analysis and brand visual systems.' },
    'team-5-role':   { zh: '手板主管', en: 'Prototyping Lead' },
    'team-5-bio':    { zh: '永康基地负责人，15年+手板制作经验，精通CNC加工、3D打印、复模等工艺。', en: 'Yongkang base lead, 15+ years in prototyping, expert in CNC, 3D printing, and silicone molding.' },
    'team-6-role':   { zh: 'CMF设计师', en: 'CMF Designer' },
    'team-6-bio':    { zh: '材料与工艺专家，专注色彩趋势研究、表面处理工艺与包材设计。', en: 'Materials and process expert, focused on color trends, surface finishing, and packaging design.' },

    // Awards
    'awards-label': { zh: 'Awards', en: 'Awards' },
    'awards-title': { zh: '获得奖项', en: 'Awards & Recognition' },
    'awards-desc': { zh: '团队作品曾获得国际与国内重要设计奖项认可。当前先建立奖项展示体系，后续将扩展为完整获奖案例库。', en: 'Our team work has been recognized by major international and domestic design awards. This section establishes the award system first and will later expand into dedicated award-winning case studies.' },
    'award-red-dot-title': { zh: 'Red Dot 红点设计奖', en: 'Red Dot Design Award' },
    'award-red-dot-desc': { zh: '国际工业设计领域代表性奖项，强调创新性、功能性与设计品质。', en: 'A leading international industrial design award emphasizing innovation, function, and design quality.' },
    'award-if-title': { zh: 'iF Design Award', en: 'iF Design Award' },
    'award-if-desc': { zh: '覆盖产品、用户体验与品牌设计的国际设计奖项，体现面向全球市场的设计能力。', en: 'An international design award covering product, user experience, and brand design for global-market work.' },
    'award-red-star-title': { zh: '中国设计红星奖', en: 'China Red Star Design Award' },
    'award-red-star-desc': { zh: '国内具有代表性的工业设计奖项，关注中国制造语境下的产品创新。', en: 'A representative Chinese industrial design award focused on product innovation in the context of Chinese manufacturing.' },
    'award-cmf-title': { zh: '行业与客户认可', en: 'Industry & Client Recognition' },
    'award-cmf-desc': { zh: '围绕电动工具、清洁家电与智能设备，在 CMF、量产落地和品牌体验上持续积累。', en: 'Ongoing recognition in CMF, production delivery, and brand experience across power tools, cleaning appliances, and smart devices.' },
    'award-status': { zh: '获奖作品', en: 'Awarded Works' },

    // Timeline
    'tl-label':      { zh: 'Our Journey', en: 'Our Journey' },
    'tl-title':      { zh: '发展历程', en: 'Our Journey' },
    'tl-desc':       { zh: '从创立到成长，万摩星始终坚持专业品质与客户价值优先。', en: 'From founding to growth, OMT always prioritizes professional quality and client value.' },
    'tl-btn':        { zh: '开启合作', en: 'Start Collaboration' },
    'tl-1-title':    { zh: '万摩星设计咨询成立', en: 'OMT Design Consulting Founded' },
    'tl-1-desc':     { zh: '顾老师团队在苏州创立万摩星设计咨询，正式开启独立设计服务之路。', en: 'Mr. Gu\'s team founded OMT Design Consulting in Suzhou, officially starting their independent design service journey.' },
    'tl-2-title':    { zh: '永康基地启动', en: 'Yongkang Base Launched' },
    'tl-2-desc':     { zh: '万摩星工业设计（永康）有限公司成立，完善从设计咨询到落地执行的全链条布局。', en: 'OMT Industrial Design (Yongkang) established, completing the full-chain layout from design consulting to execution.' },
    'tl-3-title':    { zh: '首个海外项目交付', en: 'First Overseas Project Delivered' },
    'tl-3-desc':     { zh: '完成首个面向欧洲市场的电动工具设计项目，品牌获得客户高度认可。', en: 'Completed first power tool design project for the European market, earning high client recognition.' },
    'tl-4-title':    { zh: '持续成长中', en: 'Continuing to Grow' },
    'tl-4-desc':     { zh: '服务更多品牌，探索更广领域。下一个里程碑，等你一起来书写。', en: 'Serving more brands, exploring broader fields. The next milestone — let\'s write it together.' },

    // CTA about
    'abt-cta-label': { zh: 'Join Us', en: 'Join Us' },
    'abt-cta-title': { zh: '期待与您共创', en: 'Looking Forward to Creating Together' },
    'abt-cta-desc':  { zh: '无论您是品牌方、制造商还是创业团队，我们都愿意倾听您的想法', en: 'Whether you\'re a brand, manufacturer, or startup, we\'d love to hear your ideas' },
    'abt-cta-btn':   { zh: '预约面谈', en: 'Book a Meeting' },

    // ====== PORTFOLIO PAGE ======
    'pf-header-label':{ zh: 'Portfolio', en: 'Portfolio' },
    'pf-header-title':{ zh: '作品集', en: 'Portfolio' },
    'pf-header-desc': { zh: '深耕电动工具、清洁家电与智能设备领域，以下为精选代表案例', en: 'Deep expertise in power tools, cleaning appliances, and smart devices — featured cases below' },
    'pf-filter-other':{ zh: '其他', en: 'Other' },

    // Portfolio items (27)
    'pf-1-cat':   { zh: '清洁家电', en: 'Cleaning' },
    'pf-1-title': { zh: '无绳吸尘器概念设计', en: 'Cordless Vacuum Concept' },
    'pf-1-desc':  { zh: '概念渲染 · CMF创新 · 轻量化设计', en: 'Concept rendering · CMF innovation · Lightweight design' },
    'pf-2-cat':   { zh: '清洁家电', en: 'Cleaning' },
    'pf-2-title': { zh: 'ROCKSTAR 无绳吸尘器', en: 'ROCKSTAR Cordless Vacuum' },
    'pf-2-desc':  { zh: '专业级无线吸尘器 · 人机工程 · 批量上市', en: 'Professional cordless vacuum · Ergonomic · Mass produced' },
    'pf-3-cat':   { zh: '清洁家电', en: 'Cleaning' },
    'pf-3-title': { zh: 'Hoover 立式吸尘器', en: 'Hoover Stick Vacuum' },
    'pf-3-desc':  { zh: '国际品牌 · 家用清洁方案 · 简约设计', en: 'International brand · Home cleaning solution · Minimalist design' },
    'pf-4-cat':   { zh: '清洁家电', en: 'Cleaning' },
    'pf-4-title': { zh: 'LAFANE 蒸汽洗地机', en: 'LAFANE Steam Mop' },
    'pf-4-desc':  { zh: '高温蒸汽清洁 · 场景化设计 · 家居场景', en: 'Steam cleaning · Scenario design · Home use' },
    'pf-5-cat':   { zh: '清洁家电', en: 'Cleaning' },
    'pf-5-title': { zh: 'LAFANE 蒸汽洗地机 细节', en: 'LAFANE Steam Mop Detail' },
    'pf-5-desc':  { zh: 'CMF细节 · 材料工艺 · 功能展示', en: 'CMF details · Material & process · Feature showcase' },
    'pf-6-cat':   { zh: '智能设备', en: 'Smart Devices' },
    'pf-6-title': { zh: 'DEMORR 显微镜', en: 'DEMORR Microscope' },
    'pf-6-desc':  { zh: '医疗级精度 · 人机工程设计 · 专业品质', en: 'Medical-grade precision · Ergonomic design · Professional quality' },
    'pf-7-cat':   { zh: '智能设备', en: 'Smart Devices' },
    'pf-7-title': { zh: 'YFHL-540A 产科设备', en: 'YFHL-540A OB/GYN Equipment' },
    'pf-7-desc':  { zh: '医疗工业设备 · 功能可靠性 · 量产交付', en: 'Medical industrial equipment · Functional reliability · Mass produced' },
    'pf-8-cat':   { zh: '电动工具', en: 'Power Tools' },
    'pf-8-title': { zh: '锂电工具全家桶', en: 'Cordless Tool Series' },
    'pf-8-desc':  { zh: '专业锂电工具系列 · CMF方案 · 产品线设计', en: 'Professional cordless tool series · CMF scheme · Product line design' },
    'pf-9-cat':   { zh: '智能设备', en: 'Smart Devices' },
    'pf-9-title': { zh: '锂电料理机', en: 'Cordless Food Processor' },
    'pf-9-desc':  { zh: '户外锂电应用 · 多场景设计 · 安全防护', en: 'Outdoor cordless application · Multi-scenario · Safety design' },
    'pf-10-cat':  { zh: '清洁家电', en: 'Cleaning' },
    'pf-10-title':{ zh: 'MOVA 立式吸尘器', en: 'MOVA Stick Vacuum' },
    'pf-10-desc': { zh: '立式无线吸尘器 · 场景应用 · 极简美学', en: 'Cordless stick vacuum · Scenario use · Minimalist aesthetic' },
    'pf-11-cat':  { zh: '清洁家电', en: 'Cleaning' },
    'pf-11-title':{ zh: 'NOVA PRO 吸尘器', en: 'NOVA PRO Vacuum' },
    'pf-11-desc': { zh: '专业级手持吸尘器 · CMF创新 · 细节特写', en: 'Professional handheld vacuum · CMF innovation · Detail close-up' },
    'pf-12-cat':  { zh: '清洁家电', en: 'Cleaning' },
    'pf-12-title':{ zh: 'KARCHER 除螨仪', en: 'KARCHER Mite Remover' },
    'pf-12-desc': { zh: '德国品牌合作 · 家居健康产品 · 精致小巧', en: 'German brand collaboration · Home health product · Compact design' },
    'pf-13-cat':  { zh: '清洁家电', en: 'Cleaning' },
    'pf-13-title':{ zh: 'DREAME 洗地机', en: 'DREAME Mop' },
    'pf-13-desc': { zh: '智能洗地机 · 简约设计 · 市场热销', en: 'Smart mop · Minimalist design · Best seller' },
    'pf-14-cat':  { zh: '智能设备', en: 'Smart Devices' },
    'pf-14-title':{ zh: 'SASSYKIDS 儿童车', en: 'SASSYKIDS Ride-on' },
    'pf-14-desc': { zh: '儿童骑行产品 · 安全设计 · 趣味造型', en: 'Kids ride-on product · Safety design · Fun styling' },
    'pf-15-cat':  { zh: '电动工具', en: 'Power Tools' },
    'pf-15-title':{ zh: '长柄砂光机', en: 'Long-handle Sander' },
    'pf-15-desc': { zh: '专业级长柄设计 · 人机工程 · 工业应用', en: 'Professional long-handle design · Ergonomic · Industrial use' },
    'pf-16-cat':  { zh: '电动工具', en: 'Power Tools' },
    'pf-16-title':{ zh: 'FILPOW 锂电工具套装', en: 'FILPOW Cordless Tool Set' },
    'pf-16-desc': { zh: '专业锂电工具 · 橙黑配色 · 产品线规划', en: 'Professional cordless tools · Orange-black scheme · Product line planning' },
    'pf-17-cat':  { zh: '电动工具', en: 'Power Tools' },
    'pf-17-title':{ zh: 'Burley 20V 射钉枪', en: 'Burley 20V Nail Gun' },
    'pf-17-desc': { zh: '专业射钉枪 · 轻量化设计 · 工业级性能', en: 'Professional nail gun · Lightweight · Industrial performance' },
    'pf-18-cat':  { zh: '清洁家电', en: 'Cleaning' },
    'pf-18-title':{ zh: 'iF Design Award 获奖吸尘器', en: 'iF Design Award Winning Vacuum' },
    'pf-18-desc': { zh: 'iF获奖作品 · 红色概念设计 · 国际认可', en: 'iF Award winner · Red concept · International recognition' },
    'pf-19-cat':  { zh: '清洁家电', en: 'Cleaning' },
    'pf-19-title':{ zh: '吸尘器配件系列', en: 'Vacuum Accessory Series' },
    'pf-19-desc': { zh: '配件产品线 · 统一设计语言 · 模块化设计', en: 'Accessory product line · Unified design language · Modular design' },
    'pf-20-cat':  { zh: '智能设备', en: 'Smart Devices' },
    'pf-20-title':{ zh: '移动电源系列', en: 'Portable Power Station' },
    'pf-20-desc': { zh: '储能电源产品线 · 户外储能 · 模块化设计', en: 'Energy storage line · Outdoor power · Modular design' },
    'pf-21-cat':  { zh: '清洁家电', en: 'Cleaning' },
    'pf-21-title':{ zh: 'FLYCO 挂烫机', en: 'FLYCO Garment Steamer' },
    'pf-21-desc': { zh: '智能熨烫产品 · 简约造型 · 家用场景', en: 'Smart ironing product · Minimalist form · Home use' },
    'pf-22-cat':  { zh: '清洁家电', en: 'Cleaning' },
    'pf-22-title':{ zh: 'Electrolux 洗地机', en: 'Electrolux Mop' },
    'pf-22-desc': { zh: '瑞典品牌合作 · 高端清洁方案 · 国际品质', en: 'Swedish brand collaboration · Premium cleaning · International quality' },
    'pf-23-cat':  { zh: '智能设备', en: 'Smart Devices' },
    'pf-23-title':{ zh: '音频设备机架', en: 'Audio Equipment Rack' },
    'pf-23-desc': { zh: '专业音频设备 · 工业设计 · 模块化系统', en: 'Professional audio equipment · Industrial design · Modular system' },
    'pf-24-cat':  { zh: '智能设备', en: 'Smart Devices' },
    'pf-24-title':{ zh: 'YFHL-540A 推车设备', en: 'YFHL-540A Cart Equipment' },
    'pf-24-desc': { zh: '医疗产科推车 · 功能整合 · 移动场景', en: 'OB/GYN cart · Functional integration · Mobile scenario' },
    'pf-25-cat':  { zh: '电动工具', en: 'Power Tools' },
    'pf-25-title':{ zh: 'Burley 带锯', en: 'Burley Band Saw' },
    'pf-25-desc': { zh: '专业带锯机 · 工业级设计 · 高精度切割', en: 'Professional band saw · Industrial design · Precision cutting' },
    'pf-26-cat':  { zh: '电动工具', en: 'Power Tools' },
    'pf-26-title':{ zh: '砂光机 细节特写', en: 'Sander Detail Close-up' },
    'pf-26-desc': { zh: 'CMF细节 · 工艺展示 · 制造工艺验证', en: 'CMF details · Process showcase · Manufacturing verification' },
    'pf-27-cat':  { zh: '电动工具', en: 'Power Tools' },
    'pf-27-title':{ zh: 'BRUSHLESS 无刷圆锯', en: 'BRUSHLESS Circular Saw' },
    'pf-27-desc': { zh: '无刷电机设计 · 工业精度 · 轻量化优化', en: 'Brushless motor design · Industrial precision · Lightweight optimization' },

    // Portfolio CTA
    'pf-cta-label':{ zh: 'Next Project', en: 'Next Project' },
    'pf-cta-title':{ zh: '期待成为您的<br>下一个成功案例', en: 'Looking Forward to Being<br>Your Next Success Story' },
    'pf-cta-desc': { zh: '有项目想法？欢迎联系我们，深入探讨您的产品需求', en: 'Have a project idea? Contact us to discuss your product needs' },
    'pf-cta-btn':  { zh: '开始合作', en: 'Start Collaboration' },

    // ====== CONTACT PAGE ======
    'ct-header-label':{ zh: 'Contact', en: 'Contact' },
    'ct-header-title':{ zh: '联系我们', en: 'Contact Us' },
    'ct-header-desc': { zh: '无论是全新产品开发还是设计咨询，欢迎联系我们。我们会在1-2个工作日内回复', en: 'Whether it\'s a new product development or design consultation, feel free to reach out. We\'ll respond within 1-2 business days' },
    'ct-label':       { zh: 'Get in Touch', en: 'Get in Touch' },
    'ct-title':       { zh: '开启您的<br>下一个设计项目', en: 'Start Your<br>Next Design Project' },
    'ct-desc':        { zh: '请填写右侧表单，或直接通过以下方式联系我们。我们期待与您的合作。', en: 'Please fill out the form, or reach us directly via the information below. We look forward to working with you.' },
    'ct-sz-label':    { zh: '苏州公司 · 设计咨询', en: 'Suzhou Office · Design Consulting' },
    'ct-sz-info':     { zh: '<strong>万摩星设计咨询（苏州）有限公司</strong><br>📍 江苏省苏州市竹园路209号<br>中国苏州创业园4号楼1708室<br>👤 联系人：吴先生<br>📞 15850675918<br>✉️ onemorethingdesign@163.com', en: '<strong>OMT Design Consulting (Suzhou) Co., Ltd.</strong><br>📍 Rm 1708, Bldg 4, Suzhou Pioneer Park<br>No.209 Zhuyuan Rd, Suzhou, Jiangsu<br>👤 Contact: Mr. Wu<br>📞 +86 15850675918<br>✉️ onemorethingdesign@163.com' },
    'ct-yk-label':    { zh: '永康公司 · 设计执行', en: 'Yongkang Office · Design Execution' },
    'ct-yk-info':     { zh: '<strong>万摩星工业设计（永康）有限公司</strong><br>📍 浙江省永康市五洲路金创大厦13楼东<br>👤 联系人：李先生<br>📞 18913537782<br>✉️ onemorethingdesign@163.com', en: '<strong>OMT Industrial Design (Yongkang) Co., Ltd.</strong><br>📍 13F East, Jinchuang Bldg, Wuzhou Rd, Yongkang, Zhejiang<br>👤 Contact: Mr. Li<br>📞 +86 18913537782<br>✉️ onemorethingdesign@163.com' },
    'ct-social-label':{ zh: '社交媒体', en: 'Social Media' },
    'ct-social-info': { zh: '抖音 / 小红书 / 微信<br>搜索「万摩星」关注我们，获取设计干货与案例分享', en: 'Douyin / RED / WeChat<br>Search "OMT Design" to follow us for design insights and case studies' },
    'ct-hours-label': { zh: '工作时间', en: 'Business Hours' },
    'ct-hours-info':  { zh: '周一至周五：9:00 — 18:00<br>周末及节假日：休息<br>（紧急咨询请联系微信）', en: 'Mon–Fri: 9:00 AM — 6:00 PM<br>Weekends & Holidays: Closed<br>(For urgent inquiries, contact WeChat)' },
    // Form
    'ct-form-title':  { zh: '在线咨询表单', en: 'Online Inquiry Form' },
    'ct-form-desc':   { zh: '我们重视每一个合作机会，请尽量详细填写以下信息', en: 'We value every collaboration opportunity. Please fill in the details below' },
    'ct-f-name':      { zh: '您的姓名 *', en: 'Your Name *' },
    'ct-f-name-ph':   { zh: '请输入姓名', en: 'Enter your name' },
    'ct-f-company':   { zh: '公司名称', en: 'Company Name' },
    'ct-f-company-ph':{ zh: '请输入公司名称', en: 'Enter company name' },
    'ct-f-email':     { zh: '邮箱地址 *', en: 'Email *' },
    'ct-f-email-ph':  { zh: 'your@email.com', en: 'your@email.com' },
    'ct-f-phone':     { zh: '联系电话', en: 'Phone' },
    'ct-f-phone-ph':  { zh: '+86 ...', en: '+86 ...' },
    'ct-f-service':   { zh: '感兴趣的服务', en: 'Service Interest' },
    'ct-f-svc-ph':    { zh: '请选择服务类型', en: 'Select service type' },
    'ct-f-svc-id':    { zh: '工业设计', en: 'Industrial Design' },
    'ct-f-svc-ps':    { zh: '产品策略', en: 'Product Strategy' },
    'ct-f-svc-pt':    { zh: '手板制作', en: 'Prototyping' },
    'ct-f-svc-bv':    { zh: '品牌视觉', en: 'Brand Visual' },
    'ct-f-svc-other': { zh: '其他咨询', en: 'Other Inquiry' },
    'ct-f-budget':    { zh: '预计项目预算', en: 'Estimated Budget' },
    'ct-f-budget-ph': { zh: '请选择预算范围', en: 'Select budget range' },
    'ct-f-budget-1':  { zh: '5-10万', en: '50K-100K RMB' },
    'ct-f-budget-2':  { zh: '10-20万', en: '100K-200K RMB' },
    'ct-f-budget-3':  { zh: '20-50万', en: '200K-500K RMB' },
    'ct-f-budget-4':  { zh: '50万以上', en: '500K+ RMB' },
    'ct-f-budget-5':  { zh: '尚未确定', en: 'Not sure yet' },
    'ct-f-timeline':  { zh: '期望项目周期', en: 'Expected Timeline' },
    'ct-f-tl-ph':     { zh: '请选择', en: 'Select timeline' },
    'ct-f-tl-1':      { zh: '紧急（1个月内）', en: 'Urgent (within 1 month)' },
    'ct-f-tl-2':      { zh: '1-3个月', en: '1-3 months' },
    'ct-f-tl-3':      { zh: '3-6个月', en: '3-6 months' },
    'ct-f-tl-4':      { zh: '6个月以上', en: '6+ months' },
    'ct-f-tl-5':      { zh: '目前仅探索阶段', en: 'Just exploring' },
    'ct-f-msg':       { zh: '项目需求描述 *', en: 'Project Description *' },
    'ct-f-msg-ph':    { zh: '请描述您的产品类型、设计需求、目标市场、参考案例等信息，帮助我们更好地了解您的需求。', en: 'Please describe your product type, design needs, target market, reference cases, etc.' },
    'ct-f-source':    { zh: '您是如何了解到我们的？', en: 'How did you find us?' },
    'ct-f-src-ph':    { zh: '请选择', en: 'Select' },
    'ct-f-src-1':     { zh: '搜索引擎', en: 'Search Engine' },
    'ct-f-src-2':     { zh: '朋友推荐', en: 'Referral' },
    'ct-f-src-3':     { zh: '社交媒体（抖音/小红书）', en: 'Social Media (Douyin/RED)' },
    'ct-f-src-4':     { zh: '展会活动', en: 'Exhibition/Event' },
    'ct-f-src-5':     { zh: '其他', en: 'Other' },
    'ct-f-submit':    { zh: '提交咨询', en: 'Submit Inquiry' },
    'ct-f-note':      { zh: '我们会在1-2个工作日内通过邮件或电话与您取得联系。', en: 'We will contact you via email or phone within 1-2 business days.' },
    'ct-f-ok-label':  { zh: '✓ 提交成功', en: '✓ Submitted' },
    'ct-f-ok-desc':   { zh: '感谢您的咨询！我们的团队会在1-2个工作日内与您联系。', en: 'Thank you for your inquiry! Our team will contact you within 1-2 business days.' },

    // Join us
    'join-label':     { zh: 'Join Us', en: 'Join Us' },
    'join-title':     { zh: '加入我们', en: 'Join Us' },
    'join-desc':      { zh: '我们长期欢迎工业设计、CMF、结构工程、品牌策略与项目管理方向的优秀伙伴加入，也欢迎自由设计师与制造资源建立项目制合作。', en: 'We welcome talented partners in industrial design, CMF, structural engineering, brand strategy, and project management, as well as freelance designers and manufacturing resources for project-based collaboration.' },
    'join-item-1':    { zh: '工业设计师 / 产品设计师', en: 'Industrial Designer / Product Designer' },
    'join-item-2':    { zh: 'CMF 设计师 / 趋势研究伙伴', en: 'CMF Designer / Trend Research Partner' },
    'join-item-3':    { zh: '结构工程与手板制作合作伙伴', en: 'Structural Engineering & Prototyping Partner' },
    'join-item-4':    { zh: '品牌、内容与海外市场协作伙伴', en: 'Brand, Content & Overseas Market Partner' },
    'join-btn':       { zh: '发送简历 / 合作意向', en: 'Send Resume / Collaboration Proposal' },

    // FAQ
    'faq-label':      { zh: 'FAQ', en: 'FAQ' },
    'faq-title':      { zh: '常见问题', en: 'FAQ' },
    'faq-q1':         { zh: '设计周期一般多长？', en: 'How long does a design project typically take?' },
    'faq-a1':         { zh: '从概念到最终交付，工业设计项目通常需要3-6个月，具体取决于项目复杂度、需求明确程度与迭代轮次。', en: 'From concept to final delivery, industrial design projects typically take 3-6 months, depending on complexity, clarity of requirements, and iteration rounds.' },
    'faq-q2':         { zh: '设计费用如何计算？', en: 'How are design fees calculated?' },
    'faq-a2':         { zh: '设计费用根据项目复杂度、服务内容与工作量综合评估。我们会在了解您的需求后，提供详细的报价方案。', en: 'Design fees are evaluated based on project complexity, service scope, and workload. We provide a detailed quotation after understanding your needs.' },
    'faq-q3':         { zh: '可以只做局部设计吗？', en: 'Can I request partial design services only?' },
    'faq-a3':         { zh: '可以。我们提供灵活的服务组合，您可以选择只做概念设计、结构优化、CMF设计等单项服务。', en: 'Yes. We offer flexible service combinations — you can choose individual services like concept design, structural optimization, or CMF design.' },
    'faq-q4':         { zh: '是否签署保密协议？', en: 'Do you sign NDAs?' },
    'faq-a4':         { zh: '当然。我们非常重视客户信息的保密性，项目启动前可签署NDA（保密协议），保障双方权益。', en: 'Absolutely. We take client confidentiality very seriously. NDAs can be signed before project kick-off to protect both parties.' },
    'faq-q5':         { zh: '手板制作在哪里完成？', en: 'Where is prototyping done?' },
    'faq-a5':         { zh: '永康基地配备完整的手板制作能力，小批量试产也可在当地完成。如有特殊工艺需求，我们也会协调最合适的供应链资源。', en: 'Our Yongkang base has complete prototyping capabilities, including small-batch pilot production. For special processes, we coordinate the best supply chain resources.' },
    'faq-q6':         { zh: '外地客户可以合作吗？', en: 'Can remote clients work with you?' },
    'faq-a6':         { zh: '完全可以。我们与多个地区的客户保持远程协作关系，视频会议、在线评审、项目管理系统一样不少。', en: 'Absolutely. We maintain remote collaboration with clients across multiple regions, with video meetings, online reviews, and project management systems.' },

    // ====== SERVICES PAGE ======
    'svc-p-label':    { zh: 'Services', en: 'Services' },
    'svc-p-title':    { zh: '设计服务', en: 'Design Services' },
    'svc-p-desc':     { zh: '覆盖产品全生命周期，从战略到执行的一站式设计解决方案', en: 'Full product lifecycle coverage — one-stop design solutions from strategy to execution' },
    'svc-1-p-title':  { zh: '工业设计', en: 'Industrial Design' },
    'svc-1-p-desc':   { zh: '从市场洞察到设计方案，我们提供完整的工业设计服务。无论是全新的产品开发还是现有产品的迭代升级，我们都能提供专业支持。', en: 'From market insights to design solutions, we provide complete industrial design services. Whether it\'s new product development or iterative upgrades, we deliver professional support.' },
    'svc-1-p-list':   { zh: '<li>✓ 产品调研与竞品分析</li><li>✓ 概念草图与方案探索</li><li>✓ 2D渲染与视觉呈现</li><li>✓ 3D建模与工程图输出</li><li>✓ CMF（色彩·材料·工艺）设计</li><li>✓ 人机工程学优化</li><li>✓ 设计规范文档</li>', en: '<li>✓ Product research & competitive analysis</li><li>✓ Concept sketches & exploration</li><li>✓ 2D rendering & visual presentation</li><li>✓ 3D modeling & engineering drawings</li><li>✓ CMF (Color·Material·Finish) design</li><li>✓ Ergonomic optimization</li><li>✓ Design specification documents</li>' },
    'svc-1-p-btn':    { zh: '获取报价', en: 'Get a Quote' },
    'svc-2-p-title':  { zh: '产品策略', en: 'Product Strategy' },
    'svc-2-p-desc':   { zh: '好的设计始于正确的策略。我们帮助客户找准市场定位，制定清晰的产品路线图，让每一分设计投入都有的放矢。', en: 'Good design starts with the right strategy. We help clients find their market positioning and define clear product roadmaps, ensuring every design investment is well-directed.' },
    'svc-2-p-list':   { zh: '<li>✓ 市场趋势研究与洞察</li><li>✓ 竞品分析与差异化定位</li><li>✓ 用户研究（问卷、访谈、观察）</li><li>✓ 产品定义与功能优先级</li><li>✓ 价格策略与成本分析</li><li>✓ 产品路线图规划</li>', en: '<li>✓ Market trend research & insights</li><li>✓ Competitive analysis & differentiation</li><li>✓ User research (surveys, interviews, observation)</li><li>✓ Product definition & feature prioritization</li><li>✓ Pricing strategy & cost analysis</li><li>✓ Product roadmap planning</li>' },
    'svc-2-p-btn':    { zh: '预约咨询', en: 'Book Consultation' },
    'svc-3-p-title':  { zh: '手板制作', en: 'Prototyping' },
    'svc-3-p-desc':   { zh: '依托永康完善的制造业生态，我们提供从快速原型到小批量试产的完整支持，让设计从图纸走向现实，提前验证量产可行性。', en: 'Leveraging Yongkang\'s manufacturing ecosystem, we provide complete support from rapid prototyping to small-batch production, bringing designs from paper to reality and validating mass production feasibility early.' },
    'svc-3-p-list':   { zh: '<li>✓ CNC数控加工</li><li>✓ 3D打印（SLA/SLS/FDM）</li><li>✓ 硅胶复模与低压灌注</li><li>✓ 快速钣金手板</li><li>✓ 表面处理（喷涂、电镀、氧化）</li><li>✓ DFM可制造性评审</li><li>✓ 小批量试产支持</li>', en: '<li>✓ CNC machining</li><li>✓ 3D printing (SLA/SLS/FDM)</li><li>✓ Silicone molding & low-pressure injection</li><li>✓ Rapid sheet metal prototyping</li><li>✓ Surface finishing (painting, plating, anodizing)</li><li>✓ DFM review</li><li>✓ Small-batch production support</li>' },
    'svc-3-p-btn':    { zh: '了解详情', en: 'Learn More' },
    'svc-4-p-title':  { zh: '品牌视觉', en: 'Brand Visual' },
    'svc-4-p-desc':   { zh: '设计不仅是产品本身，还包括产品呈现给世界的方式。我们帮助品牌建立统一的视觉语言，让每一处细节都传递品牌价值。', en: 'Design isn\'t just the product itself — it\'s how the product presents itself to the world. We help brands build unified visual languages, ensuring every detail communicates brand value.' },
    'svc-4-p-list':   { zh: '<li>✓ 品牌视觉识别系统（VIS）</li><li>✓ 产品Logo与铭牌设计</li><li>✓ 说明书与包装设计</li><li>✓ 展示物料与展会设计</li><li>✓ 电商主图与详情页设计</li><li>✓ 品牌官网视觉设计</li>', en: '<li>✓ Visual Identity System (VIS)</li><li>✓ Product logo & nameplate design</li><li>✓ Manual & packaging design</li><li>✓ Display materials & exhibition design</li><li>✓ E-commerce imagery & detail page design</li><li>✓ Brand website visual design</li>' },
    'svc-4-p-btn':    { zh: '合作咨询', en: 'Collaboration Inquiry' },

    // Expertise section
    'exp-label':      { zh: 'Expertise', en: 'Expertise' },
    'exp-title':      { zh: '专注领域', en: 'Areas of Expertise' },
    'exp-desc':       { zh: '20年深耕，我们对以下领域的产品开发有着深刻理解', en: '20+ years of deep experience — profound understanding of product development in these fields' },
    'exp-pt-title':   { zh: '电动工具', en: 'Power Tools' },
    'exp-pt-desc':    { zh: '冲击钻、电钻、角磨机、电锤、园林工具等。熟悉专业级与消费级产品的不同设计要求与成本控制。', en: 'Impact drills, drills, angle grinders, rotary hammers, garden tools, etc. Familiar with different design requirements and cost control for professional and consumer-grade products.' },
    'exp-ca-title':   { zh: '清洁家电', en: 'Cleaning Appliances' },
    'exp-ca-desc':    { zh: '扫地机器人、洗地机、吸尘器、蒸汽拖把等。专注于家居清洁场景的用户体验与产品可靠性设计。', en: 'Robot vacuums, mops, vacuum cleaners, steam mops, etc. Focused on user experience and product reliability for home cleaning scenarios.' },
    'exp-sd-title':   { zh: '智能设备', en: 'Smart Devices' },
    'exp-sd-desc':    { zh: '传感器模块、IoT设备、工业控制终端等。融合功能性与美观性，满足专业场景需求。', en: 'Sensor modules, IoT devices, industrial control terminals, etc. Combining functionality and aesthetics for professional scenarios.' },

    // Services CTA
    'svc-cta-label':  { zh: 'Get Started', en: 'Get Started' },
    'svc-cta-title':  { zh: '告诉我们您的需求', en: 'Tell Us About Your Needs' },
    'svc-cta-desc':   { zh: '无论是全新产品开发还是现有产品升级，我们都愿意倾听并提供专业建议', en: 'Whether it\'s new product development or product upgrade, we\'d love to listen and provide professional advice' },
    'svc-cta-btn':    { zh: '立即联系', en: 'Contact Us' },

    // ====== INSIGHTS PAGE ======
    'ins-header-label':{ zh: 'Insights', en: 'Insights' },
    'ins-header-title':{ zh: '设计洞察', en: 'Design Insights' },
    'ins-header-desc': { zh: '行业趋势、设计方法论、CMF研究、用户洞察——来自万摩星团队的深度观察与思考', en: 'Industry trends, design methodology, CMF research, user insights — deep observations from the OMT team' },
    'ins-feat-label':  { zh: '深度长文', en: 'Featured' },
    'ins-feat-title':  { zh: '[ 文章标题 ] 电动工具设计的人机工程学：如何让专业工具更易用', en: 'Ergonomics in Power Tool Design: Making Professional Tools Easier to Use' },
    'ins-feat-desc':   { zh: '[ 文章摘要 ] 从握持姿势到按键布局，从重心分布到振动控制，专业电动工具的人机工程学设计直接影响用户的工作效率与身体健康。本文将深入探讨电动工具设计中的人机工程学关键要点...', en: 'From grip posture to button layout, from weight distribution to vibration control — ergonomic design of professional power tools directly impacts user efficiency and health. This article explores key ergonomic considerations in power tool design...' },
    'ins-feat-info':   { zh: '2026年4月 · 顾老师', en: 'April 2026 · Mr. Gu' },
    'ins-tag-ergo':    { zh: '人机工程', en: 'Ergonomics' },
    'ins-tag-pt':      { zh: '电动工具', en: 'Power Tools' },
    'ins-tag-method':  { zh: '设计方法', en: 'Methodology' },
    'ins-latest-label':{ zh: 'Latest Articles', en: 'Latest Articles' },
    'ins-latest-title':{ zh: '最新文章', en: 'Latest Articles' },
    'ins-more':        { zh: '更多文章敬请期待', en: 'More articles coming soon' },

    'ins-1-title': { zh: '[ 文章标题 ] CMF趋势报告：2026年电动工具色彩与材料走向', en: 'CMF Trend Report: 2026 Power Tool Color & Material Directions' },
    'ins-1-desc':  { zh: '从哑光黑到金属橙，从再生塑料到碳纤维复合材料——电动工具的CMF设计正在经历一场悄然的革命。本文解析最新趋势...', en: 'From matte black to metallic orange, from recycled plastics to carbon fiber composites — power tool CMF design is undergoing a quiet revolution. This article analyzes the latest trends...' },
    'ins-1-tag1':  { zh: 'CMF', en: 'CMF' },
    'ins-1-tag2':  { zh: '趋势', en: 'Trends' },
    'ins-2-title': { zh: '[ 文章标题 ] 从贴牌到品牌：电动工具企业的设计转型路径', en: 'From OEM to Brand: Design Transformation Path for Power Tool Companies' },
    'ins-2-desc':  { zh: '中国是全球电动工具最大的生产制造基地，但大多数工厂仍停留在OEM阶段。如何通过设计驱动品牌升级？本文给出实战建议...', en: 'China is the world\'s largest power tool manufacturing base, but most factories remain at the OEM stage. How to drive brand upgrade through design? Practical advice in this article...' },
    'ins-2-tag1':  { zh: '品牌', en: 'Brand' },
    'ins-2-tag2':  { zh: '策略', en: 'Strategy' },
    'ins-3-title': { zh: '[ 文章标题 ] 清洁家电出海：从中国工厂到全球品牌的跨越', en: 'Cleaning Appliances Going Global: From Chinese Factory to Global Brand' },
    'ins-3-desc':  { zh: '扫地机器人、洗地机正在成为中国家电出海的明星品类。但要在欧洲、北美市场建立品牌认知，需要的不仅是产品力...', en: 'Robot vacuums and mops are becoming star categories for Chinese appliance exports. But building brand awareness in European and North American markets requires more than just product strength...' },
    'ins-3-tag1':  { zh: '出海', en: 'Going Global' },
    'ins-3-tag2':  { zh: '清洁家电', en: 'Cleaning' },
    'ins-4-title': { zh: '[ 文章标题 ] 手板验证为什么重要：避免量产翻车的第一道防线', en: 'Why Prototyping Matters: The First Line of Defense Against Mass Production Failures' },
    'ins-4-desc':  { zh: '很多设计问题只有在实际使用中才会暴露。手板制作是设计验证中不可省略的环节。本文详解如何高效利用手板验证...', en: 'Many design issues only surface during actual use. Prototyping is an indispensable part of design validation. This article details how to efficiently use prototype verification...' },
    'ins-4-tag1':  { zh: '手板', en: 'Prototyping' },
    'ins-4-tag2':  { zh: '工艺', en: 'Process' },
    'ins-5-title': { zh: '[ 文章标题 ] 用户访谈的陷阱：设计师常犯的5个错误', en: 'User Interview Pitfalls: 5 Common Mistakes Designers Make' },
    'ins-5-desc':  { zh: '用户访谈是产品设计中最有价值的研究方法之一，但也最容易产生误导。如何避免常见陷阱，获取真正有价值的设计洞察...', en: 'User interviews are one of the most valuable research methods, but also the most prone to misleading results. How to avoid common pitfalls and gain truly valuable design insights...' },
    'ins-5-tag1':  { zh: '用户研究', en: 'User Research' },
    'ins-5-tag2':  { zh: '方法论', en: 'Methodology' },
    'ins-6-title': { zh: '[ 文章标题 ] 为什么极简主义在电动工具设计中越来越流行', en: 'Why Minimalism Is Becoming Increasingly Popular in Power Tool Design' },
    'ins-6-desc':  { zh: '从博世到得伟，顶级电动工具品牌都在向更简洁的设计语言靠拢。这背后不仅是美学趋势，更是功能优化与成本控制的共同推动...', en: 'From Bosch to DeWalt, top power tool brands are moving toward cleaner design languages. Behind this is not just aesthetic trends, but the combined push of functional optimization and cost control...' },
    'ins-6-tag1':  { zh: '极简设计', en: 'Minimalism' },
    'ins-6-tag2':  { zh: '趋势', en: 'Trends' },

    // Insights CTA
    'ins-cta-label':  { zh: 'Subscribe', en: 'Subscribe' },
    'ins-cta-title':  { zh: '订阅设计洞察', en: 'Subscribe to Design Insights' },
    'ins-cta-desc':   { zh: '定期获取工业设计趋势、行业分析与实战案例——输入邮箱，订阅我们的 newsletter', en: 'Get regular industrial design trends, industry analysis and real-world cases — enter your email to subscribe' },
    'ins-cta-ph':     { zh: '输入您的邮箱地址', en: 'Enter your email address' },
    'ins-cta-btn':    { zh: '订阅', en: 'Subscribe' }
  };

  var currentLang = localStorage.getItem('omt-lang') || 'zh';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('omt-lang', lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // data-i18n: textContent
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (T[key] && T[key][lang] !== undefined) {
        el.textContent = T[key][lang];
      }
    });

    // data-i18n-html: innerHTML
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (T[key] && T[key][lang] !== undefined) {
        el.innerHTML = T[key][lang];
      }
    });

    // data-i18n-placeholder: placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (T[key] && T[key][lang] !== undefined) {
        el.placeholder = T[key][lang];
      }
    });

    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // Init on DOM ready
  function init() {
    // Bind switcher buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(this.dataset.lang);
      });
    });
    // Apply saved language
    setLang(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual use
  window.setLang = setLang;
})();

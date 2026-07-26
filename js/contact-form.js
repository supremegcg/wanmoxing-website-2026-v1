(function () {
  'use strict';

  const API_BASE = window.OMT_API_BASE || '';

  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = form.querySelector('.form-success');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const phone = form.querySelector('#phone').value.trim();
      const company = form.querySelector('#company').value.trim();
      const service = form.querySelector('#service').value;
      const budget = form.querySelector('#budget').value;
      const timeline = form.querySelector('#timeline').value;
      const source = form.querySelector('#source').value;
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        alert('请填写姓名、邮箱和项目需求描述。');
        return;
      }

      const extras = [];
      if (service) extras.push('感兴趣的服务：' + service);
      if (budget) extras.push('预计预算：' + budget);
      if (timeline) extras.push('期望周期：' + timeline);
      if (source) extras.push('了解渠道：' + source);
      let fullMessage = message;
      if (extras.length > 0) {
        fullMessage = fullMessage + '\n\n' + extras.join('\n');
      }

      const originalText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.innerText = '提交中...';

      try {
        const response = await fetch(`${API_BASE}/api/public/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            company: company,
            message: fullMessage,
          }),
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok) {
          form.reset();
          if (successMsg) {
            successMsg.classList.add('show');
            successMsg.style.textAlign = 'center';
            successMsg.style.padding = '1rem';
            successMsg.style.backgroundColor = '#1a3a2f';
            successMsg.style.borderRadius = '8px';
            successMsg.style.marginTop = '1rem';
          }
          // 隐藏表单字段
          form.querySelectorAll('.form-group, .form-row').forEach(el => {
            el.style.display = 'none';
          });
          submitBtn.style.display = 'none';
        } else {
          alert(result.error || '提交失败，请稍后重试。');
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      } catch (error) {
        console.error('Contact form error:', error);
        alert('网络异常，请检查网络后重试。');
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();

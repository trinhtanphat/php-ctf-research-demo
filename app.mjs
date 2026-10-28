import { commandFor, SCENARIOS } from './research.mjs';
const $ = (id) => document.getElementById(id);
const select = $('scenario');
const output = $('command-output');
const button = $('copy-command');
const feedback = $('copy-feedback');
if (select && output && button && feedback) {
  const refresh = () => {
    const scenario = SCENARIOS.includes(select.value) ? select.value : 'probe';
    output.textContent = commandFor(scenario);
    feedback.textContent = '';
  };
  select.addEventListener('change', refresh);
  button.addEventListener('click', async () => {
    const value = output.textContent;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard API unavailable');
      await navigator.clipboard.writeText(value);
      feedback.textContent = 'Đã sao chép lệnh ví dụ (không thực thi).';
    } catch {
      feedback.textContent = 'Trình duyệt không cho sao chép tự động. Hãy chọn và sao chép nội dung thủ công.';
    }
  });
  refresh();
}
const navButton = $('nav-toggle');
const mobileNav = $('mobile-nav');
if (navButton && mobileNav) {
  navButton.addEventListener('click', () => {
    const open = mobileNav.hidden;
    mobileNav.hidden = !open;
    navButton.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    mobileNav.hidden = true;
    navButton.setAttribute('aria-expanded', 'false');
  }));
}

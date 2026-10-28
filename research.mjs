export const OFFICIAL_HOST = 'php-rce.cloudflare.app';
export const OFFICIAL_TARGET = 'https://php-rce.cloudflare.app/php/index.php';
export const SAMPLE_SESSION = 'researchdemo00000000000000';
export const SCENARIOS = Object.freeze(['probe', 'scope', 'patch']);
export function inScope(url, method) {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && u.hostname === OFFICIAL_HOST && u.port === '' && u.pathname.startsWith('/php/') && u.username === '' && u.password === '' && method === 'POST';
  } catch { return false; }
}
export function commandFor(scenario) {
  if (!SCENARIOS.includes(scenario)) throw new TypeError('Unknown demo scenario');
  if (scenario === 'probe') {
    // Published by Cloudflare as a *non-exploit* example.
    return [
      '# OFFLINE EXAMPLE ONLY — DO NOT RUN WITHOUT ACCEPTING CTF RULES',
      "curl -i 'https://php-rce.cloudflare.app/php/index.php' \\",
      "  --cookie 'PHPSESSID=researchdemo00000000000000' \\",
      "  --form-string 'PHPSESSID=researchdemo00000000000000' \\",
      "  --form 'upload=@./payload.bin;filename=\"<?php echo 1337; ?>\"'",
      '',
      '# Demonstrates request format, NOT RCE or a WAF bypass.'
    ].join('\n');
  }
  if (scenario === 'scope') {
    return [
      '# SAFE SCOPE VERIFICATION — performed locally only',
      'Official hostname : https://php-rce.cloudflare.app',
      'Allowed path      : /php/*',
      'Allowed method    : POST',
      'Terms             : HackerOne + Cloudflare participation',
      'Stop on           : HTTP 429 / 503',
      'Never             : Scan / DoS / persistence / third-party sites'
    ].join('\n');
  }
  return [
    '# DEFENSIVE CHECKLIST — DO NOT INSTALL VULNERABLE PHP IN PROD',
    '[ ] Inventory PHP deployments and versions',
    '[ ] Confirm vendor security advisories and patched versions',
    '[ ] Update supported PHP branches to patched releases',
    '[ ] Account for later CVE-2026-115560 advisory',
    '[ ] Restart affected PHP worker pools during maintenance',
    '[ ] Review logs for suspicious upload-progress requests',
    '[ ] Validate application behavior in isolated staging'
  ].join('\n');
}

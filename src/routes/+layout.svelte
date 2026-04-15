<script lang="ts">
  import { onMount } from 'svelte';
  import './layout.css';

  let { children } = $props();

  // ─── Microsoft Clarity Injection ──────────────────────────────────────────
  // Injected inside onMount so it never runs during SSR rendering.
  // Replace YOUR_PROJECT_ID with your real Clarity project ID.
  const CLARITY_PROJECT_ID = 'YOUR_PROJECT_ID';

  onMount(() => {
    (function (c: Window & typeof globalThis, l: Document, a: string, r: string, i: string) {
      // @ts-ignore – Clarity bootstrap snippet (untyped on purpose)
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      // @ts-ignore
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = 'https://www.clarity.ms/tag/' + i;
      const y = l.getElementsByTagName(r)[0];
      y?.parentNode?.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
  });

  // ─── Dark-mode toggle state (persisted to localStorage) ───────────────────
  let dark = $state(true);

  onMount(() => {
    const stored = localStorage.getItem('clarity-lab-dark');
    dark = stored === null ? true : stored === 'true';
    applyTheme(dark);
  });

  function toggleDark() {
    dark = !dark;
    localStorage.setItem('clarity-lab-dark', String(dark));
    applyTheme(dark);
  }

  function applyTheme(isDark: boolean) {
    document.documentElement.classList.toggle('dark', isDark);
  }
</script>

<svelte:head>
  <title>ClarityUX Friction Lab</title>
  <meta name="description" content="A SvelteKit interaction lab designed to generate meaningful Microsoft Clarity behavioral analytics — rage clicks, dead clicks, quick backs, and scroll heatmaps." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<!-- ─── Nav bar ──────────────────────────────────────────────────────────── -->
<nav class="lab-nav" aria-label="Primary navigation">
  <div class="nav-inner">
    <div class="nav-brand">
      <span class="nav-logo" aria-hidden="true">⬡</span>
      <span class="nav-title">ClarityUX <span class="accent">Friction Lab</span></span>
      <span class="nav-badge">LIVE</span>
    </div>
    <div class="nav-actions">
      <span class="nav-hint">Microsoft Clarity demo · session data is real</span>
      <button
        id="dark-mode-toggle"
        class="theme-toggle"
        onclick={toggleDark}
        aria-label="Toggle dark mode"
        title="Toggle dark / light mode"
      >
        {dark ? '☀' : '🌙'}
      </button>
    </div>
  </div>
</nav>

<!-- ─── Page content ─────────────────────────────────────────────────────── -->
<main class="lab-main">
  {@render children()}
</main>

<!-- ─── Footer ───────────────────────────────────────────────────────────── -->
<footer class="lab-footer">
  <p>All interactions on this page are recorded by <strong>Microsoft Clarity</strong>. Data appears in the Clarity dashboard within minutes.</p>
  <p class="footer-links">
    <a href="https://clarity.microsoft.com" target="_blank" rel="noopener noreferrer">Open Clarity Dashboard ↗</a>
    &nbsp;·&nbsp;
    <a href="/" id="footer-home-link">Lab Home</a>
  </p>
</footer>

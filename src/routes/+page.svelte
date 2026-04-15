<script lang="ts">
  /**
   * Main Lab Dashboard — /
   *
   * Composes all four friction modules into a single scrollable page.
   * Each module is lazy-imported to keep the initial bundle small.
   */
  import RageButton   from '$lib/components/lab/RageButton.svelte';
  import DeadZone     from '$lib/components/lab/DeadZone.svelte';
  import ScrollContent from '$lib/components/lab/ScrollContent.svelte';
</script>

<svelte:head>
  <title>ClarityUX Friction Lab — Microsoft Clarity Demo</title>
  <meta name="description" content="An interactive SvelteKit lab generating real Microsoft Clarity data: Rage Clicks, Dead Clicks, Quick Backs, and scroll-depth heatmaps." />
</svelte:head>

<!-- ── Hero ──────────────────────────────────────────────────────────────── -->
<section class="lab-hero" aria-labelledby="hero-heading">
  <div class="hero-tags" role="list" aria-label="Friction types">
    <span class="hero-tag rage"  role="listitem">⚡ Rage Click</span>
    <span class="hero-tag dead"  role="listitem">🪤 Dead Click</span>
    <span class="hero-tag scroll" role="listitem">📜 Scroll Depth</span>
    <span class="hero-tag qback" role="listitem">↩ Quick Back</span>
  </div>
  <h1 id="hero-heading">ClarityUX<br/>Friction Lab</h1>
  <p>
    Every interaction on this page populates your
    <strong>Microsoft Clarity</strong> dashboard in real time.
    Use the modules below to trigger specific frustration signals and validate
    your analytics instrumentation.
  </p>
  <div class="hero-actions">
    <a
      id="hero-clarity-link"
      href="https://clarity.microsoft.com"
      target="_blank"
      rel="noopener noreferrer"
      class="btn-primary"
    >
      <span aria-hidden="true">⬡</span>
      Open Clarity Dashboard
    </a>
    <a
      id="hero-quick-back-link"
      href="/quick-back-test"
      class="btn-outline"
      aria-label="Go to Quick Back test sub-page"
    >
      ↩ Quick Back Test →
    </a>
  </div>
  <p class="hero-clarity-note">
    Don't have a project yet?
    <a href="https://clarity.microsoft.com/projects/create" target="_blank" rel="noopener noreferrer">
      Create one free ↗
    </a>
    — then replace <code>YOUR_PROJECT_ID</code> in <code>+layout.svelte</code>.
  </p>
</section>

<div class="divider" role="separator"></div>

<!-- ── Status bar ─────────────────────────────────────────────────────────── -->
<div class="status-bar" role="complementary" aria-label="Lab status">
  <div class="status-item">
    <span class="status-dot active" aria-hidden="true"></span>
    <span>Clarity script <strong>injected</strong></span>
  </div>
  <div class="status-item">
    <span class="status-dot active" aria-hidden="true"></span>
    <span>Session <strong>recording</strong></span>
  </div>
  <div class="status-item">
    <span class="status-dot active" aria-hidden="true"></span>
    <span><strong>4</strong> friction modules active</span>
  </div>
  <div class="status-item">
    <a href="/quick-back-test" class="status-link" id="status-qb-link">Module D → Quick Back Test</a>
  </div>
</div>

<div class="divider" role="separator"></div>

<!-- ── Modules grid ───────────────────────────────────────────────────────── -->
<div class="lab-grid" role="main" aria-label="Friction lab modules">
  <!-- Module A: Rage Click -->
  <RageButton />

  <!-- Module B: Dead Click -->
  <DeadZone />
</div>

<div class="divider" role="separator"></div>

<!-- Module C: Scroll heatmap — full width -->
<ScrollContent />

<div class="divider" role="separator"></div>

<!-- ── Module D: Quick Back CTA card ─────────────────────────────────────── -->
<section class="qb-cta lab-card" aria-labelledby="qb-cta-heading">
  <div class="section-header">
    <span class="module-index">MODULE D</span>
    <div>
      <h2 class="section-title" id="qb-cta-heading">↩ Quick Back Flow</h2>
      <p class="section-desc">
        Navigate to the "Search Results" sub-page below. The page serves intentionally
        irrelevant content — hit browser Back within 2 s to trigger Clarity's
        <strong>Quick Back</strong> insight.
      </p>
    </div>
  </div>

  <div class="qb-cta-stage">
    <div class="qb-steps">
      <div class="qb-step">
        <span class="step-num">1</span>
        <span>Click the link below to go to the Search Results page</span>
      </div>
      <div class="qb-step">
        <span class="step-num">2</span>
        <span>Notice the irrelevant results — nothing matches your intent</span>
      </div>
      <div class="qb-step">
        <span class="step-num">3</span>
        <span>Hit the browser Back button within ~2 seconds</span>
      </div>
      <div class="qb-step">
        <span class="step-num">4</span>
        <span>Clarity records this as a <strong>Quick Back</strong> frustration signal</span>
      </div>
    </div>

    <a
      id="quick-back-cta-btn"
      href="/quick-back-test"
      class="btn-primary qb-btn"
      aria-label="Go to the Quick Back test sub-page"
    >
      <span aria-hidden="true">🔍</span>
      Go to Search Results
    </a>

    <div class="clarity-tag">clarity("set", "friction_type", "quick_back_test_active")</div>
  </div>

  <div class="friction-note" style="margin-top: 1rem; border-color: hsl(258,80%,65%,0.2); background: hsl(258,80%,65%,0.06);">
    <span class="note-icon" aria-hidden="true">📊</span>
    <span>Quick Back appears in <em>Clarity → Smart Events → Navigation Frustration</em>. It indicates users found the destination page misleading or unhelpful.</span>
  </div>
</section>

<style>
  /* ── Hero ─────────────────────────────────────────────────────────── */
  .hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 0.72rem 1.4rem;
    text-decoration: none;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
  }
  .btn-outline:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: hsl(258, 80%, 65%, 0.06);
    text-decoration: none;
  }

  .hero-clarity-note {
    font-size: 0.78rem;
    color: var(--text-dim);
  }
  .hero-clarity-note a { color: var(--text-muted); }
  .hero-clarity-note code {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 5px;
    color: var(--accent-2);
  }

  /* ── Status bar ───────────────────────────────────────────────────── */
  .status-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 0.85rem 1.5rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .status-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .status-dot.active {
    background: var(--success);
    box-shadow: 0 0 6px hsl(145, 65%, 48%, 0.6);
    animation: pulse-status 2s ease-in-out infinite;
  }
  @keyframes pulse-status {
    0%, 100% { box-shadow: 0 0 6px hsl(145, 65%, 48%, 0.6); }
    50%       { box-shadow: 0 0 12px hsl(145, 65%, 48%, 0.9); }
  }

  .status-item strong { color: var(--text); }
  .status-link {
    color: var(--accent);
    font-weight: 600;
    font-size: 0.8rem;
    transition: opacity 0.2s;
  }
  .status-link:hover { opacity: 0.75; text-decoration: none; }

  /* ── Module D CTA ─────────────────────────────────────────────────── */
  .qb-cta { border-top: 3px solid var(--accent); }

  .qb-cta-stage {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--bg-card-2);
    border-radius: var(--radius-md);
    margin: 1.25rem 0;
  }

  .qb-steps {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    width: 100%;
  }

  .qb-step {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.84rem;
    color: var(--text-muted);
  }
  .qb-step strong { color: var(--text); }

  .step-num {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: hsl(258, 80%, 65%, 0.15);
    border: 1px solid hsl(258, 80%, 65%, 0.35);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 700;
    display: grid;
    place-items: center;
    margin-top: 1px;
  }

  .qb-btn { margin-top: 0.25rem; }

  .friction-note {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.85rem 1rem;
    border: 1px solid;
    border-radius: var(--radius-md);
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  .note-icon { font-size: 1rem; flex-shrink: 0; }
</style>

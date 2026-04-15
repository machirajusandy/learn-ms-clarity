<script lang="ts">
  /**
   * Quick Back Test — /quick-back-test
   *
   * This sub-page intentionally contains mismatched / irrelevant content
   * to prompt users to hit the browser Back button within 2 seconds.
   * Clarity detects this pattern as a "Quick Back" — a navigation signal
   * indicating misleading links or poor landing-page relevance.
   *
   * Clarity custom tag: clarity("set", "friction_type", "quick_back_test_active")
   */
  import { onMount } from 'svelte';
  import { tagFriction, clarityEvent } from '$lib/clarity';

  // Timer ticking since the user arrived on this page.
  let elapsed = $state(0);
  let timer: ReturnType<typeof setInterval>;

  onMount(() => {
    tagFriction('quick_back_test_active');
    clarityEvent('quick_back_page_viewed');

    timer = setInterval(() => {
      elapsed++;
    }, 1000);

    return () => clearInterval(timer);
  });

  function formatTime(s: number): string {
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  // If user stays longer than 2 s the "quick back" window has technically closed.
  let quickBackWindow = $derived(elapsed < 3);

  const results = [
    { title: 'Enterprise Database Clustering Topology',     relevance: '12% match', date: '3 days ago',  tags: ['sql', 'ha', 'clustering'] },
    { title: 'Kubernetes Ingress Controller Benchmarks',    relevance: '8% match',  date: '1 week ago',  tags: ['k8s', 'nginx', 'benchmark'] },
    { title: 'Tax Filing Regulations — Q4 EMEA',           relevance: '4% match',  date: '2 weeks ago', tags: ['legal', 'compliance', 'eu'] },
    { title: 'Cloud Cost Allocation Best Practices',        relevance: '19% match', date: '5 days ago',  tags: ['aws', 'cost', 'finops'] },
    { title: 'Social Media Algorithm Updates 2026',         relevance: '2% match',  date: '1 month ago', tags: ['social', 'marketing', 'seo'] },
  ];
</script>

<svelte:head>
  <title>Search Results — ClarityUX Friction Lab</title>
  <meta name="description" content="Quick Back test sub-page — intentionally irrelevant search results to trigger Clarity Quick Back signal." />
</svelte:head>

<div class="qb-page">
  <!-- Timer badge -->
  <div class="qb-timer-row">
    <div class="qb-timer {quickBackWindow ? 'window-open' : 'window-closed'}">
      <span class="timer-dot" aria-hidden="true"></span>
      Time on page: <strong>{formatTime(elapsed)}</strong>
      {#if quickBackWindow}
        — Quick Back window <span class="open-label">OPEN</span>
      {:else}
        — Quick Back window <span class="closed-label">CLOSED (stayed {formatTime(elapsed)})</span>
      {/if}
    </div>
    <a href="/" id="back-home-btn" class="btn-back">
      ← Back to Lab
    </a>
  </div>

  <!-- Fake search header -->
  <div class="qb-search-header">
    <h1>Search Results</h1>
    <div class="fake-search-bar" aria-hidden="true">
      <span class="search-icon">⌕</span>
      <span class="search-query">clarity ux friction signals</span>
      <span class="search-count">About 5 results (0.42 seconds)</span>
    </div>
  </div>

  <!-- Irrelevant results -->
  <div class="results-list" role="list">
    {#each results as result, i}
      <div class="result-card" role="listitem" id="result-card-{i}">
        <div class="result-meta">
          <span class="result-relevance low">{result.relevance}</span>
          <span class="result-date">{result.date}</span>
        </div>
        <h2 class="result-title">{result.title}</h2>
        <p class="result-snippet">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
          nisi vel augue bibendum, non fringilla nisl tincidunt. Nulla facilisi.
          Vestibulum efficitur lorem at erat fermentum, non vestibulum lorem
          mollis. Sed elementum, est ac egestas convallis.
        </p>
        <div class="result-tags">
          {#each result.tags as tag}
            <span class="result-tag">{tag}</span>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- Clarity explanation -->
  <div class="qb-info-box">
    <div class="qb-info-header">
      <span aria-hidden="true">📊</span>
      What Clarity sees on this page
    </div>
    <ul class="qb-info-list">
      <li>
        <strong>Quick Back detected</strong> when the user navigates away within <strong>~2 s</strong>
        of arriving. Check <em>Clarity → Recordings → Filters → Frustration = Quick Back</em>.
      </li>
      <li>
        The <strong>Quick Back</strong> indicates this link was misleading — the results
        shown don't match user intent. Clarity surfaces this in the Smart Events section.
      </li>
      <li>
        Session is tagged <code>friction_type = quick_back_test_active</code> for easy
        dashboard filtering.
      </li>
    </ul>
    <div class="clarity-tag">clarity("set", "friction_type", "quick_back_test_active")</div>
  </div>
</div>

<style>
  .qb-page {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 780px;
    margin: 0 auto;
  }

  /* ── Timer ─────────────────────────────────────────────────────────── */
  .qb-timer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .qb-timer {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 0.45rem 1rem;
    border-radius: 100px;
    border: 1px solid;
    transition: background 0.4s, border-color 0.4s, color 0.4s;
  }

  .qb-timer.window-open {
    color: var(--danger);
    border-color: hsl(0, 80%, 62%, 0.4);
    background: hsl(0, 80%, 62%, 0.08);
  }
  .qb-timer.window-closed {
    color: var(--success);
    border-color: hsl(145, 65%, 48%, 0.4);
    background: hsl(145, 65%, 48%, 0.08);
  }

  .timer-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  .open-label   { color: var(--danger);  font-weight: 700; }
  .closed-label { color: var(--success); font-weight: 700; }

  .btn-back {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 0.55rem 1.1rem;
    text-decoration: none;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
  }
  .btn-back:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: hsl(258, 80%, 65%, 0.06);
    text-decoration: none;
  }

  /* ── Search header ─────────────────────────────────────────────────── */
  .qb-search-header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .qb-search-header h1 {
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text);
  }

  .fake-search-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 1rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }

  .search-icon { font-size: 1.1rem; color: var(--text-dim); }
  .search-query { font-family: var(--font-mono); font-size: 0.85rem; color: var(--text); flex: 1; }
  .search-count { font-size: 0.75rem; color: var(--text-dim); white-space: nowrap; }

  /* ── Result cards ──────────────────────────────────────────────────── */
  .results-list { display: flex; flex-direction: column; gap: 0.85rem; }

  .result-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.1rem 1.3rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    transition: border-color 0.2s;
  }
  .result-card:hover { border-color: hsl(258, 40%, 40%); }

  .result-meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
  }

  .result-relevance.low {
    color: var(--danger);
    background: hsl(0, 80%, 62%, 0.08);
    border: 1px solid hsl(0, 80%, 62%, 0.25);
    border-radius: 100px;
    padding: 1px 8px;
  }

  .result-date { color: var(--text-dim); }

  .result-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--accent-2);
    letter-spacing: -0.01em;
  }

  .result-snippet {
    font-size: 0.8rem;
    color: var(--text-muted);
    line-height: 1.65;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .result-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .result-tag {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    padding: 2px 7px;
    border-radius: 100px;
    background: var(--bg-card-2);
    border: 1px solid var(--border);
    color: var(--text-muted);
  }

  /* ── Info box ──────────────────────────────────────────────────────── */
  .qb-info-box {
    background: hsl(258, 30%, 14%);
    border: 1px solid hsl(258, 40%, 30%);
    border-radius: var(--radius-lg);
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  html:not(.dark) .qb-info-box {
    background: hsl(258, 30%, 96%);
    border-color: hsl(258, 40%, 80%);
  }

  .qb-info-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--accent);
  }

  .qb-info-list {
    padding-left: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    line-height: 1.65;
  }
  .qb-info-list strong { color: var(--text); }
  .qb-info-list code {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    background: var(--bg-card-2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 5px;
    color: var(--accent-2);
  }
</style>

<script lang="ts">
  /**
   * ScrollContent — Module C
   *
   * A long-form "technical article" with embedded code blocks and Copy Code
   * buttons. Designed to:
   *  1. Generate scroll-depth data in Clarity heatmaps.
   *  2. Register click heatmap activity on the Copy buttons.
   *
   * Clarity custom tag: clarity("set", "friction_type", "scroll_depth_test_active")
   */
  import { onMount } from 'svelte';
  import { tagFriction, clarityEvent } from '$lib/clarity';

  onMount(() => {
    tagFriction('scroll_depth_test_active');
  });

  // Per-snippet copy state
  let copied: Record<string, boolean> = $state({});

  function copyCode(id: string, code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    clarityEvent(`copy_code_${id}`);
    copied = { ...copied, [id]: true };
    setTimeout(() => {
      copied = { ...copied, [id]: false };
    }, 1800);
  }

  const snippets = [
    {
      id: 'snippet-init',
      lang: 'typescript',
      label: 'clarity-init.ts',
      code: `// 1. Inject Clarity inside onMount (SSR-safe)
import { onMount } from 'svelte';

onMount(() => {
  (function (c, l, a, r, i) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
    const t = l.createElement(r);
    t.async = true;
    t.src = 'https://www.clarity.ms/tag/' + i;
    l.head.appendChild(t);
  })(window, document, 'clarity', 'script', 'YOUR_PROJECT_ID');
});`,
    },
    {
      id: 'snippet-tag',
      lang: 'typescript',
      label: 'custom-tag.ts',
      code: `// 2. Tag sessions with custom dimensions
window.clarity('set', 'friction_type', 'rage_test_active');
window.clarity('set', 'user_cohort',   'beta_testers');
window.clarity('set', 'plan',          'enterprise');`,
    },
    {
      id: 'snippet-event',
      lang: 'typescript',
      label: 'events.ts',
      code: `// 3. Fire named events (show up as markers in replays)
window.clarity('event', 'checkout_started');
window.clarity('event', 'rage_button_clicked');
window.clarity('event', 'form_abandoned');`,
    },
    {
      id: 'snippet-identify',
      lang: 'typescript',
      label: 'identify.ts',
      code: `// 4. Identify users for cross-session correlation
window.clarity('identify',
  'user_7a3f',          // customUserId
  'session_c91b',       // customSessionId (optional)
  'page_checkout',      // customPageId   (optional)
  'Alice — Enterprise'  // friendlyName   (optional)
);`,
    },
    {
      id: 'snippet-upgrade',
      lang: 'typescript',
      label: 'upgrade.ts',
      code: `// 5. Force-record important sessions (bypass sampling)
window.clarity('upgrade', 'User reached checkout step 3');
window.clarity('upgrade', 'Error boundary triggered');`,
    },
  ] as const;

  type SnippetId = typeof snippets[number]['id'];
</script>

<div class="lab-card scroll-card">
  <div class="section-header">
    <span class="module-index">MODULE C</span>
    <div>
      <h2 class="section-title">📜 Engagement Heatmap Doc</h2>
      <p class="section-desc">
        Scroll through this technical article. Clarity records your <strong>scroll depth</strong> and every <strong>Copy Code</strong> click appears in the session heatmap.
      </p>
    </div>
  </div>

  <div class="clarity-tag" style="margin-bottom: 1rem;">
    clarity("set", "friction_type", "scroll_depth_test_active")
  </div>

  <!-- Long-form article in a constrained scroll container -->
  <div class="scroll-doc" id="scroll-doc-container">

    <article class="doc-article">
      <h3>Microsoft Clarity Integration Guide</h3>
      <p class="doc-lead">
        This guide walks through instrumenting a SvelteKit application with
        Microsoft Clarity to capture real behavioral session data — rage clicks,
        dead clicks, quick-back navigation, and scroll depth heatmaps.
      </p>

      <h4>1. Why Clarity?</h4>
      <p>
        Traditional analytics (page views, bounce rate) tell you <em>that</em>
        users leave — Clarity shows <em>why</em>. Session replays reconstruct
        the exact mouse path, scroll position, and click target for every
        recorded session. The free tier includes unlimited sessions.
      </p>

      <!-- Snippet 1 -->
      <p>Start by injecting the Clarity snippet. Always wrap it in <code>onMount</code> to prevent execution during SvelteKit's server-side render pass:</p>
      <div class="code-block">
        <div class="code-header">
          <span class="code-lang">{snippets[0].lang.toUpperCase()} · {snippets[0].label}</span>
          <button
            id="copy-btn-{snippets[0].id}"
            class="btn-copy {copied[snippets[0].id] ? 'copied' : ''}"
            onclick={() => copyCode(snippets[0].id, snippets[0].code)}
          >{copied[snippets[0].id] ? '✓ Copied' : 'Copy'}</button>
        </div>
        <pre class="code-body">{snippets[0].code}</pre>
      </div>

      <h4>2. Custom Tags (Session Dimensions)</h4>
      <p>
        Custom tags let you slice your Clarity data by any key/value pair.
        Apply them immediately after a meaningful user action — landing on a
        feature, completing checkout, or entering a friction zone:
      </p>
      <div class="code-block">
        <div class="code-header">
          <span class="code-lang">{snippets[1].lang.toUpperCase()} · {snippets[1].label}</span>
          <button
            id="copy-btn-{snippets[1].id}"
            class="btn-copy {copied[snippets[1].id] ? 'copied' : ''}"
            onclick={() => copyCode(snippets[1].id, snippets[1].code)}
          >{copied[snippets[1].id] ? '✓ Copied' : 'Copy'}</button>
        </div>
        <pre class="code-body">{snippets[1].code}</pre>
      </div>

      <h4>3. Named Events</h4>
      <p>
        Events appear as vertical markers in the session replay timeline. Use
        them to bookmark the exact moment a user starts a checkout flow,
        encounters an error, or triggers a frustration signal:
      </p>
      <div class="code-block">
        <div class="code-header">
          <span class="code-lang">{snippets[2].lang.toUpperCase()} · {snippets[2].label}</span>
          <button
            id="copy-btn-{snippets[2].id}"
            class="btn-copy {copied[snippets[2].id] ? 'copied' : ''}"
            onclick={() => copyCode(snippets[2].id, snippets[2].code)}
          >{copied[snippets[2].id] ? '✓ Copied' : 'Copy'}</button>
        </div>
        <pre class="code-body">{snippets[2].code}</pre>
      </div>

      <h4>4. User Identification</h4>
      <p>
        Identify users with your own ID to correlate Clarity sessions with your
        database. This is purely client-side — do <strong>not</strong> pass
        sensitive PII. Use an opaque internal user hash instead:
      </p>
      <div class="code-block">
        <div class="code-header">
          <span class="code-lang">{snippets[3].lang.toUpperCase()} · {snippets[3].label}</span>
          <button
            id="copy-btn-{snippets[3].id}"
            class="btn-copy {copied[snippets[3].id] ? 'copied' : ''}"
            onclick={() => copyCode(snippets[3].id, snippets[3].code)}
          >{copied[snippets[3].id] ? '✓ Copied' : 'Copy'}</button>
        </div>
        <pre class="code-body">{snippets[3].code}</pre>
      </div>

      <h4>5. Session Upgrade (Bypass Sampling)</h4>
      <p>
        Clarity samples sessions to manage storage costs. When a user hits a
        critical path (error page, payment screen), force-record the session:
      </p>
      <div class="code-block">
        <div class="code-header">
          <span class="code-lang">{snippets[4].lang.toUpperCase()} · {snippets[4].label}</span>
          <button
            id="copy-btn-{snippets[4].id}"
            class="btn-copy {copied[snippets[4].id] ? 'copied' : ''}"
            onclick={() => copyCode(snippets[4].id, snippets[4].code)}
          >{copied[snippets[4].id] ? '✓ Copied' : 'Copy'}</button>
        </div>
        <pre class="code-body">{snippets[4].code}</pre>
      </div>

      <h4>6. Reading the Heatmap Data</h4>
      <p>
        Navigate to <strong>Clarity → Heatmaps</strong> and select this page's
        URL. The click heatmap overlays click density directly on a screenshot
        of the live page. The scroll heatmap shows the percentage of sessions
        that reached each vertical point on the page — this very paragraph is
        designed to be a scroll depth milestone.
      </p>
      <p>
        Heatmap data typically populates within 15–30 minutes of real user
        interactions. For immediate feedback during demos, use the Session
        Replays tab to watch individual recordings in real time.
      </p>

      <div class="doc-end-marker" aria-hidden="true">
        — End of document · Scroll depth 100% reached —
      </div>
    </article>
  </div>

  <div class="friction-note" style="margin-top:1rem; border-color:hsl(195,90%,55%,0.2); background:hsl(195,90%,55%,0.06);">
    <span class="note-icon" aria-hidden="true">📊</span>
    <span>Every <strong>Copy</strong> button click and your current scroll depth are tracked in Clarity. Check <em>Heatmaps → Click / Scroll</em> for this page's data.</span>
  </div>
</div>

<style>
  .scroll-card { border-top: 3px solid var(--accent-2); }

  .doc-article {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding-bottom: 1rem;
  }

  .doc-article h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.02em;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.6rem;
  }

  .doc-article h4 {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--accent-2);
    margin-top: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .doc-lead {
    font-size: 0.88rem;
    color: var(--text-muted);
    line-height: 1.7;
    border-left: 3px solid var(--accent);
    padding-left: 0.85rem;
  }

  .doc-article p {
    font-size: 0.84rem;
    color: var(--text-muted);
    line-height: 1.75;
  }

  .doc-article code {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    background: var(--bg-card-2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 5px;
    color: var(--accent-2);
  }

  .doc-end-marker {
    text-align: center;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-dim);
    padding: 1.2rem 0;
    border-top: 1px dashed var(--border);
    margin-top: 0.5rem;
  }

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
  .friction-note strong { color: var(--text); }
</style>

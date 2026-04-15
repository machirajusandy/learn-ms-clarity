<script lang="ts">
  /**
   * DeadZone — Module B
   *
   * An information card styled exactly like a clickable button (hover effects,
   * cursor-pointer, visual affordance) but with NO bound click handler.
   * Clarity will flag these as Dead Clicks — elements that look interactive
   * but produce no DOM change on interaction.
   *
   * Clarity custom tag: clarity("set", "friction_type", "dead_zone_test_active")
   */
  import { onMount } from 'svelte';
  import { tagFriction, clarityEvent } from '$lib/clarity';

  onMount(() => {
    tagFriction('dead_zone_test_active');
  });

  // We track native pointer-events via JS only for the "you've been fooled"
  // tooltip — we do NOT attach an onclick to the dead cards themselves.
  let hintVisible = $state(false);
  let hintTimer: ReturnType<typeof setTimeout> | null = null;

  function onContainerClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    // Only react if the click was on or inside a .dead-card, not the label.
    if (target.closest('.dead-card')) {
      clarityEvent('dead_zone_clicked');
      hintVisible = true;
      clearTimeout(hintTimer!);
      hintTimer = setTimeout(() => { hintVisible = false; }, 2800);
    }
  }
</script>

<div class="lab-card dead-card-wrapper">
  <div class="section-header">
    <span class="module-index">MODULE B</span>
    <div>
      <h2 class="section-title">🪤 Dead Click Zone</h2>
      <p class="section-desc">
        These cards look like buttons — hover effects, <code>cursor: pointer</code>, even a chevron — but clicking them does <strong>nothing</strong>. Clarity logs these as <strong>Dead Clicks</strong>.
      </p>
    </div>
  </div>

  <!-- Hint toast -->
  {#if hintVisible}
    <div class="dead-hint" role="alert" aria-live="polite">
      <span aria-hidden="true">⚠️</span>
      Nothing happened — that's the point! Clarity just logged a Dead Click.
    </div>
  {/if}

  <!-- Click events bubble up to this container wrapper so we can track them -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="dead-grid" onclick={onContainerClick}>
    <!-- Card 1 -->
    <div class="dead-card" id="dead-card-api-docs" role="button" tabindex="0" aria-label="View API Documentation (non-functional demo)">
      <div class="dead-card-icon" style="color: hsl(195,90%,55%)">⚡</div>
      <div class="dead-card-body">
        <strong>API Documentation</strong>
        <p>View the full REST API reference with examples.</p>
      </div>
      <span class="dead-card-chevron" aria-hidden="true">›</span>
    </div>

    <!-- Card 2 -->
    <div class="dead-card" id="dead-card-changelog" role="button" tabindex="0" aria-label="Changelog (non-functional demo)">
      <div class="dead-card-icon" style="color: hsl(145,65%,48%)">📋</div>
      <div class="dead-card-body">
        <strong>Changelog</strong>
        <p>See what's new in the latest release.</p>
      </div>
      <span class="dead-card-chevron" aria-hidden="true">›</span>
    </div>

    <!-- Card 3 -->
    <div class="dead-card" id="dead-card-sdk" role="button" tabindex="0" aria-label="Download SDK (non-functional demo)">
      <div class="dead-card-icon" style="color: hsl(258,80%,65%)">📦</div>
      <div class="dead-card-body">
        <strong>Download SDK</strong>
        <p>Get the full client SDK package for your platform.</p>
      </div>
      <span class="dead-card-chevron" aria-hidden="true">›</span>
    </div>

    <!-- Card 4 -->
    <div class="dead-card" id="dead-card-status" role="button" tabindex="0" aria-label="System Status (non-functional demo)">
      <div class="dead-card-icon" style="color: hsl(38,95%,60%)">🔔</div>
      <div class="dead-card-body">
        <strong>System Status</strong>
        <p>Check service health and incident history.</p>
      </div>
      <span class="dead-card-chevron" aria-hidden="true">›</span>
    </div>
  </div>

  <div class="clarity-tag">clarity("set", "friction_type", "dead_zone_test_active")</div>

  <div class="friction-note" style="margin-top: 1rem; border-color: hsl(38,95%,60%,0.2); background: hsl(38,95%,60%,0.06);">
    <span class="note-icon" aria-hidden="true">📊</span>
    <span>Clarity flags clicks where the DOM does not change within ~1 s after interaction. The Frustration Signals dashboard will show these as <strong>Dead Clicks</strong>.</span>
  </div>
</div>

<style>
  .dead-card-wrapper { border-top: 3px solid var(--warning); }

  .dead-hint {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.1rem;
    margin-bottom: 1rem;
    background: hsl(38, 95%, 60%, 0.1);
    border: 1px solid hsl(38, 95%, 60%, 0.35);
    border-radius: var(--radius-md);
    font-size: 0.83rem;
    color: var(--warning);
    animation: slide-in 0.25s ease;
  }
  @keyframes slide-in {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .dead-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.85rem;
    margin: 1.25rem 0;
  }

  /* This is the key — it looks like a button but has NO click handler */
  .dead-card {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1rem 1.15rem;
    background: var(--bg-card-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;           /* ← visual affordance, no handler */
    transition: background 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }

  .dead-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 60%, hsl(258, 80%, 65%, 0.04));
    pointer-events: none;
  }

  .dead-card:hover {
    background: var(--bg-hover);
    border-color: hsl(258, 40%, 42%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px hsl(222, 22%, 4%, 0.4);
  }
  .dead-card:active {
    transform: scale(0.98);
  }

  .dead-card-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    line-height: 1;
  }

  .dead-card-body {
    flex: 1;
    min-width: 0;
  }
  .dead-card-body strong {
    display: block;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 2px;
  }
  .dead-card-body p {
    font-size: 0.75rem;
    color: var(--text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dead-card-chevron {
    font-size: 1.3rem;
    color: var(--text-dim);
    flex-shrink: 0;
    transition: transform 0.2s, color 0.2s;
  }
  .dead-card:hover .dead-card-chevron {
    transform: translateX(3px);
    color: var(--accent);
  }

  /* Reuse shared styles from layout.css */
  .friction-note {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.85rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  .note-icon { font-size: 1rem; flex-shrink: 0; }
  .friction-note strong { color: var(--text); }
</style>

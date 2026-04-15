<script lang="ts">
  /**
   * RageButton — Module A
   *
   * Simulates a slow async action (3-second delay) to frustrate users into
   * clicking repeatedly, generating Rage Click events in Microsoft Clarity.
   *
   * Clarity custom tag fired: clarity("set", "friction_type", "rage_test_active")
   */
  import { onMount } from 'svelte';
  import { tagFriction, clarityEvent } from '$lib/clarity';

  type State = 'idle' | 'loading' | 'success' | 'error';

  let state: State = $state('idle');
  let clickCount = $state(0);
  let progress = $state(0);

  let progressTimer: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    // Tag session as soon as the component mounts (user sees the module).
    tagFriction('rage_test_active');
  });

  function handleClick() {
    clickCount++;

    // Emit a Clarity event for every individual click attempt.
    clarityEvent('rage_button_clicked');

    // If already loading, do nothing (the whole point — users keep clicking).
    if (state === 'loading') return;

    state = 'loading';
    progress = 0;

    // Simulate a slow API call with animated progress bar.
    progressTimer = setInterval(() => {
      progress = Math.min(progress + (100 / 30), 100);
    }, 100);

    setTimeout(() => {
      clearInterval(progressTimer!);
      progress = 100;
      state = 'success';
      clarityEvent('rage_button_success');

      // Reset after 2 s to allow re-triggering.
      setTimeout(() => {
        state = 'idle';
        progress = 0;
        clickCount = 0;
      }, 2000);
    }, 3000);
  }

  const stateLabel: Record<State, string> = {
    idle:    'IDLE',
    loading: 'PROCESSING',
    success: 'DONE',
    error:   'ERROR',
  };
</script>

<div class="lab-card rage-card">
  <div class="section-header">
    <span class="module-index">MODULE A</span>
    <div>
      <h2 class="section-title">⚡ Rage Click Zone</h2>
      <p class="section-desc">
        Clicks the button? It takes 3 seconds to respond. Clarity will detect and flag repeated rapid clicks as <strong>Rage Clicks</strong>.
      </p>
    </div>
  </div>

  <div class="rage-stage">
    <!-- Status indicator -->
    <span class="status-pill {state === 'loading' ? 'active' : state === 'success' ? 'success' : 'idle'}">
      <span class="pill-dot" aria-hidden="true"></span>
      {stateLabel[state]}
    </span>

    <!-- Main button -->
    <button
      id="rage-submit-btn"
      class="rage-btn {state}"
      onclick={handleClick}
      aria-label="Submit data – slow response to trigger rage clicks"
    >
      {#if state === 'loading'}
        <span class="spinner" aria-hidden="true"></span>
        Submitting…
      {:else if state === 'success'}
        <span aria-hidden="true">✓</span>
        Data Submitted!
      {:else}
        <span aria-hidden="true">→</span>
        Submit Data
      {/if}
    </button>

    <!-- Progress bar (visible during loading) -->
    {#if state === 'loading'}
      <div class="progress-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        <div class="progress-fill" style="width: {progress}%"></div>
      </div>
    {/if}

    <!-- Click counter — visible after first click -->
    {#if clickCount > 0}
      <p class="click-counter">
        Button clicked <span>{clickCount}</span> time{clickCount !== 1 ? 's' : ''} this session
        {#if clickCount >= 3}
          — <span style="color: var(--warning);">Rage Click threshold likely met ⚠</span>
        {/if}
      </p>
    {/if}

    <!-- Clarity tag display -->
    <div class="clarity-tag">clarity("set", "friction_type", "rage_test_active")</div>
  </div>

  <div class="friction-note">
    <span class="note-icon" aria-hidden="true">📊</span>
    <span>Clarity detects <strong>≥3 rapid clicks</strong> on the same element as a Rage Click. Check the <em>Frustration Signals</em> card in your dashboard.</span>
  </div>
</div>

<style>
  .rage-card { border-top: 3px solid var(--danger); }

  .rage-stage {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1.5rem;
    background: var(--bg-card-2);
    border-radius: var(--radius-md);
    margin: 1.25rem 0;
  }

  .rage-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: var(--font-sans);
    font-size: 0.95rem;
    font-weight: 700;
    border: none;
    border-radius: var(--radius-md);
    padding: 0.85rem 2rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.12s, box-shadow 0.2s;
    user-select: none;
    min-width: 180px;
    justify-content: center;
  }

  .rage-btn.idle {
    background: linear-gradient(135deg, hsl(0, 78%, 58%), hsl(0, 78%, 48%));
    color: #fff;
    box-shadow: 0 4px 18px hsl(0, 78%, 58%, 0.4);
  }
  .rage-btn.idle:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px hsl(0, 78%, 58%, 0.55);
  }
  .rage-btn.loading {
    background: hsl(220, 12%, 22%);
    color: var(--text-muted);
    cursor: not-allowed;
    box-shadow: none;
  }
  .rage-btn.success {
    background: linear-gradient(135deg, hsl(145, 60%, 42%), hsl(145, 60%, 35%));
    color: #fff;
    box-shadow: 0 4px 18px hsl(145, 60%, 42%, 0.4);
    cursor: default;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid hsl(220, 12%, 38%);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .pill-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    display: inline-block;
    animation: pulse-dot 1.6s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
  }

  .friction-note {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.85rem 1rem;
    background: hsl(0, 80%, 62%, 0.06);
    border: 1px solid hsl(0, 80%, 62%, 0.2);
    border-radius: var(--radius-md);
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  .note-icon { font-size: 1rem; flex-shrink: 0; }

  .friction-note strong { color: var(--text); }
</style>

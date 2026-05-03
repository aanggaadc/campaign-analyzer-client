<script lang="ts">
  import { page } from '$app/stores'
  import { derived } from 'svelte/store'

  // Resolve page title dari URL
  const pageTitle = derived(page, $page => {
    const path = $page.url.pathname
    if (path === '/') return 'Dashboard'
    if (path === '/campaigns') return 'All Campaigns'
    if (path === '/campaigns/new') return 'New Campaign'
    if (path.includes('/analyze')) return 'AI Analysis'
    if (path.includes('/campaigns/')) return 'Campaign Detail'
    if (path === '/history') return 'Analysis History'
    if (path === '/settings') return 'Settings'
    return 'Campaign Analyzer'
  })

  let searchQuery = ''
</script>

<header class="h-14 bg-[#0c0c0e] border-b border-zinc-900 flex items-center px-5 gap-4 shrink-0">
  <!-- Page Title -->
  <h1 class="text-[15px] font-semibold text-zinc-100 flex-1 tracking-tight">
    {$pageTitle}
  </h1>

  <!-- Search -->
  <div class="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 w-48 focus-within:border-zinc-700 transition-colors">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600 shrink-0">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
    <input
      bind:value={searchQuery}
      type="search"
      placeholder="Search..."
      class="bg-transparent text-xs text-zinc-300 placeholder-zinc-600 outline-none w-full"
    />
  </div>

  <!-- Actions -->
  <div class="flex items-center gap-2">
    <!-- Notification -->
    <button class="relative w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-colors" aria-label="Notifications">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
      <!-- Notification dot -->
      <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
    </button>

    <!-- Divider -->
    <div class="w-px h-5 bg-zinc-800"></div>

    <!-- Breadcrumb slot for deeper pages -->
    <slot />
  </div>
</header>
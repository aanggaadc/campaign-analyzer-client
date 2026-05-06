<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher<{ file: File }>()

  let isDragging = false
  let inputEl: HTMLInputElement

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    isDragging = false
    const file = e.dataTransfer?.files[0]
    if (file) validateAndEmit(file)
  }

  function handleFileInput(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) validateAndEmit(file)
  }

  function validateAndEmit(file: File) {
    if (!file.name.endsWith('.csv')) {
      alert('Hanya file .csv yang didukung')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file maksimal 10MB')
      return
    }
    dispatch('file', file)
  }

  function downloadTemplate() {
    const header = 'name,platform,impressions,clicks,conversions,cost,date_start,date_end'
    const example = 'Campaign Alpha,Facebook,50000,2100,180,850000,2026-01-01,2026-01-31'
    const blob = new Blob([header + '\n' + example], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'campaign_template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  role="region"
  aria-label="Area drop file CSV"
  class="border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer"
  class:border-zinc-800={!isDragging}
  class:bg-zinc-950={!isDragging}
  class:border-indigo-600={isDragging}
  class:bg-indigo-950={isDragging}
  on:dragover|preventDefault={() => (isDragging = true)}
  on:dragleave={() => (isDragging = false)}
  on:drop={handleDrop}
  on:click={() => inputEl.click()}
  on:keydown={e => e.key === 'Enter' && inputEl.click()}
  tabindex="0"

>
  <input
    bind:this={inputEl}
    type="file"
    accept=".csv"
    class="hidden"
    on:change={handleFileInput}
  />

  <div class="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={isDragging ? '#818cf8' : '#52525b'}
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  </div>

  <p class="text-[14px] font-semibold text-zinc-300 mb-1.5">
    {isDragging ? 'Lepaskan file di sini' : 'Drop file CSV di sini'}
  </p>
  <p class="text-[12px] text-zinc-600 mb-4">atau klik untuk memilih file · Maks 10MB</p>

  <span class="inline-block bg-indigo-950 border border-indigo-900 text-indigo-400 text-[12px] font-medium px-4 py-2 rounded-lg pointer-events-none">
    Pilih File
  </span>

  <p class="text-[11px] text-zinc-700 mt-4">
    Belum punya template?
    <button
      class="text-indigo-500 hover:text-indigo-400 underline underline-offset-2 cursor-pointer"
      tabindex="0"
      on:click|stopPropagation={downloadTemplate}
    >
      Download CSV template
    </button>
  </p>
</div>
<script lang="ts">
  import type { CsvRow } from '$lib/types/campaign.types'

  export let rows: CsvRow[]
  export let totalRows: number

  const PREVIEW_LIMIT = 50

  $: displayed = rows.slice(0, PREVIEW_LIMIT)
  $: validCount = rows.filter(r => r.status === 'valid').length
  $: invalidCount = rows.filter(r => r.status === 'invalid').length
</script>

<div class="space-y-3">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <p class="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">Preview Data</p>
    <div class="flex items-center gap-3 text-[11px]">
      <span class="text-emerald-500">{validCount} valid</span>
      {#if invalidCount > 0}
        <span class="text-red-400">{invalidCount} invalid</span>
      {/if}
      <span class="text-zinc-600">dari {totalRows} baris</span>
    </div>
  </div>

  <!-- Tabel -->
  <div class="border border-zinc-800 rounded-xl overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-[11px]">
        <thead>
          <tr class="bg-zinc-950 border-b border-zinc-800">
            <th class="text-left px-3 py-2.5 text-zinc-600 font-semibold uppercase tracking-wider w-8">#</th>
            <th class="text-left px-3 py-2.5 text-zinc-600 font-semibold uppercase tracking-wider">Nama</th>
            <th class="text-left px-3 py-2.5 text-zinc-600 font-semibold uppercase tracking-wider">Platform</th>
            <th class="text-right px-3 py-2.5 text-zinc-600 font-semibold uppercase tracking-wider">Impressions</th>
            <th class="text-right px-3 py-2.5 text-zinc-600 font-semibold uppercase tracking-wider">Klik</th>
            <th class="text-right px-3 py-2.5 text-zinc-600 font-semibold uppercase tracking-wider">Konversi</th>
            <th class="text-right px-3 py-2.5 text-zinc-600 font-semibold uppercase tracking-wider">Cost</th>
            <th class="text-center px-3 py-2.5 text-zinc-600 font-semibold uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {#each displayed as row,index (row.row)}
          <tr
            class={`border-b border-zinc-800/50 last:border-0 transition-colors
                ${row.status === 'valid' ? 'hover:bg-zinc-900' : ''}
                ${row.status === 'invalid' ? 'bg-red-950/10 hover:bg-red-950/20' : ''}
            `}
            >
              <td class="px-3 py-2.5 text-zinc-700">{index + 1}</td>
              <td class="px-3 py-2.5 text-zinc-300 font-medium">{row.name || '—'}</td>
              <td class="px-3 py-2.5 text-zinc-400">{row.platform || '—'}</td>
              <td class="px-3 py-2.5 text-zinc-500 text-right">
                {row.impressions != null ? row.impressions.toLocaleString('id-ID') : '—'}
              </td>
              <td class="px-3 py-2.5 text-zinc-500 text-right">
                {row.clicks != null ? row.clicks.toLocaleString('id-ID') : '—'}
              </td>
              <td class="px-3 py-2.5 text-zinc-500 text-right">
                {row.conversions != null ? row.conversions.toLocaleString('id-ID') : '—'}
              </td>
              <td class="px-3 py-2.5 text-zinc-500 text-right">
                {row.cost != null ? `Rp ${row.cost.toLocaleString('id-ID')}` : '—'}
              </td>
              <td class="px-3 py-2.5 text-center">
                {#if row.status === 'valid'}
                  <span class="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400">
                    ✓ Valid
                  </span>
                {:else}
                  <div>
                    <span class="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-950 text-red-400">
                      ✕ Invalid
                    </span>
                    {#if row.error}
                      <p class="text-[10px] text-red-600 mt-0.5">{row.error}</p>
                    {/if}
                  </div>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    {#if rows.length > PREVIEW_LIMIT}
      <div class="px-4 py-2.5 border-t border-zinc-800 bg-zinc-950 text-center text-[11px] text-zinc-600">
        +{rows.length - PREVIEW_LIMIT} baris lainnya tidak ditampilkan
      </div>
    {/if}
  </div>
</div>
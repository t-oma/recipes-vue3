<script lang="ts" setup>
import { computed } from "vue";

import { clamp } from "@/shared/utils/numbers";

type Props = {
  label: string;
  amount: number;
  percentage: number;
};

const { label, amount, percentage } = defineProps<Props>();

const pct = computed(() => {
  const n = Number.isFinite(percentage) ? percentage : 0;
  return clamp(n, 0, 100);
});

const pctStyle = computed(() => `${pct.value}%`);
</script>

<template>
  <li
    class="inline-flex flex-col gap-2 rounded p-2 shadow-xs"
  >
    <div class="text-sm">
      <span> {{ label }}: </span>
      <b> {{ amount }} г. </b>
    </div>

    <span
      class="inline-flex h-1.5 w-full overflow-hidden rounded"
      role="progressbar"
      :aria-label="label"
      :aria-valuenow="percentage"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span
        class="h-full bg-linear-to-r from-amber-500 to-yellow-300"
        :style="{ width: pctStyle }"
      >
      </span>
    </span>
  </li>
</template>

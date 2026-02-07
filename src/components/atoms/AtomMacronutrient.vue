<script lang="ts" setup>
import { clamp } from "@/utils/numbers";
import { computed } from "vue";

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
    class="inline-flex shadow-xs gap-2 flex-col rounded p-2"
  >
    <div class="text-sm">
      <span> {{ label }}: </span>
      <b> {{ amount }} г. </b>
    </div>

    <span
      class="inline-flex overflow-hidden rounded w-full h-1.5"
      role="progressbar"
      :aria-label="label"
      :aria-valuenow="percentage.toFixed(0)"
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

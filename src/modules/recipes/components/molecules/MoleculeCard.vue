<script setup lang="ts">
import { computed, useSlots } from "vue";

type Props =
  | { as?: "section"; label: string }
  | { as: "div"; label?: never };

const props = defineProps<Props>();
const slots = useSlots();

const tag = computed(() => props.as ?? "section");

const hasFrame = computed(() =>
  Boolean(slots.header || slots.footer),
);
</script>

<template>
  <component
    :is="tag"
    class="bg-card space-y-4 rounded-lg shadow-xs"
    :class="hasFrame ? 'p-4' : 'p-2'"
    :aria-label="
      tag === 'section' ? props.label : undefined
    "
  >
    <h3 v-if="tag === 'section'" class="sr-only">
      {{ props.label }}
    </h3>

    <slot v-if="slots.header" name="header" />

    <slot />

    <slot v-if="slots.footer" name="footer" />
  </component>
</template>

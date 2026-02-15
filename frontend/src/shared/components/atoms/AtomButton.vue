<script lang="ts" setup>
type Props = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  to?: string;

  size?: "default" | "icon";
};

withDefaults(defineProps<Props>(), {
  type: "button",
  disabled: false,
  size: "default",
});

const variants = {
  base: "border-border text-foreground hover:bg-accent-background inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-medium whitespace-nowrap transition-all",
  size: {
    default: "h-9 px-4 py-2 has-[>svg]:px-3",
    icon: "size-9",
  },
} as const;
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    :class="variants.base + ' ' + variants.size[size]"
  >
    <slot />
  </RouterLink>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="variants.base + ' ' + variants.size[size]"
  >
    <slot />
  </button>
</template>

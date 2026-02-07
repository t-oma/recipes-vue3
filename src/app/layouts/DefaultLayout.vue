<script setup lang="ts">
import { BeefIcon, UserRoundIcon } from "lucide-vue-next";
</script>

<template>
  <header class="divide-border divide-y">
    <div class="flex justify-between p-4">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-1 text-lg font-semibold"
      >
        <BeefIcon />
        My receips
      </RouterLink>
      <UserRoundIcon />
    </div>

    <nav class="p-4">
      <ul class="font-cursive flex justify-evenly text-2xl">
        <li>
          <RouterLink to="/">Страви</RouterLink>
        </li>
        <li>
          <RouterLink to="/">Нові страви</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <slot />

  <footer
    class="border-border flex items-center justify-center border-t p-4"
  >
    <p class="font-serif text-lg">Made by Lions team</p>
  </footer>
</template>

<script setup lang="ts">
import { BeefIcon, UserRoundIcon } from 'lucide-vue-next'
</script>

<template>
  <header class="divide-border divide-y">
    <div class="flex justify-between p-4">
      <RouterLink to="/" class="inline-flex items-center text-lg gap-1 font-semibold">
        <BeefIcon />
        My receips
      </RouterLink>
      <UserRoundIcon />
    </div>

    <nav class="p-4">
      <ul class="flex justify-evenly font-cursive text-2xl">
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

  <footer class="border-border p-4 border-t flex items-center justify-center">
    <p class="font-serif text-lg">Made by Lions team</p>
  </footer>
</template>

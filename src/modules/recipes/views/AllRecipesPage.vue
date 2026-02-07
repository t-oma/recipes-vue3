<script setup lang="ts">
import { DefaultLayout } from "@/app/layouts";

import {
  AtomMacronutrient,
  MoleculeCard,
} from "../components";
import { dishes } from "../models";

console.log(dishes);
</script>

<template>
  <DefaultLayout>
    <main class="flex-1 space-y-4 p-4">
      <MoleculeCard as="div">
        <h1 class="font-cursive text-center text-3xl">
          Найсмачніші страви
        </h1>
      </MoleculeCard>

      <MoleculeCard
        v-for="dish in dishes"
        :key="dish.id"
        as="section"
        :label="dish.title"
      >
        <div class="flex flex-col">
          <img
            :src="dish.image.src"
            :alt="dish.image.alt"
            class="rounded-lg"
          />
          <span class="font-cursive py-2 text-4xl">
            {{ dish.title }}
          </span>
          <p class="text-muted-foreground text-pretty">
            {{ dish.description }}
          </p>
        </div>

        <ul class="flex justify-between">
          <AtomMacronutrient
            v-for="macro in dish.macronutrients"
            :key="macro.key"
            :label="macro.label"
            :amount="macro.amount"
            :percentage="macro.percentage"
          />
        </ul>

        <template #footer>
          <div>Download</div>
        </template>
      </MoleculeCard>
    </main>
  </DefaultLayout>
</template>

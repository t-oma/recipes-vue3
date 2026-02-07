<script setup lang="ts">
import AtomMacronutrient from "@/components/atoms/AtomMacronutrient.vue";
import MoleculeCard from "@/components/molecules/MoleculeCard.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { dishes, macrosWithDisplayInfo } from "@/mock-data";
</script>

<template>
  <DefaultLayout>
    <main class="flex-1 p-4 space-y-4">
      <MoleculeCard as="div">
        <h1 class="text-center font-cursive text-3xl">
          Найсмачніші страви
        </h1>
      </MoleculeCard>

      <MoleculeCard
        v-for="dish in dishes"
        :key="dish.id"
        as="section"
        :label="dish.displayName"
      >
        <div class="flex flex-col">
          <img
            :src="dish.image.src"
            :alt="dish.image.alt"
            class="rounded-lg"
          />
          <span class="font-cursive text-4xl py-2">
            {{ dish.displayName }}
          </span>
          <p class="text-muted-foreground text-pretty">
            {{ dish.description }}
          </p>
        </div>

        <ul class="flex justify-between">
          <AtomMacronutrient
            v-for="macro in macrosWithDisplayInfo(
              dish.macronutrients,
            )"
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

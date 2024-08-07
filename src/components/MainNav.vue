<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
import Link from '@/components/Link.vue'
import Logo from '@/components/Logo.vue'

const products = useProductStore()
const { selectedCategory } = storeToRefs(products)
const { categories } = products
</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-5 lg:gap-0 lg:items-center lg:justify-between absolute top-0 w-full z-10"
  >
    <div class="space-y-2">
      <Logo />
      <div class="flex gap-5 text-white">
        <h2 class="text-lg font-extrabold">Filtros:</h2>
        <div class="flex items-center gap-2" v-for="category in categories" :key="category.id">
          <input
            type="radio"
            name="category"
            :value="category.id"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            :checked="selectedCategory === category.id"
            @change="(e) => (selectedCategory = Number(e.target.value))"
          />
          <label class="text-gray-100">{{ category.name }}</label>
        </div>
      </div>
    </div>
    <nav>
      <Link to="admin-sales">
        Administrar
      </Link>
    </nav>
  </header>
</template>

<style scoped></style>

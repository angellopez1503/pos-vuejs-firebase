<script setup>
import MainNav from '@/components/MainNav.vue'
import ProductCard from '@/components/ProductCard.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import Spinner from '@/components/Spinner.vue'
import { useProductStore } from '@/stores/product'

const productstore = useProductStore()
</script>

<template>
  <MainNav />
  <main class="pt-10 lg:flex lg:h-screen lg:overflow-y-hidden">
    <Spinner v-if="productstore.isLoading" />
    <div v-else class="lg:w-2/3 lg:h-screen lg:overflow-y-scroll py-32 px-10">
      <p v-if="productstore.noResults" class="text-center text-4xl">No hay productos</p>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <ProductCard
          v-for="product in productstore.filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <aside class="lg:w-1/3 lg:h-screen lg:overflow-y-scroll py-24 px-10">
      <ShoppingCart />
    </aside>
  </main>
</template>

<style scoped></style>

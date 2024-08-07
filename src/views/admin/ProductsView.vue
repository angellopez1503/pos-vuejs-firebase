<script setup>
import Link from '@/components/Link.vue'
import { useProductStore } from '@/stores/product'
import Product from '@/components/Product.vue'
import Spinner from '@/components/Spinner.vue'

const productstore = useProductStore()
</script>

<template>
  <Spinner v-if="productstore.isLoading" />
  <div v-else>
    <Link to="admin-products-new">Nuevo Producto</Link>
    <h1 class="text-4xl font-black my-10">Productos</h1>
    <p v-if="productstore.noResults">No hay resultados</p>
    <ul v-else role="list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Product
        v-for="product in productstore.productsCollection"
        :key="product.id"
        :product="product"
      />
    </ul>
  </div>
</template>

<style scoped></style>

<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import IconAdd from '@/components/IconAdd.vue'
import { formatCurrency } from '@/helpers'
const props = defineProps({
  product: {
    type: Object
  }
})

const cartstore = useCartStore()
</script>

<template>
  <div class="rounded bg-white shadow relative">
    <img :src="product.image" :alt="`Imagen de ${product.name}`" />
    <div class="p-3 space-y-2">
      <h3 class="text-lg font-black text-gray-500">{{ product.name }}</h3>
      <p class="text-gray-500 font-semibold">Disponibles: {{ product.availability }}</p>
      <p class="text-2xl font-extrabold text-gray-700">{{ formatCurrency(product.price) }}</p>
    </div>
    <button type="button" class="absolute top-1 right-1" @click="cartstore.addItem(product)">
      <IconAdd />
    </button>
  </div>
</template>

<style scoped></style>

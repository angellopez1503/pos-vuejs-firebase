<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { formatCurrency } from '@/helpers'
import IconDelete from '@/components/IconDelete.vue'
import IconEdit from '@/components/IconEdit.vue'

const props = defineProps({
  product: {
    type: Object
  }
})

const productstore = useProductStore()

const iTIsAProductNotAvailable = computed(() => !props.product.availability)
</script>

<template>
  <li
    :class="{ 'opacity-35': iTIsAProductNotAvailable }"
    class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow"
  >
    <img :src="product.image" :alt="product.name" class="h-24 w-24" />
    <div class="space-y-2 flex-auto">
      <h3 class="text-gray-900">{{ product.name }}</h3>
      <p class="font-extrabold">{{ formatCurrency(product.price) }}</p>
      <p>{{ product.availability }} en existencia</p>
    </div>
    <div class="flex gap-2">
      <RouterLink :to="{ name: 'admin-products-edit', params: { id: product.id } }">
        <IconEdit />
      </RouterLink>
      <button type="button" @click="productstore.deleteProduct(product.id)">
        <IconDelete />
      </button>
    </div>
  </li>
</template>

<style scoped></style>

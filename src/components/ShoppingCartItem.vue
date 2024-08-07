<script setup>
import { useCartStore } from '@/stores/cart'
import { formatCurrency } from '@/helpers'
import IconDelete from './IconDelete.vue'

const props = defineProps({
  item: {
    type: Object
  }
})

const cartstore = useCartStore()
</script>

<template>
  <li class="flex space-x-6 py-6 items-center">
    <img :src="item.image" :alt="`Imagen de ${item.name}`" class="h-24 w-24 flex-none rounded-md" />
    <div class="flex-auto space-y-2">
      <h3 class="text-gray-900">{{ item.name }}</h3>
      <p>{{ formatCurrency(item.price) }}</p>
      <select
        class="w-32 text-center p-2 rounded-lg bg-white"
        @change="(e) => cartstore.updateQuantity(item.id,Number(e.target.value))"
        :value="item.quantity"
      >
        <option v-for="n in cartstore.checkProductAvailability(item)" :value="n">{{ n }}</option>
      </select>
    </div>
    <div>
      <button type="button" @click="cartstore.removeItem(item.id)">
        <IconDelete />
      </button>
    </div>
  </li>
</template>

<style scoped></style>

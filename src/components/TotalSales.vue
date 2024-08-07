<script setup>
import { formatCurrency } from '@/helpers';
const props = defineProps({
  total: {
    type: Number
  }
})
</script>

<template>
  <p class="text-right text-2xl">
    Total del dia:
    <span class="font-black">
      {{ formatCurrency(total) }}
    </span>
  </p>
</template>

<style scoped></style>

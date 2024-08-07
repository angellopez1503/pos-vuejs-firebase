<script setup>
import { useCouponStore } from '@/stores/coupon'

const couponstore = useCouponStore()
</script>

<template>
  <p class="mt-5 py-5 font-bold border-t border-gray-200">¿Tienes cupon?</p>
  <div class="flex">
    <input
      type="text"
      placeholder="Ingresa un cupon"
      class="p-2 bg-white border-gray-300 w-full"
      v-model="couponstore.couponInput"
    />
    <button
      type="button"
      class="p-3 bg-green-400 hover:bg-green-500 font-bold disabled:opacity-30"
      @click="couponstore.applyCoupon"
      :disabled="couponstore.isValidCoupon"
    >
      Canjear
    </button>
  </div>
  <p class="py-2 text-center text-md font-extrabold">
    {{ couponstore.couponValidationMessage }}
  </p>
  <div v-if="couponstore.isValidCoupon" class="flex justify-center" @click="couponstore.removeDiscount" >
    <button type="button" class="bg-red-600 hover:bg-red-700 font-bold p-2 text-white w-52">
      Anular descuento
    </button>
  </div>
</template>

<style scoped></style>

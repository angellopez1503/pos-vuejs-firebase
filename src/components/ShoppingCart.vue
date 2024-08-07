<script setup>
import { useCartStore } from '@/stores/cart'
import { useCouponStore } from '@/stores/coupon'
import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
import CouponForm from '@/components/CouponForm.vue'
import Amount from './Amount.vue'
import { formatCurrency } from '@/helpers'

const cartstore = useCartStore()
const couponstore = useCouponStore()
</script>

<template>
  <p v-if="cartstore.isEmpty" class="text-xl font-semibold text-center text-gray-900">
    El carrito esta vacio :(
  </p>
  <div v-else>
    <p class="text-3xl font-bold text-gray-900 text-center">Resumen de venta</p>
    <ul role="list" class="mt-6 divide-y divide-gray-200">
      <ShoppingCartItem v-for="item in cartstore.items" :key="item.id" :item="item" />
    </ul>
    <dl class="space-y-4 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
      <Amount>
        <template #label>
          Subtotal:
        </template>
        {{ formatCurrency(cartstore.subtotal) }}
      </Amount>
      <Amount>
        <template #label>
          Impuestos:
        </template>
        {{ formatCurrency(cartstore.taxes) }}
      </Amount>
      <Amount v-if="couponstore.isValidCoupon">
        <template #label>
          Descuento:
        </template>
        {{ formatCurrency(couponstore.discount) }}
      </Amount>
      <Amount>
        <template #label>
          Total a pagar
        </template>
        {{ formatCurrency(cartstore.total) }}
      </Amount>
    </dl>
    <CouponForm />
    <button
      type="button"
      class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
      @click="cartstore.checkout"
    >
      Confirmar compra
    </button>
  </div>
</template>

<style scoped></style>

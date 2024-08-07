import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

export const useCouponStore = defineStore('coupon', () => {
  const cartstore = useCartStore()
  const couponInput = ref('')
  const couponValidationMessage = ref('')
  const discountPercentage = ref(0)
  const discount = ref(0)

  const VALID_COUPONS = [
    { name: '10DESCUENTO', discount: 0.1 },
    { name: '20DESCUENTO', discount: 0.2 }
  ]

  watch(discountPercentage, () => {
    discount.value = (cartstore.total * discountPercentage.value).toFixed(2)
  })

  const applyCoupon = () => {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponInput.value.trim())) {
      couponValidationMessage.value = 'Aplicando...'
      setTimeout(() => {
        discountPercentage.value = VALID_COUPONS.find(
          (coupon) => coupon.name === couponInput.value
        ).discount
        couponValidationMessage.value = '¡Descuento aplicado!'
      }, 4000)
    } else {
      couponValidationMessage.value = 'No existe ese cupon'
      setTimeout(() => {
        couponValidationMessage.value = ''
      }, 5000)
    }
  }

  const removeDiscount = () => {
    discountPercentage.value = 0
    couponValidationMessage.value = ''
  }

  const reset = () => {
    couponInput.value = ''
    couponValidationMessage.value = ''
    discountPercentage.value = 0
    discount.value = 0
  }

  const isValidCoupon = computed(() => discountPercentage.value > 0)

  return {
    couponInput,
    discount,
    discountPercentage,
    applyCoupon,
    reset,
    couponValidationMessage,
    isValidCoupon,
    removeDiscount
  }
})

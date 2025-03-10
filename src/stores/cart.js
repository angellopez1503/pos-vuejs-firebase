import { useCouponStore } from '@/stores/coupon'
import { ref, computed, watch, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { collection, addDoc, runTransaction, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { getCurrentDate } from '@/helpers'

export const useCartStore = defineStore('cart', () => {
  const couponstore = useCouponStore()
  const db = useFirestore()

  const items = ref([])
  const subtotal = ref(0)
  const taxes = ref(0)
  const total = ref(0)

  const MAX_PRODUCTS = 5
  const TAX_RATE = 0.1
  //   watch(
  //     items,
  //     () => {
  //       subtotal.value = items.value.reduce((total, item) => total + item.quantity * item.price, 0)
  //       taxes.value = subtotal.value * TAX_RATE
  //       total.value = subtotal.value + taxes.value
  //     },
  //     {
  //       deep: true
  //     }
  //   )

  watchEffect(() => {
    subtotal.value = items.value.reduce((total, item) => total + item.quantity * item.price, 0)
    taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2))
    total.value = Number(
      (couponstore.isValidCoupon
        ? calculateTotalWithDiscount()
        : subtotal.value + taxes.value
      ).toFixed(2)
    )
  })

  const calculateTotalWithDiscount = () => {
    couponstore.discount = ((subtotal.value + taxes.value) *couponstore.discountPercentage).toFixed(2)
    return subtotal.value + taxes.value - couponstore.discount
  }
  const addItem = (item) => {
    const index = isItemInCart(item.id)
    if (index > -1) {
      if (isProductAvailable(item, index)) {
        alert('Haz alcanzado el limite')
        return
      }
      items.value[index].quantity++
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id })
    }
  }

  const updateQuantity = (id, quantity) =>
    (items.value = items.value.map((item) => (item.id === id ? { ...item, quantity } : item)))

  const removeItem = (id) => (items.value = items.value.filter((item) => item.id !== id))

  const checkout = async () => {
    try {
      await addDoc(collection(db, 'sales'), {
        items: items.value.map((item) => {
          const { availability, category, ...data } = item
          return data
        }),
        subtotal: subtotal.value,
        taxes: taxes.value,
        discount: couponstore.discount,
        total: total.value,
        date: getCurrentDate()
      })


      //Sustraer la cantidad de lo disponible
      items.value.forEach(async(item)=>{
        const productRef = doc(db,'products',item.id)
        await runTransaction(db,async(transaction)=>{
            const currentProduct = await transaction.get(productRef)
            const availability = currentProduct.data().availability - item.quantity
            transaction.update(productRef,{availability:availability})
        })
      })

      //Reiniciar el state
      reset()
      couponstore.reset()
    } catch (error) {
      console.log(error)
    }
  }

  const reset = () => {
    items.value = []
    subtotal.value = 0
    taxes.value = 0
    total.value = 0
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id)

  const isProductAvailable = (item, index) =>
    items.value[index].quantity >= item.availability || items.value[index].quantity >= MAX_PRODUCTS

  const isEmpty = computed(() => !items.value.length)

  const checkProductAvailability = computed(() => (product) =>
    product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS
  )

  return {
    addItem,
    subtotal,
    taxes,
    total,
    updateQuantity,
    removeItem,
    checkout,
    isEmpty,
    items,
    checkProductAvailability
  }
})

import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { query, collection, where } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export const useSaleStore = defineStore('sale', () => {
  const loading = ref(false)
  const dateValue = ref('')
  const db = useFirestore()

  const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMMM'
  })

  const isDateSelected = computed(() => dateValue.value)

  const isLoading = computed(() => loading.value)

  const salesSource = computed(() => {
    if (dateValue.value) {
      loading.value = true
      const q = query(collection(db, 'sales'), where('date', '==', dateValue.value))
      loading.value = false
      return q
    }
  })

  const salesCollection = useCollection(salesSource)

  const existsResult = computed(() => salesCollection.value.length)

  const totalSalesOfDay = computed(() =>
    salesCollection.value ? salesCollection.value.reduce((total, sale) => total + sale.total, 0) : 0
  )

  return {
    dateValue,
    formatter,
    isDateSelected,
    isLoading,
    salesCollection,
    existsResult,
    totalSalesOfDay
  }
})

import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import {
  collection,
  addDoc,
  where,
  query,
  limit,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  deleteDoc
} from 'firebase/firestore'

export const useProductStore = defineStore('product', () => {
  const db = useFirestore()
  const storage = useFirebaseStorage()
  const selectedCategory = ref(1)
  const categories = [
    {
      id: 1,
      name: 'Sudaderas'
    },
    {
      id: 2,
      name: 'Tenis'
    },
    {
      id: 3,
      name: 'Lentes'
    }
  ]

  const loading = ref(true)

  const q = query(collection(db, 'products'), orderBy('availability', 'asc'))

  //   loading.value = true
  //   const { data: productsCollection, promise } = useCollection(q)
  //   promise.value.then((res) => {
  //     loading.value = false
  //   })

  const productsCollection = useCollection(q)

  watch(productsCollection, (productsCollection) => {
    loading.value = false
  })

  const createProduct = async (product) => {
    await addDoc(collection(db, 'products'), product)
  }

  const updateProduct = async (docRef, product) => {
    const { image, url, ...values } = product
    if (image.length) {
      await updateDoc(docRef, {
        ...values,
        image: url.value
      })
    } else {
      await updateDoc(docRef, values)
    }
  }

  const deleteProduct = async (id) => {
    if (confirm('¿Eliminar Producto?')) {
      const docRef = doc(db, 'products', id)
      const docSnap = await getDoc(docRef)
      const { image } = docSnap.data()

      const imageRef = storageRef(storage, image)
      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
    }
  }

  const categoryOptions = computed(() => {
    const options = [
      { label: 'Seleccione', value: '', attrs: { disabled: true } },
      ...categories.map((category) => {
        return { label: category.name, value: category.id }
      })
    ]
    return options
  })

  const noResults = computed(() => !productsCollection.value.length)

  const filteredProducts = computed(() =>
    productsCollection.value
      .filter((product) => product.category === selectedCategory.value)
      .filter((product) => product.availability > 0)
  )

  const isLoading = computed(() => loading.value)

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    categoryOptions,
    productsCollection,
    noResults,
    isLoading,
    filteredProducts,
    categories,
    selectedCategory
  }
})

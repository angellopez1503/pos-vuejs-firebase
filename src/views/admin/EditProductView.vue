<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Link from '@/components/Link.vue'
import { FormKit } from '@formkit/vue'
import useImage from '@/composables/useImage'
import { useProductStore } from '@/stores/product'
import { useDocument, useFirestore } from 'vuefire'
import { doc } from 'firebase/firestore'
import Spinner from '@/components/Spinner.vue'

// Consultar firestore

const router = useRouter()
const route = useRoute()
const loading = ref(true)

const productstore = useProductStore()
const { onFileChange, url, isImageUploaded, isLoading } = useImage()

const formData = reactive({
  name: '',
  category: '',
  price: '',
  availability: '',
  image: ''
})

const db = useFirestore()
const docRef = doc(db, 'products', route.params.id)
// const { data: product, promise } = useDocument(docRef)
// loading.value = true
// promise.value.then((res) => {
//   if (!res) return router.replace({ name: 'admin-products' })
//   loading.value = false
// })
// loading.value = true
const product = useDocument(docRef)
watch(product, (product) => {
  if (!product) return router.replace({ name: 'admin-products' })
  // formData.name = product.name
  // formData.category = product.category
  // formData.price = product.price
  // formData.availability = product.availability
  // formData.image = product.image
  Object.assign(formData, product)
  loading.value = false
})

const submitHandler = async (data) => {
  try {
    await productstore.updateProduct(docRef, { ...data, url })
    router.replace({ name: 'admin-products' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <Spinner v-if="loading" />
  <div v-else>
    <Link to="admin-products">Volver</Link>
    <h1 class="text-4xl font-black my-10">Editar Producto</h1>
    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit
          type="form"
          submit-label="Editar producto"
          :incomplete-message="false"
          @submit="submitHandler"
          :value="formData"
        >
          <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Nombre del producto"
            validation="required"
            :validation-messages="{ required: '*El nombre del producto es obligatorio' }"
            v-model.trim="formData.name"
          />
          <FormKit
            type="file"
            label="Imagen"
            name="image"
            accept=".jpg,.jpeg,.png"
            @change="onFileChange"
          />
          <Spinner v-if="isLoading" />
          <div v-else>
            <div v-if="isImageUploaded">
              <img :src="url" alt="Imagen producto" class="w-52" />
            </div>
            <div v-else>
              <!-- <p class="font-black">Imagen Actual:</p> -->
              <img :src="formData.image" :alt="'Imagen de' + formData.image" class="w-52" />
            </div>
          </div>
          <FormKit
            type="select"
            label="Categoria"
            name="category"
            validation="required"
            :validation-messages="{ required: '*La categoria es obligatoria' }"
            :options="productstore.categoryOptions"
            v-model.number="formData.category"
          />
          <div class="grid md:grid-cols-2 gap-0 md:gap-3">
            <FormKit
              type="number"
              label="Precio"
              name="price"
              placeholder="Precio de producto"
              validation="required"
              :validation-messages="{ required: '*El precio es obligatorio' }"
              min="0"
              v-model.number="formData.price"
            />
            <FormKit
              type="number"
              label="Disponibles"
              name="availability"
              placeholder="Cantidad disponible"
              validation="required"
              :validation-messages="{ required: '*La cantidad es obligatoria' }"
              min="0"
              v-model.number="formData.availability"
            />
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

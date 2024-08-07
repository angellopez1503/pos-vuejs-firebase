<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Link from '@/components/Link.vue'
import { FormKit } from '@formkit/vue'
import useImage from '@/composables/useImage'
import { useProductStore } from '@/stores/product'

const { onFileChange, url, isImageUploaded } = useImage()
const productstore = useProductStore()
const router = useRouter()

const formData = reactive({
  name: '',
  category: '',
  price: '',
  availability: '',
  image: ''
})

const submitHandler = async (data) => {
  const { image, ...values } = data
  try {
    const product = {
      ...values,
      image: url.value
    }
    await productstore.createProduct(product)
    router.replace({ name: 'admin-products' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <Link to="admin-products">Volver</Link>
  <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>
  <div class="flex justify-center bg-white shadow">
    <div class="mt-10 p-10 w-full 2xl:w-2/4">
      <FormKit
        type="form"
        submit-label="Agregar producto"
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
          validation="required"
          :validation-messages="{ required: '*La imagen del producto es obligatorio' }"
          accept=".jpg,.jpeg,.png"
          @change="onFileChange"
          v-model.trim="formData.image"
        />
        <div v-if="isImageUploaded">
          <!-- <p class="font-black">Imagen producto</p> -->
          <img :src="url" alt="Imagen producto" class="w-32" />
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
</template>

<style scoped></style>

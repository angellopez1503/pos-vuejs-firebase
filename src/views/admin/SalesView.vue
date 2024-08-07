<script setup>
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import { useSaleStore } from '@/stores/sale'
import Spinner from '@/components/Spinner.vue'
import SaleDetails from '@/components/SaleDetails.vue'
import TotalSales from '@/components/TotalSales.vue'
import { formatCurrency } from '@/helpers'

const salestore = useSaleStore()
</script>

<template>
  <h1 class="text-4xl font-black my-10">Resumen de ventas</h1>
  <div class="md:flex md:items-start gap-5">
    <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center p-5">
      <vue-tailwind-datepicker
        v-model="salestore.dateValue"
        i18n="es"
        as-single
        no-input
        :formatter="salestore.formatter"
      />
    </div>
    <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
      <p v-if="salestore.isDateSelected" class="text-center text-lg">
        Ventas de la fecha : <span class="font-black">{{ salestore.dateValue }}</span>
      </p>
      <p v-else class="text-center text-lg font-bold text-gray-600">
        Seleccione una fecha
      </p>
      <Spinner v-if="salestore.isLoading" />
      <div v-else class="space-y-5">
        <template v-if="salestore.existsResult">
          <TotalSales :total="salestore.totalSalesOfDay" />
          <SaleDetails v-for="sale in salestore.salesCollection" :key="sale.id" :sale="sale" />
          <TotalSales :total="salestore.totalSalesOfDay" />
        </template>
        <p
          v-else-if="!salestore.existsResult && salestore.isDateSelected"
          class="text-lg text-center"
        >
          No hay ventas en este dia
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

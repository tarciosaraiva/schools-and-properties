<template>
  <modal @close="closeFn">
    <template #header>
      <h2>Property filter</h2>
    </template>
    <template #body>
      <form>
        <div class="pl-row">
          <div class="pl-col">
            <p>Property type</p>
          </div>
        </div>
        <div class="pl-row">
          <div class="pl-col-md-4">
            <label for="p_house_type">
            <input
              id="p_house_type"
              v-model="pTypes"
              type="checkbox"
              value="House"
            /> House</label>
          </div>
          <div class="pl-col-md-4">
            <label for="p_townhouse_type">
            <input
              id="p_townhouse_type"
              v-model="pTypes"
              type="checkbox"
              value="Townhouse"
            /> Townhouse </label>
          </div>
          <div class="pl-col-md-4">
            <label for="p_unit_type">
            <input
              id="p_unit_type"
              v-model="pTypes"
              type="checkbox"
              value="ApartmentUnitFlat"
            /> Unit </label>
          </div>
        </div>
        <div class="pl-row">
          <div class="pl-col-md-6">
            <label for="p_rooms">Rooms</label>
            <select id="p_rooms" v-model="pRooms">
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div class="pl-col-md-6">
            <label for="p_bathrooms">Bathrooms</label>
            <select id="p_bathrooms" v-model="pBathrooms">
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>
        <div class="pl-row">
          <div class="pl-col-md-6">
            <label for="p_car_spaces">Car spaces</label>
            <select id="p_car_spaces" v-model="pCarSpaces">
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div class="pl-col-md-6">
            <label for="p_max_price">Max price</label>
            <select id="p_max_price" v-model="pMaxPrice">
              <option value="500000">500 K</option>
              <option value="600000">600 K</option>
              <option value="700000">700 K</option>
              <option value="800000">800 K</option>
              <option value="900000">900 K</option>
              <option value="1000000">1 M</option>
              <option value="1100000">1.1 M</option>
              <option value="1200000">1.2 M</option>
              <option value="1300000">1.3 M</option>
              <option value="1400000">1.4 M</option>
              <option value="1500000">1.5 M</option>
            </select>
          </div>
        </div>
      </form>
    </template>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

import Modal from '~/components/Modal.vue'

export default Vue.extend({
  components: { Modal },
  props: {
    closeFn: Function
  },
  computed: {
    ...mapGetters(['propertiesFilter']),
    pTypes: {
      get() {
        return this.propertiesFilter.types
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_TYPE', value)
      },
    },
    pRooms: {
      get() {
        return this.propertiesFilter.rooms
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_ROOMS', value)
      },
    },
    pBathrooms: {
      get() {
        return this.propertiesFilter.bathrooms
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_BATHROOMS', value)
      },
    },
    pCarSpaces: {
      get() {
        return this.propertiesFilter.carSpaces
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_CAR_SPACES', value)
      },
    },
    pMaxPrice: {
      get() {
        return this.propertiesFilter.maxPrice
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_MAX_PRICE', value)
      },
    }
  },
})
</script>

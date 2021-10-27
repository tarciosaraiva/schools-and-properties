<template>
  <div class="container">
    <h2>Filter</h2>
    <form>
      <fieldset>
        <legend>Property options</legend>
        <div class="row">
          <label class="column label-inline">
            <input id="p_house_type" v-model="pTypes" type="checkbox" value="House"> House
          </label>
          <label class="column label-inline">
            <input id="p_townhouse_type" v-model="pTypes" type="checkbox" value="Townhouse"> Townhouse
          </label>
          <label class="column label-inline">
            <input id="p_unit_type" v-model="pTypes" type="checkbox" value="ApartmentUnitFlat"> Unit
          </label>
        </div>
        <label for="p_rooms">Rooms</label>
        <select id="p_rooms" v-model="pRooms">
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <label for="p_bathrooms">Bathrooms</label>
        <select id="p_bathrooms" v-model="pBathrooms">
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <label for="p_car_spaces">Car spaces</label>
        <select id="p_car_spaces" v-model="pCarSpaces">
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <label for="p_max_price">Max price</label>
        <select id="p_max_price" v-model="pMaxPrice">
          <option value="500000">500 K</option>
          <option value="600000">600 K</option>
          <option value="700000">700 K</option>
          <option value="800000">800 K</option>
          <option value="900000">900 K</option>
          <option value="1000000">1 M</option>
        </select>
      </fieldset>
      <button @click.stop.prevent="applyFilter">Find matching properties</button>
      <fieldset>
        <legend>School options</legend>
        <div class="row">
          <label class="column label-inline">
            <input id="s_edu_sector" v-model="sEducationSector" type="radio" name="s_edu_sector" value="all"> All
          </label>
          <label class="column label-inline">
            <input id="s_edu_sector" v-model="sEducationSector" type="radio" name="s_edu_sector" value="Government"> Public
          </label>
          <label class="column label-inline">
            <input id="s_edu_sector" v-model="sEducationSector" type="radio" name="s_edu_sector" value="NonGovernment"> Private
          </label>
        </div>
        <label for="s_rating">Overall rating</label>
        <select id="s_rating" v-model="sRating">
          <option value="100">= 100</option>
          <option value="99">>= 99</option>
          <option value="98">>= 98</option>
          <option value="97">>= 97</option>
          <option value="96">>= 96</option>
          <option value="95">>= 95</option>
          <option value="94">>= 94</option>
          <option value="93">>= 93</option>
          <option value="92">>= 92</option>
          <option value="91">>= 91</option>
          <option value="90">>= 90</option>
        </select>
        <div class="row">
          <label class="column" for="s_english_rating">English rating</label>
          <label class="column" for="s_maths_rating">Maths rating</label>
        </div>
        <div class="row">
          <div class="column">
            <select id="s_english_rating" v-model="sEnglishRating">
              <option value="5">= 5</option>
              <option value="4">>= 4</option>
              <option value="3">>= 3</option>
              <option value="2">>= 2</option>
              <option value="1">>= 1</option>
            </select>
          </div>
          <div class="column">
            <select id="s_maths_rating" v-model="sMathsRating">
              <option value="5">= 5</option>
              <option value="4">>= 4</option>
              <option value="3">>= 3</option>
              <option value="2">>= 2</option>
              <option value="1">>= 1</option>
            </select>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    loadListingsFn: Function
  },
  computed: {
    pTypes: {
      get () { return this.filter.properties.types },
      set (value) { this.$store.commit('UPDATE_PROPERTY_FILTER_TYPE', value) }
    },
    pRooms: {
      get () { return this.filter.properties.rooms },
      set (value) { this.$store.commit('UPDATE_PROPERTY_FILTER_ROOMS', value) }
    },
    pBathrooms: {
      get () { return this.filter.properties.bathrooms },
      set (value) { this.$store.commit('UPDATE_PROPERTY_FILTER_BATHROOMS', value) }
    },
    pCarSpaces: {
      get () { return this.filter.properties.carSpaces },
      set (value) { this.$store.commit('UPDATE_PROPERTY_FILTER_CAR_SPACES', value) }
    },
    pMaxPrice: {
      get () { return this.filter.properties.maxPrice },
      set (value) { this.$store.commit('UPDATE_PROPERTY_FILTER_MAX_PRICE', value) }
    },
    sEducationSector: {
      get () { return this.filter.schools.educationSector },
      set (value) { this.$store.commit('UPDATE_SCHOOL_EDUCATION_SECTOR', value) }
    },
    sRating: {
      get () { return this.filter.schools.rating },
      set (value) { this.$store.commit('UPDATE_SCHOOL_RATING', value) }
    },
    sEnglishRating: {
      get () { return this.filter.schools.englishRating },
      set (value) { this.$store.commit('UPDATE_SCHOOL_ENG_RATING', value) }
    },
    sMathsRating: {
      get () { return this.filter.schools.mathsRating },
      set (value) { this.$store.commit('UPDATE_SCHOOL_MATH_RATING', value) }
    },
    ...mapState({ filter: (state: any) => state.filter })
  },
  methods: {
    applyFilter () {
      this.loadListingsFn()
    }
  }
})
</script>

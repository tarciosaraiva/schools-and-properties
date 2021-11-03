<template>
  <div class="filter-container">
    <fieldset>
      <legend>Property filter</legend>
      <div class="row">
        <div class="col-sm">
          <p>Property type</p>
        </div>
      </div>
      <div class="row responsive-label">
        <div class="col-sm-1">
          <input
            id="p_house_type"
            v-model="pTypes"
            type="checkbox"
            value="House"
          />
        </div>
        <div class="col-sm">
          <label for="p_house_type">House</label>
        </div>
        <div class="col-sm-1">
          <input
            id="p_townhouse_type"
            v-model="pTypes"
            type="checkbox"
            value="Townhouse"
          />
        </div>
        <div class="col-sm">
          <label for="p_townhouse_type"> Townhouse </label>
        </div>
        <div class="col-sm-1">
          <input
            id="p_unit_type"
            v-model="pTypes"
            type="checkbox"
            value="ApartmentUnitFlat"
          />
        </div>
        <div class="col-sm">
          <label for="p_unit_type"> Unit </label>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="p_rooms">Rooms</label>
            <select id="p_rooms" v-model="pRooms">
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="p_bathrooms">Bathrooms</label>
            <select id="p_bathrooms" v-model="pBathrooms">
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="p_car_spaces">Car spaces</label>
            <select id="p_car_spaces" v-model="pCarSpaces">
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>
        <div class="col-sm">
          <div class="input-group vertical">
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
      </div>
      <div class="button-group">
        <button class="primary" @click.stop.prevent="applyFilter">
          <span class="icon-search inverse"></span> Find matching properties
        </button>
      </div>
    </fieldset>
    <fieldset>
      <legend>School filter</legend>
      <div class="row">
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="s_edu_sector">Education sector</label>
            <select id="s_edu_sector" v-model="sEducationSector">
              <option value="all">All</option>
              <option value="Government">Government</option>
              <option value="Non-Government">Non Government</option>
            </select>
          </div>
        </div>
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="s_school_zones">School zones</label>
            <select id="s_school_zones" v-model="sZone">
              <option value="none">None</option>
              <option value="primary">Primary</option>
              <option value="p7">Secondary Yr 7</option>
              <option value="p8">Secondary Yr 8</option>
              <option value="p9">Secondary Yr 9</option>
              <option value="p10">Secondary Yr 10</option>
              <option value="p11">Secondary Yr 11</option>
              <option value="p12">Secondary Yr 12</option>
            </select>
          </div>
        </div>
      </div>
      <hr>
      <div class="row responsive-label">
        <div class="col-sm-1">
          <input
            id="s_show_primary_schools"
            v-model="sPlotPrimary"
            type="checkbox"
          />
        </div>
        <div class="col-sm">
          <label for="s_show_primary_schools">Show primary schools</label>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="s_prim_rating">Overall score</label>
            <select id="s_prim_rating" v-model="sPrimRating">
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
          </div>
        </div>
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="s_prim_english_rating">English score</label>
            <select id="s_prim_english_rating" v-model="sPrimEnglishRating">
              <option value="5">= 5</option>
              <option value="4">>= 4</option>
              <option value="3">>= 3</option>
              <option value="2">>= 2</option>
              <option value="1">>= 1</option>
            </select>
          </div>
        </div>
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="s_prim_maths_rating">Maths score</label>
            <select id="s_prim_maths_rating" v-model="sPrimMathsRating">
              <option value="5">= 5</option>
              <option value="4">>= 4</option>
              <option value="3">>= 3</option>
              <option value="2">>= 2</option>
              <option value="1">>= 1</option>
            </select>
          </div>
        </div>
      </div>
      <hr>
      <div class="row responsive-label">
        <div class="col-sm-1">
          <input
            id="s_show_secondary_schools"
            v-model="sPlotSecondary"
            type="checkbox"
          />
        </div>
        <div class="col-sm">
          <label for="s_show_secondary_schools">Show secondary schools</label>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="s_sec_rating">Overall score</label>
            <select id="s_sec_rating" v-model="sSecRating">
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
          </div>
        </div>
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="s_sec_english_rating">English score</label>
            <select id="s_sec_english_rating" v-model="sSecEnglishRating">
              <option value="5">= 5</option>
              <option value="4">>= 4</option>
              <option value="3">>= 3</option>
              <option value="2">>= 2</option>
              <option value="1">>= 1</option>
            </select>
          </div>
        </div>
        <div class="col-sm">
          <div class="input-group vertical">
            <label for="s_sec_maths_rating">Maths score</label>
            <select id="s_sec_maths_rating" v-model="sSecMathsRating">
              <option value="5">= 5</option>
              <option value="4">>= 4</option>
              <option value="3">>= 3</option>
              <option value="2">>= 2</option>
              <option value="1">>= 1</option>
            </select>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    loadListingsFn: {
      type: Function,
      default: () => () => {}
    },
  },
  computed: {
    pTypes: {
      get() {
        return this.filter.properties.types
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_TYPE', value)
      },
    },
    pRooms: {
      get() {
        return this.filter.properties.rooms
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_ROOMS', value)
      },
    },
    pBathrooms: {
      get() {
        return this.filter.properties.bathrooms
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_BATHROOMS', value)
      },
    },
    pCarSpaces: {
      get() {
        return this.filter.properties.carSpaces
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_CAR_SPACES', value)
      },
    },
    pMaxPrice: {
      get() {
        return this.filter.properties.maxPrice
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_MAX_PRICE', value)
      },
    },
    sEducationSector: {
      get() {
        return this.filter.schools.educationSector
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_EDUCATION_SECTOR', value)
      },
    },
    sZone: {
      get() {
        return this.filter.schools.zone
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_ZONE', value)
      },
    },
    sPlotPrimary: {
      get() {
        return this.filter.schools.primary.plot
      },
      set(value) {
        this.$store.commit('UPDATE_PLOT_PRIMARY_SCHOOLS', value)
      },
    },
    sPrimRating: {
      get() {
        return this.filter.schools.primary.rating
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_PRIMARY_RATING', value)
      },
    },
    sPrimEnglishRating: {
      get() {
        return this.filter.schools.primary.englishRating
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_PRIMARY_ENG_RATING', value)
      },
    },
    sPrimMathsRating: {
      get() {
        return this.filter.schools.primary.mathsRating
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_PRIMARY_MATH_RATING', value)
      },
    },
    sPlotSecondary: {
      get() {
        return this.filter.schools.secondary.plot
      },
      set(value) {
        this.$store.commit('UPDATE_PLOT_SECONDARY_SCHOOLS', value)
      },
    },
    sSecRating: {
      get() {
        return this.filter.schools.secondary.rating
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_SECONDARY_RATING', value)
      },
    },
    sSecEnglishRating: {
      get() {
        return this.filter.schools.secondary.englishRating
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_SECONDARY_ENG_RATING', value)
      },
    },
    sSecMathsRating: {
      get() {
        return this.filter.schools.secondary.mathsRating
      },
      set(value) {
        this.$store.commit('UPDATE_SCHOOL_SECONDARY_MATH_RATING', value)
      },
    },
    ...mapState({
      filter: (state: any) => state.filter,
    }),
  },
  methods: {
    applyFilter() {
      this.loadListingsFn()
    },
  },
})
</script>

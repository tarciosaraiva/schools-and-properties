<template>
  <div class="map-control">
    <h2>Navigate</h2>
    <form>
      <fieldset>
        <label for="geo_go_to">Go to</label>
        <input type="text" name="geo_go_to" id="geo_go_to">
      </fieldset>
    </form>
    <h2>Filter</h2>
    <form>
      <fieldset>
        <legend>Property options</legend>
        <label class="label-inline">
          <input type="checkbox" value="House" v-model="properties.types" id="p_house_type"> House
        </label>
        <label class="label-inline">
          <input type="checkbox" value="Townhouse" v-model="properties.types" id="p_townhouse_type"> Townhouse
        </label>
        <label class="label-inline">
          <input type="checkbox" value="ApartmentUnitFlat" v-model="properties.types" id="p_unit_type"> Unit
        </label>
        <label class="label-inline">
          <input type="checkbox" value="VacantLand" v-model="properties.types" id="p_land_type"> Land
        </label>
        <label for="p_rooms">Rooms</label>
        <select v-model="properties.rooms" id="p_rooms">
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <label for="p_bathrooms">Bathrooms</label>
        <select v-model="properties.bathrooms" id="p_bathrooms">
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <label for="p_car_spaces">Car spaces</label>
        <select v-model="properties.carSpaces" id="p_car_spaces">
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <label for="p_max_price">Max price</label>
        <select v-model="properties.maxPrice" id="p_max_price">
          <option value="500000">500 K</option>
          <option value="600000">600 K</option>
          <option value="700000">700 K</option>
          <option value="800000">800 K</option>
          <option value="900000">900 K</option>
          <option value="1000000">1 M</option>
        </select>
      </fieldset>
      <fieldset>
        <legend>School options</legend>
        <label class="label-inline">
          <input type="checkbox" id="s_edu_sector"> Government only
        </label>
        <label for="s_rating">Overall rating</label>
        <select v-model="schools.rating" id="s_rating">
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
        <label for="s_english_rating">English rating</label>
        <select v-model="schools.englishRating" id="s_english_rating">
          <option value="5">= 5</option>
          <option value="4">>= 4</option>
          <option value="3">>= 3</option>
          <option value="2">>= 2</option>
          <option value="1">>= 1</option>
        </select>
        <label for="s_maths_rating">Maths rating</label>
        <select v-model="schools.mathsRating" id="s_maths_rating">
          <option value="5">= 5</option>
          <option value="4">>= 4</option>
          <option value="3">>= 3</option>
          <option value="2">>= 2</option>
          <option value="1">>= 1</option>
        </select>
      </fieldset>
      <button>Apply options</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      properties: {
        types: ['House', 'Townhouse'],
        rooms: 3,
        bathrooms: 2,
        carSpaces: 1,
        maxPrice: 900000
      },
      schools: {
        government: true,
        rating: 95,
        englishRating: 4,
        mathsRating: 4
      }
    }
  }
})
</script>

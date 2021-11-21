<template>
  <div class="layer-container">
    <button title="Show property type filter control" @click="toggleControl">
      <font-awesome-icon icon="home" />
    </button>
    <button v-show="expanded" title="Query listings with current property types" @click="handleChange">
      <font-awesome-icon icon="check" size="lg" :style="{ color: 'rgba(39, 174, 96)' }" />
    </button>
    <ul class="layer-options" :class="collapsed ? '' : 'expanded'">
      <li>
        <label for="p_house_type">
          <input
            id="p_house_type"
            v-model="propertyTypes"
            type="checkbox"
            value="House"
          /> House
        </label>
      </li>
      <li>
        <label for="p_townhouse_type">
          <input
            id="p_townhouse_type"
            v-model="propertyTypes"
            type="checkbox"
            value="Townhouse"
          /> Townhouse
        </label>
      </li>
      <li>
        <label for="p_unit_type">
          <input
            id="p_unit_type"
            v-model="propertyTypes"
            type="checkbox"
            value="ApartmentUnitFlat"
          /> Unit
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  data () {
    return {
      collapsed: true
    }
  },
  computed: {
    ...mapGetters(['propertiesFilter']),
    expanded () { return !this.collapsed },
    propertyTypes: {
      get() {
        return this.propertiesFilter.types
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_TYPE', value)
      },
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    ...mapActions(['loadListings']),
    handleClickOutside(event: any) {
      if (!this.$el.contains(event.target)) {
        this.collapsed = true;
      }
    },
    toggleControl () {
      this.collapsed = !this.collapsed
    },
    handleChange() {
      this.collapsed = true
      this.loadListings()
    }
  }
})
</script>

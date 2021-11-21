<template>
  <div class="layer-container">
    <button title="Show maximum price filter control" @click="toggleControl">
      <font-awesome-icon icon="dollar-sign" />
    </button>
    <button v-show="expanded" title="Query listings with current maximum price" @click="handleChange">
      <font-awesome-icon icon="check" size="lg" :style="{ color: 'rgba(39, 174, 96)' }" />
    </button>
    <div class="layer-options" :class="collapsed ? '' : 'expanded'">
      <select id="p_max_price" v-model="maxPrice">
        <option value="500000">500 K</option>
        <option value="550000">550 K</option>
        <option value="600000">600 K</option>
        <option value="650000">650 K</option>
        <option value="700000">700 K</option>
        <option value="750000">750 K</option>
        <option value="800000">800 K</option>
        <option value="850000">850 K</option>
        <option value="900000">900 K</option>
        <option value="950000">950 K</option>
        <option value="1000000">1 M</option>
        <option value="1100000">1.1 M</option>
        <option value="1200000">1.2 M</option>
        <option value="1300000">1.3 M</option>
        <option value="1400000">1.4 M</option>
        <option value="1500000">1.5 M</option>
        <option value="1600000">1.6 M</option>
        <option value="1700000">1.7 M</option>
        <option value="1800000">1.8 M</option>
        <option value="1900000">1.9 M</option>
        <option value="2000000">2 M</option>
        <option value="2250000">2.25 M</option>
        <option value="2500000">2.5 M</option>
        <option value="2750000">2.75 M</option>
        <option value="3000000">3 M</option>
        <option value="4000000">4 M</option>
        <option value="5000000">5 M</option>
        <option value="6000000">6 M</option>
        <option value="7000000">7 M</option>
        <option value="8000000">8 M</option>
        <option value="9000000">9 M</option>
        <option value="10000000">10 M</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  data: () => {
    return {
      collapsed: true
    }
  },
  computed: {
    ...mapGetters(['propertiesFilter']),
    expanded () { return !this.collapsed },
    maxPrice: {
      get() {
        return this.propertiesFilter.maxPrice
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_MAX_PRICE', value)
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

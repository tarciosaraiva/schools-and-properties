<template>
  <div class="layer-container">
    <button title="Show number of car spaces filter control" @click="toggleControl">
      {{carSpaces}}
      <font-awesome-icon icon="car" />
    </button>
    <button v-show="expanded" title="Query listings with current number of car spaces" @click="handleChange">
      <font-awesome-icon icon="check" size="lg" :style="{ color: 'rgba(39, 174, 96)' }" />
    </button>
    <div class="layer-options" :class="collapsed ? '' : 'expanded'">
      <vue-slider
        v-model="carSpaces"
        :min="1"
        :max="6"
        :marks="true"
        :tooltip="'none'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import VueSlider from 'vue-slider-component'

export default Vue.extend({
  components: { VueSlider },
  data: () => {
    return {
      collapsed: true
    }
  },
  computed: {
    ...mapGetters(['propertiesFilter']),
    expanded () { return !this.collapsed },
    carSpaces: {
      get() {
        return this.propertiesFilter.carSpaces
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_CAR_SPACES', value)
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

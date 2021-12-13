<template>
  <div class="layer-container">
    <button title="Show property type filter control" @click="togglePropertyType">
      <font-awesome-icon icon="home" size="lg" />
    </button>
    <button title="Show number of bedrooms filter control" @click="toggleBedrooms">
      {{bedrooms}}
      <font-awesome-icon icon="bed" size="lg" />
    </button>
    <button title="Show number of bathrooms filter control" @click="toggleBathrooms">
      {{bathrooms}}
      <font-awesome-icon icon="bath" size="lg" />
    </button>
    <button title="Show number of car spaces filter control" @click="toggleCarSpaces">
      {{carSpaces}}
      <font-awesome-icon icon="car" size="lg" />
    </button>
    <button title="Show maximum price filter control" @click="toggleMaxPrice">
      <font-awesome-icon icon="dollar-sign" size="lg" />
    </button>
    <button v-show="collapsed" title="Refresh properties" @click="handleChange">
      <font-awesome-icon icon="sync" :style="{ color: 'rgba(39, 174, 96)' }" />
    </button>
    <button v-show="expanded" title="Apply filter" @click="handleChange">
      <font-awesome-icon icon="check" size="lg" :style="{ color: 'rgba(39, 174, 96)' }" />
    </button>
    <ul class="property layer-options types" :class="expanded && controlToShow === 'PropertyType' ? 'expanded' : ''">
      <li>
        <label for="p_house_type">
          <input id="p_house_type" v-model="propertyTypes" type="checkbox" value="House" /> House
        </label>
      </li>
      <li>
        <label for="p_townhouse_type">
          <input id="p_townhouse_type" v-model="propertyTypes" type="checkbox" value="Townhouse" /> Townhouse
        </label>
      </li>
      <li>
        <label for="p_unit_type">
          <input id="p_unit_type" v-model="propertyTypes" type="checkbox" value="ApartmentUnitFlat" /> Unit
        </label>
      </li>
    </ul>
    <div class="property layer-options beds" :class="expanded && controlToShow === 'Bedrooms' ? 'expanded' : ''">
      <vue-slider
        v-model="bedrooms"
        :min="1"
        :max="6"
        :marks="true"
        :tooltip="'none'" />
    </div>
    <div class="property layer-options baths" :class="expanded && controlToShow === 'Bathrooms' ? 'expanded' : ''">
      <vue-slider
        v-model="bathrooms"
        :min="1"
        :max="6"
        :marks="true"
        :tooltip="'none'" />
    </div>
    <div class="property layer-options cars" :class="expanded && controlToShow === 'CarSpaces' ? 'expanded' : ''">
      <vue-slider
        v-model="carSpaces"
        :min="1"
        :max="6"
        :marks="true"
        :tooltip="'none'" />
    </div>
    <div class="property layer-options price" :class="expanded && controlToShow === 'MaxPrice' ? 'expanded' : ''">
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
import VueSlider from 'vue-slider-component'
import { mapGetters, mapActions } from 'vuex'

declare module 'vue/types/vue' {
  interface Vue {
    collapsed: boolean;
    controlToShow: string;
    toggleControl: (control: string) => void;
    handleClickOutside: () => void;
    loadListings: () => void;
  }
}

export default Vue.extend({
  components: { VueSlider },
  data () {
    return {
      collapsed: true,
      controlToShow: ''
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
    },
    bedrooms: {
      get() {
        return this.propertiesFilter.rooms
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_ROOMS', value)
      },
    },
    bathrooms: {
      get() {
        return this.propertiesFilter.bathrooms
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_BATHROOMS', value)
      },
    },
    carSpaces: {
      get() {
        return this.propertiesFilter.carSpaces
      },
      set(value) {
        this.$store.commit('UPDATE_PROPERTY_FILTER_CAR_SPACES', value)
      },
    },
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
        this.collapsed = true
        this.controlToShow = ''
      }
    },
    toggleControl (control: string) {
      if (this.controlToShow === control) {
        this.collapsed = !this.collapsed
      } else {
        this.collapsed = false
      }

      this.controlToShow = control
    },
    togglePropertyType () {
      this.toggleControl('PropertyType')
    },
    toggleBedrooms () {
      this.toggleControl('Bedrooms')
    },
    toggleBathrooms () {
      this.toggleControl('Bathrooms')
    },
    toggleCarSpaces () {
      this.toggleControl('CarSpaces')
    },
    toggleMaxPrice () {
      this.toggleControl('MaxPrice')
    },
    handleChange() {
      this.collapsed = true
      this.controlToShow = ''
      this.loadListings()
    }
  }
})
</script>

<style scoped>
.layer-container .property.layer-options {
  left: initial;
  max-height: 6rem;
  right: 48px;
}

.layer-container .property.layer-options.expanded {
  height: 3.65rem;
  width: 15rem;
}

.layer-container .property.layer-options.expanded.types {
  padding: 0.5rem;
  height: 5rem;
  width: 8rem;
}

.layer-container .property.layer-options.expanded.beds {
  top: 40px;
}

.layer-container .property.layer-options.expanded.baths {
  top: 80px;
}

.layer-container .property.layer-options.expanded.cars {
  top: 120px;
}

.layer-container .property.layer-options.expanded.price {
  padding: 0.5rem;
  width: 10rem;
  top: 160px;
}
</style>

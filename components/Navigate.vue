<template>
  <form class="navigate-container" @submit.prevent>
    <label for="geo_go_to" class="visually-hidden">Navigate to</label>
    <div class="d-flex align-items-center search-box">
      <font-awesome-icon icon="search-location" style="left: 0.75rem; position: absolute; z-index: 100" />
      <input
        id="geo_go_to"
        v-model="search"
        placeholder="Enter address, suburb, region or area to navigate"
        type="text"
        name="geo_go_to"
        autocomplete="false"
        @keyup="handleKeyUp"
        @keyup.down="onArrowDown"
        @keyup.up="onArrowUp"
        @keyup.enter="onEnter"
      />
    </div>
    <ul v-show="isOpen" class="geo-suggestions">
      <li v-for="(sug, i) in suggestions" :key="i" :class="{ 'is-active': i === arrowCounter }">
        <a href="#"
          class="suggestion"
          @click.stop.prevent="navigateTo(sug)">
          {{ sug.name }}
        </a>
      </li>
    </ul>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import debounce from 'lodash.debounce'

export default Vue.extend({
  props: {
    suggestions: {
      type: Array,
      default: () => [] as any[]
    },
    geocodeFn: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      search: '',
      isOpen: false,
      arrowCounter: -1
    }
  },

  watch: {
    suggestions (newSuggestions, _) {
      if (newSuggestions.length) {
        this.isOpen = true
      }
    }
  },
  created () {
    this.geolocate = debounce(this.geolocate, 300, { leading: false, trailing: true })
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    handleClickOutside(event: any) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    handleFocus() {
      if (this.suggestions.length) {
        this.isOpen = true
      }
    },
    handleKeyUp() {
      this.geolocate()
    },
    geolocate () {
      this.geocodeFn(this.search)
    },
    navigateTo (location: any) {
      this.isOpen = false
      this.search = location.name
      this.$emit('navigate', location.center, location.placeType)
    },
    onArrowDown() {
      if (this.arrowCounter < this.suggestions.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.navigateTo(this.suggestions[this.arrowCounter])
      this.arrowCounter = -1;
    }
  }
})
</script>

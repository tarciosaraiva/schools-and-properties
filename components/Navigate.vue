<template>
  <form class="navigate-container" @submit.prevent>
    <label for="geo_go_to" class="visually-hidden">Navigate to</label>
    <div class="d-flex align-items-center search-box">
      <font-awesome-icon icon="search-location" style="left: 0.75rem; position: absolute; z-index: 100" />
      <input
        id="geo_go_to"
        v-model="search"
        placeholder="Enter address, suburb, region or school name to navigate"
        type="text"
        name="geo_go_to"
        autocomplete="off"
        @keyup="handleKeyUp"
        @keyup.down="onArrowDown"
        @keyup.up="onArrowUp"
        @keyup.enter="onEnter"
      />
    </div>
    <ul v-show="isOpen" class="geo-suggestions">
      <li v-for="(sug, i) in suggestions" :key="i" class="d-flex align-items-center" :class="{ 'is-active': i === arrowCounter }">
        <font-awesome-icon :icon="sug.placeType === 'school' ? 'school' : 'map-marked-alt'" />
        <a
          href="#"
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
    searchCallback: {
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
    this.triggerSearch = debounce(this.triggerSearch, 300, { leading: false, trailing: true })
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
      this.triggerSearch()
    },
    triggerSearch () {
      this.searchCallback(this.search)
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

<style scoped>
.navigate-container input {
  margin: 0;
  padding-left: 2.25rem;
}

.navigate-container .search-box {
  position: relative;
}

.navigate-container .geo-suggestions {
  background-color: #f5f5f5;
  border: 1px solid rgba(51,51,51,.8);
  border-radius: 4px;
  max-height: 30rem;
  max-width: 24rem;
  padding: 0;
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  width: inherit;
  z-index: 500;
}

@media (min-width: 768px) {
  .navigate-container .geo-suggestions {
    max-width: 22rem;
  }
}

@media (min-width: 992px) {
  .navigate-container .geo-suggestions {
    max-width: 29rem;
  }
}

@media (min-width: 1200px) {
  .navigate-container .geo-suggestions {
    max-width: 35rem;
  }
}

.navigate-container .geo-suggestions li {
  padding-left: 0.5rem;
}

.navigate-container .geo-suggestions li.is-active,
.navigate-container .geo-suggestions li:hover {
  background-color: #ddd;
}

.navigate-container .geo-suggestions .suggestion {
  display: block;
  overflow: hidden;
  padding: 0.25rem 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
</style>

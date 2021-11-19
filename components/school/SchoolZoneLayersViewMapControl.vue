<template>
  <div class="layer-container">
    <button title="Display school zones control" @click="toggleControl">
      <font-awesome-icon icon="layer-group" size="lg" />
    </button>
    <div class="layer-options" :class="collapsed ? '' : 'expanded'">
      <label class="checkbox">
        <input type="checkbox" value="primary" @click="handleChecked"> Primary
      </label>
      <label class="checkbox">
        <input type="checkbox" value="p7" @click="handleChecked"> Secondary Yr 7
      </label>
      <label class="checkbox">
        <input type="checkbox" value="p8" @click="handleChecked"> Secondary Yr 8
      </label>
      <label class="checkbox">
        <input type="checkbox" value="p9" @click="handleChecked"> Secondary Yr 9
      </label>
      <label class="checkbox">
        <input type="checkbox" value="p10" @click="handleChecked"> Secondary Yr 10
      </label>
      <label class="checkbox">
        <input type="checkbox" value="p11" @click="handleChecked"> Secondary Yr 11
      </label>
      <label class="checkbox">
        <input type="checkbox" value="p12" @click="handleChecked"> Secondary Yr 12
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    toggleLayer: Function
  },
  data () {
    return {
      collapsed: true
    }
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
        this.collapsed = true;
      }
    },
    handleChecked (e: any) {
      this.toggleLayer(e.target.value)
    },
    toggleControl () {
      this.collapsed = !this.collapsed
    }
  }
})
</script>

<style scoped>
.layer-container {
  position: relative;
}

.layer-container .layer-options {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 4px;
  border: 0;
  height: 0;
  left: 40px;
  max-height: 260px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  position: absolute;
  top: 0;
  transition: all 0.3s ease;
  width: 0;
}

.layer-container .layer-options.expanded {
  border: 1px solid #ccc;
  padding: 0.75rem;
  height: auto;
  width: 9rem;
}

.layer-container .layer-options .checkbox {
  padding: 0.25rem 0;
  font-size: 120%;
  white-space: nowrap;
}

.layer-container .layer-options .checkbox:first-child {
  padding-top: 0;
}

.layer-container .layer-options .checkbox:last-child {
  padding-bottom: 0;
  margin-bottom: 0;
}
</style>

<template>
  <div class="layer-container">
    <button title="Display school zones control" @click="toggleControl">
      <font-awesome-icon icon="layer-group" size="lg" />
    </button>
    <div class="school layer-options" :class="collapsed ? '' : 'expanded'">
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
.layer-container .school.layer-options {
  left: 48px;
  max-height: 260px;
  right: 0;
}

.layer-container .school.layer-options.expanded {
  padding: 0.75rem;
  height: auto;
  width: 9rem;
}

.layer-container .school.layer-options .checkbox {
  padding: 0.25rem 0;
  font-size: 120%;
  white-space: nowrap;
}

.layer-container .school.layer-options .checkbox:first-child {
  padding-top: 0;
}

.layer-container .school.layer-options .checkbox:last-child {
  padding-bottom: 0;
  margin-bottom: 0;
}
</style>

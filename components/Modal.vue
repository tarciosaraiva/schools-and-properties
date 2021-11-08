<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> default header </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> default body </slot>
          </div>

          <div class="modal-footer text-right">
            <slot name="footer">
              <button class="pl-button full small" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    document.addEventListener('keyup', this.handleEscape)
  },
  destroyed() {
    document.removeEventListener('keyup', this.handleEscape)
  },
  methods: {
    handleEscape(event: any) {
      if (event.keyCode === 27) {
        this.$emit('close')
      }
    },
  },
})
</script>

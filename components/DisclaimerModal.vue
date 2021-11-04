<template>
  <div>
    <input id="modal-control-disclaimer" type="checkbox" class="modal" />
    <div role="dialog" aria-labelledby="dialog-title">
      <div class="card large">
        <label for="modal-control-disclaimer" class="modal-close" ></label>
        <h3 id="dialog-title" class="section">About</h3>
        <p>The information provided by this website is a collation of 3 major data sources, listed in the attributions modal accessed by the link at the footer of this website.</p>
        <p>The schools displayed in the map are only the ones who have a matching of 90 or above in <a href="https://www.bettereducation.com.au/" target="blank">Better Education</a> website so it's likely you will notice some schools may be missing from the list.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<template>
  <modal @close="closeFn">
    <template #header>
      <h3>About</h3>
    </template>
    <template #body>
      <p>The information provided by this website is a collation of 3 major data sources, listed in the attributions modal accessed by the link at the footer of this website.</p>
      <p>We are showing all schools currently listed in the Data Vic. The ones faded do not have any rating associated with them. The ones not faded are the ones that have a score of 90 or above in <a href="https://www.bettereducation.com.au/" target="blank">Better Education</a> website so.</p>
      <p>You will also notice that the not faded schools have different sizes: this is due to your rating filter. If you have a score of e.g. 95 then every school that matches that number or above will have a larger icon than the ones that have a lower ranking.</p>
      <p>
        <a href="https://www.buymeacoffee.com/tarciosaraiva" target="blank"><small>Support my work</small></a>
      </p>
      <p>
        <a href="https://www.github.com/tarciosaraiva/schools-and-properties" target="blank"><small>Project on Github</small></a>
      </p>
      <p>
        <a href="https://forms.gle/7xZTuGrb3w7VAUdq6" target="blank"><small>Give us feedback</small></a>
      </p>
    </template>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import Modal from '~/components/Modal.vue'

export default Vue.extend({
  components: { Modal },
  props: {
    closeFn: Function
  }
})
</script>

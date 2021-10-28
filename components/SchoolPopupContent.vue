<template>
  <div class="popup-info container">
    <div class="row">
      <div class="column">
        <p class="school-name">
          <strong>{{ school.schoolName }}</strong>
        </p>
      </div>
    </div>
    <div class="row">
      <span class="column school-stat-label">Overall rating</span>
      <span class="column school-stat-value"><em>{{ school.primaryOverallScore }}</em></span>
    </div>
    <div class="row">
      <span class="column school-stat-label">English rating</span>
      <span class="column school-stat-value"><em>{{ school.primaryEnglishScore }}</em></span>
    </div>
    <div class="row">
      <span class="column school-stat-label">Maths rating</span>
      <span class="column school-stat-value"><em>{{ school.primaryMathsScore }}</em></span>
    </div>
    <div class="row">
      <span class="column school-stat-label">Enrolments</span>
      <span class="column school-stat-value"><em>{{ school.primaryEnrolments }}</em></span>
    </div>
    <div class="row">
      <span class="column school-stat-label">Phone</span>
      <span class="column school-stat-value"><em>{{ school.phoneNumber }}</em></span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    school: Object,
  },
})
</script>

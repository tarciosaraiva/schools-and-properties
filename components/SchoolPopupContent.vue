<template>
  <div class="school-info container">
    <div class="row">
      <div class="column">
        <p>
          <strong>{{ school.schoolName }}</strong>
        </p>
      </div>
    </div>
    <div class="row">
      <span class="column school-stat-label">Overall rating</span>
      <span class="column school-stat">
        <em>{{ school.overallScore }}</em>
      </span>
    </div>
    <div class="row">
      <span class="column school-stat-label">English rating</span>
      <span class="column school-stat"><em>{{ school.englishScore }}</em></span>
    </div>
    <div class="row">
      <span class="column school-stat-label">Maths rating</span>
      <span class="column school-stat"><em>{{ school.mathsScore }}</em></span>
    </div>
    <div class="row">
      <span class="column school-stat-label">Enrolments</span>
      <span class="column school-stat"><em>{{ school.enrolments }}</em></span>
    </div>
    <div class="row">
      <span class="column school-stat-label">Phone</span>
      <span class="column school-stat"><em>{{ school.phoneNumber }}</em></span>
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

<style scoped>
.school-info p {
  text-align: justify;
  text-justify: inter-character;
  border-bottom: 1px solid #ccc;
}

.school-info span, .school-info p {
  white-space: nowrap;
}

.school-info .school-stat-label {
  text-decoration: underline;
}

.school-info .school-stat {
  font-weight: bold;
  text-align: right;
}
</style>

<template>
  <div class="popup-info container">
    <p class="school-name">
      {{ school.schoolName }}
      <br>
      <small>{{ school.educationSector }}, {{ school.schoolType }} - {{ school.phoneNumber }}</small>
    </p>
    <p v-if="hasPrimaryRating">Primary ratings</p>
    <dl v-if="hasPrimaryRating" class="school-stats">
      <dt class="label">Overall rating</dt>
      <dd class="value"><em>{{ school.primaryOverallScore }}</em></dd>
      <dt class="label">English rating</dt>
      <dd class="value"><em>{{ school.primaryEnglishScore }}</em></dd>
      <dt class="label">Maths rating</dt>
      <dd class="value"><em>{{ school.primaryMathsScore }}</em></dd>
      <dt class="label">Enrolments</dt>
      <dd class="value"><em>{{ school.primaryEnrolments }}</em></dd>
    </dl>
    <p v-if="hasSecondaryRating">Secondary ratings</p>
    <dl v-if="hasSecondaryRating" class="school-stats">
      <dt class="label">Overall rating</dt>
      <dd class="value"><em>{{ school.secondaryOverallScore }}</em></dd>
      <dt class="label">English rating</dt>
      <dd class="value"><em>{{ school.secondaryEnglishScore }}</em></dd>
      <dt class="label">Maths rating</dt>
      <dd class="value"><em>{{ school.secondaryMathsScore }}</em></dd>
      <dt class="label">Enrolments</dt>
      <dd class="value"><em>{{ school.secondaryEnrolments }}</em></dd>
    </dl>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { School } from '~/store'

export default Vue.extend({
  props: {
    school: Object
  },
  computed: {
    hasPrimaryRating () {
      return (this.school as School).primaryOverallScore !== '#N/A'
    },
    hasSecondaryRating () {
      return (this.school as School).secondaryOverallScore !== '#N/A'
    }
  }
})
</script>

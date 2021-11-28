<template>
  <div class="popup-info container">
    <p class="school-name">
      {{ school.schoolName }}
      <br>
      <small>{{ school.educationSector }}, {{ school.schoolType }} - {{ school.phoneNumber }}</small>
    </p>
    <p v-if="isPrimary && hasPrimaryRating">Primary ratings</p>
    <dl v-if="isPrimary && hasPrimaryRating" class="school-stats">
      <dt class="label">Overall rating</dt>
      <dd class="value"><em>{{ school.primaryOverallScore }}</em></dd>
      <dt class="label">English rating</dt>
      <dd class="value"><em>{{ school.primaryEnglishScore }}</em></dd>
      <dt class="label">Maths rating</dt>
      <dd class="value"><em>{{ school.primaryMathsScore }}</em></dd>
      <dt class="label">Enrolments</dt>
      <dd class="value"><em>{{ school.primaryEnrolments }}</em></dd>
    </dl>
    <br v-if="isPrimary && !hasPrimaryRating" />
    <p v-if="isPrimary && !hasPrimaryRating">Check school rating at
      <a href="https://www.bettereducation.com.au/school/Primary/vic/vic_primary_school_rating.aspx" target="_blank">Better Education</a>.
    </p>
    <p v-if="isSecondary && hasSecondaryRating">Secondary ratings</p>
    <dl v-if="isSecondary && hasSecondaryRating" class="school-stats">
      <dt class="label">Overall rating</dt>
      <dd class="value"><em>{{ school.secondaryOverallScore }}</em></dd>
      <dt class="label">English rating</dt>
      <dd class="value"><em>{{ school.secondaryEnglishScore }}</em></dd>
      <dt class="label">Maths rating</dt>
      <dd class="value"><em>{{ school.secondaryMathsScore }}</em></dd>
      <dt class="label">Enrolments</dt>
      <dd class="value"><em>{{ school.secondaryEnrolments }}</em></dd>
    </dl>
    <br v-if="isSecondary && !hasSecondaryRating" />
    <p v-if="isSecondary && !hasSecondaryRating">Check school rating at
      <a href="https://www.bettereducation.com.au/school/secondary/vic/vic_secondary_school_rating.aspx" target="_blank">Better Education</a>.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    school: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isPrimary () {
      const primSchool = this.school
      return primSchool.schoolType === 'Primary' || primSchool.schoolType === 'Pri/Sec'
    },
    isSecondary () {
      const secSchool = this.school
      return secSchool.schoolType === 'Secondary' || secSchool.schoolType === 'Pri/Sec'
    },
    hasPrimaryRating () {
      const primSchool = this.school
      return primSchool.primaryOverallScore !== '#N/A'
    },
    hasSecondaryRating () {
      const secSchool = this.school
      return secSchool.secondaryOverallScore !== '#N/A'
    }
  }
})
</script>

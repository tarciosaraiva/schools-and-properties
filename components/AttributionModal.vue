<template>
  <div>
    <input id="modal-control" type="checkbox" class="modal" />
    <div role="dialog" aria-labelledby="dialog-title">
      <div class="card large">
        <label for="modal-control" class="modal-close" ></label>
        <h3 id="dialog-title" class="section">Schools and properties attributions</h3>
        <ul>
          <li>
            School zone and locations sourced from <a href="https://www.data.vic.gov.au/" target="blank">Data Vic.</a>
            <ul>
              <li>Checkout the Department of Education and Training's <a href="https://www.education.vic.gov.au/Pages/disclaimer.aspx" target="blank">Disclaimer</a> and <a href="https://www.education.vic.gov.au/Pages/copyright.aspx" target="blank">Copyright</a>.</li>
            </ul>
          </li>
          <li>
            School rankings sourced from <a href="https://bettereducation.com.au/" target="blank">Better Education.</a>
            <ul>
              <li>Checkout Better Education's <a href="https://www.bettereducation.com.au/Disclaimer.aspx" target="blank">Disclaimer.</a></li>
            </ul>
          </li>
          <li>
            Property listings sourced from <a href="https://www.domain.com.au/" target="blank">Domain</a>.
            <ul>
              <li>Checkout Domain's Terms and Conditions.</li>
              <li>Checkout <a href="https://www.apm.com.au/terms-conditions/" target="blank">APM's Terms and Conditions</a>.</li>
              <li>
                The State of Victoria owns the copyright in the Property Sales Data and reproduction of that data in any way without the consent of the state of Victoria will constitute a breach of the Copyright Act 1968 (Cth). The State of Victoria does not warrant the accuracy or completeness of the information contained in this report and any person using or relying upon such information does so on the basis that the State of Victoria accepts no responsibility or liability whatsoever for any errors, faults, defects or omissions in the information supplied.
              </li>
            </ul>
          </li>
          <li>House Icons made by <a href="https://icon54.com/" target="blank" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" target="blank" title="Flaticon">www.flaticon.com</a></li>
          <li>School Icons made by <a href="https://www.freepik.com" target="blank" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" target="blank" title="Flaticon">www.flaticon.com</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

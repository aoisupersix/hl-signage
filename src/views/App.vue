<!-- 全てのViewの元となるベースViewです -->
<template>
<div id="app">
  <h1 class="display-1" style="text-align: center;">Hayakawa Laboratory</h1>
  <Main />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Main from './Main.vue'

@Component({
  components: {
    Main
  },
})
export default class App extends Vue { }
</script>
<style>
.primary {
  background-color: #65ace4 !important;
  color: #ffffff !important;
}
.warning {
  background-color: #de9610 !important;
  color: #ffffff !important;
}
.secondary {
  background-color: #fbfbfb !important;
  color: #040404 !important;
}
</style>

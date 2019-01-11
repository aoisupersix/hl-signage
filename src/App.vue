<template>
<div id="app">
  <h1 class="display-1" style="text-align: center;">Hayakawa Laboratory</h1>
  <b-card-group columns class="md-1">
    <b-card bg-variant="primary"
      header="早川"
      class="text-center status-card card-primary"
      v-for="member in members">
      <p class="card-text text-center">在室</p>
    </b-card>
    </b-card-group>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { firebaseDatabase } from '@/main';
import CardList from './components/CardList.vue';

@Component({
  components: {
    CardList,
  },
})
export default class App extends Vue {
  private members = [1,2,3];

  public async created(): Promise<void> {
    const stateSnap = await firebaseDatabase.ref('status').once('value');
    console.log(stateSnap.val());
  }
}
</script>
<style>
 .status-card {
   margin: 5px;
   max-width: 11.2rem;
   max-height: 9.3rem;
 }
 .card-primary {
   background-color: #65ace4 !important;
   color: #ffffff !important;
 }
</style>

<template>
<div id="app">
  <h1 class="display-1" style="text-align: center;">Hayakawa Laboratory</h1>
  <div class="container-fluid">
    <b-card no-body
      class="text-center status-card card-primary"
      v-for="member in members"
      :key="member"
      :class="'card-' + states[member.status].color">
      <b-link to="/" class="btn btn-fix">
        <h4 class="card-header">{{ member.last_name + " " + member.first_name }}</h4>
        <b-card-body>
          <p class="card-text">{{ states[member.status].name }}</p>
        </b-card-body>
      </b-link>
    </b-card>
  </div>
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
  private states = [];
  private members = [];

  public async created(): Promise<void> {
    const stateSnap = await firebaseDatabase.ref('status').once('value');
    this.states = stateSnap.val();
    firebaseDatabase.ref('members').on('value', (snap) => {
      this.members = snap!.val();
    });
  }
}
</script>
<style>
 .status-card {
   display: inline-block !important;
   margin: 5px;
   width: 11.2rem;
   height: 9.3rem;
 }
 .card-primary {
   background-color: #65ace4 !important;
   color: #ffffff !important;
 }
 .card-warning {
   background-color: #de9610 !important;
   color: #ffffff !important;
 }
 .card-secondary {
   background-color: #fbfbfb !important;
   color: #040404 !important;
 }
 .card-text {
   font-size: 2.5rem;
 }
 .btn-fix {
  width: 11.2rem;
  height: 9.3rem;
  padding: 0 !important;
  border: none !important;
  white-space: normal;
  color: inherit !important;
  }
</style>

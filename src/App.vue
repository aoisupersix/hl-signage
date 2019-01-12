<template>
<div id="app">
  <h1 class="display-1" style="text-align: center;">Hayakawa Laboratory</h1>
  <StatusCard :members="members" :states="states" @showModal="showModal" />
  <StatusModal v-model="modalShow" :members="members" :states="states" :member-id="modalShowingMemberId" />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebaseDatabase } from '@/main'
import StatusCard from './components/StatusCard/StatusCard.vue'
import StatusModal from './components/StatusModal/StatusModal.vue'

@Component({
  components: {
    StatusCard,
    StatusModal
  },
})
export default class App extends Vue {

  private states = []
  private members = []
  private modalShowingMemberId = -1
  private modalShow: boolean = false

  public async created(): Promise<void> {
    const stateSnap = await firebaseDatabase.ref('status').once('value')
    this.states = stateSnap.val()
    firebaseDatabase.ref('members').on('value', (snap) => {
      this.members = snap!.val()
    })
  }

  private showModal(memberId: number): void {
    this.modalShowingMemberId = memberId
    this.modalShow = true
  }

  private changeModalStatus(isShowing: boolean): void {
    console.log('isShowing:' + isShowing)
    this.modalShow = isShowing
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

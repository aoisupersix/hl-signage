<!-- メインView -->
<template>
  <div id="main">
    <StatusCard :members="members" :states="states" @showModal="showModal" />
    <StatusModal v-model="modalShow" :members="members" :states="states" :member-id="modalShowingMemberId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebaseDatabase } from '@/main'
import StatusCard from '../components/StatusCard/StatusCard.vue'
import StatusModal from '../components/StatusModal/StatusModal.vue'

@Component({
  components: {
    StatusCard,
    StatusModal
  },
})
export default class Main extends Vue {

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

}
</script>

<style scoped>
</style>

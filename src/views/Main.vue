<!-- メインView -->
<template>
  <div id="main">
    <h1 class="display-3" style="text-align: center;">Hayakawa Laboratory <b-button class="setting"><font-awesome-icon icon="cog" /></b-button></h1>
    
    <StatusCard :members="members" :states="states" @showModal="showModal" />
    <StatusModal v-model="modalShow" :member="modalShowingMember" :states="states" />
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
  /**
   * DBの在室状況マスタ
   */
  private states: firebase.database.DataSnapshot | null = null

  /**
   * DBのメンバ情報
   */
  private members: firebase.database.DataSnapshot | null = null

  /**
   * モーダルで表示するメンバ情報
   */
  private modalShowingMember: firebase.database.DataSnapshot | null = null

  /**
   * モーダルを表示しているか？
   * 双方向バインド
   */
  private modalShow: boolean = false

  public async created(): Promise<void> {
    this.states = await firebaseDatabase.ref('status').once('value')
    firebaseDatabase.ref('members').on('value', (snap) => {
      this.members = snap
    })
  }

  private showModal(memberId: string): void {
    if (this.members !== null) {
      this.modalShowingMember = this.members.child(memberId)
      this.modalShow = true
    }
  }

}
</script>

<style scoped>
</style>

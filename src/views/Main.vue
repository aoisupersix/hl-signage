<!-- メインView -->
<template>
  <div id="main">
    <h1 class="display-3" style="text-align: center;">
      Hayakawa Laboratory
      <b-button @click="showSettingModal"><font-awesome-icon icon="cog" /></b-button>
    </h1>
    <h6 class="sub-title" style="">
      <vue-typer
        class="sub-title"
        :text='["詳細な在室状況はWebアプリ(https://hlmanager-32609.firebaseapp.com/)から確認して下さい。"]'
        :repeat='Infinity'
        :shuffle='false'
        initial-action='typing'
        :pre-type-delay='2000'
        :type-delay='40'
        :pre-erase-delay='10000'
        :erase-delay='20'
        erase-style='backspace'
        :erase-on-complete='false'
        caret-animation='blink' />
    </h6>
    <StatusCard :members="members" :states="states" @showModal="showStatusModal" />
    <SettingModal v-model="settingModalShow" />
    <StatusModal v-model="statusModalShow" :member="modalShowingMember" :states="states" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebaseDatabase } from '@/main'
import SettingModal from '../components/SettingModal/SettingModal.vue'
import StatusCard from '../components/StatusCard/StatusCard.vue'
import StatusModal from '../components/StatusModal/StatusModal.vue'

@Component({
  components: {
    SettingModal,
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
   * 設定モーダルを表示しているか？
   * 双方向バインド
   */
  private settingModalShow: boolean = false

  /**
   * ステータスモーダルを表示しているか？
   * 双方向バインド
   */
  private statusModalShow: boolean = false

  public async created(): Promise<void> {
    this.states = await firebaseDatabase.ref('status').once('value')
    firebaseDatabase.ref('members').on('value', (snap) => {
      this.members = snap
    })
  }

  private showSettingModal(): void {
    this.settingModalShow = true
  }

  private showStatusModal(memberId: string): void {
    if (this.members !== null) {
      this.modalShowingMember = this.members.child(memberId)
      this.statusModalShow = true
    }
  }

}
</script>

<style scoped>
.sub-title {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>

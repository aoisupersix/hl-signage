import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Store from '@/store/store'
import Setting from '@/store/setting';

@Component
export default class StatusCard extends Vue {

  @Prop() public members!: firebase.database.DataSnapshot | null
  @Prop() public states!: firebase.database.DataSnapshot | null

  private setting: Setting = Store.setting

  private clickCard(memberId: string) {
    // TODO: @emit()がなぜかきかない。。。
    this.$emit('showModal', memberId)
  }

  private get styles(): { [key: string]: string } {
    return {
      '--card-width': Store.setting.cardWidth + 'rem',
      '--card-height': Store.setting.cardHeight + 'rem'
    }
  }

  /**
   * メンバスナップショットの配列を返します。
   * v-forでループするために必要
   */
  private get membersArray(): firebase.database.DataSnapshot[] | null {
    if (this.members === null) {
      return null
    }

    const memArray: firebase.database.DataSnapshot[]  = []
    this.members.forEach((member) => {
      memArray.push(member)
    })

    return memArray
  }

  /**
   * メンバの現在の在室状況マスタを取得します。
   * @param member メンバスナップショット
   */
  private getStatus(member: firebase.database.DataSnapshot | null): firebase.database.DataSnapshot | null {
    if (member === null || this.states === null) {
      return null
    }

    const statusId = member.child('status').val()
    return this.states.child(statusId)
  }
}

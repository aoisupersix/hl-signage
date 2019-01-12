import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { firebaseDatabase } from '@/main'

@Component
export default class StatusModal extends Vue {

  /**
   * モーダルを開いているかを示すフラグ
   * v-modelで双方向バインドする
   */
  @Prop() public value!: boolean

  /**
   * モーダルで表示するDBのメンバー情報
   */
  @Prop() public member!: firebase.database.DataSnapshot | null

  /**
   * DBのステータス情報
   */
  @Prop() public states!: firebase.database.DataSnapshot | null

  /**
   * モーダルで表示するメンバーID
   */
  @Prop() public memberId!: string

  /**
   * モーダルの開閉フラグが変更された際に親コンポーネントのイベントを発火します。
   * v-modelで双方向バインドを実現するために必要。
   * @param value モーダルを開いているか？
   */
  @Emit() public input(value: boolean) { }

  /**
   * Propを直接触らずにv-modelを実現するため
   */
  private get modalShow(): boolean {
    return this.value
  }

  /**
   * Propを直接触らずにv-modelを実現するため
   */
  private set modalShow(value: boolean) {
    this.input(value)
  }

  /**
   * 在室状況マスタのスナップショットを配列にして返します。
   * v-forでループするために必要
   */
  private get statesArray(): firebase.database.DataSnapshot[] | null {
    if (this.states === null) {
      return null
    }

    const stateArray: firebase.database.DataSnapshot[] = []
    this.states.forEach((state) => {
      stateArray.push(state)
    })
    return stateArray
  }

  /**
   * モーダルで表示するメンバーの在室状況マスタを取得します。
   */
  private get status(): firebase.database.DataSnapshot | null {
    if (this.member === null || this.states === null) {
      return null
    }

    const statusId = this.member.child('status').val()
    return this.states.child(statusId)
  }

  /**
   * メンバー名を取得します
   */
  private get memberName(): string | null {
    if (this.member === null) {
      return null
    }
    return this.member.child('last_name').val() + ' ' + this.member.child('first_name').val()
  }

  /**
   * モーダルで表示しているメンバーの在室状況を更新します。
   * @param statusId 在室状況ID
   */
  private updateStatus(statusId: string) {
    // TODO Authが必要な処理
    if (this.member !== null) {
      firebaseDatabase.ref('members/' + this.member.key).update({
        status: statusId
      })
    }

    this.modalShow = false
  }
}

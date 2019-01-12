import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class StatusModal extends Vue {

  /**
   * モーダルを開いているかを示すフラグ
   * v-modelで双方向バインドする
   */
  @Prop() public value!: boolean

  /**
   * DBのメンバー情報
   */
  @Prop() public members!: any

  /**
   * DBのステータス情報
   */
  @Prop() public states!: any

  /**
   * モーダルで表示するメンバーID
   */
  @Prop() public memberId!: string

  @Emit()
  public input(value: boolean) { }

  private get modalShow(): boolean {
    return this.value
  }

  private set modalShow(value: boolean) {
    this.input(value)
  }

  /**
   * モーダルで表示するメンバー情報を取得します。
   */
  private get member(): any {
    return this.members[this.memberId]
  }

  /**
   * モーダルで表示するメンバーの在室状況マスタを取得します。
   */
  private get status(): any {
    return this.states[this.member.status]
  }

  private get memberName(): string {
    return this.member.last_name + ' ' + this.member.first_name
  }
}

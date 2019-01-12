import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class StatusModal extends Vue {
  @Prop()
  /**
   * モーダルを開いているかを示すフラグ
   * v-modelで双方向バインドする
   */
  public value!: boolean

  @Prop() public members!: any
  @Prop() public states!: any
  @Prop() public memberId!: string

  @Emit()
  public input(value: boolean) { }

  private get modalShow(): boolean {
    return this.value
  }

  private set modalShow(value: boolean) {
    this.input(value)
  }
}

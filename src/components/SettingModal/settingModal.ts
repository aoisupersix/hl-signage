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
}

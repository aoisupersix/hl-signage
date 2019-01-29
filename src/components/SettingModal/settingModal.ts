import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import Store from '@/store/store'
import Setting from '@/store/setting';

@Component
export default class SettingModal extends Vue {

  /**
   * モーダルを開いているかを示すフラグ
   * v-modelで双方向バインドする
   */
  @Prop() public value!: boolean

  /**
   * カード幅
   */
  private cardWidth: number = Store.setting.cardWidth

  /**
   * カード高さ
   */
  private cardHeight: number = Store.setting.cardHeight

  /**
   * モーダルの開閉フラグが変更された際に親コンポーネントのイベントを発火します。
   * v-modelで双方向バインドを実現するために必要。
   * @param value モーダルを開いているか？
   */
  @Emit() public input(value: boolean) { }

  @Watch('cardWidth')
  private setCardWidth(value: number) {
    Store.setting.cardWidth = value
  }

  @Watch('cardHeight')
  private setCardHeight(value: number) {
    Store.setting.cardHeight = value
  }

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

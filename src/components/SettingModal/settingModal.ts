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
   * 設定保持クラス
   */
  private setting: Setting = Store.setting

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
   * モーダルの開閉フラグが変更された際に親コンポーネントのイベントを発火します。
   * v-modelで双方向バインドを実現するために必要。
   */
  @Emit() public input(value: boolean): void { }

  private setDefault(): void {
    Store.setting.setDefault()
  }

}

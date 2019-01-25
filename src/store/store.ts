import Setting from './setting';

/**
 * アプリケーションの状態を一括で保持するストアクラスです。
 * 利用する際はDataに状態クラス（現在はStore.settingのみ）を必ず指定して値を取得してください。
 * 状態クラスのプロパティ(Store.setting.cardWidthなど)をDataに指定すると、リアクティブにバインド不可能になります。
 * VuexはTypescriptで使うのが面倒そうなのでstoreパターンを自分で実装してます。
 */
export class Store {

    constructor(public setting: Setting = new Setting()) { }
}

const store = new Store()
export default store

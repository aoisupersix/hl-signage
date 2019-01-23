import Setting from './setting';

/**
 * 状態保持用
 * VuexはTypescriptで使うのが面倒そうなのでstoreパターンを自分で実装する
 */
export class Store {

    constructor(public setting: Setting = new Setting()) { }
}
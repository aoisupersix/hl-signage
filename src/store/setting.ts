/**
 * 設定状態保持クラス
 * 設定項目を追加＆削除する場合はこのクラスに改良を加える必要あり
 */
export default class Setting {

    /**
     * カード幅のローカルストレージキー
     */
    public static STORAGE_KEY_CARD_WIDTH = 'hl-signage.card-width'

    /**
     * カード高さのローカルストレージキー
     */
    public static STORAGE_KEY_CARD_HEIGHT = 'hl-signage.card-height'

    /**
     * カード幅の初期値
     */
    public static DEFAULT_VALUE_CARD_WIDTH = 11.2

    /**
     * カード高さの初期値
     */
    public static DEFAULT_VALUE_CARD_HEIGHT = 10

    private state = {
        card_width: 11.2,
        card_height: 10,
    }

    get cardWidth(): number { return this.state.card_width }
    set cardWidth(value: number) {
        this.storage.setItem(Setting.STORAGE_KEY_CARD_WIDTH, value.toString())
        this.getSettings()
    }

    get cardHeight(): number { return this.state.card_height }
    set cardHeight(value: number) {
        this.storage.setItem(Setting.STORAGE_KEY_CARD_HEIGHT, value.toString())
        this.getSettings()
    }

    constructor(private storage: Storable = localStorage) {
        this.getSettings()
    }

    /**
     * 設定にデフォルト値を代入します
     */
    public setDefault() {
        this.cardWidth = Setting.DEFAULT_VALUE_CARD_WIDTH
        this.cardHeight = Setting.DEFAULT_VALUE_CARD_HEIGHT
    }

    private getSettings() {
        // ストレージから値を読み込み
        // 設定を追加＆削除する際はこの処理を変更する必要あり
        this.state.card_width =
            Number(this.storage.getItem(Setting.STORAGE_KEY_CARD_WIDTH) || Setting.DEFAULT_VALUE_CARD_WIDTH)
        this.state.card_height =
            Number(this.storage.getItem(Setting.STORAGE_KEY_CARD_HEIGHT) || Setting.DEFAULT_VALUE_CARD_HEIGHT)
    }
}


/**
 * 状態の保持に利用するインタフェース
 * 通常であればlocalStorageに利用します。
 */
interface Storable {
    getItem(key: string): string | null
    setItem(key: string, value: string): void
}

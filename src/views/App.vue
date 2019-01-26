<!-- 全てのViewの元となるベースViewです -->
<template>
<div id="app" :style="styles">
  <Main />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebaseDatabase } from '@/main'
import Main from './Main.vue'
import Setting from '@/store/setting'
import Store from '@/store/store'

@Component({
  components: {
    Main
  },
})
export default class App extends Vue {

  private styles: { [key: string]: string } = {}

  private setting: Setting = Store.setting

  public async created(): Promise<void> {
    // ステータスカラーをDBから取得して設定
    const states = await firebaseDatabase.ref('status').once('value')
    states.forEach((snap) => {
      const colorName = snap.child('color').val()
      this.styles['--bg-color-' + colorName] = snap.child('hcolor-bg').val()
      this.styles['--text-color-' + colorName] = snap.child('hcolor-text').val()
    })
  }
}
</script>
<style>
#app {
  /* ステータスカラーのデフォルト定義 */
  /* DBから取得した値で上書きますが、新たなステータスを定義する場合はここに追加する必要があります。 */
  --bg-color-primary: #65ace4;
  --text-color-primary: #ffffff;
  --bg-color-warning: #de9610;
  --text-color-warning: #ffffff;
  --bg-color-secondary: #fbfbfb;
  --text-color-secondary: #040404;
}
.primary {
  background-color: var(--bg-color-primary) !important;
  color: var(--text-color-primary) !important;
}
.warning {
  background-color: var(--bg-color-warning) !important;
  color: var(--text-color-warning) !important;
}
.secondary {
  background-color: var(--bg-color-secondary) !important;
  color: var(--text-color-secondary) !important;
}
</style>

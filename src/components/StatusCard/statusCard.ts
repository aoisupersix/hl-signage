import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StatusCard extends Vue {
  @Prop() private members!: any
  @Prop() private states!: any

  private click(memberId: number): void {
    this.$emit('showModal', memberId)
  }
}

<template>
  <p>Card List</p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CardList extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped>
</style>

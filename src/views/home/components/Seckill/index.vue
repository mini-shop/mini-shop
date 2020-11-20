<template>
  <div class="seckill">
    <div class="title">
      <h1>蜂超市1元菜场</h1>
      <span>新鲜便宜次日达</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'Seckill'
})
export default class Seckill extends Vue {
}
</script>

<style lang="scss">
  .seckill {
    margin: 0 12px;
    width: calc(100% - 24px);
    height: 188px;
    background-image: url('~@/assets/seckill_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .title {
      padding: 12px 14px;
      h1 {
        font-size: 16px;
        margin: 6px 0;
        color: #3a7421;
        display: inline-block;
      }
      span {
        font-size: 12px;
        color: #59923f;
        margin-left: 10px;
      }
    }
  }
</style>

<template>
  <div class="add-cart-comp">
    <van-icon class="decrease-btn" name="minus" @click.stop="decrease" />
    <span class="cart-num">{{ cartNum }}</span>
    <van-icon class="increase-btn" name="plus" @click.stop="increase" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'AddCart'
})
export default class AddCart extends Vue {
  @Prop({ required: true })
  private shop!: TProductList

  private cartNum = 0
  private decrease () {
    console.log('decrease')
  }

  private increase () {
    console.log('increase')
  }
}

</script>

<style lang="scss" scoped>
  .add-cart-comp {
    display: flex;
    flex-direction: row;
    align-content: center;
    .decrease-btn {
      width: 20px;
      height: 20px;
      line-height: 21px;
      text-align: center;
      border: 1px solid #ef8e48;
      color: #ef8e48;
      border-radius: 50%;
      font-size: 16px !important;
    }
    .increase-btn {
      width: 20px;
      height: 20px;
      line-height: 21px;
      text-align: center;
      background-color: #ef8e48;
      border: 1px solid #ef8e48;
      color: #fff;
      border-radius: 50%;
      font-size: 16px;
    }
    .cart-num {
      width: 28px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      font-size: 14px;
      pointer-events: none
    }
  }
</style>

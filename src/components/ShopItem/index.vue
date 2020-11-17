<template>
  <div class="shop-item">
    <div class="thumb-box">
      <img class="thumb" :src="shop.image" alt="">
    </div>
    <div class="info-box">
      <h5 class="name">{{ shop.name }}</h5>
      <div class="tags">
        <span class="label">{{ shop.label }}</span>
        <span class="promotion-tag">{{ shop.promotionTag }}</span>
      </div>
      <div class="price">
        <span class="current-price">￥{{ shop.price }}</span>
        <span class="origin-price">￥{{ shop.originPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'ShopItem'
})
export default class ShopItem extends Vue {
  @Prop()
  private shop!: IProduct.List
}
</script>

<style lang="scss">
  .shop-item {
    display: flex;
    .thumb-box {
      width: 74px;
      height: 74px;
      margin-right: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      .thumb {
        width: 100%;
        object-fit: cover;
      }
    }
    .info-box {
      .name {
        font-size: 14px;
      }
      .tags {
        justify-content: flex-start;
        align-items: center;
        font-size: 10px;
        .label {
          color: #999999;
        }
        .promotion-tag {
          color: '#eb5952';
        }
      }
      .price {
        justify-content: flex-start;
        align-items: center;
        .current-price {
          color: '#eb5952';
          font-size: 12px;
        }
        .origin-price {
          color: '#cccccc';
          font-size: 10px;
          text-decoration: line-through;
        }
      }
    }
  }
</style>

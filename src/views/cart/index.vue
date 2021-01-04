<template>
  <div class="cart-page">
    <van-sticky>
      <van-nav-bar
        title="购物车"
        left-arrow
        @click-left="$router.go(-1)" />
    </van-sticky>
    <div class="wrap">
      <div class="cart-list">
        <van-checkbox-group v-model="selectedItems">
          <van-swipe-cell v-for="i in 10" :key="i">
            <van-checkbox name="a" icon-size="15px" checked-color="#e94019"></van-checkbox>
            <shop-item class="product-item" :shop="shop" @click="showDetail(shop.code)">
              <van-icon class="add-cart" name="plus" />
            </shop-item>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <recommend />
    </div>
    <van-submit-bar :price="3050" button-text="去结算" @submit="onSubmit">
      <van-checkbox icon-size="15px" checked-color="#e94019" v-model="isSelecteAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Recommend from './components/Recommend'
import ShopItem from '@/components/ShopItem'

@Component({
  name: 'Cart',
  components: {
    Recommend,
    ShopItem
  }
})
export default class Cart extends Vue {
  private selectedItems: string[] = []
  private isSelecteAll = false
  private shop: TProductList = {
    code: '87050410',
    image: 'https://pan.zhangtong.work/minishop/baseinfo/productImage/201912/31/4b078083a92aaceac6f4ce01.small.jpg',
    inventory: 1,
    label: '明日达',
    name: '伊利安慕希高端畅饮希腊风味酸奶原味230g*10瓶',
    originPrice: 108.9,
    price: 99,
    promotion: '',
    promotionTag: null,
    promotionTitle: '',
    soldNum: 6363,
    sort: null
  }

  private onSubmit () {
    console.log('submit')
  }
}
</script>

<style lang="scss" scoped>
  .cart-page {
    background-color: #eee;
    padding-bottom: 50px;
    .wrap {
      padding: 8px 10px;
      .cart-list {
        background-color: #fff;
        border-radius: 4px;
        padding: 10px 0;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.01);
        overflow: hidden;
        ::v-deep .van-swipe-cell {
          position: relative;
          padding-bottom: 1px;
          .van-swipe-cell__wrapper {
            display: flex;
            flex-direction: row;
          }
          display: flex;
          .van-checkbox {
            width: 25px;
            margin-left: 10px;
            text-align: center;
          }
          .product-item {
            margin-right: 10px;
          }
          .van-swipe-cell__right {
            .delete-button {
              height: 100%;
              background-color: #eb5d2a;
              border-color: #eb5d2a;
            }
          }
          &:not(:last-child):before {
            content: '';
            width: calc(100% - 20px);
            height: 1px;
            border-bottom: 1px solid #eee;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
          }
        }
      }
    }
    .van-submit-bar {
      bottom: 50px;
    }
  }
</style>

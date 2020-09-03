<template>
  <div class="product-detail-page">
    <van-swipe @change="onChange">
      <van-swipe-item v-for="item in detail.shopImages" :key="item">
        <van-image :src="item"></van-image>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ detail.shopImages.length }}
        </div>
      </template>
    </van-swipe>
    <div class="info">
      <div class="price">
        <div class="left">
          <span>￥<b>{{ detail.price }}</b></span>
          <span>￥{{ detail.originPrice }}</span>
        </div>
        <div class="right">已售{{ detail.soldNum }}件</div>
      </div>
      <div class="name">
        <span>{{ detail.name }}</span>
        <span>分享</span>
      </div>
      <div class="msg">{{ detail.pintuanmsg }}</div>
    </div>
    <div class="props">
      <label>商品信息</label>
      <div class="prop-table">
        <!-- <div v-for="item in propKeys" :key="item">
          <span>{{ propName(item) }}</span>
          <span>{{ this.detail.properties[item] }}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getProductDetail } from '@/api/index'

@Component
export default class ProductDetail extends Vue {
  private detail = {}
  private current = 0
  private propKeys: string[] = []
  private propKey: any

  private async getDetail () {
    const { data } = await getProductDetail({ code: '87050408' })
    this.detail = { ...data, shopImages: JSON.parse(data.shopImages), properties: JSON.parse(data.properties), detailImages: JSON.parse(data.detailImages) }
    this.propKeys = Object.keys(JSON.parse(data.properties))
  }

  private onChange (index: number) {
    this.current = index
  }

  private get propName (): string {
    const propNames = {
      originPlace: '产地',
      unitName: '单位',
      netVol: '净含量',
      expireDate: '保质期',
      storeCondition: '贮存方式'
    }
    return propNames[this.propKey]
  }

  private set propName (prop: string) {
    this.propKey = prop
  }

  created () {
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
  .product-detail-page {
    background-color: #e6e6e6;
    .van-swipe {
      height: 380px;
      border-bottom: 2px solid #f3f3f3;
      .van-swipe-item {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .info {
      padding: 0 12px;
      background-color: #fff;
      .price {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-top: 10px;
        .left {
          span {
            &:nth-child(1) {
              font-size: 12px;
              font-weight: 700;
              color: #eb5d2a;
              b {
                font-size: 22px;
              }
            }
            &:nth-child(2) {
              font-size: 12px;
              color: #7e7e7e;
              margin-left: 10px;
              text-decoration: line-through;
            }
          }
        }
        .right {
          font-size: 14px;
          color: #1d1d1d;
          font-weight: 700;
        }
      }
      .name {
        height: 35px;
        display: flex;
        margin-top: 10px;
        span {
          display: inline-block;
          &:nth-child(1) {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: #0d0d0d;
            border-right: 2px dashed #ababab;
          }
          &:nth-child(2) {
            width: 35px;
            text-align: center;
            color: #ababab;
            font-size: 10px;
          }
        }
      }
      .msg {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #ec7520;
        position: relative;
        padding-left: 12px;
        margin-top: 4px;
        border-top: 1px solid #e6e6e6;
        &::before {
          content: '';
          display: inline-block;
          background-color: #ec7520;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
    .props {
      background-color: #fff;
      margin-top: 10px;
      padding-top: 18px;
      label {
        height: 14px;
        display: inline-block;
        border-left: 3px solid #ed7e2e;
        font-size: 14px;
        color: #4f4f4f;
        line-height: 14px;
        padding-left: 12px;
      }
    }
  }
</style>

<template>
  <div class="category">
    <div class="item" v-for="item in list" :key="item.code" @click="jumpToCategory(item.code)">
      <van-image lazy-load :src="item.icon" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'CategoryMenu'
})
export default class CategoryMenu extends Vue {
  @Prop({ required: true })
  private list!: Array<ICategory>

  private jumpToCategory (code: number) {
    this.$router.replace('/category')
  }
}
</script>

<style lang="scss">
  .category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 12px;
    .item {
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: #373737;
      .van-image {
        width: 40px;
      }
      span {
        margin: 8px 0;
      }
    }
  }
</style>

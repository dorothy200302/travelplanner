<script setup>
defineProps({
  good:{
    type:Object,
    default:()=>({name:'',desc:'',id:0,price:0,picture:'' +
          ''})
  }
})
</script>
<template>
  <div class="goods-item">
    <img v-img-lazy="good.picture  || '../../public/images/img_2.png' " alt="" />
    <p class="name ellipsis">{{ good.name }}</p>
    <p class="desc ellipsis">{{ good.title }}</p>
    <p class="price" v-if="good.price">&yen;{{ good.price }}</p>
  </div>
</template>
<style lang="scss">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 20px;
  text-align: center;
  transition: all .5s;
  box-shadow: 0 3px 8px rgb(0 0 0 / 20%);

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {

    width: 180px;
    height: 180px;
    border-radius: 10px; /* 设置圆角度数 */
    display: block; /* 确保图像按照期望的方式显示 */
    margin: 0 auto; /* 水平居中 */
  }

  .name {
    font-weight: bold; /* 设置文本为粗体 */
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
    overflow: hidden;
  }

  .price {
    color: #427fc4;
    font-size: 20px;
  }
}
</style>

<script>
export default {
  name: "Banner",
  data() {
    return {
      bannerList: []
    }
  },
}
</script>

<template>
  <el-carousel height="400px">
    <el-carousel-item v-for="item in bannerList" :key="item.id">
      <a :href="'/front/newsDetail?id='+item.id" target="_blank">
        <img :src="item.img" alt="" class="carousel-image">
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>

</style>
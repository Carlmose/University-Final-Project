<script>
export default {
  name: "Banner",
  data() {
    return {
      bannerList: []
    }
  },
  created() {
    this.loadBanner()
  },
  methods: {
    loadBanner() {
      this.$request.get('/banner/selectAll').then(res => {
        if (res.code === '200') {
          this.bannerList = res.data || []
        }
      })
    },
  }
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
/* 轮播图 */
.carousel-image {
  width: 100%;
}
</style>
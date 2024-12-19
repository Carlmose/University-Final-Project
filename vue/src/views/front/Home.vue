<template>
  <div class="main-content">
    <div class="content-container">
      <!-- 左侧内容 -->
      <div class="content-left">
        <!-- 轮播图 -->
        <Banner/>
        <!-- 分类导航 -->
        <News :type="DEFAULT_TYPE"/>
      </div>
      <!--右侧内容-->
      <div class="content-right">
        <!--热点新闻-->
        <HotNews/>
        <!--视频展示-->
        <Video/>
      </div>
    </div>
  </div>
</template>

<script>
import News from "@/components/News.vue"
import Banner from "@/components/Banner.vue"
import HotNews from "@/components/HotNews.vue"
import Video from "@/components/Video.vue";

export default {
  components: {
    News,
    Banner,
    HotNews,
    Video
  },
  data() {
    return {
      DEFAULT_TYPE: 'default',
    }
  },
  mounted() {
  },

  methods: {}
}
/*
更符合规范的css组织是怎样的？
css命名规范

*/
</script>
<style>
.main-content {
  padding: 20px;
}

.content-container {
  display: flex;
  gap: 20px;
}

.content-left {
  flex: 2;
}

.content-right {
  flex: 1;
  width: 0;
}


</style>

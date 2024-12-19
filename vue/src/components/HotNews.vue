<script>
export default {
  name: "Hot",
  data() {
    return {
      hotNewsList: [],
      hotNewsOffset:0,
    }
  },
  mounted() {
    this.hotNewsOffset = 0;
    this.loadHotNews()
  },
  methods: {
    loadHotNews() {
      if (this.hotNewsList.length === 0) {
        // 异步函数
        this.$request.get('/news/selectHot').then(res => {
          if (res.code === '200') {
            this.hotNewsList = res.data || [];
          } else {
            //this.$message.error('加载热点新闻失败！');
          }
        });
      }
      this.hotNewsOffset += 5;
      if (this.hotNewsOffset >= this.hotNewsList.length) {
        this.hotNewsOffset = 0;
      }
      console.log(this.hotNewsOffset)
    },
  },
}
</script>

<template>
  <div class="news-hot-list-container">
    <div class="list-title" @click="loadHotNews()">
      <img src="@/assets/imgs/hot.png" class="title-img">
      <button class="title-refresh"><i class="el-icon-refresh"></i>换一换</button>
    </div>
    <div class="news-hot-list">
      <!--渲染（偏移量 < 索引 < 偏移量 + 5）的元素-->
      <div class="news-hot-item" v-for="(item,index) in hotNewsList" :key="item.id"
           v-if="index-hotNewsOffset<5 && index-hotNewsOffset>=0">
        <strong class="news-hot-num" style="color: red" v-if="index<3">{{ index + 1 }}</strong>
        <strong class="news-hot-num" style="color: #666" v-else-if="index>=3">{{ index + 1 }}</strong>
        <span class="news-hot-title line1 line2">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-hot-list-container {

  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
//box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.list-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.title-img {
  width: 70px;
}

.title-refresh {
  font-size: 18px;
  cursor: pointer;
  color: #2a60c9;
  border: none;
  padding: 0;
  background: none;
}

.news-hot-list {
  min-height: 200px;
}

.news-hot-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
  cursor: pointer;
}

.news-hot-item:hover {
  color: #409EFF;
}

.news-hot-item:hover * {
  color: inherit !important;
}


.news-hot-num {
  width: 25px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.news-hot-title {
  flex: 1;
  font-size: 16px;
  color: #333;
}
</style>
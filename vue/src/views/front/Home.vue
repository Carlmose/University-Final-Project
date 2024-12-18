<template>
  <div class="main-content">
    <div class="content-container">
      <!-- 左侧内容 -->
      <div class="content-left">
        <!-- 轮播图 -->
        <el-carousel height="400px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <a :href="'/front/newsDetail?id='+item.id" target="_blank">
              <img :src="item.img" alt="" class="carousel-image">
            </a>
          </el-carousel-item>
        </el-carousel>

        <!-- 分类导航 -->
        <div class="category-nav">
          <div class="category-item"
               :class="{'category-item-active': category === null}"
               @click="loadCategoryNews(null)">
            全部
          </div>
          <div class="category-item"
               :class="{'category-item-active': category === item.name}"
               v-for="item in categoryList"
               :key="item.id"
               @click="loadCategoryNews(item.name)">
            {{ item.name }}
          </div>
        </div>

        <!-- 新闻列表 -->
        <div class="news-list">
          <div class="news-item"
               v-for="item in tableData"
               :key="item.id"
               @click="$router.push('/front/newsDetail?id='+item.id)">
            <img class="news-img" :src="item.img">
            <div class="news-content">
              <div class="news-title">{{ item.title }}</div>
              <div class="news-desc">{{ item.descr }}</div>
              <div class="news-bottom">
                <span class="news-time"><i class="el-icon-time">{{ item.time }}</i></span>
                <span class="news-comments-num"><i class="el-icon-s-comment"></i>{{item.commentCount}}</span>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
          </div>
        </div>
      </div>

      <div class="content-right">
        <!--热点新闻-->
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
        <!--视频展示-->
        <div class="selected-video-container">
          <div class="selection-title">精选视频</div>
          <video controls class="selected-video" :src="video"></video>
          <div class="selection-list">
            <div class="selection-item" v-for="item in videoList" :key="item.id"
                 :class="{'selection-item-active':video===item.file}">
              <img class="selection-img" v-if="video===item.file" src="@/assets/imgs/play.svg">
              <div class="selection-item-title line1 line2" @click="video=item.file">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      tableData: [], // 所有新闻数据
      bannerList: [],
      categoryList: [],
      hotNewsList: [],
      videoList: [],
      video: null,
      hotNewsOffset: 0,// 热点新闻偏移量
      pageNum: 1, // 当前的页码
      pageSize: 10, // 每页显示的个数
      total: 0,
      category: null,
    }
  },
  mounted() {
    this.hotNewsOffset = 0;
    this.loadBanner()
    this.loadCategory()
    this.load(1)
    this.loadHotNews()
    this.loadVideos()
  },

  // methods：本页面所有的点击事件或者其他函数定义区
  methods: {
    loadVideos() {
      this.$request.get('/video/selectAll').then(res => {
        if (res.code === '200') {
          this.videoList = res.data || []
          this.video = this.videoList[0].file
        }
      })
    },
    // 加载热点新闻
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
    loadBanner() {
      this.$request.get('/banner/selectAll').then(res => {
        if (res.code === '200') {
          this.bannerList = res.data || []
        }
      })
    },
    loadCategory() {
      this.$request.get('/category/selectAll').then(res => {
        if (res.code === '200') {
          this.categoryList = res.data || []
        }
      })
    },
    load(pageNum) {
      // 分页查询
      if (pageNum) this.pageNum = pageNum;
      this.$request
          .get("/news/selectPage", {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              category: this.category,
            },
          })
          .then((res) => {
            if (res.code === "200") {
              this.tableData = res.data?.list;
              this.total = res.data?.total;
            } else {
              this.$message.error(res.msg);
            }
          });
    },
    loadCategoryNews(name) {
      this.category = name
      this.load(1)
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum);
    },
  }


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

/* 轮播图 */
.carousel-image {
  width: 100%;
}

/* 分类导航 */
.category-nav {
  display: flex;
  margin: 20px 0;
}

.category-item {
  border: 1px solid #2a60c9;
  color: #2a60c9;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}

.category-item-active {
  background-color: #2a60c9;
  color: #fff;
}

/* 新闻列表 */
.news-list {
}

.news-item {
  cursor: pointer;
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 0.3s ease; /* 添加过渡效果 */

}
.news-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 调整阴影大小和模糊半径 */
}
.news-item:hover .news-title{
  color: #37f
}
.news-img {
  width: 150px;
  height: 100px;
  border-radius: 5px;
  display: block;
}

.news-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 0;
}

.news-title {
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}

.news-title:hover {
  color: #409EFF;
}

.news-desc {
  flex: 1;
  color: rgb(102, 102, 102);
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 7px;
}

.news-bottom {
}

.news-time {
  color: #666;
  margin-right: 20px;
}

.news-comments-num {
}

/* 分页 */
.pagination {
  margin: 10px 0;
  padding: 10px;
}

/* 热点榜 */
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

.selection-title {
  font-size: 24px;
}

.selected-video-container {
  display: flex;
  gap: 10px;
  flex-direction: column;
  height: 330px;
}

.selected-video {
  flex: 1;
}

.selection-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  bottom: 0;
}

.selection-item {
  display: flex;
  gap: 5px;
  width: 100%;
  font-size: 15px;
  cursor: pointer;
}

.selection-item-active {
  color: #409EFF;
}

.selection-item-title {

}


.selection-img {
  width: 15px;
}
</style>

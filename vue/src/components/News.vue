<script>
export default {
  name: "News",
  props: {
    //接收参数，选择展示默认新闻列表还是新闻查询列表
    type:String
  },
  created() {
    if (this.type === 'default') {
      this.loadCategory()
    }
    this.load(1)
  },
  data() {
    return{
      tableData: [],
      newsList: [],
      categoryList: [],
      category: null,
      pageNum: 1,
      pageSize: 5,
      total: 0
    }
  },
  methods: {
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
    loadCategory() {
      this.$request.get('/category/selectAll').then(res => {
        if (res.code === '200') {
          this.categoryList = res.data || []
        }
      })
    },
    loadCategoryNews(name) {
      this.category = name
      this.load(1)
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum);
    },
  },
}
</script>

<template>
  <div>
  <div class="category-nav" v-if="type === 'default'">
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
</template>

<style scoped>
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
</style>
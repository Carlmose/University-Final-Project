<template>
  <div class="news-container" >
    <div class="news-header">
      <div class="news-title">{{news.title}}</div>
      <div class="news-info">
        <span>发布时间：{{news.time}}</span>
        <span>阅读量：{{news.readCount}}</span>
      </div>
    </div>
    <div class="news-content w-e-text">
      <div v-html="news.content"></div>
    </div>
      <Comment :fid="id" :module="'news'" />
  </div>
</template>
<script>
import Comment from "@/components/Comment";
export default {
  name: "NewsDetail",
  components: {
    Comment
  },
  data() {
    return {
      id:this.$route.query.id,
      news:[],
    }
  },
  mounted() {
  },
  created() {
    this.$request.put('/news/updateReadCount/'+this.id).then(res=>{
      if(res.code==='200'){
        this.loadNews()
      }
    })
  },
  methods: {
    loadNews(){
      this.$request.get('/news/selectById/'+this.id).then(res=>{
        if(res.code==='200'){
          this.news=res.data
        }
      })
    },
  }
}
</script>

<style scoped>
.news-container {
  max-width: 800px; /* 设置最大宽度 */
  margin: 0 auto; /* 水平居中 */
  padding: 20px; /* 内边距 */
  background-color: #fff; /* 背景颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.news-header {
  text-align: center;
  margin-bottom: 20px; /* 头部与内容之间的间距 */
}

.news-title {
  font-weight: bold;
  font-size: 24px; /* 字体大小 */
  color: #333; /* 字体颜色 */
  margin-bottom: 10px; /* 标题与信息之间的间距 */
}

.news-info {
  font-size: 14px; /* 字体大小 */
  color: #999; /* 字体颜色 */
}

.news-info span {
  margin-right: 15px; /* 间隔 */
}

.news-content {
  width: 100%;
  font-size: 16px; /* 字体大小 */
  line-height: 1.6; /* 行高 */
  color: #333; /* 字体颜色 */
}


</style>

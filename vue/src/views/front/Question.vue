<template>
  <div class="question-container">
    <div class="question-list card">
      <div class="question-item" @click="$router.push('/front/questionDetail?id='+item.id)" v-for="(item, index) in tableData" :key="item.id">
        <div class="question-index">
          <div v-if="index < 3" class="index-dot" style="background-color: orangered;"></div>
          <div v-else class="index-dot" style="background-color: #2a60c9;"></div>
        </div>
        <div class="question-content">
          <div class="question-title">{{ item.title }}</div>
          <div class="question-description">{{ item.title }}</div>
        </div>
        <div class="question-image">
          <img :src="item.img" alt="" class="question-img">
        </div>
      </div>

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

    <div class="answer-list">
      <div class="answer-title">
        <img src="@/assets/imgs/ask.png" alt="" class="answer-icon">
        <span class="answer-text">等你回答</span>
      </div>
      <div class="answer-item card" v-for="item in noAnswerList" :key="item.id">
        <div class="answer-question">{{ item.title }}</div>
        <div class="answer-date">{{ item.date }}</div>
        <el-button type="primary" @click="$router.push('/front/questionDetail?id=' + item.id)" size="mini" icon="el-icon-edit">写回答</el-button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Question",
  data() {
    return {
      tableData: [],  // 所有的数据
      pageNum: 1,   // 当前的页码
      pageSize: 10,  // 每页显示的个数
      total: 0,
      noAnswerList: []
    }
  },
  created() {
    this.load(1)
    this.loadNoAnswer()
  },
  methods: {
    loadNoAnswer() {
      this.$request.get('/question/selectNoAnswer').then(res => {
        this.noAnswerList = res.data || []
      })
    },
    load(pageNum) {  // 分页查询
      if (pageNum) this.pageNum = pageNum
      this.$request.get('/question/selectFrontPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      }).then(res => {
        if (res.code === '200') {
          this.tableData = res.data?.list
          this.total = res.data?.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum)
    },
  }
}
</script>

<style scoped>
.question-container {
  width: 60%;
  margin: 10px auto;
  display: flex;
  align-items: flex-start;
  grid-gap: 15px;
}

.question-list {
  flex: 1;
}

.question-item {
  display: flex;
  margin-bottom: 15px;
  cursor: pointer;
}
.question-item:hover .question-title {
  color: #37f
}

.question-index {
  width: 20px;
  padding-top: 10px;
}

.index-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.question-content {
  flex: 1;
  width: 0;
}

.question-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.question-description {
  color: #666;
}

.question-image {
  margin-left: 15px;
}

.question-img {
  width: 150px;
  height: 100px;
  border-radius: 5px;
}

.pagination {
  margin: 20px 0;
}

.answer-list {
  width: 300px;
}

.answer-title {
  display: flex;
  margin-bottom: 10px;
}

.answer-icon {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-right: 5px;
}

.answer-text {
  font-size: 20px;
}

.answer-item {
  margin-bottom: 10px;
}
.answer-item:hover .answer-question {
  color: #37f
}

.answer-question {
  margin-bottom: 10px;
  font-size: 16px;
}

.answer-date {
  color: #888;
  display: flex;
  flex: 1;
}

</style>
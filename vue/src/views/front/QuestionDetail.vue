<template>
  <div style="width: 50%; margin: 10px auto">
    <div class="card" style="margin-bottom: 10px">
      <div style="font-size: 24px; margin-bottom: 20px">{{ question.title }}</div>
      <div style="margin-bottom: 20px; color: #444; font-size: 16px">{{ question.descr }}</div>
      <div style="display: flex">
        <div style="flex: 1; color: #888">
          <span style="margin-right: 20px">发布日期：{{ question.date }}</span>
          <span>阅读量：{{ question.readCount }}</span>
        </div>
        <el-button type="primary" icon="el-icon-edit" @click="handleAdd">回答问题</el-button>
      </div>
    </div>
    <!--回答模块-->
    <div >
      <div style="font-size: 24px; margin-bottom: 20px">回答列表 {{ total }}</div>
      <div>
        <div v-for="item in answerList" :key="item.id" style="display: flex; grid-gap: 10px; padding-bottom: 20px; border-bottom: 1px solid #ddd; margin-bottom: 20px">
          <!--点赞按钮-->
          <div style="color: #666; padding-top: 20px; width: 60px; cursor: pointer" @click="updateLikeCount(item.id)">
            <i style="font-size: 20px" class="el-icon-like">
            </i>{{ item.likesCount }}
          </div>
          <div style="flex: 1;">
            <div style="display: flex; grid-gap: 10px; margin-bottom: 10px">
              <img :src="item.userAvatar" alt="" style="width: 50px; height: 50px; border-radius: 50%">
              <div style="color: #888;">
                <div style="margin-bottom: 10px">{{ item.userName }}</div>
                <div>{{ item.time }}</div>
              </div>
            </div>

            <div class="w-e-text">
              <div v-html="item.content"></div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin: 15px 0">
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
<!--      回答内容输入框-->
      <el-dialog title="回答问题" :visible.sync="fromVisible" width="60%">
        <el-form :model="form" label-width="100px" style="padding-right: 50px"  ref="formRef">
          <el-form-item label="回答内容">
            <div id="editor"></div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="fromVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "QuestionDetail",
  data() {
    return {
      id: this.$route.query.id,
      question: {},
      answerList: [],  // 所有的数据
      pageNum: 1,   // 当前的页码
      pageSize: 10,  // 每页显示的个数
      total: 0,
      form: {},
      editor: null,
      content: '',
      fromVisible: false,
      user: JSON.parse(localStorage.getItem('xm-user') || '{}')
    }
  },
  created() {
    this.$request.put('/question/updateReadCount/' + this.id).then(() => {
      this.load()
    })

    this.loadAnswer(1)
  },
  methods: {
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.form.questionId = this.id
      this.form.content = this.editor.txt.html()
      this.$request.post('/answer/add', this.form).then(res => {
        if (res.code === '200') {  // 表示成功保存
          this.$message.success('保存成功')
          this.loadAnswer(1)
          this.fromVisible = false
        } else {
          this.$message.error(res.msg)  // 弹出错误的信息
        }
      })
    },
    handleAdd() {   // 新增数据
      this.form = {}  // 新增数据的时候清空数据
      this.fromVisible = true   // 打开弹窗
      this.setRichText('')
    },
    handleEdit(row) {   // 编辑数据
      this.form = JSON.parse(JSON.stringify(row))  // 给form对象赋值  注意要深拷贝数据
      this.fromVisible = true   // 打开弹窗
      this.setRichText(this.form.content)
    },
    setRichText(html) {
      this.$nextTick(() => {
        if (this.editor){
          this.editor.destroy()  // 销毁旧的编辑器实例
        }
        this.editor = new E(`#editor`)
        this.editor.config.uploadImgServer = this.$baseUrl + '/files/editor/upload'
        this.editor.config.uploadFileName = 'file'
        this.editor.config.uploadImgHeaders = {
          token: this.user.token
        }
        this.editor.config.uploadImgParams = {
          type: 'img',
        }
        this.editor.config.zIndex = 0
        this.editor.create()  // 创建新的编辑器实例
        this.editor.txt.html(html)  // 设置编辑器内容
      })
    },
    updateLikeCount(id) {
      this.$request.put('/answer/updateLikeCount/' + id).then(res => {
        if (res.code === '200') {
          this.loadAnswer(this.pageNum)
        }
      })
    },
    loadAnswer(pageNum) {
      if (pageNum) this.pageNum = pageNum
      this.$request.get('/answer/selectFrontPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          questionId: this.id
        }
      }).then(res => {
        this.answerList = res.data?.list || []
        this.total = res.data?.total || 0
      })
    },
    load() {
      this.$request.get('/question/selectById/' + this.id).then(res => {
        this.question = res.data || {}
      })
    },
    handleCurrentChange(pageNum) {
      this.loadAnswer(pageNum)
    },
  }
}
</script>

<style scoped>

</style>
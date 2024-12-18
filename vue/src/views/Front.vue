<template>
  <div>
    <div ><iframe scrolling="no" src="https://widget.tianqiapi.com/?style=tg&skin=pitaya" frameborder="0" width="470" height="40" allowtransparency="true"></iframe></div>
    <!--头部-->
    <div class="front-header">
      <div class="front-header-left">
        <img src="@/assets/imgs/logo1.png" alt="">
        <div class="title">项目前台</div>
      </div>
      <div class="front-header-center">
        <div class="front-header-nav">
          <div style="display: flex">
            <!--遍历menus数组并渲染菜单，根据用户所处页面高亮对应菜单项-->
            <div class="menu" :class="{ 'menu-active' : $route.path.includes(item.path) }"
                 v-for="item in menus" :key="item.path" @click="$router.push(item.path)">{{ item.text }}</div>
          </div>
          <div class="search-box">
            <el-input v-model="searchText" placeholder="搜索新闻" clearable></el-input>
          </div>
        </div>
      </div>
      <div class="front-header-right">
        <div v-if="!user.username">
          <el-button @click="$router.push('/login')">登录</el-button>
          <el-button @click="$router.push('/register')">注册</el-button>
        </div>
        <div v-else>
          <el-dropdown>
            <div class="front-header-dropdown">
              <img :src="user.avatar" alt="">
              <div style="margin-left: 10px">
                <span>{{ user.name }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
              </div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div  @click="$router.push('/front/person')">个人中心</div>
              </el-dropdown-item>
<!--              我的提问-->
              <el-dropdown-item>
                <div style="text-decoration: none" @click="$router.push('/front/UserQuestion')">我的提问</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div style="text-decoration: none" @click="$router.push('/front/UserAnswer')">我的回答</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div style="text-decoration: none" @click="logout">退出</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!--主体-->
    <div class="main-body">
      <router-view ref="child" @update:user="updateUser" />
    </div>
    <Footer/>
  </div>

</template>

<script>
import Footer from "@/components/Footer";
export default {
  name: "FrontLayout",
  components: { Footer },
  data () {
    return {
      menus: [
        { text: '新闻首页', path: '/front/home' },
        { text: '热门问答', path: '/front/question' },
        { text: '周边新闻', path: '/front/localNews' },
        { text: '新闻视频', path: '/front/video' },
        { text: '意见反馈', path: '/front/feedback' },
        { text: '系统公告', path: '/front/notice' },
      ],
      //top: '',
      //notice: [],
      user: JSON.parse(localStorage.getItem("xm-user") || '{}'),
    }
  },

  mounted() {

  },
  methods: {
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('xm-user') || '{}')   // 重新获取下用户的最新信息
    },
    // 退出登录
    logout() {
      // 清除用户数据缓存
      localStorage.removeItem("xm-user");
      this.$router.push("/login");
    },
  }

}
</script>

<style scoped>
  @import "@/assets/css/front.css";
  .menu {
    padding: 0 20px;
    color: #0551b6;
    cursor: pointer;
    font-size: 16px;
  }
  .menu:hover:not(.menu-active) {
    color: #fff;
  }
  .menu-active {
    color: #fff;
    background-color: #2a60c9;
  }
</style>
<script>
export default {
  name: "Header",
  props: {
    header: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  mounted: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<template>
  <div class="front-header-nav">
    <div style="display: flex;align-items: center;height: 100%">
      <!--遍历menus数组并渲染菜单，根据用户所处页面高亮对应菜单项-->
      <div class="menu" :class="{ 'menu-active' : $route.path.includes(item.path) }"
           v-for="item in header" :key="item.path" @click="$router.push(item.path)">{{ item.text }}</div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  padding: 0 20px;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  position: relative; /* 添加这一行 */
}
.menu:hover:not(.menu-active) {
  color: #37f;
  font-weight: 600;
}
.menu-active {
  color: #3377ff;
  font-weight: 600;
}
/* 新增的指示器样式 */
.menu-active::before {
  background: #3377ff;
  border-radius: 2px;
  bottom: 0;
  content: "";
  height: 4px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 16px;
}
</style>
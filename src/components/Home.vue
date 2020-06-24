<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <span>电商后台管理系统</span>
      <el-button type="danger" size="small" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toogle-button" @click="toggleMenu">
          <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
        </div>
        <el-menu
          unique-opened
          background-color="#313743"
          text-color="#fff"
          active-text-color="#379AFD"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.id+''">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="children in item.children"
              :key="children.id"
              :index="'/'+children.path"
              @click="saveNavState('/'+children.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{children.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconList: {
        125: 'el-icon-user',
        103: 'el-icon-box',
        101: 'el-icon-shopping-bag-1',
        102: 'el-icon-s-order',
        145: 'el-icon-pie-chart'
      },
      // 是否折叠菜单
      isCollapse: false,
      // 选中的路径
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
    this.isCollapse = JSON.parse(
      window.sessionStorage.getItem('isCollapse') ||
        JSON.stringify({ flag: false })
    ).flag
  },
  methods: {
    logout() {
      // 退出
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      // 获取菜单列表
      const { data: res } = await this.$http.get('/menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    toggleMenu() {
      // 展开折叠菜单
      this.isCollapse = !this.isCollapse
      window.sessionStorage.setItem(
        'isCollapse',
        JSON.stringify({ flag: this.isCollapse })
      )
    },
    saveNavState(path) {
      // 保存菜单选中状态
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-menu {
  border-right: none;
}
.el-header {
  background-color: #363d3f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.el-aside {
  background-color: #313743;
}
.el-main {
  background-color: #e9edf0;
}
.toogle-button {
  background-color: #475162;
  color: #fff;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

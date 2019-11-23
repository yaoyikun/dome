<template>
  <el-container class="containerBox">
    <el-header class="header">
      <div class="left">
        <i
          class="topIcon el-icon-s-fold"
          @click="isCollapse=!isCollapse"
          :class="{rotate:isCollapse}"
        ></i>
        <span>
          <img src="../../assets/index-logo.png" alt class="topLogo" />
        </span>
        <span class="topTitle">黑马面面</span>
      </div>
      <div class="right">
        <img :src="topPhotoUrl" alt class="topPhoto" />
        <span class="topUser">小哥,您好</span>
        <el-button type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container class="containerSm">
      <el-aside width="auto" class="aside">
        <el-menu default-active="5" class="el-menu-vertical-demo" router :collapse="isCollapse">
          <el-menu-item index="dataList">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="testList">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index='enterprise'>
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// var token=window.localStorage.getItem('token')

export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
      enterprise:'enterprise',
      topPhotoUrl:'',
    
    };
  },
  methods: {
    
      
      
  },
  computed: {
  },
};
</script>

<style lang='less'>
html,
body,
#app,
.containerBox {
  height: 100%;
}
.containerSm {
  height: 100%;
}
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topIcon {
      font-size: 24px;
      margin-right: 22px;
    }
    .topLogo {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    .topTitle {
      font-size: 22px;
      color: #49a1ff;
    }
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topPhoto {
      width: 43px;
      height: 43px;
      border-radius: 50%;
      margin-right: 9px;
    }
    .topUser {
      color: #636363ff;
      font-size: 14px;
      margin-right: 38px;
    }
  }
}
.aside {
  width: 201px;
}
.main {
  background:rgba(232,233,236,1);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-icon-s-fold {
  font-size: 40px;
  transition: 0.5s;
}
.rotate {
  transform: rotate(-90deg);
}
</style>
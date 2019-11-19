<template>
  <div class="login-container">
    <!-- 左侧  form -->
    <div class="form-wrapper">
      <span class="form-pic">
        <img src="../../assets/login_icon.png" alt />
      </span>
      <span class="form-title">黑马面面</span>
      <span class="form-icon"></span>
      <span class="form-login">用户登录</span>
      <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="input2" class="form-input"></el-input>
      <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="input2" class="form-input"></el-input>
      <el-row class="form-input">
        <el-col :span="17">
          <el-input
            placeholder="请输入验证码"
            prefix-icon="el-icon-key"
            v-model="input2"
            class="form-key"
          ></el-input>
        </el-col>
        <el-col :span="7">
          <img src="../../assets/验证码占位符.png" alt class="captcha" />
        </el-col>
      </el-row>
      <el-checkbox v-model="checked" class="checkbox">
        我已阅读并同意
        <el-link type="primary">用户协议</el-link>和
        <el-link type="primary">隐私条款</el-link>
      </el-checkbox>
      <!-- 登录 注册按钮 -->
      <el-button class="login-btn" type="primary">登录</el-button>
      <el-button class="reg-btn" type="primary">注册</el-button>
    </div>
    <!-- 右侧  图片 -->
    <img src="../../assets/login_banner_ele.png" alt class="img" />
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang='less'>
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  .form-wrapper {
    padding: 0;
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    // display: flex;
    padding: 50px 43px 0 41px;
    box-sizing: border-box;
    .form-input {
      margin-top: 27px;
    }
    .form-pic {
      width: 22px;
      height: 17px;
      img {
        width: 22px;
        height: 17px;
        vertical-align: middle;
      }
    }
    .form-icon {
      display: inline-block;
      width: 1px;
      height: 27px;
      background: rgba(199, 199, 199, 1);
      margin-left: 15px;
    }
    .form-title {
      font-size: 24px;
      margin-left: 15px;
    }
    .form-login {
      font-size: 22px;
      margin-left: 15px;
    }
    .captcha {
      border: 1px dashed #999;
      height: 38px;
      width: 114px;
    }
    .checkbox {
      display: flex;
      color: #999;
      font-size: 14px;
      margin-top: 32px;
      align-items: center;
      span.el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }
    // 按钮
    .login-btn,
    .reg-btn {
      width: 100%;
      margin-left: 0;
      margin-top: 27px;
    }
  }
}
</style>


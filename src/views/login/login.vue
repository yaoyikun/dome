<template>
  <!-- 登录组件html结构 -->
  <div class="login-container">
    <!-- 左侧  form表单 -->
    <div class="form-wrapper">
      <!-- form表单title -->
      <div class="title-box">
        <!-- logo -->
        <img src="../../assets/login_icon.png" alt class="login-logo" />
        <span class="titlt">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 关联表单部分  model表单数据对象  rules表单验证规则  ref  status-icon输入框中显示校验结果反馈图标-->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
        <!-- label标签文本 prefix-icon:字体图标-->
        <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可 -->

        <!-- 手机号 -->
        <el-form-item label prop="phone">
          <el-input
            v-model="loginForm.phone"
            prefix-icon="el-icon-user"
            placeholder="请输入您的手机号码"
            class="phone-input"
          ></el-input>
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item label prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入您的登录密码"
            class="password-input"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label prop="captcha">
          <!-- 利用饿了吗 栅格系统 -->
          <el-row class="captcha-row">
            <el-col :span="17">
              <el-input
                v-model="loginForm.captcha"
                prefix-icon="el-icon-key"
                placeholder="请输入您的验证码"
                class="captcha-input"
              ></el-input>
            </el-col>
            <!-- 图形验证 -->
            <el-col :span="7">
              <img :src="captchaSrc" class="captcha" @click="changeCaptcha" alt />
            </el-col> 
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-checkbox class="checkbox" v-model="checked">
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>
        <!--按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm') " class="login-btn">登录</el-button>
          <el-button class="reg-btn" @click="showReg = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_banner_ele.png" alt class="banner" />

    <!-- 注册对话框 -->
    <el-dialog title="用户注册" class="reg-dialog" :visible.sync="showReg">
      <!-- 表单   model表单数据对象-->
      <el-form :model="registerForm"  :rules='registerRules' ref="registerForm">
        <!-- 头像 -->
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://183.237.67.218:3002/uploads"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" :label-width="formLabelWidth" prop='name'>
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
          <el-input v-model="registerForm.emali" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" :label-width="formLabelWidth" prop='phone'>
          <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" :label-width="formLabelWidth" prop=password>
          <el-input v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图形验证码 -->
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="registerForm.code"
                autocomplete="off"
              ></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <!-- 图形验证码 -->
              <img
                class="captcha"
                @click="changeRegCaptcha"
                :src="regCaptcha"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 手机验证码 -->
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="registerForm.rcode"
                autocomplete="off"
              ></el-input>
            </el-col>
            <!-- 分栏偏移 -->
            <el-col :span="7" :offset="1">
              <!-- 获取手机验证码 -->
              <el-button
                class="captcha-btn"
                @click="getMessage"
                type="primary"
                :disabled="isDisabled"
                >{{ btnTxt }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showReg = false">取 消</el-button>
        <el-button type="primary" @click="registerUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入api封装接口后axios就无需使用  如不注释就会报错
// import axios from "axios";

// 导入接口函数
import { login,register,sendsms } from '../../api/api.js'//利用es6结构赋值语法


export default {
  data() {
    // 定义校验手机规则
    const checkPhone = (rules, value, callback) => {
      // value是值
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else {
        // 格式验证
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 验证
        if (reg.test(value)) {
          // 对的
          callback();
        } else {
          // 错误
          callback(new Error("手机号格式不对哦"));
        }
      }
    };
    const checkEmail = (rules, value, callback) => {
      // value是值
      if (!value) {
        callback(new Error("邮箱号不能为空"));
      } else {
        // 格式验证
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 验证
        if (reg.test(value)) {
          // 对的
          callback();
        } else {
          // 错误
          callback(new Error("邮箱号格式不对哦"));
        }
      }
    };

    
    return {
      loginForm: {
        // 手机号
        phone: "",
        // 密码
        password: "",
        //captcha验证码
        captcha: ""
      },
      // 是否显示注册框
      showReg: false,
      // 自动勾选
      checked: true,
      //验证码地址
      captchaSrc: "http://183.237.67.218:3002/captcha?type=login",
      // 登录验证规则
      loginRules: {
        phone: [{ validator: checkPhone }],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码的强度不够" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "验证码只有4位哦，不要写错了噢" }
        ]
      },
      // 注册表单验证规则
      registerRules:{
        // 姓名的表单验证
        name:[{required:true,message:'姓名不能为空', trigger:'blur'}],
        //邮箱的表单验证
        email:[{
          required:true,
          validator:checkEmail
        }]
      },

      // 注册框
      formLabelWidth:'67px',
      // 头像url
      imageUrl:'',
      registerForm:{
        name:'',
        email:'',
        password:'',
        phone:'',
        code:'',
        rcode:'',
        // 用户头像
        avatar:"",
      },
      // 注册图形码地址
      regCaptcha:"http://183.237.67.218:3002/captcha?type=sendsms",
      // 表单是否禁用
      isDisabled:false,
      // 短信验证码按钮文本
      btnTxt: "获取短信验证码",
    };
  },
  methods: {
    // 点击登录
    submitForm(formName) {
      // 布尔判断 如果为false 判断协议是否勾选
      if (!this.checked) {
        this.$message.warning("未勾选用户协议，必须要勾！！！");
        return;
      }
      // this.$refs['ruleForm']==> 获取饿了么的表单
      // 饿了么的表单.validate()
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证成功
          // alert("submit!");
          // 接口调用
          // axios({
          //   url: "http://183.237.67.218:3002/login",
          //   method: "post",
          //   data: {
          //     phone: this.loginForm.phone,
          //     password: this.loginForm.password,
          //     code: this.loginForm.captcha
          //   },
          //   // 解决cookie携带跨域问题
          //   withCredentials: true
          // })
          login(
            {
              phone: this.loginForm.phone,
              password: this.loginForm.password,
              code: this.loginForm.captcha
            }
          ).then(res => {
            // window.console.log(res);
            if (res.data.code === 200) {
              // 成功
              this.$message.success("你可算回来啦！");
            } else {
              // 失败
              this.$message.warning("登录失败了哦");
            }
          });
        } else {
          // 验证失败
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    changeCaptcha() {
      // 修改值即可
      // 很有可能重复
      this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login&${Math.random()}`;
      // 绝对不会重复
      this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login&${Date.now()}`;
      // this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login`
    },
    // 图片上传的方法
    // res 服务器返回的值
    // file 文件信息
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // window.console.log(res);
      // 保存到表单中
      this.registerForm.avatar = res.data.file_path;
    },
    // 文件上传之前对文件做一些限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 重新获取注册 图形验证码
    changeRegCaptcha() {
      // 修改地址
      this.regCaptcha = `http://183.237.67.218:3002/captcha?type=sendsms&${Date.now()}`;
    },
    getMessage(){
      // 非空判断
      if (this.registerForm.phone.trim() == "") {
        this.$message.warning("哥们，你的手机号呢！滑稽");
        return;
      }
      // 格式判断
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.registerForm.phone)) {
        this.$message.warning("老铁,你的手机是不是写错了呀！");
        return;
      }
      // 说明 格式 内容都有
      // axios({
      //   url: "http://183.237.67.218:3002/sendsms",
      //   method: "post",
      //   data: {
      //     code: this.registerForm.code,
      //     phone: this.registerForm.phone
      //   },
      //   // 跨域携带cookie
      //   withCredentials: true
      // })
      sendsms(
        {
          code: this.registerForm.code,
          phone: this.registerForm.phone
        }
      ).then(res => {
        window.console.log(res);
      });

      let time = 60;
      // 禁用按钮 开启定时器
      this.isDisabled = true;
      const interId = setInterval(() => {
        // 递减
        time--;
        // 修改页面
        this.btnTxt = `${time}S后再次获取`;
        if (time == 0) {
          clearInterval(interId);
          // 重新启用按钮
          this.isDisabled = false;
          // 还原文本
          this.btnTxt = "获取短信验证码"
        }
      }, 100);
    },
    // 用户注册
    registerUser(){
      // axios({
      //   url:"http://183.237.67.218:3002/register",
      //   method:"post",
      //   data:{
      //     avatar:this.registerForm.avatar,
      //     email:this.registerForm.email,
      //     name:this.registerForm.name,
      //     password:this.registerForm.password,
      //     phone:this.registerForm.phone,
      //     rcode:this.registerForm.rcode
      //   },
      //   withCredentials:true
      // })
      register(
        {
          avatar:this.registerForm.avatar,
          email:this.registerForm.email,
          name:this.registerForm.name,
          password:this.registerForm.password,
          phone:this.registerForm.phone,
          rcode:this.registerForm.rcode
        }
      ).then(res=>{
        window.console.log(res);
      })
    }
  }
};
</script>

<style lang='less'>
// 登录盒子
.login-container {
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 水平方向的对其方式 */
  justify-content: space-around;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  .form-wrapper {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 48px;
    padding-left: 43px;
    padding-right: 41px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      align-items: center;
      .login-logo {
        width: 22px;
        height: 17px;
        margin-right: 14px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .phone-input {
      margin-top: 30px;
    }
    .password-input {
      margin-top: 25px;
    }
    .captcha-row {
      margin-top: 25px;
      .captcha {
        // width: 110px;
        width: 100%;
        height: 42px;
      }
    }

    // 协议
    .checkbox {
      color: #999;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-top: 32px;
      .el-checkbox__label {
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
// 对话框中的 样式
  .captcha {
    height: 41px;
    width: 100%;
  }
  .captcha-btn {
    width: 100%;
  }
  // 对话框
  .reg-dialog .el-dialog {
    width: 602px;
  }
  .reg-dialog {
    // 头部
    .el-dialog__header {
      text-align: center;
      background: linear-gradient(to right, #01c5fa, #1394fa);
      .el-dialog__title {
        color: white;
      }
    }
    // 底部
    .dialog-footer {
      text-align: center;
    }
  }

// 头像组件样式
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.login-container .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
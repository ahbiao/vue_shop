<template>
  <div class="login_box">
    <div class="img_box">
      <img src="../assets/logo.png" alt />
    </div>
    <div class="form_box">
      <el-form ref="formRef" label-width="0px" :model="form" :rules="rules">
        <!-- 用户名区域 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="fa fa-user"></el-input>
        </el-form-item>
        <!-- 密码区域 -->
        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="fa fa-lock" show-password></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset() {
      // 重置
      this.$refs.formRef.resetFields()
    },
    login() {
      // 登录
      this.$refs.formRef.validate(async valid => {
        if (!valid) return
        const { data } = await this.$http.post('login', this.form)
        if (data.meta.status !== 200) return this.$message.error('登陆失败！')
        this.$message.success('登陆成功')
        window.sessionStorage.setItem('token', data.data.token)
        // 编程式路由跳转  /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style scoped>
.login_box {
  background-color: #fff;
  width: 400px;
  height: 270px;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.img_box {
  height: 110px;
  width: 110px;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 8px #333;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.img_box > img {
  border: 1px solid #ddd;
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.form_box {
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>

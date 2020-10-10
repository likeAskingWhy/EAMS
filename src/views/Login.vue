<template>
  <div class="login-container">
    <el-form label-width="100px">
      <h4 style="text-align: center">你好，请登录</h4>
      <el-form-item label="用户名：">
        <el-input
            type="text"
            v-model="userInfo.username"
            placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="用户密码：">
        <el-input
            type="password"
            v-model="userInfo.password"
            placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: "Login",
    data() {
      return {
        checked: false,
        userInfo: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      handleLogin() {
        if (this.checked) {
          Cookies.set('username', this.userInfo.username, {expires: 7})
          Cookies.set('password', this.userInfo.password, {expires: 7})
          Cookies.set('remember', this.checked, {expires: 7})
        } else {
          Cookies.remove('username')
          Cookies.remove('password')
          Cookies.remove('remember')
        }
        this.$store.dispatch('Login', this.userInfo).then(() => {
          this.$router.push('/')
        }).catch(() => {
          console.log('error')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-container {
    height: 100%;
    .el-form {
      width: 450px;
      margin: 200px auto;
      border: 1px solid #409EFF;
      padding: 20px;

    }
  }
</style>
<template>
  <div class="login-container">
    <el-card shadow="hover">
      <div slot="header">
        <span>你好，请登录</span>
        <el-checkbox
            style="float: right"
            v-model="userInfo.checked"
            true-label="checked"
            false-label="unchecked"
        >记住密码</el-checkbox>
      </div>
      <el-form
          label-width="100px"
          :model="userInfo"
          :rules="rules"
          @keyup.native.enter="handleLogin"
          ref="loginForm">
        <el-form-item label="用户名：" prop="username">
          <el-input
              v-model="userInfo.username"
              placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户密码：" prop="password">
          <el-input
              type="password"
              v-model="userInfo.password"
              placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button
              :loading="loading"
              type="primary"
              style="width: 100%; margin-bottom: 12px"
              @click="handleLogin">
            <span v-if="!loading">登 录</span>
            <span v-else>登陆校验中，请稍后...</span>
          </el-button>
          <el-button
              type="danger"
              style="width: 100%; margin: 0"
              @click="handleReset">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: "Login",
    data() {
      return {
        loading: false,
        userInfo: {
          username: '',
          password: '',
          checked: 'unchecked',
        },
        rules: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '用户密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.userInfo.username = Cookies.get('username') || ''
      this.userInfo.password = Cookies.get('password') || ''
      this.userInfo.checked = Cookies.get('checked') || ''
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            if (this.userInfo.checked === 'checked') {
              Cookies.set('username', this.userInfo.username, {expires: 7})
              Cookies.set('password', this.userInfo.password, {expires: 7})
              Cookies.set('checked', this.userInfo.checked, {expires: 7})
            } else {
              Cookies.remove('password')
              Cookies.remove('checked')
            }
            this.$store.dispatch('Login', this.userInfo).then(() => {
              this.$router.push('/')
              this.loading = false
              this.$message.success('登录成功，欢迎回来~')
            }).catch(() => {
              this.loading = false
            })
          }
        })
      },
      handleReset() {
        this.$refs.loginForm.resetFields()
      },
    }
  }
</script>

<style scoped lang="scss">
  .login-container {
    height: 100%;
    .el-card {
      width: 450px;
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translate(-50%, -30%);
    }
  }
</style>
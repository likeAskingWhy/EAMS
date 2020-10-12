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
          <el-popover placement="bottom-start" width="285" v-model="visible">
            <div slot="reference">
              <el-input placeholder="请输入用户名" v-model="userInfo.username" @focus="handleFocus" @blur="handleBlur"></el-input>
            </div>
          </el-popover>
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
        visible: false,
        userInfoOptions: [],
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
    created() {
      this.userInfoOptions = Cookies.getJSON('userInfoList')
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            if (this.userInfo.checked === 'checked') {
              let userInfoList = this.userInfoOptions
              if (!userInfoList.includes(this.userInfo)) userInfoList.push(this.userInfo)
              Cookies.set('userInfoList', userInfoList, {expires: 30})
            } else {
              this.userInfoOptions.forEach((v, i) => {
                if (v.username === this.userInfo.username) this.userInfoOptions.splice(i, 1)
              })
              Cookies.remove('userInfoList')
              Cookies.set('userInfoList', this.userInfoOptions, {expires: 30})
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
      handleFocus() {
        this.visible = true
      },
      handleBlur() {
        this.visible = false
      }
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
      .my-autocomplete {
        li {
          line-height: normal;
          padding: 7px;

          .username {
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .password {
            font-size: 12px;
            color: #b4b4b4;
          }
          .highlighted .addr {
            color: #ddd;
          }
        }
      }
    }
  }
</style>
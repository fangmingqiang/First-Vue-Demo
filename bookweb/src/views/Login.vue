<template>
  <div class="login-div">
    <h2 style="border-radius: 20px;color: #8cc8ff">登陆</h2>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
          'userName',
          { rules: [{ required: true,  message: '请输入用户名!'}] },
        ]"
          placeholder="用户名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'passWord',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col span="12">
            <a-input
              v-decorator="[
            'validateCode',
            { rules: [{ required: true, message: '请输入验证码!'}] },
            ]"
              type="text"
              placeholder="验证码"
            >
            </a-input>
          </a-col>
          <a-col span="12">
            <img @click="this.changeCode" class="img-style" :src="code" style="{height: 32px;width: 250px}">
          </a-col>
        </a-row>
        <a-row >
          <a-col span="12">
            <a-checkbox
              v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
            >
              记住我
            </a-checkbox>
          </a-col>
          <a-col span="12">
            <a class="login-form-forgot" href="">
              忘记密码
            </a>
          </a-col>
        </a-row>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登陆
        </a-button>
        Or
        <router-link to="/register">
          现在注册
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>v

<script>

import axios from 'axios'
import { encrypt } from '@/utils/rsaEncode'

export default {
  name: 'Login',
  data: function () {
    return {
      username: '',
      password: '',
      code: 'http://localhost:8089/loginValidateCode'
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit (e) {
      const nowThis = this
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const code = { validateCode: values.validateCode }
          const dataLogin = { username: values.userName, password: encrypt(values.passWord) }
          axios.post('http://localhost:8089/checkLoginValidateCode', code).then(res => {
            if (res.data.status === true) {
              axios.post('http://localhost:8089/login/go', dataLogin).then(res => {
                // console.log(res)
                // console.log(res.status)
                if (res.status === 200) {
                  localStorage.setItem('accessToken', res.data.accessToken)
                  this.$message.info('登陆成功！')
                  console.log(localStorage.getItem('accessToken'))
                  nowThis.$router.push('bookshow')
                } else {
                  this.$message.warn('用户名或者密码错误!')
                }
              })
            } else if (res.data.status === null) {
              this.$message.warn('验证码过期!')
            } else if (res.data.status === false) {
              this.$message.warn('验证码错误!')
            }
          })
        }
      })
    },
    changeCode () {
      this.code = 'http://localhost:8089/loginValidateCode?time=' + new Date().getTime()
    }
  }
}
</script>

<style scoped>
.login-div {
  height: 300px;
  width: 250px;
  margin: 0 auto;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

.img-style {
  border: solid 1px gainsboro;
  border-radius: 5px;
}
.login-div {
  padding-top: 150px;
}
</style>

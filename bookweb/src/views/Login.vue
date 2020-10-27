<template>
  <div class="login-div">
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
          { rules: [{ required: true, message: '请输入用户名!'}] },
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
        <a class="login-form-forgot" href="">
          忘记密码
        </a>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登陆
        </a-button>
        Or
        <a href="">
          现在注册
        </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      username: 'admin',
      password: '123456'
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
          const dataLogin = { username: values.userName, password: values.passWord }
          axios.post('http://localhost:8089/login/go', dataLogin).then(res => {
            console.log(res.data)
            if (res.data === true) {
              this.$message.info('登陆成功！')
              nowThis.$router.push('bookshow')
            }
          })
        }
      })
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

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

</style>

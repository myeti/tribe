<template>
  <div class="frame login">

    <h2>Login</h2>

    <form @submit.prevent="signIn()">

      <input type="text" placeholder="Email" v-model="email" @change="clear()" required>
      <input type="password" placeholder="Password" v-model="password" @change="clear()" required>

      <button>Go</button>
      <span class="error" v-if="error">Invalid credential</span>

    </form>

  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    email: 'arkhen.exitium@gmail.com',
    password: '123456',
    error: false
  }),
  methods: {
    clear() {
      this.error = null
    },
    signIn() {
      this.loading = true
      this.$api.login(this.email, this.password)
        .then(user => this.$router.push('/'))
        .catch(err => {
          this.loading = false
          this.error = true
        })
    }
  }
}
</script>

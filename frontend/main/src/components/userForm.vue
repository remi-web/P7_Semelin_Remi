<script>
import UserService from '@/services/UserService.js'

export default {
  methods: {
    async signup () {
      try {
        const response = await UserService.signup({
          email: this.email,
          password: this.password,
          firstname: 'John',
          lastname: 'Smith',
          pseudo: 'jsmile'
        })
        this.$store.dispatch('login', { userId: response.userId, token: response.token })
        this.$router.push('/search')
      } catch (error) {
        this.error = error.toString()
      }
    },
    async login () {
      try {
        const response = await UserService.login({ email: this.email, password: this.password })
        this.$store.dispatch('login', { userId: response.userId, token: response.token })
        this.$router.push('/search')
      } catch (error) {
        this.error = error.toString()
      }
    }
  }
}
</script>

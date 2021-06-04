import { api } from '@/services/api.js'

export default {
  signup (credentials) {
    return api('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  login (credentials) {
    return api('/auth/login', {
      method: 'GET',
      body: JSON.stringify(credentials)
    })
  },
  user () {
    return api('/auth')
  }
}

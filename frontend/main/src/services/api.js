
let store = require('store')

// import store from '@/store.js'


export const baseUrl = 'http://localhost:3000/api/'

export async function api (url, params = {}) {
    params = Object.assign({
        mode: 'cors',
        cache: 'no-cache',
    }, params)

    params.headers = Object.assign({
        Authorization: `Bearer ${store.state.token}`,
        'Content-Type': 'application/json'
    }, params.headers)

    let response = await fetch(baseUrl + url, params)
    let json = await response.json() || {}
    if (!response.ok){
        let errorMessage = json.error ? json.error.error || json.error : response.status
        throw new Error(errorMessage)
    }
    return json
}

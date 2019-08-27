import {get, post} from '../utils/request'
import {APP_ID, APP_SECRET} from '../utils/const'

const API_BASE = 'https://test.youbaobao.xyz:18081'

export function getHomeData(params) {
  return get(`${API_BASE}/book/home/v2`, params)
}

export function recommend() {
  return get(`${API_BASE}/book/home/recommend/v2`)
}

export function freeRead() {
  return get(`${API_BASE}/book/home/freeRead/v2`)
}

export function hotBook() {
  return get(`${API_BASE}/book/home/hotBook/v2`)
}

export function getOpenId(code) {
  return get(`${API_BASE}/openId/get`, {
    appId: APP_ID,
    secret: APP_SECRET,
    code
  })
}

export function register(openId, userInfo) {
  return post(`${API_BASE}/user/register`, {
    openId,
    platform: mpvuePlatform,
    ...userInfo
  })
}

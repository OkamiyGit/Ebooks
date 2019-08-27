// 微信授权
import {getOpenId} from './index'

export function getSetting(auth, onSuccess, onFail) {
  mpvue.getSetting({
    success(res) {
      console.log(res)
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail(res) {
      console.log(res)// 直接抛出异常
    }
  })
}

// 获取用户信息
export function getUserInfo(onSuccess, onFail) {
  mpvue.getUserInfo({
    success(res) {
      console.log(res)
      const {userInfo} = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail(res) {
      console.log(res)// 直接抛出异常
    }
  })
}

// 缓存信息
export function setStorageSync(key, data) {
  mpvue.setStorageSync(key, data)
}

// 获取缓存信息
export function getStorageSync(key) {
  return mpvue.getStorageSync(key)
}

// 获取用户openid
export function getUserOpenId(callBack) {
  mpvue.login({
    success(res) {
      if (res.code) {
        const {code} = res
        getOpenId(code).then(response => {
          const {
            data: {data: {openid}}
          } = response
          console.log(openid)
          setStorageSync('openId', openid)
          callBack && callBack(openid)
        }).catch(err => {
          console.log(err)// 直接抛出异常
        })
      } else {
        console.log(res)// 直接抛出异常
      }
    },
    fail(res) {
      console.log(res)// 直接抛出异常
    }
  })
}

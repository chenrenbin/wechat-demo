const mobx = require('../libs/mobx')
const regeneratorRuntime = require('../libs/regenerator-runtime.js')

const account = function () {
  mobx.extendObservable(this, {
    account: wx.getStorageSync('account'),
    userInfo: null,

    get logged_in() {
      return this.account !== ''
    }
  })

  this.updateUserInfo = async () => {
    if (this.logged_in) {
      //  request api
    } else {
      this.userInfo = null
    }
  }

  mobx.autorun(() => {
    if (this.userInfo === null) {
      this.updateUserInfo()
    }
  })
}

module.exports = new account
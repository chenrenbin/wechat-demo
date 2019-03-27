const config = require('config.js')

const uploadFile = (file, params={}) => {

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${config.host}/apiName`,
      filePath: file.path,
      name: 'file',
      header: {
        'Content-Type': config.contentType,
        'api_version': config.version,
        'token': wx.getStorageSync('account').token || ''
      },
      formData: params,
      success: res => {
        let data = JSON.parse(res.data)
        if (data.code === 0) {
          resolve(data.data.list[0])
        } else {
          reject(data.code)
        }
      }
    })
  })
}

const uploadFiles = (files, params={}) => {
  if (checkLimit(files)) {
    wx.showToast({
      title: '当前文件不符合规范...',
      icon: 'none'
    })
    return
  }

  wx.showLoading({
    title: '上传中',
    mask: true
  })

  return new Promise((resolve, reject) => {
    let promises = []
    files.map(file => {
      promises.push(uploadFile(file, params))
    })

    Promise.all(promises).then(result => {
      resolve(result)
      wx.hideLoading()
    }).catch((error) => {
      reject()
      wx.hideLoading()
    })
  })
}

const checkLimit = files => {
  //  doSomething
  return false
}

module.exports = uploadFiles
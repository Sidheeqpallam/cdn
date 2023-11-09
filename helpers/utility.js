const https = require('https')
const http = require('http')
const crypto = require('crypto')


class Utility {
  // eslint-disable-next-line default-param-last
  static successRes(message = '', data) {
    return {
      status: 'success',
      message,
      data,
    }
  }

  static errorRes(message, errorStatus = 'error') {
    return { status: errorStatus, message }
  }

  static conflictRes(message, errorStatus = 'conflict') {
    return { status: errorStatus, message }
  }

  static getUrlRequest(url) {
    let data
    return new Promise((res) => {
      https.get(url, (resp) => {
        resp.on('data', (chunk) => {
          if (chunk !== undefined) data += chunk
        })
        resp.on('end', () => {
          res(data)
        })
      })
    })
  }


  static randomName(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex')
  }

  static getIP() {
    return new Promise((resolve, _reject) => {
      http.get({ host: 'api.ipify.org', port: 80, path: '/' }, (resp) => {
        resp.on('data', (ip) => {
          resolve(ip.toString())
        })
      })
    })
  }

}

module.exports = Utility

module.exports = {
  createInitData: true
  useAllPay: true
  environment: ''
  initData: ''
  domain: 'http://localhost:1337'
  cookieVersion:'0.1'
  paserRootDomain: 'https://tw.movies.yahoo.com/movie_thisweek.html'
  # mail: {
  #   type: 'ses'
  #   active: false
  #   config: {
  #     from: '',
  #     transporter: {
  #       accessKeyId: '',
  #       secretAccessKey: '',
  #     }
  #   }
  # }
  mail: {
    type: 'smtp'
    active: true
    config:{
      from: 'GMAIL_USER@gmail.com',
      transporter: {
          port: 465,
          host: 'smtp.gmail.com',
          domains: [
            "gmail.com",
            "googlemail.com"
          ],
          secure: true,
          auth: {
            user: 'GMAIL_USER_ACCOUNT',
            pass: 'GMAIL_USER_PASSWORD',
            # xoauth2: ''
          },
          # ignoreTLS: false,
          # name: '',
          # localAddress: '',
          # connectionTimeout: 2000,
          # greetingTimeout: 2000,
          # socketTimeout: 2000,
          debug: true,
          authMethod: 'PLAIN',
          # tls: {}
      }
    }
  }
  db: {
    'username': process.env.MYSQL_USER || "root"
    'password': process.env.MYSQL_PASSWORD || "root"
    'host': process.env.MYSQL_1_PORT_3306_TCP_ADDR || "127.0.0.1"
    'port': process.env.MYSQL_1_PORT_3306_TCP_PORT || 3306
    'database': 'watcher',
    'dialect': 'mysql',
    'force': true
  }
  allpay: {
    merchantID: '2000132',
    hashKey: '5294y06JbISpM5x9',
    hashIV: 'v77hoKGq4kWxNNIS',
    debug: true,
    ReturnURL:'/allpay/paid',
    ClientBackURL:'/shop/done',
    PaymentInfoURL:'/allpay/paymentinfo',
    paymentMethod:[
      {
        code: 'ATM',
        name: 'ATM'
      },{
        code: 'Credit',
        name: '信用卡'
      }
    ]
  }
  i18n: {
    localesDirectory: '/config/locales'
  }
  store:{
    name:'i+DEAL創而有意',
    name2:'i+DEAL',
    name3:'創而有意',
    serviceMail:'service@wevo.com.tw'
  }
  googleAnalytics: {
    trackingID: ''
  }
  passport:{
    local: strategy: require('passport-local').Strategy
    facebook:{
      name: 'Facebook'
      protocol: 'oauth2'
      strategy: require('passport-facebook').Strategy
      options:{
        clientID: '1598226980388780'
        clientSecret: '71ae89eba342ce5a48a30a870d6bd473'
        scope: [ 'email', 'public_profile' ]
        callbackURL: "http://localhost:1337/auth/facebook/callback"
      }
    }
  }
}

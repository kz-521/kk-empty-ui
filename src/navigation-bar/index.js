Component({
    properties: {
        customBackReturn: {
            type: Boolean,
            value: false
        },
        activeTitle: {
          type: Number,
          value: 1
      },
        doubleTitleShow: {
          type: Boolean,
          value: false
      },
      doubleTitle:{
        type: String,
        value: ''
    },
        bgcolor:{
            type: String,
            value: ''
        },
        color:{
            type: String,
            value: ''
        },
        title:{
            type: String,
            value: ''
        },
        maskIndex:{
          type: String,
          value: 9999
      },
        fadeColor:{
            type: String,
            value: ''
        },
        backArrow:{
            type: Boolean,
            value: true
        },
        backColor:{
            type: Boolean,
            value: false
        },
        background:{
            type: String,
            value: ""
        },
        notBgcolor:{
          type: String,
          value: ""
      },
        toHome:{
            type: Boolean,
            value: false
        }
    },
    data: {
      activeTitle: 1
    },
    methods: {
        backClick() {
            if (this.data.customBackReturn) {
                this.triggerEvent("customBackReturn")
            } else {
                if (getCurrentPages().length == 1) {
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                }
                if (this.data.toHome){
                    wx.redirectTo({
                      url: '/pages/home/index',
                    })
                }
                else {
                    wx.navigateBack({
                        delta: 1
                    })
                }
            }
        },
        doubleTitleTap() {
          this.setData({
            activeTitle: 2
          })
          this.triggerEvent("doubleTitleTap")
        },
        titleTap() {
          this.setData({
            activeTitle: 1
          })
          this.triggerEvent("titleTap")
        },
    },
    attached() {
        let self = this;
        wx.getSystemInfo({
            success(res) {
                let isIos = res.system.indexOf('iOS') > -1;
                self.setData({
                    statusHeight: res.statusBarHeight,
                    navHeight: isIos ? 44 : 48
                })
            }
        })
    }
})

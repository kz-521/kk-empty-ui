// components/appointment-calendar/appointment-calendar.js
Component({
    properties: {
      use_date_arr:{
          type:Array,
          value:[]
      }
  },

    data: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      weeksArr: ['日', '一', '二', '三', '四', '五', '六'],
      nowMonth: new Date().getMonth() + 1, //本月是几月
      nowDay: new Date().getDate(), //本月当天的日期
      lastMonthDays: [], //上一个月
      nowMonthDays: [], //本月 
      nextMonthDays: [], //下一个月
      targetDateArr: [],
    },

  methods: {
   //获取当月天数
   getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
},
/** 总方法 */
//创建日期
createDays(year, month ,notInit = false) {
    this.getLastMonthDays(year, month)
    this.getNowMonthDays(year, month, notInit)
    this.getNextMonthDays(year, month)
},
selectDate(e){
  console.log(this.data.month);
  let curDate = new Date()
  if(this.data.year < curDate.getFullYear()) { // 之前的年份不选
    return 
  }
  if(this.data.year == curDate.getFullYear() && this.data.month < curDate.getMonth() + 1 ) { // 当年之前的月份不选
    return 
  }
  const dayOfMonth = curDate.getDate();
  console.log(e.currentTarget.dataset.index, dayOfMonth);
  if(this.data.month == (curDate.getMonth() + 1) && e.currentTarget.dataset.index < dayOfMonth - 1) { // 当日之前不选
    return 
  }
  let index = e.currentTarget.dataset.index //选择的下标
  console.log(index);
  let curr_date = e.currentTarget.dataset.date //选择的时间
  console.log(curr_date);
  let arr = this.data.targetDateArr
  console.log(arr);
  if(arr.includes(curr_date)) {
    arr.splice(arr.indexOf(curr_date), 1)
  } else {
    arr.push(curr_date)
  }
  console.log(arr,'arr');
  this.setData({
    targetDateArr: arr,
    [`nowMonthDays[${index}].isNowMonthDay`] : !this.data.nowMonthDays[index].isNowMonthDay,
  })
  this.triggerEvent("handleChange", {targetDateArr: this.data.targetDateArr});//向父组件传参
},
/** 切换月份 */
changeMonthFun(e){
  let { year,month } = this.data
  let type = e.currentTarget.dataset.type //类型
  if (type == 'prev') { //上一个月
      year = month - 1 > 0 ? year : year - 1
      month = month - 1 > 0 ? month - 1 : 12
  } else { //next 下个月
      year = (parseInt(month) + 1) > 12 ? year + 1 : year
      month = (parseInt(month) + 1) > 12 ? 1 : parseInt(month) + 1
  }
  this.setData({
      year,
      month,
  })
  this.createDays(year, month , true)
},
/** 获取上个月日期 */
getLastMonthDays(year, month) {
  let nowMonthFirstDays = new Date(year, month - 1, 1).getDay()
            let lastMonthDays = []
            if (nowMonthFirstDays) { //判断当月的第一天是不是星期天
                //上个月显示多少天
                let lastMonthNums = month - 1 < 0 ? this.getThisMonthDays(year - 1, 12) : this.getThisMonthDays(year, month - 1); //判断是否会跨年
                //上个月从几号开始显示
                for (let i = lastMonthNums - nowMonthFirstDays + 1; i <= lastMonthNums; i++) {
                    let time = new Date(year, month - 2, i).toLocaleDateString() //对应的时间
                    lastMonthDays.push({
                        date: i, //几号
                        week: this.data.weeksArr[new Date(year, month - 2, i).getDay()], //星期几
                        time,
                        isNowMonthDay: false
                    });
                }
            }
            this.setData({
                lastMonthDays
            })
            console.log(lastMonthDays);
},
/** 获取当月日期 */
getNowMonthDays(year, month, notInit = false) {
  let { nowMonth,nowDay} = this.data
  let nowMonthDays = []
  let days = this.getThisMonthDays(year, month); //获取当月的天数
  for (let i = 1; i <= days; i++) {
      let d = new Date(year, month - 1, i)
      let years = d.getFullYear()
      let months = d.getMonth() + 1
      let day2 = d.getDate()
      let time = `${years+'/'+months +'/'+day2}` // 2023/3/3
      let timer = time.replace(/\//g, "-")
      let timer2 = timer.split('-')
      var day = '1'
      let newdate
      nowMonthDays.push({
        date: i, //几号
        week: this.data.weeksArr[new Date(year, month - 1, i).getDay()], //星期几
        time,
        color: false,
        day: newdate,
        isNowMonthDay: ""
      });
      console.log(nowMonthDays);
  }
  this.data.use_date_arr.forEach(ele => {
    ele = ele.replace(/\-/g, "/")
    nowMonthDays.forEach(item => {
        if (ele == item.time) {
            console.log(item);
            item.color = true
        }
    })
})
  
  if(this.data.targetDateArr.length > 0) {
    let target = this.data.targetDateArr
    for (let index = 0; index < target.length; index++) {
      const e = target[index];
      for (let j = 0; j < nowMonthDays.length; j++) {
        const item = nowMonthDays[j];
        if(item.time == e) {
          item.isNowMonthDay = true
        }
      }
    }
  }
  this.setData({
    nowMonthDays
})
  if(notInit) {
    return 
  }
  if(month == new Date().getMonth() + 1) {
    const dayOfMonth = new Date().getDate();
    this.setData({
      targetDateArr: [this.data.nowMonthDays[dayOfMonth - 1].time],
      [`nowMonthDays[${dayOfMonth - 1}].isNowMonthDay`] : true
    })
    this.triggerEvent("handleChange", {targetDateArr: this.data.targetDateArr});//向父组件传参
  }

  console.log(nowMonthDays);
},
/** 获取下个月日期 */
getNextMonthDays(year, month) {
  let {
    lastMonthDays,
    nowMonthDays,
} = this.data
let nextMonthDays = []
let nextMonthNums = (lastMonthDays.length + nowMonthDays.length) > 35 ? 42 - (lastMonthDays.length + nowMonthDays.length) : 35 - (lastMonthDays.length + nowMonthDays.length) //下个月显示多少天
let nowYear = (parseInt(month) + 1) > 12 ? year + 1 : year //下一个月的年份
let nowMonth = (parseInt(month) + 1) > 12 ? 1 : parseInt(month) + 1 //下一个月的月份
if (nextMonthNums) { //判断当前天数是否大于零
    for (let i = 1; i <= nextMonthNums; i++) {
        let time = new Date(year, month - 1, i).toLocaleDateString()
        nextMonthDays.push({
            date: i, //几号
            week: this.data.weeksArr[new Date(nowYear, nowMonth - 1, i).getDay()], //星期几
            time,
            isNowMonthDay: false
        });
    }
}
this.setData({
    nextMonthDays
})
console.log(nextMonthDays)
},
},
ready(){
let { year,month } = this.data
this.getLastMonthDays(year, month)
this.getNowMonthDays(year, month)
this.getNextMonthDays(year, month)
}
})
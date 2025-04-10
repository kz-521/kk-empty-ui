Component({
  properties: {
    list:{
          type: Array,
          value: []
      },
      listType:{
        type: Number,
        value: 2
    }
  },
  data: {
    activeTitle: 1
  },
  methods: {
    toDetail(e) {
      this.triggerEvent('toDetail',e);
    },
  },
  attached() {
  }
})

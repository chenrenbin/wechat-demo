Component({
  externalClasses: ['defined-class'],
  properties: {
    data:{
      type: Object,
      value: {},
      observer: function(newVal, oldVal, changedPath) {
        console.log(newVal, oldVal, changedPath)
      }
    }
  },
  data:{
    test: ''
  },
  created: function () {
    console.log('created')
  },
  attached: function () {
    console.log('attached')
  },
  ready: function () {
    console.log('ready')
  },
  moved: function () {
    console.log('moved')
  },
  detached: function () {
    console.log('detached')
  },
  observers:{
    'properties.data':function (nVal) {
      console.log(2, nVal)
    },
    'test':function (nVal) {
      console.log(3, test)
    }
  },
  methods:{
    goDetail:function (e) {
      console.log(e)
    }
  }
})

import Vue from "vue"
import MessageBox from "./MessageBox"

export var messageBox = (function() {
  var defaults = {
    title: '',
    content: '',
    cancel: '',
    sure: '',
    cancelChange: null,
    sureChange: null,
  }

  return function(configure) {
    for(var cofg in configure) {
      defaults[cofg] = configure[cofg]
    }

    var Mycomponent = Vue.extend(MessageBox)

    var vm = new Mycomponent({
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        sure: defaults.sure
      },
      methods: {
        cancelChange() {
          console.log(defaults.cancelChange)
          defaults.cancelChange && defaults.cancelChange.call(this)
          document.body.removeChild(vm.$el)
        },

        sureChange() {
          defaults.sureChange && defaults.sureChange.call(this)
        }
      }
    })
    document.body.appendChild(vm.$el)
  }
})()
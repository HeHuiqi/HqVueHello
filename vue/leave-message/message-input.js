
Vue.component('v-input',{

    props:{
        value:{
            type:[String,Number],
            default:'',
        },
    },
    data:function(){
        return {
            inputValue:this.value,
        }
    },
    render:function (h) {
      var _this = this;
      return h('div',[h('span','昵称：'),
          h('input',{
              attrs:{
                  type:'text',
              },
              domProps:{
                  value: this.value,
                  maxLength:'5',

              },
              on:{
                  input:function (event) {
                      _this.inputValue = event.target.value;
                      _this.$emit('input',event.target.value);
                  }
              }

          })]);
    },

});

Vue.component('v-textarea',{
    props:{
        value:{
            type:[String,Number],
            default:'',
        },
    },
    data:function(){
        return {
            inputValue:this.value,
        }
    },
    render:function (h) {
        var _this = this;
        return h('div',[h('span','留言内容：'),
            h('textarea',{
                attrs:{
                    placeholder:'请输入留言内容'
                },
                domProps:{
                    value: this.value,
                },
                ref:'message',
                on:{
                    input:function (event) {
                        _this.inputValue = event.target.value;
                        _this.$emit('input',event.target.value);
                    }
                }

            })]);
    },
    methods:{
        focus:function () {
            this.$refs.message.focus();
        }
    }
});
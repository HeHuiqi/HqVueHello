
Vue.component('pane',{
    name:'pane',
    template:`
<div class="pane" v-show="show">
    <slot></slot>
</div>    
    `,
    data:function () {
        return {
            show:true,
        }
    },
    props:{
        name:String,
        label:{
            type:String,
            default:''
        }
    },
    methods:{
        updateNav:function () {
            this.$parent.updateNav();
        }
    },
    watch:{
        lable:function f() {
            this.updateNav();
        }
    },
});
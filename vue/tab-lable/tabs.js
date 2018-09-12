
Vue.component('tabs',{
    template:`
<div class="tabs">
    <div class="tabs-bar">
        <div v-for="(pane,index) in navList" :class="tabCls(pane)" @click="handleChange(index)">
            {{ pane.label }}
        </div>
    </div>
    <div class="tabs-content">
        <slot></slot>
    </div>
</div>    
    `,
    props:{
      value:[String,Number]
    },
    data:function () {
        return {
            currentValue:this.value,
            navList:[],
        }
    },
    methods:{
        tabCls:function(pane){
            return ['tabs-tab',{'tabs-tab-active': pane.name === this.currentValue}]
        },
        getTabs:function () {
            return this.$children.filter(function (item) {
               return item.$options.name === 'pane'; 
            });
        },
        updateNav:function () {
            this.navList = [];
            //设置this的引用，在function回调里，this指向并不是Vue实例
            var _this = this;
            this.getTabs().forEach(function (pane,index) {
                _this.navList.push({
                    label:pane.label,
                    name:pane.name || index
                });
                //如果没有给pane设置name，默认设置它的索引
                if (!pane.name) pane.name = index;
                //设置当前选中的tab的索引，
                if (index === 0){
                    if (!_this.currentValue){
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus:function () {
            var tabs = this.getTabs();
            var _this = this;
            //显示当前选中的tab对应的pane组件，隐藏没有选中的
            tabs.forEach(function (tab) {
                return tab.show = tab.name === _this.currentValue;
            });
        },
        handleChange:function (index) {
            var nav = this.navList[index];
            var name = nav.name;
            this.currentValue = name;
            this.$emit('input',name);
            this.$emit('on-click',name);

        },
    },
    watch:{
        value:function (val) {
            this.currentValue = val;
        },
        currentValue:function (val) {
            this.updateStatus();
        }

    },
    mounted:function () {
        this.updateNav();
    }
});
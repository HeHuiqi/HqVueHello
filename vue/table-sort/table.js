
Vue.component('v-table',{
    props:{
        columns:{
            type:Array,
            default:[],
        },
        data:{
            type:Array,
            default:[],
        }

    },
    data:function () {
        return {
            currentColumns:[],
            currentData:[]
        }
    },
    methods:{
        //使用外部数据的备份来做排序，不破坏外部数据
        makeColumns:function () {
            this.currentColumns = this.columns.map(function (col,index) {
                //添加一个字段标示当前排序的状态
                col._sortType = 'normal';
                //添加一个索引
                col._index = index;
                return col;
            });
        },
        makeData:function () {
            this.currentData = this.data.map(function (row,index) {
                row._index = index;
                return row;
            });
        },
        //升序
        handleSortByAsc:function (index) {
            /*
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'asc';
            this.currentData.sort(function (a,b) {
                return a[key] > b[key] ? 1:-1;
            });
            */
            this.handleSortByType(index,'asc');

        },
        //降序
        handleSortByDesc:function (index) {
            /*
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'desc';
            this.currentData.sort(function (a,b) {
                return a[key] < b[key] ? 1:-1;
            });
            */
            this.handleSortByType(index,'desc');

        },
        handleSortByType:function (index,type) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = type;
            this.currentData.sort(function (a,b) {
                if (type === 'desc') {
                    return a[key] < b[key] ? 1:-1;
                }else {
                    return a[key] > b[key] ? 1:-1;
                }
            });
        }
    },
    watch:{
        //数据有变化就重新排序
        data:function () {
         this.makeData();
         var sortedColumn = this.currentColumns.filter(function (col) {
             return col._sortType !== 'normal';
         });

         if (sortedColumn.length>0){

             if (sortedColumn[0]._sortType === 'asc'){
                 this.handleSortByAsc(sortedColumn[0]._index);
             }else {
                 this.handleSortByDesc(sortedColumn[0]._index);
             }
         }
      }
    },
    mounted:function () {
        //初始化
        this.makeColumns();
        this.makeData();
    },
    render:function (h) {

        var _this = this;
        var ths = [];

        //创建thead内的元素
        this.currentColumns.forEach(function (col,index) {
            if (col.sortable){
                ths.push(h('th',[h('span',col.title),
                    h('a',{
                    class:{
                        on:col._sortType === 'asc',
                    },
                    on:{
                        click:function () {
                            _this.handleSortByAsc(index);
                        }
                    }
                    },'↑'),h('a',{
                        class:{
                            on:col._sortType === 'desc',
                        },
                        on:{
                            click:function () {
                                _this.handleSortByDesc(index);
                            }
                        }
                    },'↓')]));
            }else {
                ths.push(h('th',col.title));
            }

        });

        //创建tbody内的元素
        var trs = [];

        this.currentData.forEach(function (row) {
            var tds = [];
            _this.currentColumns.forEach(function (cell) {
                tds.push(h('td',row[cell.key]));
            });
            trs.push(h('tr',tds));
        });
        console.log(trs);
        return h('table',[h('thead',[h('tr'),ths]),h('tbody',trs)]);

    },

});
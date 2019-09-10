import Component from '../../core/component'
import Button from '../../component/button'
import DropDown from '../../component/dropdown'
import Popup from '../../component/popup'

/**
 * 顶部操作区
 * 我想实现既可以添加到子组件，又可以添到指定的子标签
 * 分成两边：
 * 一边是添加和查看
 * 一边是保存
 * 
 * 只做视图的事情，展示和添加子视图，不涉及数据
 */
class Topbar extends Component {
    constructor(args) {
        super(args);

        /**
         * 模板分左右两边，还有一个展示更多
         * 这些都可以放按钮，除了更多是下拉框之外
         */
        this.tpl = `
            <div class="topbar-operation topbar-left"></div>
            <div class="topbar-operation topbar-right"></div>
            <div class="topbar-operation-more"></div>
        `
        this.className = this.prefix + 'topbar';

        this.popupList = {};

        this.menuList = [];

        // this.leftButtons = [];

        // this.rightButtons = [];
    }

    init(){
        super.init();

        console.log(this.getChildren())
    }

    _render() {
        // 渲染获取到$el
        super._render();

        const $el = this.$el;
        this.$left = $el.find('.topbar-left');
        this.$right = $el.find('.topbar-right');
        this.$more = $el.find('.topbar-operation-more');

        // this.createLeft();
        // this.createRight();
        // this.createMore();
    }

    /**
     * 添加左边或者右边的按钮
     * @param {Array|Button} buttons 按钮配置
     * @param {String} leftOrRight 左边还是右边
     */
    addButton(buttons, leftOrRight){
        if(!buttons){
            return this;
        }
        if(buttons.constructor === Array){
            buttons.forEach(button => {
                if(!(button instanceof Button)){
                    button = new Button(button);   
                }
                if(!button.renderred){
                    button.init();
                }
                (leftOrRight === 'left' ? this.$left : this.$right).append(button.$el);
            });
        } else if(buttons.constructor === Object){
            if(!(buttons instanceof Button)){
                buttons = new Button(buttons);   
            }
            if(!buttons.renderred){
                buttons.init();
            }
            (leftOrRight === 'left' ? this.$left : this.$right).append(buttons.$el);
        }
    }
    
    addMenuList(menuList){
        this.menuList = menuList;

        const dropdown = new DropDown({
            text: '<span class="glyphicon glyphicon-option-vertical"></span>',
            appendTo: this.$more,
            menuList: this.menuList
        });

        this.$more.append(dropdown.$el);
    }

    // /**
    //  * 创建左边按钮
    //  */
    // createLeft(){
    //     const self = this;
    //     const btns = [new Button({
    //         text: '<span class="fa fa-plus"></span>',
    //         title: '添加图层',
    //         handler: function(e){
    //             self.onNewLayerDialog(e)
    //         },
    //         appendTo: this.$left
    //     }), new Button({
    //         text: '<span class="fa fa-folder-open"></span>',
    //         title: '素材列表',
    //         handler: function(e){
    //             self.onFileManagerDialog(e)
    //         },
    //         appendTo: this.$left
    //     }), new Button({
    //         text: '<span class="fa fa-navicon"></span>',
    //         title: '图层管理器',
    //         handler: function(e){
    //             self.onLayerManagerDialog(e)
    //         },
    //         appendTo: this.$left
    //     }), new Button({
    //         text: '<span class="fa fa-cloud"></span>',
    //         title: '动态图层',
    //         handler: function(e){
    //             self.onDynamicDataDialog(e)
    //         },
    //         appendTo: this.$left
    //     }), new Button({
    //         text: '<span class="fa fa-cubes"></span>',
    //         title: '自定义组件',
    //         handler: function(e){
    //             self.onAddComponentsDialog(e)
    //         },
    //         appendTo: this.$left
    //     }), new Button({
    //         text: '<span class="fa fa-history"></span>',
    //         title: '用户操作',
    //         handler: function(e){
    //             self.onUserBehaviorDialog(e)
    //         },
    //         appendTo: this.$left
    //     })]
    //     this.addChildren(btns);
    // }

    // /**
    //  * 创建右边按钮
    //  */
    // createRight(){
    //     const btns = [new Button({
    //         text:'<span class="fa fa-file"></span> 新建',
    //         handler: this.onCreatePage,
    //         appendTo: this.$right
    //     }), new Button({
    //         text:'<span class="fa fa-floppy-o"></span> 保存',
    //         handler: this.onSavePage,
    //         appendTo: this.$right
    //     }), new Button({
    //         text:'<span class="fa fa-file-o"></span> 页面设置',
    //         handler: this.onPageSettings,
    //         appendTo: this.$right
    //     }), new Button({
    //         text:'<span class="fa fa-file-o"></span> 客户端预览',
    //         handler: this.onAppPreview,
    //         appendTo: this.$right
    //     })];
    //     this.addChildren(btns);
    // }

    // /**
    //  * 隐藏的更多按钮
    //  */
    // createMore(){
    //     const dropdown = new DropDown({
    //         text: '<span class="glyphicon glyphicon-option-vertical"></span>',
    //         appendTo: this.$more,
    //         menuList: [{
    //             text: '导入素材',
    //             handler: function(e){
    //                 console.log('导入素材')
    //             }
    //         }, {
    //             text: '导入JSON',
    //             handler: function(e){
    //                 console.log('导入JSON')
    //             }
    //         }, {
    //             text: '导出JSON',
    //             handler: function(e){
    //                 console.log('导出JSON')
    //             }
    //         }, {
    //             text: '关于',
    //             handler: function(e){
    //                 console.log('version 2.0');
    //             }
    //         }]
    //     });
    //     this.addChild(dropdown);
    // }

    // onNewLayerDialog(e){
    //     console.log('弹窗显示要添加图层类型');
    //     // if(!this.popupList['layer']){
    //     //     const $el = $(e.currentTarget);
    //     //     const offset = $el.offset();
    //     //     const popup = new Popup({
    //     //         direction: 'top',
    //     //         animation: true,
    //     //         trigger: e.currentTarget,
    //     //         width: 200,
    //     //         height: 500,
    //     //         // 当前触发者起始位置
    //     //         position: {
    //     //             left: offset.left + $el.outerWidth() / 2, // 中间点
    //     //             top: offset.top + this.$el.outerHeight() + 5
    //     //         }
    //     //     });
    //     //     popup.init();
    
    //     //     this.popupList['layer'] = popup;
    //     // }

    //     // this.popupList['layer'].show();

    //     // 改成弹窗的形式
    //     const layerIndex = layer.open({
    //         title: '选择图层',
    //         area: ['800px', '400px'],
    //         content: '',
    //         success: function(o, index){

    //         },
    //         btns: ['确定', '取消'],
    //         yes: function(index, o){
    //             layer.close(index)
    //         }
    //     })
    // }
    // onFileManagerDialog(e){
    //     console.log('弹窗显示已上传的图片文件')
    //     // if(!this.popupList['file']){
    //     //     const $el = $(e.currentTarget);
    //     //     const offset = $el.offset();
    //     //     const popup = new Popup({
    //     //         direction: 'top',
    //     //         animation: true,
    //     //         trigger: e.currentTarget,
    //     //         width: 200,
    //     //         height: 500,
    //     //         // 当前触发者起始位置
    //     //         position: {
    //     //             left: offset.left + $el.outerWidth() / 2, // 中间点
    //     //             top: offset.top + this.$el.outerHeight() + 5
    //     //         }
    //     //     });
    //     //     popup.init();
    
    //     //     this.popupList['file'] = popup;
    //     // }

    //     // this.popupList['file'].show();

    //     const layerIndex = layer.open({
    //         title: '素材列表',
    //         area: ['90%', '90%'],
    //         content: '',
    //         success: function(o, index){

    //         },
    //         btns: ['确定', '取消'],
    //         yes: function(index, o){
    //             layer.close(index)
    //         }
    //     })
    // }
    // onLayerManagerDialog(e){
    //     console.log('弹窗显示图层列表');
    //     // 从右往左滑动出现
    //     // 鼠标点其他地方时候收起来
    // }
    // onDynamicDataDialog(e){
    //     console.log('添加动态数据组件，减少用户选择用户动态数据的操作');
    //     // 弹窗显示动态数据的组件，非自定义组件
    // }
    // onAddComponentsDialog(e){
    //     console.log('添加自定义组件');
    //     // 弹窗显示自定义组件，比如音频、视频、页码、目录等组件
    // }
    // onUserBehaviorDialog(e){
    //     console.log('弹窗显示用户操作记录');
    //     // 记录用户在场景中心操作的任何记录，保存到临时缓存中，或者保存当前JSON
    //     // 展示一个下拉操作的列表
    // }
    // onCreatePage(e){
    //     console.log('弹窗显示新建页面要填写的内容');
    // }
    // onSavePage(e){
    //     console.log('保存页面');
    // }
    // onPageSettings(e){
    //     console.log('弹窗显示页面设置');
    //     // 弹窗展示页面设置
    // }
    // onAppPreview(e){
    //     console.log('客户端预览')
    //     // 弹窗展示客户端界面进行预览，默认750尺寸
    // }
}

module.exports = Topbar;
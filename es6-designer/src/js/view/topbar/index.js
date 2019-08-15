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
 */
class Topbar extends Component {
    constructor(...args) {
        super(args);

        this.tpl = `
            <div class="topbar-operation topbar-left"></div>
            <div class="topbar-operation topbar-right"></div>
            <div class="topbar-operation-more"></div>
        `
        this.className = this.prefix + 'topbar';
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

        this.createLeft();
        this.createRight();
        this.createMore();
    }

    /**
     * 创建左边按钮
     */
    createLeft(){
        const btns = [new Button({
            text: '<span class="fa fa-plus"></span>',
            handler: this.onNewLayerDialog,
            appendTo: this.$left
        }), new Button({
            text: '<span class="fa fa-folder-open"></span>',
            handler: this.onFileManagerDialog,
            appendTo: this.$left
        }), new Button({
            text: '<span class="fa fa-navicon"></span>',
            handler: this.onLayerManagerDialog,
            appendTo: this.$left
        }), new Button({
            text: '<span class="fa fa-wrench"></span>',
            handler: this.onDynamicDataDialog,
            appendTo: this.$left
        }), new Button({
            text: '<span class="fa fa-cubes"></span>',
            handler: this.onAddComponentsDialog,
            appendTo: this.$left
        }), new Button({
            text: '<span class="fa fa-history"></span>',
            handler: this.onUserBehaviorDialog,
            appendTo: this.$left
        })]
        this.addChildren(btns);
    }

    /**
     * 创建右边按钮
     */
    createRight(){
        const btns = [new Button({
            text:'<span class="fa fa-file"></span> 新建',
            handler: this.onCreatePage,
            appendTo: this.$right
        }), new Button({
            text:'<span class="fa fa-floppy-o"></span> 保存',
            handler: this.onSavePage,
            appendTo: this.$right
        }), new Button({
            text:'<span class="fa fa-file-o"></span> 页面设置',
            handler: this.onPageSettings,
            appendTo: this.$right
        }), new Button({
            text:'<span class="fa fa-file-o"></span> 客户端预览',
            handler: this.onAppPreview,
            appendTo: this.$right
        })];
        this.addChildren(btns);
    }

    /**
     * 隐藏的更多按钮
     */
    createMore(){
        const dropdown = new DropDown({
            text: '<span class="glyphicon glyphicon-option-vertical"></span>',
            appendTo: this.$more,
            menuList: [{
                text: '导入素材',
                handler: function(e){
                    console.log('导入素材')
                }
            }, {
                text: '导入JSON',
                handler: function(e){
                    console.log('导入JSON')
                }
            }, {
                text: '导出JSON',
                handler: function(e){
                    console.log('导出JSON')
                }
            }, {
                text: '关于',
                handler: function(e){
                    console.log('version 2.0');
                }
            }]
        });
        this.addChild(dropdown);
    }

    onNewLayerDialog(e){
        console.log('弹窗显示要添加图层类型');

        const $el = $(e.target);
        const offset = $el.offset();
        const popup = new Popup({
            direction: 'top',
            animation: true,
            width: 200,
            height: 500,
            // 当前触发者起始位置
            position: {
                left: offset.left - $el.width() / 2,
                top: offset.top + this.$el.outerHeight() + 25
            }
        });
        popup.init();
    }
    onFileManagerDialog(){
        console.log('弹窗显示已上传的图片文件')
    }
    onLayerManagerDialog(){
        console.log('弹窗显示图层列表');
    }
    onDynamicDataDialog(){
        console.log('添加动态数据组件，减少用户选择用户动态数据的操作');
    }
    onAddComponentsDialog(){
        console.log('添加自定义组件');
    }
    onUserBehaviorDialog(){
        console.log('弹窗显示用户操作记录');
    }
    onCreatePage(){
        console.log('弹窗显示新建页面要填写的内容');
    }
    onSavePage(){
        console.log('保存页面');
    }
    onPageSettings(){
        console.log('弹窗显示页面设置');
    }
    onAppPreview(){
        console.log('客户端预览')
    }
}

module.exports = Topbar;
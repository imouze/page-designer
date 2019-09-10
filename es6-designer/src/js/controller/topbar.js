import TopbarView from '../view/topbar'
import NewLayerView from '../view/topbar/newLayer';
import Observer from '../core/observer'
import Button from '../component/button'
import ImageController from './image'

const LayerEnum = {
    Text: 'text',
    Image: 'image',
    EditImage: 'editimage',
    Video: 'video',
    Audio: 'audio'
}

/**
 * 点击事件驱动视图
 * 所以按钮的事件放在controller
 */
class TopbarController extends Observer{
    constructor(options){
        super(options);

        // 顶部栏视图
        this.view = new TopbarView();
    }

    init(){
        this.view.init();
        // 先渲染再添加进去
        this.addLeftButton();
        this.addRightButton();
        this.addMoreMenuList();
    }

    /**
     * 添加左侧按钮
     */
    addLeftButton(){
        const self = this;
        this.view.addButton([new Button({
            text: '<span class="fa fa-plus"></span>',
            title: '添加图层',
            handler: function(e){
                self.onNewLayerDialog(e)
            }
        }), new Button({
            text: '<span class="fa fa-folder-open"></span>',
            title: '素材列表',
            handler: function(e){
                self.onFileManagerDialog(e)
            }
        }), new Button({
            text: '<span class="fa fa-navicon"></span>',
            title: '图层管理器',
            handler: function(e){
                self.onLayerManagerDialog(e)
            }
        }), new Button({
            text: '<span class="fa fa-cloud"></span>',
            title: '动态图层',
            handler: function(e){
                self.onDynamicDataDialog(e)
            }
        }), new Button({
            text: '<span class="fa fa-cubes"></span>',
            title: '自定义组件',
            handler: function(e){
                self.onAddComponentsDialog(e)
            }
        }), new Button({
            text: '<span class="fa fa-history"></span>',
            title: '用户操作',
            handler: function(e){
                self.onUserBehaviorDialog(e)
            }
        })], 'left')
    }

    /**
     * 添加右侧按钮
     */
    addRightButton(){
        const self = this;
        this.view.addButton([new Button({
            text:'<span class="fa fa-file"></span> 新建',
            handler: function(){
                self.onCreatePage()
            }
        }), new Button({
            text:'<span class="fa fa-floppy-o"></span> 保存',
            handler: function(){
                self.onSavePage()
            }
        }), new Button({
            text:'<span class="fa fa-file-o"></span> 页面设置',
            handler: function(){
                self.onPageSettings()
            }
        }), new Button({
            text:'<span class="fa fa-file-o"></span> 客户端预览',
            handler: function(){
                self.onAppPreview()
            }
        })], 'right');
    }

    /**
     * 添加更多下拉菜单
     */
    addMoreMenuList(){
        this.view.addMenuList([{
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
        }]);
    }

    onNewLayerDialog(){
        const self = this;
        // 弹窗组件，用于展示需要添加各种图层，目前是作为视图
        const view = new NewLayerView();
        view.addLayerType([{
            icon: 'font',
            text: '文本',
            type: 'text'
        }, {
            icon: 'image',
            text: '元素',
            type: 'image'
        }, {
            icon: 'object-group',
            text: '编辑图片',
            type: 'editimage'
        }, {
            icon: 'film',
            text: '视频',
            type: 'video'
        }, {
            icon: 'music',
            text: '音频',
            type: 'audio'
        }]);
        // 点击之后
        view.on('click:layer', function(e, type){
            self.createLayer(type)
        });
        view.show();
    }

    createLayer(type) {
        let instance = null;
        // 先展示再放到页面里面
        switch(type){
            // 文本框
            case LayerEnum.Text:
                break;
            // 元素框
            case LayerEnum.Image:
                instance = new ImageController({
                    width: 200,
                    height: 200
                });
                break;
            // 编辑图片框
            case LayerEnum.EditImage:
                break;
            // 视频框
            case LayerEnum.Video:
                break;
            // 音频框
            case LayerEnum.Audio:
                break;
        }

        if(instance){
            instance.init();
        }

        this.emit('create:layer', instance);
    }
}

module.exports = TopbarController;
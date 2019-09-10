import ImageModel from '../model/image';
import ImageView from '../view/layer/image';
import BaseProperty from '../view/property/base';
import InfoProperty from '../view/property/image';
import BaseModel from '../model/layer';
import Observer from '../core/observer';

/**
 * 图片层类
 * 图片层会触发属性框
 * 图片层的数据与属性框是一致
 * 属性框改变属性会影响到图片层
 * 
 */
class ImageLayer extends Observer {
    constructor(options) {
        super(options);
        const self = this;
        // 图层数据
        this.info = new ImageModel();
        // 基础数据
        this.base = new BaseModel();

        /**
         * 属性区
         */
        this.property = options.property;

        // 图层的视图比较特殊，是由多个model组成
        this.view = new ImageView({
            model: {
                base: this.base,
                info: this.info
            },
            events: {
                click: function(){
                    self.activated();
                }
            },
            property: this.property
        });
        // 基础属性信息
        this.baseProperty = new BaseProperty({
            model: this.base
        });

        // 层信息，层的数据受到基础数据影响，也会影响到基础数据，比如图片上传后，基础数据的大小会跟着更新
        this.infoProperty = new InfoProperty({
            model: this.info
        });
        /**
         * view会产生变化的是基础数据，信息数据只有填写内容时才会变化
         * 数据变动需要更新图层的状态
         * 上传图片后，数据也要更新，图片的大小与base的大小同步
         * 怎么数据驱动视图？
         * 做一下如下改动
         * 把每个区域当成一个视图，model传入这些视图里，如果视图发生变化，则更新model
         * model发生变化，也会更新对应的视图，这样model需要提供订阅能力，让每个视图都能订阅，触发时能及时更新
         */

        this.options = options;
    }

    init() {
        const self = this;
        // 激活时做什么事
        // 激活就展示属性
        this.view.on('layer:activated', function () {
            self.activated();
        });
        /**
         * 更新属性时做什么事
         */
        this.view.on('layer:moving', function (result) {
            if (result) {
                self.base.y = result.top;
                self.base.x = result.left;

                console.log(self.base);
            }
        });
        // 显示图层
        this.view.init();

        if (this.options.width) {
            this.view.setWidth(this.options.width)
        }

        if (this.options.height) {
            this.view.setHeight(this.options.height);
        }

        this.baseProperty.init();
        this.infoProperty.init();
    }

    activated() {
        this.base.active = true;
        this.view.activated();
        if (this.property) {
            this.property.clear();
            this.property.$el.append(this.baseProperty.$el);
            this.property.$el.append(this.infoProperty.$el);
            this.property.show();
        }
    }
    /**
     * 
     * @param {*} property 属性区
     */
    setProperty(property) {
        this.property = property;

        this.view.property = property;
    }
}


module.exports = ImageLayer;

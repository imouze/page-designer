import Base from '../../core/base'

/**
 * 图层基础类
 * 基础功能清单：
 * 1.点击监视，可做激活图层
 * 2.
 */
class BaseLayer extends Base {


    constructor(options) {
        super(options);
        /**
         * 层类型
         * @type {string}
         */
        this.type = 0;

        /**
         * 数据模型
         * @type {Model}
         */
        this.model = null;
        /**
         * 默认样式类
         * @type {[*]}
         */
        this.className = 'layer';
    }

    init(){
        super.init();

        this.emit('beforeRender');
    }

    render(){
        super.render();

        // jquery对象，可使用jquery的方法
        const $el = this.$el;

        if(this.className && this.className.length){
            this.className.forEach(cls => {
                $el.addClass(cls);
            });
        }
        /**
         * 添加模板内容
         * 共三个层，遮罩层，内容层，标签层，子层
         *
         * 标签需要判断位置，根据子层来做判断
         */
        $el.html(`
            <div class="layer-mask"></div>
            <div class="layer-body"></div>
            <div class="layer-children"></div>
            <div class="layer-type"></div>
        `);
        // 图层遮罩，用于显示当前图层的大小和坐标，避免没有背景造成无法识别位置
        this.$mask = $el.find('.layer-mask');
        // 图层内容区
        this.$body = $el.find('.layer-body');
        // 显示图层的分类
        this.$name = $el.find('.layer-type');

        this.$children = $el.find('.layer-children');
    }

    bind(){
        super.bind();

        const $el = this.$el;

        $el.on('click', $.proxy(this.clickHandler, this));
    }

    clickHandler(e){
        // 阻止冒泡到父元素
        e.stopPropagation();
        // 点击当前层
        if(this.listeners['click']){
            this.listeners['click'].call(this, e);
        }
    }
}

module.exports = BaseLayer;
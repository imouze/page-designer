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
         * 基础数据模型
         * @type {Model}
         */
        this.baseModel = null;
        /**
         * 层信息数据模型
         */
        this.infoModel = null;
        /**
         * 默认样式
         * @type {[*]}
         */
        this.className = this.prefix ? this.prefix + '-' + 'layer' : 'layer';
    }

    init(){
        super.init();
    }

    _render(){
        super._render();

        // jquery对象，可使用jquery的方法
        const $el = this.$el;

        if(this.className && this.className.length){
            this.className.forEach(cls => {
                $el.addClass(cls);
            });
        }
        /**
         * 添加模板内容
         * 共三个层，内容层，标签层，子层，提示层
         * 
         * 标签需要判断位置，根据子层来做判断
         * 与子层的切换可以用tab支持，避免层重叠无法操作的情况，也可以用层管理器操作
         * body为层内容，比如图片，图标等
         * children是子层，子层比body层级高
         * type为层标签，用于标识这个层是什么类型的层 ==== 到时用颜色区分
         * tooltip为层提示信息，用于提示层的一些关键信息
         * 
         * 无法解决层重叠的问题，已经内容切换问题，怎么通过tab来解决？
         * 
         * 提示层应该改成mixin的方式
         */
        $el.html(`
            <div class="layer-body"></div>
            <div class="layer-children"></div>
            <div class="layer-type"></div>
            <div class="layer-tooltip"></div>
        `);
        // 图层内容区，内容
        this.$body = $el.find('.layer-body');
        // 显示图层的分类
        this.$name = $el.find('.layer-type');
        // 子层
        this.$children = $el.find('.layer-children');
        // 提示
        this.$tooltip = $el.find('.layer-tooltip');
    }

    _bind(){
        super._bind();

        const $el = this.$el;

        // 选中，选中会激活当前层，并取消其他层的激活状态，同时显示基础信息和层信息
        $el.on('click', $.proxy(this.clickHandler, this));
    }

    clickHandler(e){
        // 阻止冒泡到父元素
        e.stopPropagation();

        // $el.addClass('layer-focused');

        // 点击当前层
        if(this.listeners['click']){
            this.listeners['click'].call(this, e);
        }
    }
}

module.exports = BaseLayer;
import Observer from './observer';

/**
 * 基础类
 */
class Base extends Observer {
    /**
     * 构造函数
     * @param options
     */
    constructor(options) {
        super(options);
        this.options = options;
        /**
         * 组件命名空间
         * @type {string}
         */
        this.namespace = '';
        /**
         * Html标签
         * @type {string}
         */
        this.tagName = 'div';
        /**
         * 当前元素
         * @type {null} jQuery对象| HtmlElement
         */
        this.$el = null;
        /**
         * 是否渲染
         * @type {boolean}
         */
        this.renderred = false;
        /**
         * 模板
         * @type {string}
         */
        this.tpl = '';
    }

    /**
     * 初始化才能加钩子
     */
    init() {
        const options = this.options;
        // 把传入参数都赋值到预定的属性上
        for (let k in options) {
            if (this.hasOwnProperty(k)) {
                this[k] = options[k];
            }
        }

        // 新增四个钩子
        this.emit('beforeRender');

        this.render();

        this.emit('afterRender');


        this.emit('beforeBind');

        this.bind();

        this.emit('afterBind');
    }

    /**
     * 创建元素
     */
    createElement() {
        if(!this.tagName) {
            this.tagName = 'div';
        }
        return $(document.createElement(this.tagName));
    }

    /**
     * 渲染
     * 创建元素并插入到父组件中
     */
    render() {
        this.$el = this.$el || this.createElement();

        if(this.tpl){
            this.$el.html(this.tpl);
        }


        if(this.parent.renderred){
            this.parent.$el.append(this.$el);
        }

        this.renderred = true;
    }

    /**
     * 绑定事件
     */
    bind() {
    }
}

module.exports = Base;
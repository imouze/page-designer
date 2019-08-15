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
        // 取得第一个参数为配置
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
        /**
         * 前缀
         */
        this.prefix = '';

        this.className = '';
        /**
         * 添加到指定对象
         */
        this.appendTo = null;
    }

    /**
     * 初始化
     * 钩子可以放到初始化里面定义
     */
    init() {
        const options = this.options;
        // 把传入参数都赋值到预定的属性上，所以需要先声明属性，否则会出现赋值不了的情况
        // 如果传入的是已定义的方法怎么办？会覆盖掉，一旦方法被重写了，功能就会失效
        for (let k in options) {
            if (this.hasOwnProperty(k) && (options[k] !== null || options[k] !== undefined)) {
                this[k] = options[k];
            }
        }

        this.render();

        this.bind();
    }

    /**
     * 创建元素
     */
    createElement() {
        if (!this.tagName) {
            this.tagName = 'div';
        }
        return $(document.createElement(this.tagName));
    }

    /**
     * 渲染
     * 不需要继承以及重写
     */
    render() {
        // 新增四个钩子
        this.emit('beforeRender');

        this._render();

        this.emit('afterRender');
        // 已经执行渲染，不包括异步
        this.renderred = true;
    }
    /**
     * 子类可以继承以及重写
     */
    _render() { 
        this.$el = this.$el || this.createElement();

        this.$el.attr('tabindex', 0);

        if (this.className) {
            this.$el.addClass(this.className)
        }

        if (this.tpl) {
            this.$el.html(this.tpl);
        }
    }

    /**
     * 异步渲染
     */
    asyncRender() {
        this.emit('beforeAsyncRender');

        this._asyncRender();

        this.emit('afterAsyncRender');
     }

    _asyncRender() { }

    /**
     * 绑定事件
     * 子类不需要继承以及重写
     */
    bind() {
        this.emit('beforeBind');

        this._bind();

        this.emit('afterBind');
    }

    /**
     * 绑定事件
     * 子类可以继承以及重写
     */
    _bind() {
        const self = this;
        this.$el.on('click', function (e) {
            self.$el.addClass('focused')
        });

        $(document).on('click', function (e) {
            if (!(self.$el.is(e.target) || self.$el.has(e.target).length)) {
                self.$el.removeClass('focused')
            }
        })
    }

    /**
     * 销毁
     * 子类不需要继承以及重写
     */
    destroy() {
        this.emit('beforeDestroy');

        this._destroy();

        this.emit('afterDestroy');
    }

    /**
     * 销毁
     * 子类可以继承以及重写
     */
    _destroy() { }
}

module.exports = Base;
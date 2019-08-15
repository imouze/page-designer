import Component from '../core/component'

/**
 * 按钮类
 *
 */
class Button extends Component {

    constructor(options) {
        super(options);
        this.text = '';
        this.tagName = 'button';
        this.className = this.prefix + 'button';
        this.handler = function () { };
    }

    _render() {
        super._render();

        this.$el.html(this.text);

        this.$el.attr('type', 'button');
    }

    _bind() {
        super._bind();

        this.$el.on('click', $.proxy(this.onClick, this))
    }

    onClick(e) {
        this.emit('beforeClick', e);

        if (this.handler) {
            this.handler.call(this, e);
        }

        this.emit('afterClick', e);
    }

    addChild() {
        throw '暂时不支持添加子组件';
    }
}

module.exports = Button;

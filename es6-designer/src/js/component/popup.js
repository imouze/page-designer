import Component from '../core/component'

const DIRETION = {
    LEFT: 'directionLeft',
    TOP: 'directionTop',
    RIGHT: 'directionRight',
    BOTTOM: 'directionBottom'
}

/**
 * 弹出层仅支持编辑器
 */
class Popup extends Component {
    constructor(options) {
        super(options)

        this.className = this.prefix + 'popup';
        // 默认箭头方向
        this.direction = 'left';

        this.animation = false;

        this.tpl = `
            <div class="arrow"></div>
            <div class="popup-body"></div>
        `

        this.appendTo = $('body');

        this.position = { left: 0, top: 0 };

        this.width = 0;
        this.height = 0;
        // 触发者
        this.trigger = null;
    }

    _render() {
        super._render()

        if (this.direction && typeof this.direction === 'string') {
            const method = this[DIRETION[this.direction.toUpperCase()]];
            method && method.call(this);
        }

        if (this.animation) {
            this.$el.addClass('fadeInDown animated');
            // this.$el.addClass('fade in');
        }

        // 当前弹窗定位
        this.$el.css({
            width: this.width,
            height: this.height,
            left: this.position.left,
            top: this.position.top
        });
        // 弹出位置不能超出屏幕宽度
        // 箭头要对准触发弹出的中间位置
        // 点击当前不能隐藏，只有点击空白地方才能隐藏
        // 包含动画效果

        if (this.appendTo && this.appendTo.length) {
            this.$el.appendTo(this.appendTo);
        }
    }

    _bind() {
        super._bind();
        $(document).on('click', $.proxy(this.clickOut, this))
    }

    _destroy() {
        super._destroy();
        $(document).off('click', $.proxy(this.clickOut, this))
    }

    clickOut(e) {
        const $el = this.$el;
        const self = this;
        const trigger = $(this.trigger);

        if (!($el.is(e.target) || $el.has(e.target).length || trigger.is(e.target) || trigger.has(e.target).length)) {
            self.hide();
        }
    }

    directionTop() {
        const docWidth = $(document).width();
        const oldLeft = this.position.left;
        const space = 5;
        const arrowBorderWidth = 10;
        this.$arrow = this.$el.find('.arrow');

        this.position.left = this.position.left - this.width / 2;

        if (this.position.left < 5) {
            this.position.left = space;
        } else if (this.position.left + this.width > docWidth) {
            this.position.left = docWidth - this.width - space;
        }

        this.$arrow.css({
            top: '-20px',
            left: oldLeft - this.position.left - arrowBorderWidth
        })
    }

    directionBottom() {
        const docWidth = $(document).width();
        const oldLeft = this.position.left;
        const space = 5;
        const arrowBorderWidth = 10;
        this.$arrow = this.$el.find('.arrow');

        this.position.left = this.position.left - this.width / 2;

        if (this.position.left < 5) {
            this.position.left = space;
        } else if (this.position.left + this.width > docWidth) {
            this.position.left = docWidth - this.width - space;
        }

        this.$arrow.css({
            bottom: '-20px',
            left: oldLeft - this.position.left - arrowBorderWidth
        })
    }

    directionLeft() {
        const docHeight = $(document).height();
        const oldTop = this.position.top;
        const space = 5;
        const arrowBorderWidth = 10;
        this.$arrow = this.$el.find('.arrow');

        this.position.top = this.position.top - this.height / 2;

        if (this.position.top < 5) {
            this.position.top = space;
        } else if (this.position.top + this.height > docHeight) {
            this.position.top = docHeight - this.height - space;
        }

        this.$arrow.css({
            left: '-20px',
            left: oldTop - this.position.top - arrowBorderWidth
        })
    }

    show() {
        this.$el.show();
    }

    hide() {
        this.$el.hide();
    }
}

module.exports = Popup;
import Component from '../core/component'

/**
 * 弹出层仅支持编辑器
 */
class Popup extends Component{
    constructor(options){
        super(options)

        this.className = this.prefix + 'popup';
        // 默认箭头方向
        this.direction = 'left';

        this.animation = false;

        this.tpl = `
            <div class="arrow arrow-top"></div>
            <div class="popup-body"></div>
        `

        this.appendTo = $('body');

        this.position = { left: 0, top: 0};

        this.width = 0;
        this.height = 0;
    }

    _render(){
        super._render()

        this.$arrow = this.$el.find('.arrow');

        this.$arrow.css({
            left: this.position.left
        })

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

        if(this.appendTo && this.appendTo.length){
            this.$el.appendTo(this.appendTo);
        }

        if(this.animation){
            this.$el.addClass('fadeInDown animated');
        }
    }
}

module.exports = Popup;
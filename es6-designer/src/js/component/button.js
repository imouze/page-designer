import Base from '../core/base'

/**
 * 按钮类
 *
 */
class Button extends Base{

    constructor(options){
        super(options);
        this.text = '';
        this.tagName = 'button';
    }

    init(){
        super.init();

        this.render();
        this.bind();
    }

    render(){
        super.render();

        this.$el.attr('type', 'button');

        if(this.parent){

        } else {
            this.$el.appendTo('body')
        }

        this.$el.text(this.text);

        this.renderred = true;
    }

    bind(){
        this.$el.on('click', $.proxy(this.clickHandler, this))
    }

    clickHandler(e){
        this.emit('beforeClick', e);


        if(this.handler){
            this.hanlder.call(this, e);
        }


        this.emit('afterClick', e);
    }

    addChild(){
        throw '暂时不支持添加子组件';
    }
}

module.exports = Button;

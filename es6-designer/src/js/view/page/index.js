import Component from '../../core/component';
import draggable from '../../mixins/draggable'

class Page extends draggable(Component){
    constructor(options){
        super(options);

        this.className = this.prefix + 'scene';

        /**
         * 为了避免影响，最好加下前缀
         */
        this.tpl = `
            <div class="${this.prefix}page"></div>
        `

        this.dragEl = $(document);
    }

    _bind(){
        super._bind();

        this.$page.on('click', function(e){
            // e.preventDefault();
            console.log('page clicked')
        })
    }

    _render(){
        super._render();

        this.$page = this.$el.find('.' + this.prefix + 'page');
    }
}

module.exports = Page;
import Component from '../../core/component'

class Property extends Component{
    constructor(options){
        super(options);

        this.className = this.prefix + 'property';
    }

    init(){
        super.init();

        this.hide();
    }

    /**
     * alias
     */
    clear(){
        // this.removeAllChild();

        this.$el.html('')
    }

    show(){
        this.$el.css('right', '0');
    }

    hide(){
        this.$el.css('right', '-300px');
    }

    initHeight(){
        this.$el.css('height', '100%');
    }
}

module.exports = Property;
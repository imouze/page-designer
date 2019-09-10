import Component from '../../core/component'

class Property extends Component{
    constructor(options){
        super(options);

        this.className = this.prefix + 'property';
    }

    init(){
        super.init();

        this.$el.hide();
    }

    /**
     * alias
     */
    clear(){
        // this.removeAllChild();

        this.$el.html('')
    }

    show(){
        this.$el.show();
    }
}

module.exports = Property;
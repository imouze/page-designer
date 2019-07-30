/**
 * 混入拖动功能
 * @param superClass
 */
module.exports = superClass => class extends superClass {
    constructor(){
        super()
    }

    bind(){
        super.bind();

        this.$el.on('mousedown', $.proxy(this.mousedownHandler, this));
        this.$el.on('mousemove', $.proxy(this.mousemoveHandler, this))
    }

    mousedownHandler(e){

    }

    mousemoveHandler(e){

    }

    mouseupHandler(e){

    }
};
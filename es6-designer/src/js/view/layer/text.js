import BaseLayer from './base'

class TextLayer extends BaseLayer {
    constructor(options){
        super(options);

        this.className = super.className + ' text';
    }
}


module.exports = TextLayer;

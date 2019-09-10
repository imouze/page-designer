import BaseLayer from './base'

class TextLayer extends BaseLayer {
    constructor(options){
        super(options);

        this.className = this.prefix + 'layer-text';
    }
}


module.exports = TextLayer;

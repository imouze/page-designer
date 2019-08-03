import BaseLayer from './base';

class ImageLayer extends BaseLayer{
    constructor(options){
        super(options);
    }

    render(){
        super.render();
    }

    init(){
        super.init();

        this.render();
    }
}

module.exports = ImageLayer;
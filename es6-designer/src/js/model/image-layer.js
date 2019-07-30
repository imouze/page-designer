import BaseLayerModel from './layer'

class ImageModel extends BaseLayerModel{
    constructor(options){
        super(options);

        if(this.data){
            this.data.layerInfo = {
                url: '',
                imageWidth: 0,
                imageHeight: 0
            }
        }
    }


}

module.exports = ImageModel;

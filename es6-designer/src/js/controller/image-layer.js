import ImageModel from '../model/image';
import ImageView from '../view/layer/image';
import BaseProperty from '../view/property/base';

class ImageLayer{
    constructor(options){
        // 图层视图
        this.view = new ImageView();
        // 图层数据
        this.model = new ImageModel();
        // 属性信息
        this.propertyView = new BaseProperty();

        this.model.addView(this.view);
        this.model.addView(this.propertyView);
    }

    init(){
        // 显示图层
        this.view.init();
    }

    activated(){
        this.model.active = true;

        this.view.activated();
        this.property.show();
    }
}


module.exports = ImageLayer;

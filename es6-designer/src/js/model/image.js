import Model from '../core/model';
import { convert } from '../util/index';

class ImageModel extends Model{
    constructor(options){
        super(options);

        if(!this.data){
            this.data = {
                url: '',
                imageWidth: 0,
                imageHeight: 0
            }
        }
    }
    set url(url){
        const img = new Image();
        const self = this;

        img.src = url;
        if(img.complete){
            complete();
        } else {
            img.onload = function(){
                complete();
            }
        }

        function complete(){
            self.width = img.width;
            self.height = img.height;
            // 同步更新尺寸
            self.emit('sync:size');
        }

        this.data.url = url;
    }
    get url(){
        return this.data.url
    }
    set width(width){
        this.data.imageWidth = convert.toInt(width)
    }
    get width(){
        return this.data.imageWidth
    }
    set height(height){
        this.data.imageHeight = convert.toInt(height)
    }
    get height(){
        return this.data.imageHeight
    }
}

module.exports = ImageModel;

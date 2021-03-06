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
            // 订阅触发更新地址
            self.emit('sync:url');
        }

        this.data.url = url;
    }
    get url(){
        return this.data.url
    }
    set width(width){
        this.data.imageWidth = convert.toInt(width);
        this.emit('sync:width', width);
    }
    get width(){
        return this.data.imageWidth
    }
    set height(height){
        this.data.imageHeight = convert.toInt(height);
        this.emit('sync:height', height);
    }
    get height(){
        return this.data.imageHeight
    }
}

module.exports = ImageModel;

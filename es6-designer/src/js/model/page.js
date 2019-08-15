import Model from '../core/model';
import Size from './size';

class PageModel extends Model{
    constructor(options){
        super(options);

        this.data = {
            pegeStyleId: 0,
            name: '',  
            handToChangeType: 1, 
            autoToChangeType: 0, 
            autoToChangeDuration: 0, 
            fillLayoutImage: '',
            previewImage: '',
            mainBundle: new Size()
        }
    }

    set pageStyleId(styleId){
        this.data.pegeStyleId = styleId
    }
    get pageStyleId(){
        return this.data.pegeStyleId
    }
    set name(name){
        this.data.name = name
    }
    get name(){
        return this.data.name
    }
    set previewImage(url){
        this.data.previewImage = url;
    }
    get previewImage(){
        return this.data.previewImage;
    }
    set width(width){
        this.data.mainBundle.width = width
    }
    get width(){
        return this.data.mainBundle.width;
    }
    set height(height){
        this.data.mainBundle.height = height;
    }
    get height(){
        return this.data.mainBundle.height
    }
}

module.exports = PageModel;
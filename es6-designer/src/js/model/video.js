import Model from '../core/model';
import { convert } from '../util/index';

class VideoModel extends Model{
    constructor(options){
        super(options);

        if(!this.data){
            this.data = {
                url: '', 
                width: 0, 
                height: 0, 
                duration: 0,
                playStatueUrl: '',
                pauseStatueUrl: '',
                defaultBGImageUrl: ''
            }
        }
    }
    
    set url(url){
        this.data.url = url
    }
    get url(){
        return this.data.url
    }
    // 宽高与层的大小一致
    set width(width){
        this.data.width = convert.toInt(width)
    }
    get width(){
        return this.data.width
    }
    set height(height){
        this.data.height = convert.toInt(height)
    }
    get height(){
        return this.data.height
    }
    set iconPlay(url){
        this.data.playStatueUrl = url
    }
    get iconPlay(){
        return this.data.playStatueUrl
    }
    set iconPause(url){
        this.data.pauseStatueUrl = url
    }
    get iconPause(){
        return this.data.pauseStatueUrl
    }
}

module.exports = VideoModel;

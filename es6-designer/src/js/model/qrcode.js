import Model from '../core/model';
import Position from './position';

class QrcodeModel extends Model {
    constructor(options) {
        super(options);

        if (!this.data) {
            this.data = {
                url: "",
                qrcode: {
                    position: new Position(),
                    url: ""
                },
                playImage: {
                    position: new Position(),
                    url: ""
                }
            }
        }
    }
    /**
     * 背景图
     */
    set url(url) {
        this.data.url = url
    }
    get url() {
        return this.data.url
    }
    set qrcodeX(x){
        this.data.qrcode.position.x = x
    }
    get qrcodeX(){
        return this.data.qrcode.position.x
    }
    set qrcodeY(y){
        this.data.qrcode.position.y = y
    }
    get qrcodeY(){
        return this.data.qrcode.position.y
    }
    set qrcodeWidth(width){
        this.data.qrcode.position.width = width
    }
    get qrcodeWidth(){
        return this.data.qrcode.position.width
    }
    set qrcodeHeight(height){
        this.data.qrcode.position.height = height
    }
    get qrcodeHeight(){
        return this.data.qrcode.position.height
    }
    set qrcodeUrl(){
        this.data.qrcode.url = url
    }
    get qrcodeUrl(){
        return this.data.qrcode.url
    }
    set iconX(x){
        this.data.playImage.position.x = x
    }
    get iconX(){
        return this.data.playImage.position.x
    }
    set iconY(y){
        this.data.playImage.position.y = y
    }
    get iconY(){
        return this.data.playImage.position.y
    }
    set iconWidth(width){
        this.data.playImage.position.width = width
    }
    get iconWidth(){
        return this.data.playImage.position.width
    }
    set iconHeight(height){
        this.data.playImage.position.height = height
    }
    get iconHeight(){
        return this.data.playImage.position.height
    }
    set iconUrl(url){
        this.data.playImage.url = url
    }
    get iconUrl(){
        return this.data.playImage.url
    }
}

module.exports = QrcodeModel;

import Model from '../core/model';
import Position from './position';
import { FontList } from "../constant/font";
import { convert } from '../util/index';

class AudioModel extends Model{
    constructor(options){
        super(options);

        if(!this.data){
            this.data = {
                url: '', // 音频地址
                backgroundImageUrl: '', // 背景图
                playStatue: {
                    position: new Position(),
                    playStatueUrl: '', // 播放状态图片
                    pauseStatueUrl: '' // 暂停状态图片
                },
                durationLabel: {
                    position: new Position(),
                    hexColor: "#000", // hex颜色
                    fontType: 0, // 字体类型
                    fontSize: 12, // 字体大小
                    duration: 0 //时长
                }
            }
        }
    }
    
    set url(url){
        this.data.url = url
    }
    get url(){
        return this.data.url
    }
    set backgroundImage(url){
        this.data.backgroundImageUrl = url
    }
    get backgroundImageUrl(){
        return this.data.backgroundImageUrl
    }
    set iconPlay(url){
        this.data.playStatue.playStatueUrl = url
    }
    get iconPlay(){
        return this.data.playStatue.playStatueUrl
    }
    set iconPause(url){
        this.data.playStatue.pauseStatueUrl = url
    }
    get iconPause(){
        return this.data.playStatue.pauseStatueUrl
    }
    set iconX(x){
        this.data.playStatue.position.x = x
    }
    get iconX(){
        return this.data.playStatue.position.x
    }
    set iconY(y){
        this.data.playStatue.position.y = y
    }
    get iconY(){
        return this.data.playStatue.position.y
    }
    set iconWidth(width){
        this.data.playStatue.position.width = width
    }
    get iconWidth(){
        return this.data.playStatue.position.width
    }
    set iconHeight(height){
        this.data.playStatue.position.height = height
    }
    get iconHeight(){
        return this.data.playStatue.position.height
    }
    set labelX(x){
        this.data.durationLabel.position.x = x
    }
    get labelX(){
        return this.data.durationLabel.position.x
    }
    set labelY(y){
        this.data.durationLabel.position.y = y
    }
    get labelY(){
        return this.data.durationLabel.position.y
    }
    set labelWidth(width){
        this.data.durationLabel.position.width = width
    }
    get labelWidth(){
        return this.data.durationLabel.position.width
    }
    set labelHeight(height){
        this.data.durationLabel.position.height = height
    }
    get labelHeight(){
        return this.data.durationLabel.position.height
    }
    set color(color){
        this.data.durationLabel.hexColor = color
    }
    get color(){
        return this.data.durationLabel.hexColor
    }
    set fontType(fontType){
        this.data.durationLabel.fontType = convert.toInt(fontType)
    }
    get fontType(){
        return this.data.durationLabel.fontType
    }
    set fontSize(size){
        let fontSize = 12;

        Object.keys(FontList).forEach((value, key) => {
            if( key === size){
                fontSize = value.Print.fontSize;
            }
        });

        this.data.durationLabel.fontSize = fontSize
    }
    get fontSize(){
        return this.data.durationLabel.fontSize
    }
}

module.exports = AudioModel;

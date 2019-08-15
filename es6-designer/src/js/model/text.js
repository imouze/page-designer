import Model from '../core/model';
import { convert } from '../util/index';
import { FontList } from "../constant/font";

class TextModel extends Model{
    constructor(options){
        super(options);

        if(!this.data){
            this.data = {
                context: '', 
                hexColor: '#000000',
                fontType: 0,
                fontSize: 12,
                alignment: 0,
                fontAttributed: {
                    isItalic: false,
                    isUnderline: false,
                    isBold: false
                },
                contextAttributed: {
                    alpha: 1,
                    lineSpacing: 1,
                    wordSpacing: 0
                },
                limitWords: 0
            }
        }
    }
    
    set content(content){
        this.data.context = content
    }
    get content(){
        return this.data.context
    }
    set color(color){
        this.data.hexColor = color
    }
    get color(){
        return this.data.hexColor
    }
    set fontType(fontType){
        this.data.fontType = convert.toInt(fontType)
    }
    get fontType(){
        return this.data.fontType
    }
    /**
     * size是FontList的key
     */
    set fontSize(size){
        let fontSize = 12;
        let lineSpacing = 0;
        let letterSpacing = 0;
        Object.keys(FontList).forEach((value, key) => {
            if(key === size){
                fontSize = value.Print.fontSize;
                lineSpacing = value.Print.lineSpacing;
                letterSpacing = value.Print.letterSpacing;
            }
        })
        this.data.fontSize = fontSize;
        this.lineSpacing = lineSpacing;
        this.letterSpacing = letterSpacing;
    }
    get fontSize(){
        return this.data.fontSize
    }
    set alignment(alignment){
        this.data.alignment = convert.toInt(alignment)
    }
    get alignment(){
        return this.data.alignment
    }
    set italic(italic){
        this.data.fontAttributed.isItalic = convert.toBoolean(italic)
    }
    get italic(){
        return this.data.fontAttributed.isItalic
    }
    set underline(underline){
        this.data.fontAttributed.isUnderline = convert.toBoolean(underline)
    }
    get underline(){
        return this.data.fontAttributed.isUnderline
    }
    set bold(bold){
        this.data.fontAttributed.isBold = convert.toBoolean(bold)
    }
    get bold(){
        return this.data.fontAttributed.isBold
    }
    set lineSpacing(lineSpacing){
        this.data.contextAttributed.lineSpacing = convert.toInt(lineSpacing)
    }
    get lineSpacing(){
        return this.data.contextAttributed.lineSpacing
    }
    set letterSpacing(letterSpacing){
        this.data.contextAttributed.wordSpacing = convert.toInt(letterSpacing)
    }
    get letterSpacing(){
        return this.data.contextAttributed.letterSpacing
    }
    set limit(limit){
        this.data.limitWords = limit
    }
    get limit(){
        return this.data.limitWords
    }
}

module.exports = TextModel;

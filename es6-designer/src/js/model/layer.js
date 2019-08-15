import Model from '../core/model';
import Position from './position';
import { convert } from '../util/index';

/**
 * 基础信息层
 * 只展示坐标，大小，层级，透明度，角度
 */
class BaseLayerModel extends Model {
    constructor(options) {
        super(options);

        this.data = {
            level: 1,
            alpha: 1,
            angle: 0,
            loop: false,
            animationSequence: [],
            position: new Position(),
            editEnable: false,
            interfaceHook: '',
            isFillToParentLayerVisibleRectangle: false
        };
    }
    setData(data){
        if(data && typeof data === 'object'){
            data.forEach((value, key) => {
                if(this.data.hasOwnProperty(key)){
                    this.data[key] = value;
                }
            })
        }
    }
    getData(){
        return this.data;
    }
    set level(level) {
        this.data.level = convert.toInt(level)
    }
    get level() {
        return this.data.level
    }
    set alpha(alpha) {
        this.data.alpha = convert.toInt(alpha)
    }
    get alpha() {
        return this.data.alpha
    }
    set x(x) {
        this.data.position.x = x
    }
    get x() {
        return this.data.position.x
    }
    set y(y) {
        this.data.position.y = y
    }
    get y() {
        return this.data.position.y
    }
    set width(width) {
        this.data.position.width = width
    }
    get width() {
        return this.data.position.width
    }
    set height(height) {
        this.data.position.height = height
    }
    get height() {
        return this.data.position.height
    }
}


module.exports = BaseLayerModel;
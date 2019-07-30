import Model from '../core/model';
import Position from './position';

class BaseLayerModel extends Model{
    constructor(options){
        super(options);

        this.data = {
            base: {
                level: 1,
                alpha: 1,
                angle: 0,
                loop: false,
                animationSequence: [],
                position: new Position(),
                editEnable: false,
                interfaceHook: '',
                isFillToParentLayerVisibleRectangle: false
            }
        };
    }
    // 激活
    set active(value){
        this._active = value;
    }
    get active(){
        return this._active;
    }
}


module.exports = BaseLayerModel;
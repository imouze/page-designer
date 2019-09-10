import Size from './size'
import Origin from './origin'
import { convert } from '../util/index';

class Position {
    constructor(){
        this.size = new Size();
        this.origin = new Origin();
    }

    set x(v){
        this.origin.x = convert.toInt(v);
    }
    get x(){
        return this.origin.x;
    }
    set y(v){
        this.origin.y = convert.toInt(v);
    }
    get y(){
        return this.origin.y;
    }
    set width(w){
        this.size.width = convert.toInt(w);
    }
    get width(){
        return this.size.width;
    }
    set height(h){
        this.size.height = convert.toInt(h);
    }
    get height(){
        return this.size.height;
    }
}


module.exports = Position;

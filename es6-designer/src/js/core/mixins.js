/**
 * 混入，把一个类的属性和方法拷贝到另一个类，会覆盖同名方法
 * mixin的写法superclass => class extends superclass {}
 * 如果不是这个写法，将无法一直继承获得mixin
 * 多个嵌套改成mix的参数，然后循环嵌套
 * @param mixins
 * @returns {Mix}
 */
function mix(...mixins){
    let Mix = superClass => class extends superClass {
        constructor(args){
            super(args);
        }
    }

    for(let mixin of mixins){

        Mix = Mix(mixin);

        // copyProperties(Mix, mixin);
        // copyProperties(Mix.prototype, mixin.prototype);
    }
    
    return Mix;
}

function copyProperties(target, source) {
    for(let key of Reflect.ownKeys(source)){
        if(key!== 'constructor' &&
            key !== 'prototype' &&
            key !== 'name'){
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

module.exports = mix;
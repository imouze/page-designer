/**
 * 混入，把一个类的属性和方法拷贝到另一个类，会覆盖同名方法
 * @param mixins
 * @returns {Mix}
 */
function mix(...mixins){
    class Mix{}

    for(let mixin of mixins){
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
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
import Base from './base';
/**
 * 组件抽象类
 */
class Component extends Base{
    constructor(){
        super();

        this.children = [];
        this.parent = null;
    }
    addChild(child) {
        this.children.forEach(c => {
            if (c === child) {
                return this;
            }
        });

        this.children.push(child);
        return this;
    }

    removeChild(child) {
        this.children.forEach((c, i) => {
            if (child === c) {
                this.children.splice(i, 1);
            }
        });

        return this;
    }

    getChildren() {
        return this.children;
    }

    remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        return this;
    }

    getChild(index) {
        return this.children[index];
    }

    getIndex(child) {
        this.children.forEach((c, i) => {
            if (c === child) {
                return i;
            }
        });

        return -1;
    }

    getAncestor(parent) {
        if (this.parent) {
            if (this.parent === parent) {
                return this.parent;
            }

            return this.parent.getAncestor(parent);
        }

        return null;
    }

    hasChild(child) {
        this.children.forEach(c => {
            if (c === child) {
                return true;
            }
        });

        return false;
    }

    filter(fn) {
        if (!fn) {
            return null;
        }
        let ret = [];
        this.children.forEach((c, i) => {
            if (fn(c, i)) {
                ret.push(c);
            }
        });


        return ret;
    }

    render(){
        super.render();

        if(this.children.length){
            this.children.forEach(child => {
                if(!child.renderred){
                    child.render();
                }
            })
        }
    }
}

module.exports = Component;

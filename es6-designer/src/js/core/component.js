import Base from './base';
/**
 * 组件管理抽象类
 */
class Component extends Base{
    constructor(options){
        super(options);

        this.children = [];
        this.parent = null;
    }

    // init(){
    //     // 等创建完，并执行了组件的添加子组件操作之后，再去执行渲染子组件
    //     this.on('afterRender', this.afterRender)

    //     super.init();
    // }

    /**
     * render父级render不做其他事情，子类继承只要写_render即可，所以只要在这里执行这个，唯一要确认的是，是否会出现渲染子组件会比订阅的早
     */
    render(){
        super.render();

        if(this.children.length === 0){
            return;
        }

        this.children.forEach(child => {
            if(!child.renderred){ // 如果是异步渲染则会出问题
                child.init();
                // 添加到指定的元素，有个风险，如果appendTo不是当前组件下的话，添加是其他地方的，可能会出问题
                if(child.appendTo){
                    child.$el.appendTo(child.appendTo)
                } else {
                    this.$el.append(child.$el)
                }
            }
        })
    }
    /**
     * 添加多个子组件
     * @param {Array} children 子组件对象
     */
    addChildren(children){
        if(!children || children.constructor !== Array){
            return this;
        }

        children.forEach(child => {
            this.addChild(child);
        });

        return this;
    }
    /**
     * 添加单个子组件
     * @param {Object} child 子组件
     */
    addChild(child) {
        if(!child){
            return this;
        }

        this.children.forEach(c => {
            if (c === child) {
                return this;
            }
        });

        this.children.push(child);

        if(child.renderred){
            if(child.appendTo){
                child.appendTo.append(child.$el)
            } else {
                this.$el.append(child.$el);
            }
        }
        return this;
    }
    /**
     * 移除某个子组件
     * @param {Component} child 子组件
     */
    removeChild(child) {
        this.children.forEach((c, i) => {
            if (child === c) {
                child.destroy();
                this.children.splice(i, 1);
            }
        });

        return this;
    }

    /**
     * 移除所有子组件
     */
    removeAllChild(){
        this.children.forEach((child, i) => {
            child.destroy();
            this.children.splice(i, 1)
        })
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
}

module.exports = Component;

import Base from '../core/base'

/**
 * 面板
 * 分头部，中间内容区，底部三个区域，新增toolbar区，用于操作关闭或者展开收缩
 */
class Panel extends Base {
    constructor(...args) {
        super(args);

        this.className = 'panel';
        /**
         * 模板
         * @type {string}
         */
        this.tpl = `
            <div class="arrow"></div>
            <div class="panel-header"></div>
            <div class="panel-body"></div>
            <div class="panel-footer"></div>
        `
    }

    init(){
        super.init();
    }

    _render(){
        super._render();

        
    }
}

module.exports = Panel;

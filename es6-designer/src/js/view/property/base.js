import Component from '../../core/component'

/**
 * 基础信息
 * 定位，大小，层级，旋转，透明度
 */
class BaseProperty extends Component {
    constructor(options) {
        super(options)
    }

    show(){
        this.$el.show();
    }
}

module.exports = BaseProperty;

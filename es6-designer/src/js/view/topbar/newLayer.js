import Component from '../../core/component'

/**
 * 弹窗展示要添加的图层，共有以下几个图层：
 * 1.文本框
 * 2.元素框(其实就是展示图片)
 * 3.图片框(包含子层，且只有一张图片，并且有可视区域)
 * 4.视频框(包含一个二维码的子层，无可视区域，二维码仅打印可用)
 * 5.音频框(包含一个二维码的子层，无可视区域)
 * 6.分组框(目录分组，仅目录页使用)
 * 7.目录框(一个弹窗选择？)
 * 8.背景框(由于打印限定一个固定背景，目前以层级是1为背景，且唯一)
 * 
 * 分页固定，不能删除，所以不在这边显示，这边只显示可添加到页面的东西
 * 这里不需要创建元素，所以只继承
 */

class NewLayerDialog extends Component {
    constructor(options) {
        super(options)
        this.instance = null;
        // 应该改成灵活插入，写死了就只能更新这里的东西了
        /**
         * <div class="fa fa-text" type="text">添加文本</div>
                <div class="fa fa-image" type="image">添加元素</div>
                <div class="fa fa-object-group" type="editimage">添加图片</div>
                <div class="fa fa-film" type="video">添加视频</div>
                <div class="fa fa-music" type="audio">添加音频</div>
         */
        this.className = this.prefix + 'layer-list-content'

        this.layerList = [];
    }
    /**
     * 添加图层类型
     * layerType: {
     *  icon:
     *  text:
     *  type:
     * }
     */
    addLayerType(layerTypeList) {
        if (!layerTypeList) {
            return;
        }
        if (layerTypeList.constructor === Array) {
            layerTypeList.forEach(layerType => {
                this.layerList.push(layerType);
            })
        } else {
            this.layerList.push(layerTypeList);
        }
    }

    _render() {
        super._render();
        if (this.layerList.length) {
            this.layerList.forEach(layerType => {
                this.$el.append(`<div class="layer-item" type="${layerType.type}"><span class="fa fa-${layerType.icon}"></span><span class="layer-name">${layerType.text}</span></div>`);
            })
        }
    }

    /**
     * 显示弹窗
     */
    show() {
        const self = this;
        this.init();
        // 不需要确定按钮，点击之后就执行添加到页面的事件
        this._index = layer.open({
            type: 1,
            title: null,
            content: '',
            shadeClose: true,
            success: function (o, index) {
                o.find('.layui-layer-content').append(self.$el);
                self.bindLayer(o)
            },
            area: ['800px', '400px']
        })
    }

    bindLayer(o) {
        o.on('click', '.layer-item', $.proxy(this.add, this));
    }

    add(e) {
        const type = $(e.currentTarget).attr('type');
        // 点击执行之后
        this.emit('click:layer', e, type);

        layer.close(this._index);
    }
}

module.exports = NewLayerDialog;
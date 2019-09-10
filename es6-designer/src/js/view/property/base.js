import Component from '../../core/component'
import { validate } from '../../util/index'

/**
 * 基础信息
 * 定位，大小，层级，旋转，透明度
 * 
 */
class BaseProperty extends Component {
    constructor(options) {
        super(options);

        this.tpl = `
        <header>基础属性</header>
        <section>
            <div class="field-group">
                <label for="">位置</label>
                <input type="text" name="x" class="input-text">
                <input type="text" name="y" class="input-text">
            </div>
            <div class="field-group">
                <label for="">大小</label>
                <input type="text" name="width" class="input-text">
                <input type="text" name="height" class="input-text">
            </div>
            <div class="field-group">
                <label for="">不透明度</label>
                <input type="text" name="alpha" class="input-text input-text-full">
            </div>
            <div class="field-group">
                <label for="">角度</label>
                <input type="text" name="angle" class="input-text input-text-full">
            </div>
            <div class="field-group">
                <label for="">层级</label>
                <input type="text" name="level" class="input-text input-text-full">
            </div>
        </section>
        `;
        this.model = options.model;
    }

    _bind() {
        const $el = this.$el;
        $el.on('blur', 'input[name=level]', $.proxy(this.onLevel, this));
        $el.on('blur', 'input[name=x]', $.proxy(this.onPositionX, this));
        $el.on('blur', 'input[name=y]', $.proxy(this.onPositionY, this));
        $el.on('blur', 'input[name=width]', $.proxy(this.onWidth, this));
        $el.on('blur', 'input[name=height]', $.proxy(this.onHeight, this));
        $el.on('blur', 'input[name=angle]', $.proxy(this.onAngle, this));
        $el.on('blur', 'input[name=alpha]', $.proxy(this.onAlpha, this));

        // model同步到输入框
        this.model.on('sync:level', function (level){
            $el.find('input[name=level]').val(level);
        });
        this.model.on('sync:x', function (x){
            $el.find('input[name=x]').val(x);
        })
        this.model.on('sync:y', function (y){
            $el.find('input[name=y]').val(y);
        })
        this.model.on('sync:width', function (width){
            $el.find('input[name=width]').val(width);
        })
        this.model.on('sync:height', function (height){
            $el.find('input[name=height]').val(height);
        })
        this.model.on('sync:angle', function (angle){
            $el.find('input[name=angle]').val(angle);
        })
        this.model.on('sync:alpha', function (alpha){
            $el.find('input[name=alpha]').val(alpha);
        })
    }

    onPositionY(e){
        const v = $.trim(e.target.value);
        // 非纯整数
        if (!validate.isNumber(v)) {
            layer.msg('请输入整数');
            e.target.value = '';
            return false;
        }

        this.model.x = v;
    }

    onPositionX(e){
        const v = $.trim(e.target.value);
        // 非纯整数
        if (!validate.isNumber(v)) {
            layer.msg('请输入整数');
            e.target.value = '';
            return false;
        }

        this.model.x = v;
    }

    onLevel(e) {
        const v = $.trim(e.target.value);
        // 非纯整数
        if (!validate.isNumber(v)) {
            layer.msg('请输入整数');
            e.target.value = '';
            return false;
        }
        this.model.level = v;
    }

    onWidth(e){
        const v = $.trim(e.target.value);
        // 非纯整数
        if (!validate.isNumber(v)) {
            layer.msg('请输入整数');
            e.target.value = '';
            return false;
        }
        this.model.width = v;
    }

    onHeight(e){
        const v = $.trim(e.target.value);
        // 非纯整数
        if (!validate.isNumber(v)) {
            layer.msg('请输入整数');
            e.target.value = '';
            return false;
        }
        this.model.height = v;
    }

    onAngle(e){
        const v = $.trim(e.target.value);
        // 非纯整数
        if (!validate.isNumber(v)) {
            layer.msg('请输入整数');
            e.target.value = '';
            return false;
        }
        this.model.agnle = v;
    }

    onAlpha(e){
        const v = $.trim(e.target.value);
        // 非纯整数
        if (!validate.isNumber(v)) {
            layer.msg('请输入整数');
            e.target.value = '';
            return false;
        }
        this.model.alpha = v;
    }
}

module.exports = BaseProperty;

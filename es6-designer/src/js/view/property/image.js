import Component from '../../core/component'

/**
 * 图片属性层
 */
class ImageProperty extends Component{
    constructor(options){
        super(options);

        this.tpl = `
        <header>图片信息</header>
        <section>
            <div class="field-group">
                <label for="">大小</label>
                <input type="text" name="width" readonly class="input-text">
                <input type="text" name="height" readonly class="input-text">
            </div>
        </section>
        `;

        this.model = options.model;
    }

    _bind(){
        const $el = this.$el;
        this.model.on('sync:width', function(width){
            $el.find('input[name=width]').val(width)
        });
        this.model.on('sync:height', function(height){
            $el.find('input[name=height]').val(height)
        })
    }
}

module.exports = ImageProperty;
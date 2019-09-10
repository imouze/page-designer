import BaseLayer from './base';

class ImageLayer extends BaseLayer{
    constructor(options){
        super(options);

        this.className = super.getClassName() + ' ' + this.prefix + 'layer-image'

        if(options.model){
            if(options.model.base){
                this.base = options.model.base;
            }

            if(options.model.info){
                this.info = options.model.info;
            }
        }
    }

    _render(){
        super._render();

        this.$el.find('.layer-type').text('图片');
    }

    _bind(){
        super._bind();
        
        const self = this;        
        // 给图层信息赋值图片地址后，会给图片宽高赋值
        // 等赋值后，再同步到基础属性里
        // 基础属性改变大小则影响到视图的长相，不会影响到数据
        this.info.on('sync:width', function(width){
            self.base.width = width;
        });
        this.info.on('sync:height', function(height){
            self.base.height = height;
        });
    }
    /**
     * 上传图片后设置
     * @param {String} url 
     */
    setUrl(url){
        if(!url){
            return false;
        }
        const img = new Image();
        const self = this;
        img.src = url;

        function complete(){
            self.$body.append(img);
            self.info.url = url;
        }

        if(img.complete){
            complete();
        } else {
            img.onload = function(){
                complete();
            }
        }

        img.onerror = function(){
            throw '图层Id' + this.id + '设置图片失败'
        }
    }

    setWidth(width){
        if(!width){
            return false;
        }
        this.$el.css('width', width);
        this.base.width = width;
    }

    setHeight(height){
        if(!height){
            return false;
        }
        this.$el.css('height', height);
        this.base.height = height;
    }
}

module.exports = ImageLayer;
/**
 * 混入拖动功能
 * @param superClass
 */
module.exports = superClass => class extends superClass {
    constructor(args) {
        super(args);
        // 受到约束的区域
        this.restrict = null;
        // 起始横坐标
        this.startX = 0;
        // 起始纵坐标
        this.startY = 0;
        // 原始坐标
        this.origin = { x: 0, y: 0 };
        // 是否拖动状态
        this.dragging = false;
        // 拖动的元素，默认是整个组件
        this.$dragEl = this.$el;
    }

    _render(){
        super._render();

        this.$dragEl = this.dragEl ? $(this.dragEl) : this.$el;
    }

    _bind() {
        super._bind();

        if(this.$dragEl.length){
            this.$dragEl.on('mousedown', $.proxy(this.onMouseDown, this));
            this.$dragEl.on('mousemove', $.proxy(this.onMouseMove, this));
            this.$dragEl.on('mouseup', $.proxy(this.onMouseUp, this));
        }
    }

    onMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        // 点击执行之前
        this.emit('layer:beforemove', e);

        const $el = this.$el;
        this.dragging = true;
        $(document).on('mousemove', $.proxy(this.onMouseMove, this));
        $(document).on('mouseup', $.proxy(this.onMouseUp, this));

        this.startX = e.pageX;
        this.startY = e.pageY;
        this.origin.x = $el.position().left
        this.origin.y = $el.position().top

        // 点击执行之后
        this.emit('layer:movestart', {
            startX: this.startX,
            startY: this.startY
        }, e);
    }

    onMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();
        if(this.dragging){
            const moveX = e.pageX - this.startX;
            const moveY = e.pageY - this.startY;
            const $el = this.$el;
            const origin = this.origin;
            const width = $el.width();
            const height = $el.height();
            let  l = 0;
            let  t = 0;
            let $restrict = this.restrict;
            let restrictWidth = 0;
            let restrictHeight = 0;

            // 存在约束区域
            if($restrict && $restrict.length){
                restrictWidth = $restrict.width();
                restrictHeight = $restrict.height();
            }

            // 如果松开后超出，则以最边缘为准
            // 分四种情况：
            // 1.左坐标超出屏幕左边
            // 2.上坐标超出屏幕上边
            // 3.右坐标超出屏幕右边
            // 4.下坐标超出屏幕下边
            // 如果有约束，需要不能超出限定值
            if($restrict){
                if(moveX + origin.x + width > restrictWidth){
                    l = restrictWidth - width
                } else if(moveX + origin.x < 0){
                    l = 0
                } else {
                    l = moveX + origin.x;
                }
            } else {
                l = moveX + origin.x;
            }
            
            if($restrict){
                if(moveY + origin.y + height > restrictHeight){
                    t = restrictHeight - height
                } else if(moveY + origin.y < 0){
                    t = 0
                } else {
                    t = moveY + origin.y
                }
            } else {
                t = moveY + origin.y
            }
            
            this.$el.css('left', l + 'px')
            this.$el.css('top', t + 'px')

            // 拖动中
            this.emit('layer:moving', {
                left: l,
                top: t
            }, e);
        }
    }

    onMouseUp(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dragging = false;
        $(document).off('mousemove', $.proxy(this.onMouseMove, this));
        $(document).off('mouseup', $.proxy(this.onMouseUp, this));

        // 拖动结束
        this.emit('layer:moveend', {
            left: this.$el.position().left,
            top: this.$el.position().top
        }, e);
    }
};
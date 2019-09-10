/**
 * 右键菜单好像只能绑定一次，多次绑定会被覆盖
 * 右键菜单改成只能创建一次，已创建将不再创建
 */
module.exports = superClass => class extends superClass {
    constructor(args) {
        super(args);

        this.contextmenuClass = 'contextmenu';
        this.contextmenu = $('.' + this.contextmenuClass);
        this.contextmenuList = [];
    }

    _bind() {
        super._bind();

        const self = this;
        $(document).on('contextmenu', function (e) {
            if ($el.is(e.target)) {
                if (!self.contextmenu.length) {
                    self.createContextMenu();
                }

                self.contextmenu.css({
                    'left': e.pageX,
                    'top': e.pageY
                });
            }

            return false;
        });

        $(document).on('click', function () {
            if (self.contextmenu.length) {
                self.contextmenu.remove();
            }
        })
    }
    /**
     * 创建右键菜单层
     */
    createContextMenu() {
        const $contextmenu = $('<div class="' + this.contextmenuClass + '"></div>').appendTo('body');

        if(this.contextmenuList.length){
            this.contextmenuList.forEach(item => {
                const $item = $('<div class="contextmenu-item">'+ item.text + '</div>');
                $item.on('click', $.proxy(item.handle, this));
                $contextmenu.append($item);
            })
        }

        this.contextmenu = $contextmenu;
    }
    /**
     * 添加右键菜单
     */
    addMenu(text, handle) {
        this.contextmenuList.push({
            'text': text,
            'handle': handle
        })
    }
}
import Component from '../core/component';
import Button from './button';

class Dropdown extends Component{
    constructor(options){
        super(options);

        this.text = '';
        this.menuList = [];
        this.className = (this.prefix ? this.prefix + '-' : '') + 'dropdown';
    }


    _render(){
        super._render();

        this.addToggle();
        this.addMenuList();
    }
    
    _bind(){
        super._bind();

        const self = this;
        // 点击非下拉菜单位置的隐藏弹窗
        $(document).on('click', function(e){
            if(!(self.$el.is(e.target) || self.$el.has(e.target).length > 0 || self.$dropdownMenu.is(e.target) || self.$dropdownMenu.has(e.target).length)){
                self.$dropdownMenu.hide();
            }
        })
    }

    addToggle(){
        const self = this;
        this.addChild(new Button({
            text: this.text,
            className: 'dropdown-toggle',
            handler: function(){
                self.$dropdownMenu.show();
            }
        }));
    }

    addMenuList(){
        let $wrap = $('<ul class="dropdown-menu"></ul>');
        if(this.menuList.length){
            this.menuList.forEach((menu, i) => {
                const $item = $('<li><a href="javascript:;">菜单' + (i + 1)+ '</a></li>');
                const $link = $item.find('a');

                if(menu.handler){
                    $link.on('click', $.proxy(menu.handler, this))
                } else {
                    $link.attr('href', menu.href)
                }
                if(menu.text){
                    $link.html(menu.text)
                }
                $wrap.append($item);
            })
        }

        this.$el.append($wrap);
        this.$dropdownMenu = $wrap;
    }
}

module.exports = Dropdown;
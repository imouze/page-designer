import Observer from './core/observer';
import Topbar from './controller/topbar';
import KeyCode from './constant/keyCode';
import Page from './controller/page';
import Property from './view/property/property';

/**
 * 编辑器主界面
 */
class AlbumEditor extends Observer{
    constructor() {
        super();
    }

    /**
     * 初始化先加载数据，比如字典等
     */
    init() {
        /**
         * 主要分几个区域：
         * 1.操作区
         * 2.展示区
         * 3.属性弹窗
         * 页面属性放在topbar，需要有一个数据进行传递
         */
        const page = new Page();
        const topbar = new Topbar();
        const property = new Property();
        
        // 点击文件的图片时
        topbar.on('click:image', function(instance){
            // page.add(instance);
        });
        // 点击保存时
        topbar.on('save', function(){

        });
        // 导出JSON时
        topbar.on('export', function(){

        });
        // 导入json时
        topbar.on('import', function(){

        });
        // 点击操作历史时
        topbar.on('history', function(){

        });
        // 新建页面时
        topbar.on('newpage', function(){

        });
        // 添加图层时
        topbar.on('add', function(){

        });
        // 点击图层时
        topbar.on('layer', function(){

        });
        // 页面设置
        topbar.on('pagesettings', function(){

        });
        topbar.on('create:layer', function(instance){
            if(instance){
                // 属性展示在哪里
                instance.setProperty(property);
                // 插入所在元素
                instance.view.appendTo = page.view.$page;
                // 拖动限制区域
                instance.view.restrict = page.view.$page;
                page.view.addChild(instance.view);
            }
        })
        topbar.init();

        property.init();
        $('#app').append(property.$el);
        $('#app').append(topbar.view.$el);

        this.bind();

        this.topbar = topbar;
        
        // 很多都是在页面上操作的，或者跟页面有关联，但是如果要降低耦合，就不能有太多关联
        // 
        page.init();
        $('#app').append(page.view.$el);
        // 居中
        page.center();



        // $('.property').css('height', $('#app').height() + 'px');
    }

    bind(){
        $('#app').on('click', function(e){
            $(e.target).focus();
        })

        // 要监听元素的按键需要加上tabindex
        $('#app').on('keydown', function(e){
            e.stopPropagation();
            console.log(e.keyCode)
            if(e.ctrlKey && e.keyCode === KeyCode.KEY_S){
                console.log('ctrl + s');
                return false;
            }

            return true;
        });

        // 当没有获得焦点时，按了ctrl+s也要可以执行，元素获得焦点也要支持通用快捷键按键
        // ctrl+i 插入元素  i:image
        // ctrl+a 插入音乐  a:audio
        // ctrl+m 插入视频  m:media
        // ctrl+q 插入二维码 q:qrcode
        // ctrl+e 插入编辑图片 e:edit image
        // ctrl+t 插入文本  t:text
        // ctrl+p 插入页码  p:pagination
        // ctrl+l 弹出插入目录设置 l:catalog
        $(document).on('keydown', function(e){
            // 命中快捷键return false,否则会执行浏览器的操作
            if(e.ctrlKey && e.keyCode === KeyCode.KEY_S){
                console.log('ctrl + s');
                return false;
            }

            // return false;
            // 否则正常走流程
            return true;
        })
    }

    test(restrict){
        const $restrict = $(restrict);
        const $el = $('<div class="box"><div class="dragEl"></div></div>').appendTo($restrict);
        const $dragEl = $el.find('.dragEl');
        let dragging = false;
        // let moveX = 0;
        // let moveY = 0;
        // let $num = 0;
        let startX = 0;
        let startY = 0;
        let width = $el.width();
        let height = $el.height();
        let restrictWidth = $restrict.width();
        let restrictHeight = $restrict.height();
        let origin = {
            x: 0,
            y: 0
        };

        $dragEl.on('mousedown', function(e){
            e.preventDefault();
            e.stopPropagation();
            $(document).on('mousemove', mousemove);
            $(document).on('mouseup', mouseup);
            //更改鼠标状态
            //参数e为鼠标
            dragging = true
            //获取鼠标坐标
            startX = e.pageX
            startY = e.pageY
            // //鼠标拖动初始化
            // moveX = 0;
            // moveY = 0;

            origin.x = $el.position().left
            origin.y = $el.position().top
        });

        $dragEl.on('mousemove', mousemove);

        $dragEl.on('mouseup', mouseup);

        function mouseup(e){
            e.preventDefault();
            e.stopPropagation();
            $(document).off('mousemove', mousemove);
            $(document).off('mouseup', mouseup);
            dragging = false;
            // let  l = 0;
            // let  t = 0;

            // // 如果松开后超出，则以最边缘为准
            // // 分四种情况：
            // // 1.左坐标超出屏幕左边
            // // 2.上坐标超出屏幕上边
            // // 3.右坐标超出屏幕右边
            // // 4.下坐标超出屏幕下边
            // if(moveX + origin.x + width > restrictWidth){
            //     l = restrictWidth - width
            // } else if(moveX + origin.x < 0){
            //     l = 0
            // } else {
            //     l = moveX + origin.x;
            // }
            // if(moveY + origin.y + height > restrictHeight){
            //     t = restrictHeight - height
            // } else if(moveY + origin.y < 0){
            //     t = 0
            // } else {
            //     t = moveY + origin.y
            // }
            // $el.animate({
            //     'left': l + 'px',
            //     'top': t + 'px'
            // }, 400);
        }

        function mousemove(e){
            e.preventDefault();
            e.stopPropagation();
            //判断鼠标是不是被按下中移动
            if(dragging) {
                // e.pageX是鼠标坐标，坐标减去元素改变后的元素坐标是否大于容器
                // 计算可移动距离
                const moveX = e.pageX - startX
                const moveY = e.pageY - startY

                let  l = 0;
                let  t = 0;

                // 如果松开后超出，则以最边缘为准
                // 分四种情况：
                // 1.左坐标超出屏幕左边
                // 2.上坐标超出屏幕上边
                // 3.右坐标超出屏幕右边
                // 4.下坐标超出屏幕下边
                if(moveX + origin.x + width > restrictWidth){
                    l = restrictWidth - width
                } else if(moveX + origin.x < 0){
                    l = 0
                } else {
                    l = moveX + origin.x;
                }
                if(moveY + origin.y + height > restrictHeight){
                    t = restrictHeight - height
                } else if(moveY + origin.y < 0){
                    t = 0
                } else {
                    t = moveY + origin.y
                }
                $el.css('left', l + 'px')
                $el.css('top', t + 'px')
            }
        }

        $(window).resize(function(){
            restrictWidth = $restrict.width();
            restrictHeight = $restrict.height();
        });

        let contextmenuList = [{
            text: '新建页面',
            handle: function(e){
                console.log(this.innerText);
            }
        },{
            text: '添加元素',
            handle: function(e){
                console.log(this.innerText);
            }
        },{
            text: '添加文本',
            handle: function(e){
                console.log(this.innerText);
            }
        }]

        $(document).on('contextmenu', function(e){
            if($el.is(e.target)){
                let $contextMenu = $('.contextmenu');
                if(!$contextMenu.length){
                    $contextMenu = $('<div class="contextmenu"></div>').appendTo('body');
                    if(contextmenuList.length){
                        contextmenuList.forEach(item => {
                            const $item = $('<div class="contextmenu-item">'+ item.text + '</div>');
                            $item.on('click', item.handle);
                            $contextMenu.append($item);
                        })
                    }
                }

                $contextMenu.css({
                    'left': e.pageX,
                    'top': e.pageY
                });

                return false;
            }

            return true;
        });

        $(document).on('click', function(){
            const $contextMenu = $('.contextmenu');
            if($contextMenu.length){
                $contextMenu.off('click');
                $contextMenu.remove();
            }
        })
    }
}

module.exports = AlbumEditor;

import PageModel from '../model/page'
import PageView from '../view/page'
import Observer from '../core/observer'
/**
 * 页面控制器
 * 全局应用于主场景
 * 旧模式：页面中的层被激活，要弹出属性框，用于填写属性数据
 * 
 */
class PageController extends Observer {
    constructor(options) {
        super(options);

        this.model = null;

        this.view = null;
    }

    init() {
        /**
         * 页面业务数据存在弹窗填写和修改的时候，页面区只关心子层的集合
         */
        this.model = new PageModel();
        this.view = new PageView({
            model: this.model
        });
        this.view.init();
    }

    center(){
        const $page = this.view.$page;
        const $el = this.view.$el;
        $page.css({
            left: ($el.width() - $page.width()) / 2 + 'px',
            top: ($el.height() - $page.height()) / 2 + 'px'
        })
    }
}

module.exports = PageController
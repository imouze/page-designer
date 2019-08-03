import Button from './component/button'
import Observer from './core/observer';
import Topbar from './view/topbar';

class AlbumEditor extends Observer{
    constructor() {

    }

    init() {
        const topbar = new Topbar();
        topbar.init();
    }
}

module.exports = AlbumEditor;

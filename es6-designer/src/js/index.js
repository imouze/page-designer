import Button from './component/button'
import LayerModel from './model/layer'

class AlbumEditor {
    constructor() {

    }

    init() {

        // let model = new LayerModel();
        //
        // let position = model.get('position');
        // position.x = 200;
        // console.log(JSON.stringify(model.data, null, '\t'));

        const button = new Button({
            text: '提交'
        });
        // 订阅点击事件
        button.on('click', function(){
            alert('222')
        });
        button.init();
    }
}

module.exports = AlbumEditor;

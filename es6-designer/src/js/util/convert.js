module.exports = {
    toNumber(v){
        if(typeof v !== 'number'){
            v = Number(v);
        }

        if(isNaN(v)){
            v = 0;
        }

        return v;
    },

    /**
     * 转换成整形
     * @param {Any} v 需要转换的值
     */
    toInt(v){
        return parseInt(this.toNumber(v));
    },

    toFloat(v){
        return parseFloat(this.toNumber(v));
    },

    toBoolean(v){
        if(v === 'false' || v === '0'){
            v = false;
        }

        return !!v;
    }
}
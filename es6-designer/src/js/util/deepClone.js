/**
 * 深度拷贝
 * 后续参数
 *
 * 浅拷贝用Object.assign即可
 */
function deepClone(...args) {
    let target = args[0];

    for (let i = 1; i < args.length; i++) {
        for (let k in args[i]) {
            if (args[i].hasOwnProperty(k)) {
                target[k] = args[i][k];
            }
        }
    }
    return target;
}


module.exports = deepClone;

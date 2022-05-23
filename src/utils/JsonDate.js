/*
 * name:json数组拉平处理
 * data:json对象或者数组
 * k:前面开始可传空
 */
function expandJsonTool(data, k) {
    var jmap = {};
    var expandJson = function (jstr, mapIndex) {
        if (jstr instanceof Array) {
            for (var i in jstr) {
                expandJson(jstr[i], `${mapIndex}[${i}]`);
            }
        } else if (jstr instanceof Object) {
            for (var i in jstr) {
                // 如果mapIndex为false,null,''时，则不加初始索引
                if (!mapIndex) {
                    var key = i;
                } else {
                    var key = `${mapIndex}.${i}`;
                }
                // Array 是 Object 的子集，先判断是否为 Array,如果是，则不走Object的判断
                if (jstr[i] instanceof Array) {
                    for (var j in jstr[i]) {
                        expandJson(jstr[i][j], `${key}[${j}]`);
                    }
                } else if (jstr[i] instanceof Object) {
                    expandJson(jstr[i], key);
                } else {
                    jmap[key] = jstr[i];
                }
            }
        }
    };
    expandJson(data, k);
    return jmap;
}

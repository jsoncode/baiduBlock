var lists = str.split('\n').filter(function(v) {
    if (v) return true
});

var local = location.href;
function clear(lists) {
    for (var a = 0, list; list = lists[a++];) {
        var sub = list.split('$');
        if (new RegExp(sub[0]).test(local)) {
            var selector = sub[1];
            var obj = document.querySelectorAll(selector);
            for (var i = 0, item; item = obj[i++];) {
                item.parentNode.removeChild(item);
            }
        }
    }
}

clear(lists);
setInterval(function() {
    clear(lists);
}, 2000);
var input = document.querySelector("input[name=wd]");
input&&input.addEventListener('change', function() {
    clear(lists);
});

/*功能2 切换某些网站的语言，原理：将类似en-US修改为zh-CN重新访问*/

lang = lang.split('\n').filter(function(v) {
    if (v) return true
});
window.onload=function(){
    for (var a = 0, item;  item= lang[a++];) {
        var sub = item.split('$');
        if (new RegExp(sub[0]).test(local)&&new RegExp(sub[1]).test(local)) {
            location.href = local.replace(sub[1],sub[2]);
        }
    }
}

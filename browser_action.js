var lists = str.split('\n').filter(function(v) {
    if (v) return true
});

function clear(lists) {
    var local = location.href;
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


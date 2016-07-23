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



// 帮女朋友找工作，过滤51job前程无忧的垃圾招聘信息，有效节省2/3时间
(function() {
    // 判断 判断是否 判断是否判断是否是是51
    if (new RegExp('http://search.51job.com').test(location.href)) {
        var list = 0;
        [].forEach.call(document.querySelectorAll("#resultList [class='el']"), function(element, index) {
            var txt = element.innerText;
            //一些销售，理财，保险，，远离张江的，恶意刷屏的企业，特殊行业的，统统过滤掉
            var str = '销售|经理|主管|推广|开发|会计|实习|硬件|专员|司机|驾驶|设计|软件|顾问|代表' +
                '|维修|康之宝|出纳|银行|保险|应届生|实习|国堃|青芒|外企|韩语|汽车|英语|咖啡|业务|代理人' +
                '|客服|政府|运维|道金|分析师|分析老师|沪江|贷|理财|险|美女|福利|网销|客户|总监|主持人|500强|欧美' +
                '|科锐安网络|接待生|市场|财务|商务|精智机电工程|上海维音信息|索迪斯|太平洋|平安|厨师|锦环资本|国际|保洁' +
                '|地产|教务|乐蛙|Admin|第三方|Interactive|总务|精准|董事长|主任|中国|交易|荣县智华投资|上海岳辰口腔' +
                '|天赉星|微媒天创|浩深环保|通飞实业|水管家|赛侬机电|谷佳教育|摩恩电气|环融集团|贝思特电气|羡掌医药|厚谊物流' +
                '|寰亚电力|艾儿贝佳医院|优立检测|艾沃尔|焦扬网络|晟矽微电子|策智物业|古北物业|怡苓贸易|钧涣精密|易盟实业' +
                '|万朋自动化|帆信建筑|瓦洛兰投资|哈得曼机械|傲茉信息技|伊莱克斯|网够贸易|设备|日轮汽车|法务|银天下|微展信息' +
                '|外贸|桦洁商贸|研究|实验|商业|项目|佰贝科技|政凯信息|盐巴信息|关务|直播|物业|闳康技术|森众默|兰科化工|矽感信息' +
                '|福庚贸易|博彦科技|研发助理|黎欧思|爱迪特|sem|维音数码|杰隆企业|老师|毕得医药|证券|原能细胞|明德资讯|第九城市' +
                '|题玛贸易|树道企业|盛英科技|砝码斯医药|助教|罗氏|培训|苏商建设集团|总裁|柯达乐芮|医疗|杰为电子|应届|孚商股权' +
                '|滨康科达纺织|资深文|策划|高级文|创意|迪赛诺|优居碧|企划|元易岩土|金脉电子|快屏网络|灵希文化|微齐金融|视频|记着' +
                '|银生宝|孚汇资产|盐商集团|廷宗健康|锦黄投资|亮言实业|浔金数据|金恪投资|赢昶资产|朗金嵩特|城路市政|班维建筑'+
                '|宗寰|双威贸易|残疾人|裕芯|儿童|合庆|渠道|科学|深圳传音|第宜际|日轮汽车|迈思拓华鼎';
            var removeS = new RegExp(str, 'i');

            var remove = removeS.test(txt);
            //浦东的职位
            var position = !/浦东新区/.test(txt);
            //薪资3000-10000之间的，超过10000视为诈骗
            var money = txt.match(/\d+-\d+/g)[0].match(/\d+/g);
            var hasMoney = money[0] < 3000 || money[1] > 10000;
            //只看一周内的
            var time = (new Date('2016-' + txt.match(/\d+-\d+/g)[1]).getTime() + 7 * 24 * 3600 * 1000) < new Date().getTime();
            var img = element.querySelector(".t1 img");

            if (remove || position || time || hasMoney || img) {
                element.parentElement.removeChild(element);
            } else if (img) {
                //过滤实习岗位
                var alt = /实习/.test(img.alt);
                if (alt) {
                    element.parentElement.removeChild(element);
                }
            } else {
                list++;
            }
        });
        //自动下一页
        if (list == 0) {
            var next = document.querySelector('.dw_page ul li:last-child a');
            if (next) {
                //没有用链接跳转方式，是因为要练习原生js的模拟点击事件
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", false, false);
                next.dispatchEvent(evt)
            }
        }
    }
})();

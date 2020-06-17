$(document).ready(async () => {

    // var itemNum = 20;

    // for (var i = 0; i < itemNum; i++) {
    //     var li = document.createElement("li");
    //     var time = new Date();
    //     li.innerHTML = `<li>这是第${i}条报警，发生在${time.getHours()}:${time.getMinutes()}:${time.getSeconds()},请注意检查！</li>`;
    //     console.log(li)
    //     document.getElementById("announcement").appendChild(li);
    // }

    function toBeijingTime(time) {
        let btime = new Date(time)
        let bticket = (btime.getTime() + (1000 * 60 * 60 * 8))
        let newTime = new Date(bticket)

        let thisYear = newTime.getFullYear()
        let thismonth = newTime.getMonth() + 1
        let thisDay = newTime.getDay()

        let thisHour = (newTime.getHours() > 9 ? newTime.getHours() : ('0' + newTime.getHours()))
        let thisMin = (newTime.getMinutes() > 9 ? newTime.getMinutes() : ('0' + newTime.getMinutes()))
        let thisSec = (newTime.getSeconds() > 9 ? newTime.getSeconds() : ('0' + newTime.getSeconds()))

        return `${thisYear}-${thismonth}-${thisDay} ${thisHour}:${thisMin}:${thisSec}`
    }

    await $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'http://39.99.213.143:8888/dash/getAlarmCategory',
        success: (results) => {
            // console.log(results)
            results.forEach(item => {
                let li = document.createElement("li");
                let time = item.AlarmTime;
                li.innerHTML = `<p style='font-size:13px'> ${toBeijingTime(time)} ${item.GroupName} ${item.TagName.slice(7)} 报警，报警值为： ${item.AlarmValue.slice(0, 5)}</p>`;
                document.getElementById("announcement").appendChild(li);
            })
        }
    })

    var obj = document.getElementById("announcement");
    const targetNum = obj.getElementsByTagName('li').length;
    for (i = 0; i < targetNum; i++) {
        obj.appendChild(extractNodes(obj)[i].cloneNode(true));
    }

    function rolltxt() {
        if (obj.scrollTop % (obj.clientHeight - targetNum) == 0) {
            settime += 1;
            if (settime == 50) {
                obj.scrollTop += 1;
                settime = 0;
            }
        } else {
            obj.scrollTop += 1;
            if (obj.scrollTop == (obj.scrollHeight - obj.clientHeight)) {
                obj.scrollTop = 0;
            }
        }
    }

    function extractNodes(pNode) {
        if (pNode.nodeType == 3) return null;
        var node, nodes = new Array();
        for (var i = 0; node = pNode.childNodes[i]; i++) {
            if (node.nodeType == 1) nodes.push(node);
        }
        return nodes;
    }

    settime = 0;
    var t = setInterval(rolltxt, 50);
    obj.onmouseover = function () {
        clearInterval(t)
    }
    obj.onmouseout = function () {
        t = setInterval(rolltxt, 50)
    }
})
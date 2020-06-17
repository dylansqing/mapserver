$(document).ready(async () => {

    /**默认参数 */
    var seriesData = []

    await $.ajax({
        type: 'GET',
        datatype: 'JSON',
        url: 'http://39.99.213.143:8888/dash/getDeviceStatusCounts',
        success: (results) => {
            results.forEach(item => {
                if (item.status == 1) {
                    seriesData.push({
                        "value": item.counts,
                        "name": "在线设备"
                    })
                } else if (item.status == 0) {
                    seriesData.push({
                        "value": item.counts,
                        "name": "离线设备"
                    })
                } else {
                    seriesData.push({
                        "value": item.counts,
                        "name": "故障设备"
                    })
                }
            })

            // seriesData = [{
            //     "value": results[0].counts,
            //     "name": "故障设备"
            // },
            // {
            //     "value": results[2].counts,
            //     "name": "在线设备"
            // },
            // {
            //     "value": 0,
            //     "name": "报警设备"
            // },
            // {
            //     "value": results[1].counts,
            //     "name": "离线设备"
            // }]
        }
    })


    var theChart = echarts.init(document.getElementById('chartsPieEqu'));
    option = {
        "backgroundColor": "RGBA(255,255,255,0)",
        "title": {
            "text": "设备详情",
            "left": "center",
            "top": '10%',
            "textStyle": {
                fontFamily: 'PingFangSC',
                "color": "#ffffff"
            }
        },
        "tooltip": {
            "trigger": "item",
            "formatter": "{b} : {c} ({d}%)"
        },
        "visualMap": {
            "show": false,
            "min": 500,
            "max": 600,
            "inRange": {}
        },
        "series": [{
            "name": "设备详情",
            "type": "pie",
            "radius": "50%",
            "selectedMode": "single",
            "selectedOffset": 10,
            "clockwise": true,
            "center": [
                "50%",
                "50%"
            ],
            "color": [
                "#43cadd",
                "#3893e5",
                "#FCC708",
                "#03B48E"
            ],
            "data": seriesData,
            "roseType": "radius"
        }]
    };
    theChart.setOption(option);
})
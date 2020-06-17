$(document).ready(async () => {

    /**默认参数 */
    var seriesData = [{
        "name": "产水泵",
        "value": 12321
    },
    {
        "name": "提升泵",
        "value": 5221
    },
    {
        "name": "鼓风机",
        "value": 2321
    },
    {
        "name": "反洗泵",
        "value": 5211
    },
    {
        "name": "排污泵",
        "value": 4211
    },
    {
        "name": "膜池液位",
        "value": 1242
    },
    {
        "name": "调节池液位",
        "value": 2323
    },
    {
        "name": "CWT",
        "value": 231
    },
    {
        "name": "产水泵",
        "value": 212
    },
    {
        "name": "回流泵",
        "value": 1221
    }
    ];

    await $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'http://39.99.213.143:8888/dash/getAlarmDeviceCategory',
        success: (results) => {
            seriesData = []
            console.log(results)
            results.forEach(item => {
                if (item.name != null) {
                    let data = {
                        name: item.name,
                        value: item.total
                    }
                    seriesData.push(data)
                }
            })
        }
    })


    var theChart = echarts.init(document.getElementById('chartsPieAlarm'));
    option = {
        "backgroundColor": "RGBA(0,0,0,0)",
        "color": [
            "#00ffff",
            "#00cfff",
            "#006ced",
            "#ffe000",
            "#ffa800",
            "#ff5b00",
            "#ff3000",
            "#FF6666",
            "#0066CC",
            "#FFFFCC"
        ],
        "title": {
            "text": "",
            "left": "66%",
            "top": "8%",
            "text": "设备报警详情",
            "textStyle": {
                "color": "#fff"
            }
        },
        "legend": [{
            "orient": "vertical",
            "right": "20",
            "top": "middle",
            "data": [
                "产水泵",
                "进水泵1",
                "进水泵2",
                "鼓风机",
                "排污泵"
            ],
            "textStyle": {
                "color": "#fff",
                "fontSize": 12
            }
        },
        {
            "orient": "vertical",
            "right": "100",
            "top": "middle",
            "data": [
                "膜压负压传感器",
                "搅拌机",
                "CWT",
                "风压传感器",
                "回流泵"
            ],
            "textStyle": {
                "color": "#fff",
                "fontSize": 12
            }
        }
        ],
        "series": [{
            "name": "占比",
            "type": "pie",
            "radius": [
                "60%",
                "75%"
            ],
            "center": [
                "25%",
                "50%"
            ],
            "avoidLabelOverlap": false,
            "itemStyle": {
                "normal": {
                    "label": {
                        "show": false
                    },
                    "labelLine": {
                        "show": false
                    },
                    "shadowBlur": 40,
                    "shadowColor": "rgba(40, 40, 40,0.3)"
                }
            },
            "label": {
                "normal": {
                    "show": false,
                    "position": "center"
                },
                "emphasis": {
                    "show": true,
                    "formatter": function (param) {
                        // return param.name + '\n' + param.percent.toFixed(0) + '%';
                        return '报警统计：' + param.name + '\n\n' + param.value + ' 次';
                    },
                    "textStyle": {
                        "fontSize": "20",
                        "fontWeight": "100"
                    }
                }
            },
            "labelLine": {
                "normal": {
                    "show": true
                }
            },
            "data": seriesData
        }]
    };
    theChart.setOption(option);
})
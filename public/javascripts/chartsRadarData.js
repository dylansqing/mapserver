$(document).ready(function () {

    /**默认参数 */
    var seriesData = [
        [92, 69, 65, 52, 70, 40, 80]
    ];


    var theChart = echarts.init(document.getElementById('chartsRadar'));
    option = {
        "backgroundColor": "RGBA(0,0,0,0)",
        "title": {
            "text": "",
            "left": "39%",
            "top": "5%",
            "text": "水质详情",
            "textStyle": {
                "color": "#fff",
                fontFamily: 'PingFangSC'
            }
        },
        "normal": {
            "top": 200,
            "left": 400,
            "width": 600,
            "height": 900,
            "zIndex": 6,
            "backgroundColor": ""
        },
        "color": [
            "rgba(245, 166, 35, 1)",
            "rgba(19, 173, 255, 1)"
        ],
        "tooltip": {
            "show": true,
            "trigger": "item"
        },
        "legend": {
            "show": true,
            "icon": "circle",
            "top": "5%",
            "orient": "vertical",
            "left": "9%",
            "textStyle": {
                "fontSize": 14,
                "color": "#fff"
            },
            "data": [
                "一级A",
                "实际"
            ]
        },
        "radar": {
            "center": [
                "50%",
                "63%"
            ],
            "radius": "70%",
            "startAngle": 90,
            "splitNumber": 4,
            "shape": "polygon",
            "name": {
                "textStyle": {
                    "color": "#fff",
                    "fontSize": 12
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                    "color": "#0d6dba",
                    "opacity": 0.1
                }
            },
            "axisLabel": {
                "show": false,
                "fontSize": 12,
                "color": "#fff",
                "fontWeight": "normal"
            },
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#4f8bbe",
                    "opacity": 1
                }
            },
            "splitLine": {
                "lineStyle": {
                    "color": "#4f8bbe",
                    "opacity": 0.5
                }
            },
            "indicator": [{
                    "name": "COD",
                    "max": 100
                },
                {
                    "name": "氨氮",
                    "max": 100
                },
                {
                    "name": "总磷",
                    "max": 100
                },
                {
                    "name": "总氮",
                    "max": 100
                },
                {
                    "name": "pH",
                    "max": 100
                }
            ]
        },
        "series": [{
                "name": "一级A",
                "type": "radar",
                "symbol": "circle",
                "symbolSize": 2,
                "areaStyle": {
                    "normal": {
                        "color": "rgba(245, 166, 35, 0.4)"
                    }
                },
                "itemStyle": {
                    "color": "rgba(245, 166, 35, 1)",
                    "borderColor": "rgba(245, 166, 35, 0.3)",
                    "borderWidth": 3
                },
                "lineStyle": {
                    "normal": {
                        "type": "dashed",
                        "color": "rgba(245, 166, 35, 1)",
                        "width": 2
                    }
                },
                "data": [
                    [
                        60,
                        60,
                        60,
                        60,
                        60,
                        60,
                        60
                    ]
                ]
            },
            {
                "name": "实际",
                "type": "radar",
                "symbol": "circle",
                "symbolSize": 2,
                "itemStyle": {
                    "normal": {
                        "color": "rgba(19, 173, 255, 1)",
                        "borderColor": "rgba(19, 173, 255, 0.4)",
                        "borderWidth": 3
                    }
                },
                "areaStyle": {
                    "normal": {
                        "color": "rgba(19, 173, 255, 0.5)"
                    }
                },
                "lineStyle": {
                    "normal": {
                        "color": "rgba(19, 173, 255, 1)",
                        "width": 2,
                        "type": "dashed"
                    }
                },
                "data": seriesData
            }
        ]
    };
    theChart.setOption(option);
})
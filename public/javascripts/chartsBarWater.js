$(document).ready(() => {

    /**默认参数 */
    var xAxisData = [];
    var seriesData = [];
    var setData = async () => {
        await $.ajax({
            type: 'GET',
            datatype: 'json',
            url: 'http://39.99.213.143:8888/dash/getHistoryWaterCumulative',
            success: (results) => {
                let data = results[0]
                // console.log(data)
                seriesData = [];
                xAxisData = ["启蒙", "平略", "茅坪", "平秋", "新化", "大同", "钟灵", "铜鼓", "长岭"];
                let keys = Object.keys(data)
                keys.forEach((item) => {
                    seriesData.push(data[item])
                })
                // console.log(seriesData)
            },
            error: (err) => {
                xAxisData = ["四川", "贵州", "重庆", "河南", "陕西", "广东", "河北", "湖北", "湖南", "广西", "福建", "云南"];
                seriesData = [300, 450, 770, 203, 255, 188, 133, 356, 281, 470, 201, 490];
            }
        })

        var theChart = echarts.init(document.getElementById('chartsBarWater'));
        option = {
            backgroundColor: "RGBA(0,0,0,0)",
            title: {
                "text": "出水累计量",
                "left": "center",
                "top": 20,
                "textStyle": {
                    "fontWeight": "bold",
                    "color": "#ffffff"
                }
            },
            tooltip: {
                "trigger": "axis",
                "axisPointer": {
                    "type": "shadow"
                }
            },
            grid: {
                "top": "15%",
                "right": "1%",
                "left": "8%",
                "bottom": "12%"
            },
            xAxis: [{
                "type": "category",
                "data": xAxisData,
                "axisLine": {
                    "lineStyle": {
                        "color": "rgba(255,255,255,0.12)"
                    }
                },
                "axisLabel": {
                    "margin": 10,
                    "color": "#e2e9ff",
                    "textStyle": {
                        "fontSize": 14
                    }
                }
            }],
            yAxis: [{
                "splitNumber": 3,
                "axisLabel": {
                    "formatter": "{value}",
                    "color": "#e2e9ff"
                },
                "axisLine": {
                    "show": false
                },
                "splitLine": {
                    "show": false,
                    "lineStyle": {
                        "color": "#233e64"
                    }
                }
            }],
            series: [{
                "type": "bar",
                data: seriesData,
                "barWidth": "20px",
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 0,
                            "y2": 1,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "rgba(0,244,255,1)"
                            },
                            {
                                "offset": 1,
                                "color": "rgba(0,77,167,1)"
                            }
                            ]
                        },
                        "barBorderRadius": [
                            30,
                            30,
                            30,
                            30
                        ],
                        "shadowColor": "rgba(0,160,221,1)",
                        "shadowBlur": 4
                    }
                }
            }, {
                "type": "line",
                smooth: true,
                "data": seriesData,
                "barWidth": "20px",
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 0,
                            "y2": 1,
                            // "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "rgba(0,244,255,1)"
                            },
                            {
                                "offset": 1,
                                "color": "rgba(0,77,167,1)"
                            }
                            ]
                        },
                        "barBorderRadius": [
                            30,
                            30,
                            30,
                            30
                        ],
                        "shadowColor": "rgba(0,160,221,1)",
                        "shadowBlur": 4
                    }
                }
            }]
        };
        theChart.setOption(option);
    }
    setData()
    setInterval(setData, 5000)
})
$(document).ready(() => {

    var setData = async () => {
        /**默认参数 */
        var dataArr = 839;

        await $.ajax({
            type: 'GET',
            datatype: 'JSON',
            url: 'http://39.99.213.143:8888/dash/getRealTimeWaterFlow',
            success: (results) => {
                // console.log(results)
                dataArr = results.data
            },
            error: (err) => {
                console.log(err)
            }
        })

        var theChart = echarts.init(document.getElementById('chartsGaugeData'));
        var colorSet = {
            color: '#468EFD'
        };
        option = {
            "backgroundColor": "RGBA(0,0,0,0)",
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [{
                name: "内部进度条",
                type: "gauge",
                center: ['50%', '63%'],
                radius: '55%',
                min: 0, //最小刻度
                max: 100, //最大刻度
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        color: [
                            [dataArr / 100, colorSet.color],
                            [1, "#111F42"]
                        ],
                        width: 2
                    }
                },
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,

                },
                splitLine: {
                    show: false,
                },
                itemStyle: {
                    show: false,
                },
                detail: {
                    formatter: function (value) {
                        if (value !== 0) {
                            var num = Math.round(value);
                            return parseInt(num).toFixed(1) + " m3";
                        } else {
                            return 0;
                        }
                    },
                    offsetCenter: [0, 90],
                    textStyle: {
                        padding: [0, 0, 0, 0],
                        fontSize: 18,
                        fontWeight: '700',
                        color: colorSet.color
                    }
                },
                title: { //标题
                    show: true,
                    offsetCenter: [0, '-196%'], // x, y，单位px
                    textStyle: {
                        color: "#fff",
                        fontSize: 18, //表盘上的标题文字大小
                        fontWeight: 400,
                        fontWeight: 'bold',
                        fontFamily: 'PingFangSC'
                    }
                },
                data: [{
                    name: "实时出水量",
                    value: dataArr
                }],
                pointer: {
                    show: true,
                    length: '75%',
                    radius: '20%',
                    width: 10, //指针粗细
                },
                animationDuration: 4000,
            },
            {
                name: '外部刻度',
                type: 'gauge',
                center: ['50%', '63%'],
                radius: '80%',
                min: 0, //最小刻度
                max: 100, //最大刻度
                splitNumber: 10, //刻度数量
                startAngle: 225,
                endAngle: -45,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: [
                            [1, 'rgba(255,255,255,0)'] //内环框线
                        ]
                    }
                }, //仪表盘轴线
                axisLabel: {
                    show: true,
                    color: '#4d5bd1',
                    distance: 25,
                    formatter: function (v) {
                        switch (v + '') {
                            case '0':
                                return '0';
                            case '100':
                                return '100';
                            case '200':
                                return '200';
                            case '300':
                                return '300';
                            case '400':
                                return '400';
                            case '500':
                                return '500';
                            case '600':
                                return '600';
                            case '700':
                                return '700';
                            case '800':
                                return '800';
                            case '900':
                                return '900';
                            case '1000':
                                return '1000';
                        }
                    }
                }, //刻度标签。
                axisTick: {
                    show: true,
                    splitNumber: 7,
                    lineStyle: {
                        color: colorSet.color, //用颜色渐变函数不起作用
                        width: 1,
                    },
                    length: -8
                }, //刻度样式
                splitLine: {
                    show: true,
                    length: -20,
                    lineStyle: {
                        color: colorSet.color, //用颜色渐变函数不起作用
                    }
                }, //分隔线样式
                detail: {
                    show: false
                },
                pointer: {
                    show: false
                }
            },
            ]
        };
        theChart.setOption(option);
    }
    setData()
    setInterval(setData, 5000)
})
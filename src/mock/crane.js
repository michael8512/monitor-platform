const Mock = require('mockjs');

// 吊塔

// 监控覆盖统计
Mock.mock(/\/api\/crane\/getStatistics/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: {
        projectNum: 60,
        installed: 50,
        NotInstalled: 10,
        percentage: '60%'

    },
});
// 监控设备概况
Mock.mock(/\/api\/crane\/getEquipmentList/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: {
        totle:15,
        inline:10,
        outLine: 5,
        percentage: 99
    },
});
// 今日运行分析
Mock.mock(/\/api\/crane\/getTodayRun/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: {
        totalNum: 30,
        run : 29,
        alarm: 10,
        time: 105,
        weight: 29,
        heigh: 60
    },
});
// 核载状态
Mock.mock(/\/api\/crane\/getStatus/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: {
        nomal: 2,
        high: 2,
        low:2,
        middle:2
    },
});

// 利用等级
Mock.mock(/\/api\/crane\/getLevel/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: {
        low: 2,
        middle:2,
        nomal:2
    },
});
// 工作级别
Mock.mock(/\/api\/crane\/getWorkLevel/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: [2,2,2,2,2,2,2]
});

// 监管情况
Mock.mock(/\/api\/crane\/getRegulatorySituatio/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: {
        compositeIndex: 60,
        situationList: [60 , 60 ,60, 60]
    },
});
// 报警排行
Mock.mock(/\/api\/crane\/getTop/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: [
        {
            title:'1号吊塔',
            area:'xxx辖区',
            num: 29
        },{
            title:'5号吊塔',
            area:'xxx辖区',
            num: 11 
        },{
            title:'9号吊塔',
            area:'xxx辖区',
            num: 5
        },{
            title:'6号吊塔',
            area:'xxx辖区',
            num: 4
        },{
            title:'8号吊塔',
            area:'xxx辖区',
            num: 4
        },
    ]
});
// 报警趋势
Mock.mock(/\/api\/crane\/alarmTrend/, 'get', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: [
        { date: '5-20', value: 40 },
        { date: '5-21', value: 60 },
        { date: '5-22', value: 22 },
        { date: '5-23', value: 85 },
        { date: '5-24', value: 50 },
        { date: '5-25', value: 40 },
    ]
});
// 消息中心
Mock.mock(/\/api\/crane\/getMessageGroup/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: [
        {
            title: '1号吊塔出现xxx问题',
            time: '11.19'
        }, {
            title: '2号吊塔出现xxx问题',
            time: '11.29'
        }, {
            title: '3号吊塔出现xxx问题',
            time: '11.29'
        }, {
            title: '4号吊塔出现xxx问题',
            time: '11.29'
        }, {
            title: '5号吊塔出现xxx问题',
            time: '11.29'
        }, {
            title: '6号吊塔出现xxx问题',
            time: '11.29'
        },
    ]
});
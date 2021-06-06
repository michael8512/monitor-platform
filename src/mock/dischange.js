const Mock = require('mockjs');

// 卸料

// 监控覆盖统计
Mock.mock(/\/api\/dischange\/getStatistics/, 'post', {
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
Mock.mock(/\/api\/dischange\/getEquipmentList/, 'post', {
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
// 
Mock.mock(/\/api\/dischange\/getLine/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: [100, 100, 100, 300]
});
// 核载状态
// Mock.mock(/\/api\/dischange\/getStatus/, 'post', {
//     status: "success",
//     message: "成功!",
//     code: null,
//     success: true,
//     data: {
//         nomal: 2,
//         high: 2,
//         low:2,
//         middle:2
//     },
// });

// // 利用等级
// Mock.mock(/\/api\/dischange\/getLevel/, 'post', {
//     status: "success",
//     message: "成功!",
//     code: null,
//     success: true,
//     data: {
//         low: 2,
//         middle:2,
//         nomal:2
//     },
// });
// // 工作级别
// Mock.mock(/\/api\/dischange\/getWorkLevel/, 'post', {
//     status: "success",
//     message: "成功!",
//     code: null,
//     success: true,
//     data: [2,2,2,2,2,2,2]
// });

// // 监管情况
// Mock.mock(/\/api\/dischange\/getRegulatorySituatio/, 'post', {
//     status: "success",
//     message: "成功!",
//     code: null,
//     success: true,
//     data: {
//         compositeIndex: 60,
//         situationList: [60 , 60 ,60, 60]
//     },
// });
// 报警排行
Mock.mock(/\/api\/dischange\/getTop/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: [
        {
            title:'项目名称',
            times:'29',
            during: '3min',
            percentage: '80%'
        },{
            title:'项目名称',
            times:'29',
            during: '3min',
            percentage: '80%'
        },{
            title:'项目名称',
            times:'29',
            during: '3min',
            percentage: '80%'
        },{
            title:'项目名称',
            times:'29',
            during: '3min',
            percentage: '80%'
        },{
            title:'项目名称',
            times:'29',
            during: '3min',
            percentage: '80%'
        },
    ]
});
// 报警趋势
Mock.mock(/\/api\/dischange\/alarmTrend/, 'get', {
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
Mock.mock(/\/api\/dischange\/getMessageGroup/, 'post', {
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
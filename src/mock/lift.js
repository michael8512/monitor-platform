const Mock = require('mockjs');

// 升降机

// 监控覆盖统计
Mock.mock(/\/api\/lift\/getStatistics/, 'post', {
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
// 消息中心
Mock.mock(/\/api\/lift\/getMessageGroup/, 'post', {
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
        },{
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
// 报警排行
Mock.mock(/\/api\/lift\/getTop/, 'post', {
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
Mock.mock(/\/api\/lift\/alarmTrend/, 'get', {
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
// 监管概况雷达图
Mock.mock(/\/api\/lift\/getRegulatory/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: [
        {
            value: [4200, 13000, 7400, 35000, 28000],
            name: '监管概况'
        }
    ],
});
// 综合指数
Mock.mock(/\/api\/lift\/getCompositeIndex/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: {
        composite : 95,
        safety: 65,
        used: 65,
        construct: 65,
        manage: 65
    }
});
// 运行统计
Mock.mock(/\/api\/lift\/getRun/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: [
        {
            title:'升降机总数',
            num:'6',
            unit:'台'
        },{
            title:'累计工作循环',
            num:'6',
            unit:'次'
        },{
            title:'累计运行高度',
            num:'6',
            unit:'m'
        },{
            title:'累计工作时间',
            num:'6',
            unit:''
        },{
            title:'累计运载重量',
            num:'6',
            unit:'kg'
        },{
            title:'累积报警次数',
            num:'6',
            unit:'次'
        },
    ]
});
// 工作级别
Mock.mock(/\/api\/lift\/getWorkLevel/, 'post', {
    status: "success",
    message: "成功!",
    code: null,
    success: true,
    data: [2,2,2,2,2,2,2]
});
// 利用等级
Mock.mock(/\/api\/lift\/getLevel/, 'post', {
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
// 荷载状态
Mock.mock(/\/api\/lift\/getStatus/, 'post', {
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



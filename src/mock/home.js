const Mock = require('mockjs');

// 项目统计、项目类型、项目分布
Mock.mock(/\/api\/all\/getProjectCount/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    // total: 30,
    // intelligence: 22,
    // normal: 8,
    // money: 100
    "projectCount": 80,
    "priceSum": "533590.46",
    "projectTypeCountList": [
      {
        "projectType": "房建",
        "typeCount": 79
      },
      {
        "projectType": "市政",
        "typeCount": 1
      }
    ],
    "projectAttributeList": [
      {
        "projectAttribute": "暂无分类",
        "attributeCount": 24
      },
      {
        "projectAttribute": "其他类型",
        "attributeCount": 39
      },
      {
        "projectAttribute": "智慧工地",
        "attributeCount": 17
      }
    ]

  }
});

// 报警统计
Mock.mock(/\/api\/all\/getAlarmInfo/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "today":3,
    "week":3,
    "month":3,
    "projectAlarm":[
      {
        "projectName":"溧阳市东门旧城棚户区改造项目4-2地块",
        "type":"房建",
        "alarm":1
      },
      {
        "projectName":"溧阳市东门旧城棚户区改造项目4-2地块",
        "type":"水务",
        "alarm":2
      }
    ]
  }
});

// 项目动态
Mock.mock(/\/api\/all\/dynamic/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      "id": 1,
      "text": "根据《xxx规定》从2021年5月1日起…",
      "type": '通知通告',
      "date": '2021-5-1',
    },
    {
      "id": 2,
      "text": "根据《xxx规定》从2021年5月1日起…",
      "type": '科学施工',
      "date": '2021-5-1',
    },
    {
      "id": 3,
      "text": "根据《xxx规定》从2021年5月1日起…",
      "type": '政策文件',
      "date": '2021-5-1',
    },
    {
      "id": 4,
      "text": "根据《xxx规定》从2021年5月1日起…",
      "type": '通知通告',
      "date": '2021-5-1',
    },
  ]
});

// 项目类型
Mock.mock(/\/api\/all\/getConstructionMilepost/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { name: '项目一', total: 60 },
    { name: '项目二', total: 78 },
    { name: '项目三', total: 24 },
    { name: '项目四', total: 65 },
    { name: '项目五', total: 45 },
    { name: '项目六', total: 85 },
  ]
});


// 7.	设备布点图
Mock.mock(/\/api\/all\/getProjectBaseInfo/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      "name": "溧阳市东门旧城棚户区改造项目4-2地块",
      "jsdw": null,
      "jldw": null,
      "sgdw": null,
      "price": "37823.23",
      "address": "原东门污水厂地块",
      "longitude": "119.503",
      "latitude": "31.431"
    },
    {
      "name": "溧阳市燕山新区37#地块开发建设项目——溧阳市燕山新区37#地块一期（时代天悦）4#~12#住宅楼、13#、14#变电站及地下车库和相关附属工程 ",
      "jsdw": null,
      "jldw": null,
      "sgdw": null,
      "price": "7338",
      "address": "溧阳市燕山新区锦绣路与燕湖路交口南150米",
      "longitude": "119.504",
      "latitude": "31.389"
    }
  ]

});


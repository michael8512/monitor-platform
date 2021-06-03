const Mock = require('mockjs');

// 项目概况
Mock.mock(/\/api\/home\/getConstructionSurvey/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    total: 30,
    intelligence: 22,
    normal: 8,
    money: 100
  }
});

// 项目动态
Mock.mock(/\/api\/home\/getConstructionDynamic/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      "id": 1,
      "name": "项目名称",
      "type": '项目类型',
      "total": 29,
    },
    {
      "id": 2,
      "name": "项目名称",
      "type": '项目类型',
      "total": 28,
    },
    {
      "id": 3,
      "name": "项目名称",
      "type": '项目类型',
      "total": 25,
    },
    {
      "id": 4,
      "name": "项目名称",
      "type": '项目类型',
      "total": 22,
    },
    {
      "id": 5,
      "name": "项目名称",
      "type": '项目类型',
      "total": 19,
    },
    {
      "id": 6,
      "name": "项目名称",
      "type": '项目类型',
      "total": 15,
    },
    // {
    //   "id": 7,
    //   "name": "项目名称",
    //   "type": '项目类型',
    //   "total": 9,
    // },
  ]
});

// 项目动态
Mock.mock(/\/api\/home\/dynamic/, 'get', {
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
Mock.mock(/\/api\/home\/getConstructionMilepost/, 'get', {
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

// 项目分布
Mock.mock(/\/home\/distribution/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { type: 1, normal: 23, intelligence: 34 },
    { type: 2, normal: 65, intelligence: 21 },
    { type: 3, normal: 33, intelligence: 21 },
    { type: 4, normal: 54, intelligence: 21 },
    { type: 5, normal: 23, intelligence: 10 },
    { type: 6, normal: 53, intelligence: 12 },
  ]
});


// 项目动态
Mock.mock(/\/api\/alarm/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      type: 'tower-crane',
      message: '超重9',
      date: '2020-12-14',
    },
    {
      type: 'frame',
      message: '超重7',
      date: '2020-12-14',
    },
    {
      type: 'lift',
      message: '超重4',
      date: '2020-12-14',
    },
    {
      type: 'lift',
      message: '超重sda',
      date: '2020-12-14',
    },
  ]
});

// 7.	设备布点图
Mock.mock(/\/api\/home\/deviceDistribution/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    car: 41, //在场车辆
    person: 54, //在场人员
  }
});

// 7.	设备布点图
Mock.mock(/\/api\/home\/deviceList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    [120.2, 30.5],
    [120.52, 31.5],
  ]
});


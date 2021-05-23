const Mock = require('mockjs');

// 项目概况
Mock.mock(/\/api\/construction\/getConstructionSurvey/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "id": 5,
    "name": "test",
    "startDate": "2020-11-27",
    "endDate": "2020-11-30",
    "area": "1565",
    "height": 15.0,
    "layer": 5,
    "effect": "ceshi"
  }
});

// 项目动态
Mock.mock(/\/api\/construction\/getConstructionDynamic/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      "id": 1,
      "date": "2020-10-27",
      "dynamic": "测试1235565646",
    },
    {
      "id": 2,
      "date": "2020-11-27",
      "dynamic": "dfaf2131312dfsf多舒服的方式asfada",
    },
    {
      "id": 3,
      "date": "2020-11-27",
      "dynamic": "d撒打算打算打式asfada",
    },
    {
      "id": 5,
      "date": "2020-11-27",
      "dynamic": "dfafasfada",
    }
  ]
});

// 里程碑
Mock.mock(/\/api\/construction\/getConstructionMilepost/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      id: 1,
      date: '2020-06-12',
      title: '局EPC工程总承包管理三年推进会',
    },
    {
      id: 1,
      date: '2020-08-25',
      title: '会展区最后一根框架',
    },
    {
      id: 1,
      date: '2020-12-19',
      title: '省住建设厅，建设工会研讨会',
    },
    {
      id: 1,
      date: '2021-01-12',
      title: '江北新区质安站开展专题党课',
    },
    {
      id: 1,
      date: '2021-03-23',
      title: '会展及会议宴会钢结构封顶',
    },
    {
      id: 1,
      date: '2021-08-19',
      title: '新区公建中心，沿山项目在扬子国际会议中心举办',
    },
  ]
});

// 环境监测
Mock.mock(/\/construction\/getEnvironmentalMonitoring/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "id": 5,
    "pm10": "49.4",
    "pm25": "38.4",
    "noise": "44.21",
    "windSpeed": "2",
    "humidity": 64,
    "temper": 35,
  },
});

// 天气预报
Mock.mock(/\/api\/construction\/getWeatherFuture/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      "id": 2,
      "day": "11-11",
      "icon": "100",
      "text": "阴",
      "tempMax": "12",
      "tempMin": "7"
    },
    {
      "id": 3,
      "day": "11-12",
      "icon": "101",
      "text": "阴",
      "tempMax": "12",
      "tempMin": "7"
    },
    {
      "id": 1,
      "day": "11-23",
      "icon": "102",
      "text": "qi",
      "tempMax": "12",
      "tempMin": "7"
    },
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

// 工期倒计时和安全施工累计时间
Mock.mock(/\/api\/construction\/getCountdown/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    countdown: 341, //工期倒计时
    cumulative: 254, //安全施工累计时间
  }
});

// 7.	人车概况
Mock.mock(/\/api\/construction\/getPersoncar/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    car: 41, //在场车辆
    person: 54, //在场人员
  }
});

// 8.	设备安全状态
Mock.mock(/\/api\/construction\/getDeviceAlarm/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "towerCrane": 2,
    "transom": 1,
    "elevator": 1,
    "alarm": [
      {
        "data": "2020-12-14",
        "alarm": "体量过重",
        "deviceName": "塔吊"
      },
      {
        "data": "2020-12-14",
        "alarm": "体量过重",
        "deviceName": "塔吊"
      },
      {
        "data": "2020-12-15",
        "alarm": "转角位移",
        "deviceName": "升降机"
      }
    ]
  }
});
// 9. 视频获取
Mock.mock(/\/api\/construction\/video\/getVideo/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "video": "/construction/WIN_20201215_18_06_27_Pro.mp4"
  }
});

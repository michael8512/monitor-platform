
const Mock = require('mockjs');

// 视频监控汇总
Mock.mock(/\/api\/onDuty\/weather/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: [
    { 
      id: 0,
      name: 'PM2.5',
      value: 40,
      unit: 'ug/m³'
    },
    { 
      id: 2,
      name: 'PM10',
      value: 43,
      unit: 'ug/m³'
    },
    { 
      id: 3,
      name: '空气质量',
      value: '优',
      unit: ''
    },
    { 
      id: 4,
      name: '温度',
      value: 25,
      unit: '℃'
    },
    { 
      id: 5,
      name: '空气质量',
      value: '优',
      unit: ''
    },
    { 
      id: 6,
      name: '温度',
      value: 25,
      unit: '℃'
    },
    { 
      id: 7,
      name: 'AQI指数',
      value: '',
      unit: ''
    },
  ]
});
// 视频监控汇总
Mock.mock(/\/api\/onDuty\/overTimes/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: [
    { 
      id: 0,
      name: '今日',
      value: 45,
      type: 'day'
    },
    { 
      id: 2,
      name: '本周',
      value: 50,
      type: 'week'
    },
    { 
      id: 3,
      name: '本月',
      value: 65,
      type: 'month'
    },
  ]
});

// 设备状态统计
Mock.mock(/\/api\/onDuty\/statics/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: {
    total: 67,
    online: 22,
    offline: 3,
    percent: '65%',
  }
});


// 设备分布情况
Mock.mock(/\/api\/camera\/distribution/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { name: '辖区一', total: 60 },
    { name: '辖区二', total: 78 },
    { name: '辖区三', total: 24 },
    { name: '辖区四', total: 65 },
    { name: '辖区五', total: 45 },
    { name: '辖区六', total: 85 },
  ]
});

// 项目列表
Mock.mock(/\/api\/onDuty\/tableTop/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: {
    header: [
      { title: '所属项目', id: 1 },
      { title: '设备名称', id: 2 },
      { title: 'PM2.5', id: 3 },
      { title: 'PM10', id: 4 },
    ],
    value: [
      { name: '智慧工地', type: '类型', value: 12,PM10: 23,id: 1 },
      { name: '智慧工地', type: '类型', value: 12,PM10: 23,id: 2 },
      { name: '智慧工地', type: '类型', value: 12,PM10: 23,id: 3 },
      { name: '智慧工地', type: '类型', value: 12,PM10: 23,id: 4 },
      { name: '智慧工地', type: '类型', value: 12,PM10: 23,id: 5 },
    ]
  }
});

// s实时检测
Mock.mock(/\/api\/onDuty\/monitor/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: [
    { date: '1', value: 40 },
    { date: '2', value: 60 },
    { date: '3', value: 22 },
    { date: '4', value: 85 },
    { date: '5', value: 50 },
    { date: '6', value: 40 },
    { date: '7', value: 40 },
    { date: '8', value: 60 },
    { date: '9', value: 22 },
    { date: '10', value: 85 },
    { date: '11', value: 50 },
    { date: '12', value: 40 },
  ]
});

// 项目列表
Mock.mock(/\/api\/onDuty\/table/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: {
    header: [
      { title: '项目名称', id: 1 },
      { title: '项目类型', id: 2 },
      { title: '超标次数', id: 3 },
    ],
    value: [
      { name: '智慧工地', type: '类型', value: 12, id: 1 },
      { name: '智慧工地', type: '类型', value: 12, id: 2 },
      { name: '智慧工地', type: '类型', value: 12, id: 3 },
      { name: '智慧工地', type: '类型', value: 12, id: 4 },
      { name: '智慧工地', type: '类型', value: 12, id: 5 },
    ]
  }
});
// 项目列表
Mock.mock(/\/api\/onDuty\/map/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: [{
    "lng": 120.191031,
    "lat": 30.0988585,
    "count": 10
  }, {
    "lng": 120.479475,
    "lat": 30.0937945,
    "count": 39
  }, {
    "lng": 120.415599,
    "lat": 30.0956902,
    "count": 40
  }, {
    "lng": 120.355675,
    "lat": 30.0870089,
    "count": 41
  }, {
    "lng": 120.295267,
    "lat": 30.0987171,
    "count": 42
  }, {
    "lng": 120.323634,
    "lat": 30.0911692,
    "count": 43
  }, {
    "lng": 120.692769,
    "lat": 40.173307,
    "count": 44
  }, {
    "lng": 120.287888,
    "lat": 30.0928531,
    "count": 45
  }, {
    "lng": 120.386502,
    "lat": 30.0922747,
    "count": 46
  }, {
    "lng": 120.236773,
    "lat": 40.218341,
    "count": 47
  }, {
    "lng": 120.490636,
    "lat": 30.0804253,
    "count": 48
  }, {
    "lng": 120.391095,
    "lat": 30.0925791,
    "count": 49
  }, {
    "lng": 120.472402,
    "lat": 30.0769178,
    "count": 50
  }, {
    "lng": 120.38657,
    "lat": 30.0956731,
    "count": 51
  }, {
    "lng": 120.427536,
    "lat": 30.0943671,
    "count": 52
  }, {
    "lng": 120.374547,
    "lat": 30.0967588,
    "count": 53
  }, {
    "lng": 120.380383,
    "lat": 30.0871634,
    "count": 54
  }, {
    "lng": 120.376092,
    "lat": 30.0965485,
    "count": 55
  }, {
    "lng": 120.352424,
    "lat": 30.091811,
    "count": 56
  }, {
    "lng": 120.020157,
    "lat": 40.348526,
    "count": 57
  }, {
    "lng": 120.416201,
    "lat": 30.0951736,
    "count": 58
  }, {
    "lng": 120.405392,
    "lat": 30.0908738,
    "count": 59
  }, {
    "lng": 120.49238,
    "lat": 30.0926248,
    "count": 60
  }, {
    "lng": 120.389282,
    "lat": 30.0988391,
    "count": 61
  }, {
    "lng": 120.396683,
    "lat": 30.0923487,
    "count": 62
  }, {
    "lng": 120.41718,
    "lat": 30.0905213,
    "count": 63
  }, {
    "lng": 120.321512,
    "lat": 30.0913192,
    "count": 64
  }, {
    "lng": 120.260028,
    "lat": 40.03353,
    "count": 65
  }, {
    "lng": 120.394846,
    "lat": 30.0911168,
    "count": 66
  }, {
    "lng": 120.374767,
    "lat": 30.096608,
    "count": 67
  }, {
    "lng": 120.6841,
    "lat": 30.0909762,
    "count": 68
  }, {
    "lng": 120.3838,
    "lat": 30.095811,
    "count": 69
  }, {
    "lng": 120.39243,
    "lat": 40.01143,
    "count": 70
  }, {
    "lng": 120.661912,
    "lat": 40.121137,
    "count": 71
  }, {
    "lng": 120.333056,
    "lat": 30.090123,
    "count": 72
  }, {
    "lng": 120.484839,
    "lat": 30.0881729,
    "count": 73
  }, {
    "lng": 120.360923,
    "lat": 30.0935745,
    "count": 74
  }, {
    "lng": 120.408531,
    "lat": 30.0953194,
    "count": 75
  }, {
    "lng": 120.417916,
    "lat": 30.0954029,
    "count": 76
  }, {
    "lng": 120.412215,
    "lat": 30.0992282,
    "count": 77
  }, {
    "lng": 120.181532,
    "lat": 40.048762,
    "count": 78
  }, {
    "lng": 120.434848,
    "lat": 40.070463,
    "count": 79
  }, {
    "lng": 120.385039,
    "lat": 30.0956937,
    "count": 80
  }, {
    "lng": 120.755067,
    "lat": 30.0854499,
    "count": 81
  }, {
    "lng": 120.396061,
    "lat": 30.0912841,
    "count": 82
  }, {
    "lng": 120.474303,
    "lat": 30.0971398,
    "count": 83
  }, {
    "lng": 120.376262,
    "lat": 30.085811,
    "count": 84
  }, {
    "lng": 120.403783,
    "lat": 30.0954469,
    "count": 85
  }, {
    "lng": 120.339136,
    "lat": 30.0729159,
    "count": 86
  }, {
    "lng": 120.240159,
    "lat": 30.0947003,
    "count": 87
  }, {
    "lng": 117.107541,
    "lat": 40.141457,
    "count": 88
  }, {
    "lng": 120.341813,
    "lat": 40.078786,
    "count": 89
  }, {
    "lng": 120.320648,
    "lat": 30.0706455,
    "count": 90
  }, {
    "lng": 120.402566,
    "lat": 30.0960873,
    "count": 91
  }, {
    "lng": 120.849261,
    "lat": 40.402999,
    "count": 92
  }, {
    "lng": 120.521064,
    "lat": 30.0834187,
    "count": 93
  }, {
    "lng": 120.329942,
    "lat": 30.0925327,
    "count": 94
  }, {
    "lng": 120.479852,
    "lat": 30.0974856,
    "count": 95
  }, {
    "lng": 120.399185,
    "lat": 30.0925736,
    "count": 96
  }, {
    "lng": 120.193166,
    "lat": 30.0911953,
    "count": 1
  }, {
    "lng": 120.400916,
    "lat": 30.0870614,
    "count": 2
  }, {
    "lng": 120.518041,
    "lat": 30.0956615,
    "count": 3
  }, {
    "lng": 120.388981,
    "lat": 30.0997716,
    "count": 4
  }, {
    "lng": 120.285852,
    "lat": 30.0863497,
    "count": 5
  }, {
    "lng": 120.294167,
    "lat": 30.0884599,
    "count": 6
  }, {
    "lng": 120.394235,
    "lat": 30.0996845,
    "count": 7
  }, {
    "lng": 120.32471,
    "lat": 30.0970486,
    "count": 8
  }, {
    "lng": 120.496828,
    "lat": 30.099335,
    "count": 9
  }, {
    "lng": 120.482534,
    "lat": 30.0934086,
    "count": 10
  }, {
    "lng": 120.454662,
    "lat": 30.0974981,
    "count": 11
  }, {
    "lng": 120.387076,
    "lat": 30.087631,
    "count": 12
  }, {
    "lng": 120.433341,
    "lat": 30.092803,
    "count": 13
  }, {
    "lng": 120.382196,
    "lat": 30.0941606,
    "count": 14
  }]
});

const Mock = require('mockjs');
const PIC = require('../pages/camera/images/demo.png')
// 视频监控汇总
Mock.mock(/\/api\/device\/summary/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "deviceCoverageProject": 1, //设备监控覆盖项目
    "coverage": 50,      //覆盖率
    "project": 2		//项目总数
  }
});

// 设备状态统计
Mock.mock(/\/api\/device\/statusStatistics/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "coverage": 50,   //在线率
    "deviceOn": 30,	  //设备在线数
    "device": 1    //设备总数

  }
});


// 设备分布情况
Mock.mock(/\/api\/device\/distribution/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      "deviceCount": 50,         //设备数
      "projectName": "项目一"   //项目名称
    },
    {
      "deviceCount": 70,
      "projectName": "项目二"
    }

    // { name: '辖区一', total: 60 },
    // { name: '辖区二', total: 78 },
    // { name: '辖区三', total: 24 },
    // { name: '辖区四', total: 65 },
    // { name: '辖区五', total: 45 },
    // { name: '辖区六', total: 85 },
  ]
});

// 项目列表
Mock.mock(/\/api\/device\/projectList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      "deviceCount": 1,    //设备数
      "projectName": "项目一",   //项目名称
      "deviceOncount": 0	   //设备在线数
    },
    {
      "deviceCount": 0,
      "projectName": "项目二",
      "deviceOncount": 0
    }

  ]
});

// 安全帽预警
Mock.mock(/\/api\/device\/safetyHatWarning/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "06-28": 0,
    "06-27": 32,
    "06-29": 20,
    "06-24": 40,
    "06-26": 70,
    "06-25": 0
  }
});

// 安全帽预警
Mock.mock(/\/api\/device\/getVideo/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "url": "imou://open.lechange.com/7D09EEFPAGD8036/0/1?streamId=1",
    "token": "Kt_d0327d4687e348afa1c007605a7ce076"
  }
});

// 安全帽预警
Mock.mock(/\/api\/device\/workClothesWarning/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "06-28": 0,
    "06-27": 32,
    "06-29": 20,
    "06-24": 40,
    "06-26": 70,
    "06-25": 0
  }
});

// 安全帽预警
Mock.mock(/\/api\/device\/map/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    // { id: 1, type: 'camera', x: 20, y: 30 },
    // { id: 2, type: 'camera', x: 13.4, y: 40 },
    // { id: 3, type: 'camera', x: 32, y: 14 },
    // { id: 4, type: 'camera', x: 62, y: 54 },
    {
      "x": "118.46",  //经度
      "y": "32.02",  //维度
      "deviceId": 1  //设备id
    },
    {
      "x": "118.96",
      "y": "32.42",
      "deviceId": 2        
    }

  ]
});
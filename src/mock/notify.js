const Mock = require('mockjs');
const PIC = require('../pages/camera/images/demo.png')
const CAPTURE = require('../pages/notify/images/capture.png')

// 监控覆盖统计
Mock.mock(/\/api\/notify\/messageList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容'},
    { id: 2, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容'},
    { id: 3, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容'},
    { id: 4, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容'},
    { id: 5, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容'},
    { id: 6, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容'},
    { id: 7, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容'},
    { id: 18, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容'},
  ]
});

// 监控覆盖统计
Mock.mock(/\/api\/notify\/carMessageList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', car: '浙A762DE', picUrl: PIC },
    { id: 2, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', car: '浙A762DE', picUrl: PIC},
    { id: 3, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', car: '浙A762DE', picUrl: PIC},
    { id: 4, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', car: '浙A762DE', picUrl: PIC},
    { id: 5, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', car: '浙A762DE', picUrl: PIC},
    { id: 6, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', car: '浙A762DE', picUrl: PIC},
  ]
});

// 车辆违规信息
Mock.mock(/\/api\/notify\/videoAlarmList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, message: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', deviceName: '设备名称' },
    { id: 2, message: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', deviceName: '设备名称' },
    { id: 3, message: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', deviceName: '设备名称' },
    { id: 4, message: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', deviceName: '设备名称' },
    { id: 5, message: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', deviceName: '设备名称'},
    { id: 6, message: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', deviceName: '设备名称' },
  ]
});

// 车辆未冲洗设备故障报警信息
Mock.mock(/\/api\/notify\/carErrorAlarm/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', deviceName: '设备名称', picUrl: PIC },
    { id: 2, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', deviceName: '设备名称', picUrl: PIC},
    { id: 3, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', deviceName: '设备名称',  picUrl: PIC},
  ]
});

// 扬尘故障报警信息
Mock.mock(/\/api\/notify\/dustAlarm/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', picUrl: PIC },
    { id: 2, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', picUrl: PIC},
    { id: 3, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', picUrl: PIC},
  ]
});

// 扬尘自动化降尘记录
Mock.mock(/\/api\/notify\/dustClearRecord/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', date: '2021-12-13 13:24:15' },
    { id: 2, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', date: '2021-12-13 13:24:15' },
    { id: 3, text: '报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容报警记录内容', date: '2021-12-13 13:24:15' },
  ]
});

// 监控覆盖统计
Mock.mock(/\/api\/notify\/recognition/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    hatState: '已佩戴',
    clothesState: '不合格',
    picUrl: CAPTURE
  }
});

// 监控覆盖统计
Mock.mock(/\/api\/foundation\/distribution/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { group: '组织1', value1: 43, value2: 45 },
    { group: '组织2', value1: 54, value2: 74 },
    { group: '组织3', value1: 43, value2: 45 },
    { group: '组织4', value1: 32, value2: 55 },
    { group: '组织5', value1: 21, value2: 45 },
    { group: '组织6', value1: 54, value2: 65 },
  ]
});
const Mock = require('mockjs');
const PIC = require('../pages/camera/images/demo.png')
// 视频监控汇总
Mock.mock(/\/api\/safetyCheck\/statistic/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    total: 67,
    check: 64,
    uncheck: 3,
    percent: 39,
    list: [
      { label: '抽查次数', value: 23, },
      { label: '限期整改数', value: 23, },
      { label: '停工整改数', value: 23, },
      { label: '检查记录数', value: 23, },
    ]
  }
});

// 设备状态统计
Mock.mock(/\/api\/camera\/status/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    total: 67,
    cover: 22,
    percent: '65%',
  }
});


// 设备分布情况
Mock.mock(/\/api\/safetyCheck\/checkList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, text: '抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容', date: '2020-5-18 23:12:32' },
    { id: 2, text: '抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容', date: '2020-5-18 23:12:32' },
    { id: 3, text: '抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容', date: '2020-5-18 23:12:32' },
    { id: 4, text: '抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容', date: '2020-5-18 23:12:32' },
    { id: 5, text: '抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容', date: '2020-5-18 23:12:32' },
    { id: 6, text: '抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容抽查内容', date: '2020-5-18 23:12:32' },
  ]
});

// 设备分布情况
Mock.mock(/\/api\/safetyCheck\/captureList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, picUrl: PIC },
    { id: 2, picUrl: PIC },
    { id: 3, picUrl: PIC },
    { id: 4, picUrl: PIC },
  ]
});

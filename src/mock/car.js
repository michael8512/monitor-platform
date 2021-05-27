const Mock = require('mockjs');
const PIC = require('../pages/camera/images/demo.png')


// 安全帽预警
Mock.mock(/\/api\/car\/carList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, type: '类型名称', total: 3 },
    { id: 2, type: '类型名称', total: 3 },
    { id: 3, type: '类型名称', total: 3 },
    { id: 4, type: '类型名称', total: 3 },
    { id: 5, type: '类型名称', total: 3 },
    { id: 6, type: '类型名称', total: 3 },
    { id: 7, type: '类型名称', total: 3 },
  ]
});
const Mock = require('mockjs');

// 今日出勤，实时现场，出勤最多班组
Mock.mock(/\/api\/record\/maxGroup/, 'post', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "nowAttendance": 120,
    "groupName": "八局钢构",
    "groupNo": "123",
    "attendance": 140
  },
});

// 不同工种的员工在现场和出勤的人数
Mock.mock(/\api\/record\/workAttendance/, 'post', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      "nowAttendance": 3,
      "workName": "其他",
      "attendance": 13
    },
    {
      "nowAttendance": 14,
      "workName": "砌筑工",
      "attendance": 26
    },
    {
      "nowAttendance": 15,
      "workName": "起重信号工",
      "attendance": 22
    },
    {
      "nowAttendance": 6,
      "workName": "机械司机",
      "attendance": 16
    },
    {
      "nowAttendance": 18,
      "workName": "钢筋工",
      "attendance": 24
    },
    {
      "nowAttendance": 20,
      "workName": "安装钳工",
      "attendance": 28
    },
    {
      "nowAttendance": 20,
      "workName": "下水管工人",
      "attendance": 8
    },
  ]
});

// 各个班组的总人数，已到人数，未到人数
Mock.mock(/\api\/record\/groupInformation/, 'post', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      "workerCount": 37,
      "groupName": "管理班组-1",
      "absentNum": 35,
      "arriveNum": 2
    },
    {
      "workerCount": 183,
      "groupName": "桩基班组",
      "absentNum": 180,
      "arriveNum": 3
    },
    {
      "workerCount": 10,
      "groupName": "管理班组-1",
      "absentNum": 10,
      "arriveNum": 0
    },
    {
      "workerCount": 16,
      "groupName": "瓦工班组",
      "absentNum": 14,
      "arriveNum": 2
    },
    {
      "workerCount": 16,
      "groupName": "起重信号工",
      "absentNum": 14,
      "arriveNum": 2
    },
    {
      "workerCount": 6,
      "groupName": "拖拉机",
      "absentNum": 14,
      "arriveNum": 2
    }
  ]
});

// 通行管理
Mock.mock(/\api\/record\/passManager/, 'post', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    "in2": 0,
    "in1": 0,
    "in4": 2,
    "in3": 3,
    "out2": 0,
    "in6": 2,
    "out3": 0,
    "in5": 0,
    "out4": 0,
    "in8": 0,
    "out5": 0,
    "in7": 0,
    "out1": 0,
    "out6": 0,
    "out7": 0,
    "out8": 0
  }
});

// 进出场记录
Mock.mock(/\api\/record\/latestHistory/, 'post', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data:  [
    {
      "date": "2021-03-08",
      "name": "唐斌",
      "time": "17:35:24",
      "place": '黄龙体育馆',
      "picture": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F10684498305%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617888108&t=03d1607c7b88d45c219ef053e6be18f0",
      "direction": 1
    },
    {
      "date": "2021-03-08",
      "name": "尤墩功",
      "time": "17:35:06",
      "place": '钱江世纪城公园',
      "picture": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F10684498305%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617888108&t=03d1607c7b88d45c219ef053e6be18f0",
      "direction": 0
    },
    {
      "date": "2021-03-08",
      "name": "黄兴虎",
      "time": "10:42:33",
      "place": '庆春广场',
      "picture": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F10684498305%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617888108&t=03d1607c7b88d45c219ef053e6be18f0",
      "direction": 0
    },
    {
      "date": "2021-03-08",
      "name": "周杰伦",
      "time": "10:42:33",
      "place": '东门',
      "picture": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F10684498305%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617888108&t=03d1607c7b88d45c219ef053e6be18f0",
      "direction": 1
    }
  ]
});

// 劳务分布
Mock.mock(/\/api\/smartWorker\/labour/, 'post', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data:  [
    {
      "companyCode": "5434343",
      "companyName": "中建八局第三建设有限公司",
      "count": 37
    },
    {
      "companyCode": "5434343",
      "companyName": "江苏建科工程咨询有限公司",
      "count": 10
    },
    {
      "companyCode": "5434343",
      "companyName": "南京泽诚文化发展有限公司",
      "count": 5
    },
    {
      "companyCode": "5434343",
      "companyName": "江苏苏地建设工程有限公司",
      "count": 227
    },
    {
      "companyCode": "5434343",
      "companyName": "南京远壮工程技术有限公司",
      "count": 23
    },
    {
      "companyCode": "5434343",
      "companyName": "南京杰华建筑劳务有限公司",
      "count": 6
    },
    {
      "companyCode": "5434343",
      "companyName": "安徽所宁建设工程有限公司",
      "count": 2
    },
    {
      "companyCode": "5434343",
      "companyName": "江苏中禧建设有限公司",
      "count": 2
    }
  ]
});

// 工种分布
Mock.mock(/\/api\/smartWorker\/workType/, 'post', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data:  [
    {
      "count": 179,
      "workName": "其他",
      "workCode": "12"
    },
    {
      "count": 52,
      "workName": "电工",
      "workCode": "12"
    },
    {
      "count": 28,
      "workName": "杂工",
      "workCode": "12"
    },
    {
      "count": 16,
      "workName": "砌筑工",
      "workCode": "12"
    },
    {
      "count": 12,
      "workName": "混凝土工",
      "workCode": "12"
    },
    {
      "count": 10,
      "workName": "安装工",
      "workCode": "12"
    },
    {
      "count": 9,
      "workName": "桩基操作工",
      "workCode": "12"
    },
    {
      "count": 2,
      "workName": "建筑电焊工",
      "workCode": "12"
    },
    {
      "count": 1,
      "workName": "司机",
      "workCode": "12"
    },
    {
      "count": 1,
      "workName": "1司机",
      "workCode": "12"
    }
  ]
});

// 年龄分布
Mock.mock(/\/api\/smartWorker\/age/, 'post', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data:  {
    "four": 83,
    "one": 66,
    "sum": 312,
    "two": 81,
    "three": 82
  }
});

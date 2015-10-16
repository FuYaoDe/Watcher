module.exports.createTestData = async () => {

  let like = [
    {title: '最愛不需要麻煩的水果'},
    {title: '注重健康有機'},
    {title: '新鮮最重要'},
    {title: '產地直送最好'},
    {title: '在地合時宜的水果讚'},
    {title: '新鮮果汁與果醬'}
  ];

  await db.Like.bulkCreate(like);
  
  let shopcode = {
      title: '滿 500 折 100',
      code: '1234ABCD',
      autoRandomCode: 'on',
      startDate: '1970-01-01',
      endDate: '1970-01-01',
      type: 'price',
      description: 100,
      restriction: 500,
      sentType: 'all',
      sentContent: '滿 500 折 100 !!',
      restrictionDate: 'on'
    };
  await db.ShopCode.create(shopcode);
}

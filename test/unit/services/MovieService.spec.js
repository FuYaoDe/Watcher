import sinon from 'sinon';
import moment from 'moment';

describe.only("about Movie service", () => {

  it('add Movie', async (done) => {
    try {
      var data = {
        name: "測試電影",
        description: "描述在這",
        time: "2015/10/10",
        detail: "劇情大綱",
        poster: "http://gallery.photowant.com/b/gallery.cfm?action=poster&filmid=flen41618442",
        video: "預告片",
        photos:["http://gallery.photowant.com/b/gallery.cfm?action=still&filmid=flen41618442&pid=FA2015LS-FLEN41618442_0010","http://gallery.photowant.com/b/gallery.cfm?action=still&filmid=flen41618442&pid=FA2015LS-FLEN41618442_0008"]
      };
      let add = await MovieService.add(data);
      add.name.should.be.equal(data.name);
      add.description.should.be.equal(data.description);
      add.time.should.be.equal(data.time);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  it('test crawl', async (done) => {
    try{
      var url = 'http://www.atmovies.com.tw/movie/flfr31754656/';
      let movie = await MovieService.crawl(url);
      var data = { name: '小王子 Little Prince   ',
  time: '2015/10/23',
  url: 'http://www.atmovies.com.tw/movie/flfr31754656/',
  detail: '《小王子》由《功夫熊貓》導演馬克奧斯朋執導，並集結了詹姆斯法蘭科、瑞秋麥亞當絲、瑪莉詠柯蒂亞、傑夫布里吉、班尼西歐戴托羅及保羅喬馬蒂等優秀演員配音。  居住在都市叢林裡的小女孩，儘管再不願意卻還是得接受媽媽每天的安排，獨自在家認真唸書當個乖寶寶。某天，窗外飛來一架飛機墜毀在隔壁，小女孩因而認識了老飛行員鄰居，其實他每天都會折一架紙飛機丟到小女孩家，這是小女孩每天最喜歡的時刻，攤開紙飛機就會看見，從前從前，有一位飛行員遇見小王子的故事…  將世界最暢銷的經典書「小王子」全新改編，首度登上大銀幕，《小王子電影版》猶如小王子遇上了《天外奇蹟》，動畫結合3D、手繪以及定格技巧，畫面豐富精緻，經典故事全新感動，獻給所有曾經是小孩子的每個人：「我們心裡的小王子長大了嗎？還快樂嗎？」',
  poster: 'http://www.photowant.com/photo101/flfr31754656/pl_flfr31754656_0003.jpg',
  video: 'https://www.youtube.com/embed/NXhBcA_oZyY',
  description: ' 片長：108分  上映日期：2015/10/23  一位飛行員迫降在撒哈拉沙漠中，偶然發現一名小男孩，聲稱自己是別的星球的王子降落到地球上。而在發行員修復飛機的過程中，小王子講述了一個夢幻但相當具有影響力的故事。   ',
  imdbUrl: 'http://us.imdb.com/Title?1754656',
  photos:
   [ 'http://l10l010l3322l1.photos.atmovies.com.tw:8080/film/2015/L/flfr31754656/photo/fs_FLFR31754656_0001.jpg',
     'http://l10l010l3322l1.photos.atmovies.com.tw:8080/film/2015/L/flfr31754656/photo/fs_FLFR31754656_0002.jpg',
     'http://l10l010l3322l1.photos.atmovies.com.tw:8080/film/2015/L/flfr31754656/photo/fs_FLFR31754656_0003.jpg',
     'http://l10l010l3322l1.photos.atmovies.com.tw:8080/film/2015/L/flfr31754656/photo/fs_FLFR31754656_0004.jpg',
     'http://l10l010l3322l1.photos.atmovies.com.tw:8080/film/2015/L/flfr31754656/photo/fs_FLFR31754656_0005.jpg',
     'http://l10l010l3322l1.photos.atmovies.com.tw:8080/film/2015/L/flfr31754656/photo/fs_FLFR31754656_0006.jpg' ] };
      movie.name.should.be.equal(data.name);
      movie.time.should.be.equal(data.time);
      done();
    }catch(e){
      console.log(e);
      done(e);
    }

  });

  it('test get movie root', async(done) => {
    try {
      var url = 'http://www.atmovies.com.tw/movie/next/';
      let movieUrls = await MovieService.root(url);
      movieUrls.should.be.Array;
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });
  //
  // it('use ShopCode', async (done) => {
  //   try {
  //     var data ={
  //       code: testShopCode.code,
  //       price: 999,
  //     }
  //     let check = await ShopCodeService.use(data);
  //     check.price.should.be.equal(900);
  //     check.discountAmount.should.be.equal(99);
  //     done();
  //   } catch (e) {
  //     console.log(e);
  //     done(e);
  //   }
  // });

});

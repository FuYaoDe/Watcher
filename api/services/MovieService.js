import moment from 'moment';
import request from 'superagent';
import cheerio from 'cheerio';

module.exports = {

  add : async(data) => {
    try {
      let movie = await db.Movie.create(data);
      return movie;
    } catch (e) {
      throw e;
    }
  },

  crawl: async(url) => {
    try {
      //url分析
      let crawlHtml = await request.get(url);
      // console.log("!!!",crawlHtml.text.replace(/\t/g, ''));
      let $ = cheerio.load(crawlHtml.text.replace(/\t/g, '').replace(/\r/g, '').replace(/\n/g, ''));
      let movie = {};
      movie.name = $(".filmTitle").text();
      // time
      movie.time = $(".runtime").text();
      if(movie.time){
        let getTime = /([0-9]*\/[0-9]*\/[0-9]*)/g;
        let match = getTime.exec(movie.time);
        movie.time = match[1];
      }
      movie.url = url;
      movie.name = $(".filmTitle").text();
      movie.detail = $(".sub_content").text().replace(/^[ ]*/g, '').replace(/[ ]*$/g, '');
      movie.poster = $(".movie_poster a img").attr("src");
      movie.video = $(".video_view iframe").attr("src");
      movie.description = $(".movie_poster").text();

      let imdbDiv = $("div div div div ul").get(3);
      imdbDiv.children.forEach(function(elem, i) {
        if(elem.children){
          elem.children.forEach(function(elem, j) {
            if(elem.attribs){
              if(elem.attribs.href){
                if(elem.children[0].data == 'IMDb'){
                  movie.imdbUrl = elem.attribs.href;
                }
              }
            }
          });
        }
      });

      let photos = [];
      let photoDom = $("div div a img");
      for(var i = 1 ;i < photoDom.get().length ; i++){
        photos.push(photoDom.get(i).attribs.src);
      }
      movie.photos = photos
      console.log("=== movie ===",movie);
      return movie

    } catch (e) {
      throw e;
    }
  },

  root: async(url) => {
    try {
      let crawlHtml = await request.get(url);
      let $ = cheerio.load(crawlHtml.text.replace(/\t/g, '').replace(/\r/g, '').replace(/\n/g, ''));
      let movies = [];
      let movieUrlDiv = $('.filmTitle');

      movieUrlDiv.each(function(i, elem) {
        movies.push($(this).children().attr("href"));
      });
      let next = "";

      console.log('=== movies ===',movies);
      let movieList = await* movies.map(function(url){
         let show = db.MovieUrl.findOrCreate({
           where: {url}
           defaults: {url}
         });
         return show;
      });

      return {movies,next};
    } catch (e) {
      throw e;
    }
  },

  checkCode : async (code) => {
    try {
      let result = await db.ShopCode.findOne({
        where:{
          code: code
        }
      });
      return result;
    } catch (e) {
      throw e;
    }
  },

  use: async ({code, price}) => {
    try {
      let result = await db.ShopCode.findOne({
        where:{
          code: code,
          $or:[{
            restrictionDate: 'on'
          },{
            startDate:{
              $lte: moment(new Date()).format('YYYY/MM/DD')
            },
            endDate:{
              $gte: moment(new Date()).format('YYYY/MM/DD')
            },
          }],
          restriction:{
            $lte: price
          }
        }
      });
      let discountAmount;
      if(result){
        let originPrice = price;
        if(result.type == 'price')
          price -= result.description;
        else
          price *= (result.description*0.01);
        discountAmount = originPrice - price;
      }
      else{
        throw new Error("請再次確認折扣碼活動時間、活動金額");
      }
      return {code, price, discountAmount};
    } catch (e) {
      throw e;
    }
  },
}

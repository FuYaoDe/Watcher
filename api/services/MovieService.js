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

  crawl: async(id) => {
    try {
      //url分析
      let findUrl = await db.MovieUrl.findById(id);
      let crawlHtml = await request.get(findUrl.url);
      let $ = cheerio.load(crawlHtml.text);
      let movie = {};
      movie.MovieUrlId = id;
      movie.zhName = $("div.text.bulletin h4").text();
      movie.enName = $("div.text.bulletin h5").text();
      movie.fullName = movie.zhName+' '+ movie.enName;
      movie.time = $("div.text.bulletin p span.dta").first().text();
      movie.detail = $("div.text.full").text();
      movie.poster = $(".border img").attr("src");

      let photos = [];
      let photoDom = $("#albums li");
      photoDom.each(function(i, elem) {
        photos.push($(this).children().children().attr("src"));
      });
      movie.photos = photos

      // movie.video = $(".video_view iframe").attr("src");
      // movie.description = $(".movie_poster").text();

      // let imdbDiv = $("div div div div ul").get(3);
      // imdbDiv.children.forEach(function(elem, i) {
      //   if(elem.children){
      //     elem.children.forEach(function(elem, j) {
      //       if(elem.attribs){
      //         if(elem.attribs.href){
      //           if(elem.children[0].data == 'IMDb'){
      //             movie.imdbUrl = elem.attribs.href;
      //           }
      //         }
      //       }
      //     });
      //   }
      // });

      console.log("=== movie ===",movie);
      return movie

    } catch (e) {
      throw e;
    }
  },

  root: async(url) => {
    try {
      let crawlHtml = await request.get(url);
      let $ = cheerio.load(crawlHtml.text);
      let movies = [];
      let movieUrlDiv = $('.clearfix.row .row-container .item .text h4 a');

      movieUrlDiv.each(function(i, elem) {
        movies.push($(this).attr("href"));
      });

      console.log('=== movies ===',movies);
      let movieList = await* movies.map(function(url){
         let show = db.MovieUrl.findOrCreate({
           where: {url},
           defaults: {url}
         });
         return show;
      });

      return movies;
    } catch (e) {
      throw e;
    }
  },

  findNotCrawl: async() => {
    try {
      let notCrawlMovies = await db.MovieUrl.findAll({
        where:{
          isCrawl: false
        }
      });

      await* notCrawlMovies.map(async (movie) => {
        let movieInfo = await MovieService.crawl(movie.id);
        let save = await MovieService.add(movieInfo);
        movie.isCrawl = true;
        movie.tryTime += 1;
        await movie.save();
        return movie;
      });

      return;
    } catch (e) {
      throw e
    }
  }
}

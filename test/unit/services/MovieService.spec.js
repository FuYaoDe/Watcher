import sinon from 'sinon';
import moment from 'moment';

describe.only("about Movie service", () => {
  let testUrl;
  before( async (done) => {
    var url = 'https://tw.movies.yahoo.com/movieinfo_main.html/id=5716';
    testUrl = await db.MovieUrl.create({url});
    return done();
  });

  describe("about search not Crawl", () => {
    var testUrl2;
    before( async (done) => {
      var url = 'https://tw.rd.yahoo.com/referurl/movie/thisweek/info/*https://tw.movies.yahoo.com/movieinfo_main.html/id=5875';
      testUrl2 = await db.MovieUrl.create({url});
      return done();
    });

    it('test findNotCrawl', async(done) => {
      try {
        await MovieService.findNotCrawl();
        let isNull = await db.MovieUrl.findAll({
          where:{
            isCrawl: false
          }
        });
        isNull = isNull.length;
        isNull.should.be.equal(0);
        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

  });

  it('add Movie', async (done) => {
    try {
      var data = {
        zhName: '中文名稱',
        enName: '英文名稱',
        fullName: "測試電影",
        description: "描述在這",
        time: "2015/10/10",
        detail: "劇情大綱",
        poster: "http://gallery.photowant.com/b/gallery.cfm?action=poster&filmid=flen41618442",
        video: "預告片",
        photos:["http://gallery.photowant.com/b/gallery.cfm?action=still&filmid=flen41618442&pid=FA2015LS-FLEN41618442_0010","http://gallery.photowant.com/b/gallery.cfm?action=still&filmid=flen41618442&pid=FA2015LS-FLEN41618442_0008"]
      };
      let add = await MovieService.add(data);
      add.zhName.should.be.equal(data.zhName);
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
      let movie = await MovieService.crawl(testUrl.id);
      var data =  { zhName: '間諜橋',
                    enName: 'Bridge of Spies',
                    fullName: '間諜橋 Bridge of Spies',
                    time: '2015-10-16',
                    detail: '★ 奧斯卡金獎導演史蒂芬史匹柏  繼《林肯》後再次打造全新諜戰懸疑鉅作★ 冷戰時期美國真人真事改編  金獎影帝湯姆漢克精湛詮釋大律師詹姆斯多諾萬傳奇經歷夢工廠與福斯影業攜手推出以一連串真實歷史事件為背景的劇情驚悚新片《間諜橋》，描述一名紐約布魯克林的保險索償律師詹姆士唐納文（James Donovan），受美國中情局所託，扛下幾乎不可能達成的談判大任，試圖讓被劫持的美籍U-2偵察機飛行員得以獲釋，因此被捲入冷戰風暴之中。本片由名導史蒂芬史匹柏（Steven Spielberg）執導，湯姆漢克（Tom Hanks）、馬克里朗斯（Mark Rylance）、史考特薛弗（Scott Shepherd）、艾美萊恩（Amy Ryan）、塞巴斯蒂安柯伊（Sebastian Koch）、亞倫艾達（Alan Alda）、奧斯汀史托爾（Austin Stowell）、米凱爾戈瑞沃（Mikhail Gorevoy）與威爾羅傑斯（Will Rogers）共同演出。《間諜橋》由史蒂芬史匹柏、馬克普萊特（Mark Platt）、克莉絲蒂馬柯斯可克里伊格（Kristie Macosko Krieger）出任製片；亞當桑納（Adam Somner）、丹尼爾路皮（Daniel Lupi）、傑夫史寇爾（Jeff Skol）與強納森金（Jonathan King）擔任執行製片；劇本由麥特查爾曼（Matt Charman）與伊森柯恩、喬爾科恩兄弟（Ethan Coen & Joel Coen）執筆。令人肅然起敬的故事1950年代冷戰初期，美國與蘇聯的緊張關係一觸即發，所以當美國聯邦調查局逮捕住在紐約的蘇聯情報員魯道夫艾伯爾（馬克里朗斯 飾），恐懼與惶恐愈發高漲。阿貝爾被控傳送加密的訊息回蘇俄，面對聯邦調查局的訊問，卻頑強不肯合作，並回絕要他背叛祖國的條件，被監禁在聯邦監獄內等待開庭。政府需要一名獨立的律師為他辯護，找上了來自布魯克林的保險律師詹姆士唐納文。儘管唐納文在法界以高超的談判技巧備受推崇，但他對於受委託的案件本質與範疇經驗有限，而且也無意願涉及相關事務。為這麼一位有如全民公敵的被告做辯護，會讓他成為眾矢之的，還有可能讓他的家人成為被放大檢視或唾棄的對象，甚至可能讓家人置身險境。唐納文後來勉為其難同意為艾伯爾辯護，因為他致力於公平正義的原則，與基本人權的保護，想確保艾伯爾無論具有公民資格，都能獲得公平的審判。在他準備辯護策略過程中，兩人之間開始建立起一種相互尊敬與了解的交情。唐納文欣賞艾伯爾的力量與忠誠，訴諸慷慨激昂的抗辯，提出他的行為只是出於一名優秀的士兵效忠祖國的指示，卻徒勞無功。不久後，一架美國U-2偵察機執行偵察任務時，在蘇聯領空遭到擊落，飛行員法蘭西斯蓋瑞鮑爾斯（奧斯汀史托爾 飾）遭定罪判刑，在蘇聯服刑10年。儘管美國中央情報局斬釘截鐵否認對該任務知情，卻擔心鮑爾斯可能會遭脅迫，吐露國家機密。中情局特務霍夫曼（史考特薛弗 飾）曾親眼見識唐納文在法庭上令人印象深刻的辯護技巧，祕密與他接觸，並徵召他從事茲事體大的國家安全任務。在愛國心的驅使之下，秉持著堅定的信念與莫大的勇氣，唐納文很快搭上前往柏林的飛機，交涉美國與蘇聯間的換囚談判。本片開端從《辛德勒的名單》中納粹對猶太人的恐怖大屠殺，到《搶救雷恩大兵》中奧馬哈海灘上紀念性的登陸行動，三座奧斯卡金像獎得主－史蒂芬史匹柏在導演生涯中，不斷把重大的歷史事件搬上銀幕。曾修習歷史的史匹柏，對冷戰時期的著迷可追溯至孩童時期，他仍記得父親與祖父當年談論到美俄之間的故事中，兩國間存在著根深蒂固的仇恨與不信任。根據製片馬克普萊特（《魔法黑森林》、《落日車神》）表示，「這段時間是冷戰情勢最緊張的幾年，人們仍然記得因為從事間諜活動被處決的羅森堡夫婦，那是我們故事時期當時的死刑罪。」史匹柏補充：「出面為一名間諜辯護而登上報紙頭條，當時正值非常危險的時機，」他也是夢工廠影業的主要合夥人，「因為在我成長時期的幼小心靈中，我能深切感受到對原子彈與蘇俄的強烈恐懼感。」年輕有為的英國劇作家與電視編劇麥特查曼（《亂世有情天》，原著書名《法蘭西組曲》），把詹姆士唐納文不凡的真實故事，讓夢工廠高層過目，他們立即為之著迷。唐納文的角色在冷戰歷史的紀錄中並不廣為人知，而這則敘述一名理想主義者，在攸關國家安全與詭辯的世界中摸索的故事，卻很引人入勝。普拉特本來就很熟悉這則故事，認為對於史匹柏豐富的感受力再合適不過，「史蒂芬是這則故事最完美的電影拍攝者人選。」普拉特表示。他想得一點都沒錯，史匹柏被故事深深吸引，其中包含了法律劇情、驚悚與史實的元素，但是故事的靈魂人物─詹姆士唐納文這個角色，讓他最感興趣。一名傳統居家男人與備受尊敬的律師，竟接下危險的任務，以冷靜沉著的態度處理，還能讓一名王牌間諜對他完全信任。唐納文是一名偉大的人物，史匹柏知道他的故事有極大的電影潛力。「麥特的劇本好極了，當他完成後，我們把他的劇本初稿給科恩兄弟，他們的風格向來有種特定的鋒銳筆觸，很適合這則故事，」普拉特表示，「在寫角色對話方面，沒有人比喬爾與伊森兄弟更拿手。」三座奧斯卡金像獎得主科恩兄弟，令人印象深刻的電影作品包括《險路勿近》、《謀殺綠腳趾》與《冰血暴》，對該題材產生喜愛的共鳴，撰寫他們的劇本初稿時，巧妙地把這段卓越的經歷交織在多諾萬的人生中，成就出一則精確捕捉他個人菁華的動人故事。讓角色躍上銀幕劇本完稿底定後，電影拍攝計劃很快地迅速成形。一組黃金陣容的拍攝小組很快就位，包括攝影亞努斯卡明斯基（Janusz Kaminski，《搶救雷恩大兵》）、美術總監亞當斯托克豪森（Adam Stockhausen，《歡迎光臨布達佩斯大飯店》）、服裝造型總監凱西亞華力卡馬蒙妮（Kasia Walicka-Maimone，《暗黑冠軍路》）、剪接麥可卡恩（Michael Kahn，《林肯》）與配樂湯瑪士紐曼（Thomas Newman，《大夢想家》）。為片中關鍵角色詹姆士唐納文選角時，這位不愛出風頭、卻被捲入聯邦調查局與中情局權力核心的保險律師兼紐倫堡前審判檢察官，人選一直都是再明顯不過─兩屆奧斯卡金獎影帝湯姆漢克（《費城》、《阿甘正傳》）。「沒有人比湯姆更適合詮釋這個角色，」製片克莉絲蒂馬柯斯可克里伊格（《林肯》）表示，「詹姆士唐納文是一名誠實的居家男人，致力於捍衛民主價值，他願意冒著失去自身安逸與安全的風險，甚至可能影響到他的家人，當他由戲精湯姆漢克詮釋，觀眾將能產生共鳴，還會挺他到底。」有鑑於參與的工作人員陣容堅強，漢克還沒讀過劇本就已興致高昂，當他讀完劇本後，他馬上就簽約加入。這位男星剛好對東西德的政治局勢特別感興趣，也是主因。漢克說：「當一則歷史故事出現，卻不是我所知道的全部故事，對我而言就像是仍未探索過的世外桃源。」漢克也對劇本中對唐納文描繪出的複雜面向深深吸引。他解釋：「唐納文與他代表客戶之間的人性面，讓他成為與眾不同的律師。他從來就不是只是站在法律的論點談判，他是在為對方奮戰。漢克與史匹柏之間存在著獨一無二、充滿創意的合作關係，他們共事的每一部電影水準都因此更加提升。他們先前合作的作品包括《搶救雷恩大兵》、《神鬼交鋒》與《航站情緣》榮獲艾美獎與金球獎肯定，改編自史蒂芬安布羅斯（Stephen Ambrose）原著的HBO迷你影集《諾曼第大空降》、艾美獎影集《太平洋戰爭》，則都由他們製作。史匹柏說：「我熱愛與湯姆工作。他會嘗試任何可能性，他有上千種想法，也對於來自別人的上千種想法保持開放態度。他有不可思議的創意，想要以更加原創的方式找出答案。」曾獲七座艾美獎肯定並提名奧斯卡的男星亞倫艾達（《外科醫師》、《神鬼玩家》），飾演唐納文公司的資深法律合夥人－湯瑪士華特斯（Thomas Watters），他表示：「這對湯姆而言是個捨我其誰的角色。因為即使他的角色生命正處於險境，他仍能挖苦人、幽默、維持洞察力，而且言辭鏗鏘有力。這些都是湯姆早已具備的特質，讓他演出角色時更具說服力。」接著，製片與導演要開始尋找飾演魯道夫艾伯爾的演員，這名被捕的間諜，以無私的愛國心贏得唐納文的尊敬與欽佩，他們要物色的對象必須有能力創造令人信服的角色，呈現矛盾的忠誠與令人驚訝的深度，還能與漢克相抗衡。史匹柏多年來一直留心英國男星馬克里朗斯的事業，渴望與他共事，並且一直尋找合適的角色，而這就是了。「馬克是當今各國影壇演員中頂尖的佼佼者，」史匹柏表示，「我曾看過他演出《十二夜》，就讓我確信這一點。」里朗斯曾獲三座東尼獎與兩座奧利佛戲劇獎，最負盛名的作品是好評舞台劇《耶路撒冷》、《波音情人》與近期的PBS影集《狼廳》，雖然角色令人卻步，但他樂於接受挑戰。里朗斯表示：「我們其實對於艾伯爾所知有限，除了他在紐約各處不同的情報站，用中空的錢幣接收與傳遞訊息。他是大家口中說的潛伏間諜。」他繼續說道：「艾伯爾在開始這些秘密行動前，已經在美國待了幾年，他不是間諜組織的主腦，他只是執行任務。但是當他被捕時，美國政府讓他在大眾前看起來比他實際的作為更重要。」史匹柏說：「《間諜橋》是一部驚悚片、一部著重人物角色的驚悚片，片中角色的內心世界錯綜深沉。有了來自德國、美國與俄羅斯的出色演員，我對本片卡司非常引以為傲。」更新日期：2015-10-16',
                    poster: 'https://s.yimg.com/vu/movies/fp/mpost2/57/16/5716.jpg',
                    photos:
                     [ 'https://s.yimg.com/vu/movies/fp/mpho4/51/30/65130.jpg',
                       'https://s.yimg.com/vu/movies/fp/mpho4/51/29/65129.jpg',
                       'https://s.yimg.com/vu/movies/fp/mpho4/51/28/65128.jpg',
                       'https://s.yimg.com/vu/movies/fp/mpho4/51/27/65127.jpg',
                       'https://s.yimg.com/vu/movies/fp/mpho4/51/26/65126.jpg',
                       'https://s.yimg.com/vu/movies/fp/mpho4/18/87/61887.jpg' ] }
      movie.zhName.should.be.equal(data.zhName);
      movie.time.should.be.equal(data.time);
      done();
    }catch(e){
      console.log(e);
      done(e);
    }

  });

  it('test get movie root', async(done) => {
    try {
      var url = 'https://tw.movies.yahoo.com/movie_thisweek.html';
      let movieUrls = await MovieService.root(url);
      movieUrls.should.be.Array;
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

});

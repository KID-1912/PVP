module.exports = app => {
  const mongoose = require('mongoose');
  const router = require('express').Router();

  // 引入
  const Category = mongoose.model('Category');
  const Article = mongoose.model('Article');
  const Hero = mongoose.model("Hero");
  const Ad = mongoose.model("Ad");

// 新闻分类接口
  // 1. 查询新闻分类数据
  router.get('/newslist', async (req, res) => {
    // 1.1 polulate+虚拟字段方式查询
    // const list = await Category.findOne({
    //   name: "新闻分类"
    // }).populate({
    //   path: "children",
    //   populate: {path: "newslist"}
    // }).lean();

    // 1.2 使用aggregate+pipe管道查询
    //查询Category中parent为新闻分类_id的category对其联表查询article的category为此类目所组成文章集合
    const news = await Category.findOne({
      name: "新闻分类"
    });
    const list = await Category.aggregate([
      { $match: { parent: news._id } },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "category",
          as: "newslist"
        }
      },
      {
        $addFields: { //仅取每个分类前5条文章
          newslist: { $slice: ['$newslist', 5] }
        }
      }
    ]);

    // 3. 每个文章可能属于多个分类，返回数据时添加一个categoryName字段，其值等于文章当前所在分类字段name，
    // 热门分类下文章的categoryName名应当为文章的category的第1个name
    (async () => {
      for (let v of list) {
        for (let item of v.newslist) {
          if (v.name === "热门") {
            let cate =
              await Category.findById(item.category[0]); //异步查询parent类目
              item.categoryName = cate.name
          } else {
            item.categoryName = v.name;
          }
        }
      }
      res.send(list); //在异步函数的await完成再执行，不可放在函数外！
    })()
  })

// 英雄分类接口
  // 2. 查询英雄分类数据
  router.get('/herolist', async (req,res) => {
    let hero = await Category.findOne({
      name: "英雄"
    });
    let herolist = await Category.aggregate([
      {$match: {parent: hero._id}},
      {$lookup: {
        from: "heroes",
        localField: "_id",
        foreignField: "categories",
        as: "heroeslist"
      }}
    ]);
    res.send(herolist);
  });

// 文章接口
  // 3. 查询指定id文章
  router.get('/article/:id',async (req,res) => {
    const model = await Article.findById(req.params.id).lean();
    // 查询相关文章数据
    model.next = await Article.find({
      'category': model.category[0],
      '_id': {"$gt": model._id}
    }).sort({_id: 1}).limit(2);
    res.send(model);
  })

// 英雄接口
  router.get('/hero/:id',async (req,res) => {
    const model = await Hero.findById(req.params.id).populate(['categories','items1','items2','parter'])
    .populate({
      path: 'parter',
      populate: 'hero'
    });
    res.send(model);
  })

// 广告接口
  router.get('/ads/:name',async (req,res) => {
    const model = await Ad.findOne({
      name: req.params.name
    });
    res.send(model);
  })

// 临时子路由，用于初始化数据时快速录入数据
  // router.get('/initArticle',async (req,res) => {
  //   const News = await Category.findOne({ //新闻分类
  //     name: "新闻分类",
  //   });
  //   const artCatery = await Category.find().where({ //新闻分类的子分类文章分类
  //     parent: News
  //   }).lean();
  //   //文章数据
  //   const articles =  ["《目标》·新英雄澜CG", "【获奖公示】设计、视频、音乐赛道获奖名单——王者荣耀风物志共创大赛", "如果有一个可以跟王者策划零距离“对线”交流的机会，你会……", "【获奖公示】云阁绮霞 -王者荣耀风物志插画漫画大赛", "新皮肤爆料｜守护万千星河，云上仙君新装登场！", "12月12日体验服停机更新公告", "“风物志对话小说赛道”获奖作品问题说明公告", "12月12日组队语音卡顿异常说明", "12月11日体验服停机更新公告", "12月10日体验服停机更新公告", "新英雄澜登场，冬日聚峡谷对战赢好礼", "王者创意互动周好礼来袭 云中君-纤云弄巧限时秒杀", "【手Q独家】商城限时免单", "感恩节快乐，参与活动领缤纷好礼", "挑战绝悟赢荣誉称号，S17赛季战令限时返场", "秋季赛总决赛门票今日12:00全面开售！重山之上，一战成王！", "成都AG超玩会晋级决赛！12月19日会师DYG决战重庆，看谁能问鼎巅峰！", "决赛见！DYG力克成都AG，锁定总决赛名额！成都AG错失晋级掉入败者组", "第一视角进入教程，来营地看一诺、小义细微操作！见证决赛名额诞生！", "四强集结！12月4日季后赛第二周重庆开战，一起见证总决赛战队诞生！"];
  //   // 生成文章数据对象
  //   let m = 0;
  //   const artArr = articles.map((v,i) => {
  //     if(i % 5 === 0) m+=1;
  //     const id = artCatery[m]._id;
  //     return {
  //       category:  id,
  //       title: v
  //     }
  //   });
  //   // 删除模型所有数据
  //   await Article.deleteMany({});
  //   // // 一次插入至article模型中
  //   await Article.insertMany(artArr);
  //   res.send(artArr); 
  // })

// 英雄初始化批量录入
  // router.get('/initHero', async (req, res) => {
  //   const heros = [
  //     {
  //       name: "热门",
  //       herolist: [{
  //           name: "鲁班七号",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg",
  //           categories: [
  //             "热门"
  //           ]
  //         },
  //         {
  //           name: "后羿",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg",
  //           categories: [
  //             "热门"
  //           ]
  //         },
  //         {
  //           name: "安琪拉",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg",
  //           categories: [
  //             "热门"
  //           ]
  //         },
  //         {
  //           name: "亚瑟",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg",
  //           categories: [
  //             "热门"
  //           ]
  //         },
  //         {
  //           name: "妲己",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg",
  //           categories: [
  //             "热门"
  //           ]
  //         },
  //         {
  //           name: "孙悟空",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg",
  //           categories: [
  //             "热门"
  //           ]
  //         },
  //         {
  //           name: "吕布",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg",
  //           categories: [
  //             "热门"
  //           ]
  //         },
  //         {
  //           name: "铠",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg",
  //           categories: [
  //             "热门"
  //           ]
  //         },
  //         {
  //           name: "虞姬",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg",
  //           categories: [
  //             "热门"
  //           ]
  //         },
  //         {
  //           name: "undefined",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg",
  //           categories: [
  //             "热门"
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "战士",
  //       herolist: [{
  //           name: "赵云",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "墨子",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "钟无艳",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "吕布",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "夏侯惇",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "曹操",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "典韦",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "宫本武藏",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "达摩",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "老夫子",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "关羽",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "程咬金",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "露娜",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "花木兰",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "橘右京",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "亚瑟",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "孙悟空",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "刘备",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "杨戬",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "雅典娜",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "哪吒",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "铠",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "苏烈",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "梦奇",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "裴擒虎",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "狂铁",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "孙策",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "李信",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "盘古",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "云中君",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "曜",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "马超",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "蒙恬",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         },
  //         {
  //           name: "夏洛特",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/536/536.jpg",
  //           categories: [
  //             "战士"
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "法师",
  //       herolist: [{
  //           name: "小乔",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "墨子",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "妲己",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "嬴政",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "高渐离",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "孙膑",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "扁鹊",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "芈月",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "周瑜",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "甄姬",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "武则天",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "貂蝉",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "安琪拉",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "露娜",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "姜子牙",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "王昭君",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "张良",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "不知火舞",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "钟馗",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "诸葛亮",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "干将莫邪",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "女娲",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "杨玉环",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "弈星",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "米莱狄",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "司马懿",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "沈梦溪",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "上官婉儿",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "嫦娥",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         },
  //         {
  //           name: "西施",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg",
  //           categories: [
  //             "法师"
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "坦克",
  //       herolist: [{
  //           name: "廉颇",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "庄周",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "刘禅",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "钟无艳",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "白起",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "芈月",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "吕布",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "夏侯惇",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "达摩",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "项羽",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "程咬金",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "刘邦",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "亚瑟",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "牛魔",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "张飞",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "太乙真人",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "东皇太一",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "铠",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "苏烈",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "梦奇",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "孙策",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "盾山",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "嫦娥",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "猪八戒",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "蒙恬",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         },
  //         {
  //           name: "阿古朵",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg",
  //           categories: [
  //             "坦克"
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "刺客",
  //       herolist: [{
  //           name: "赵云",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "阿轲",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "李白",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "貂蝉",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "韩信",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "兰陵王",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "花木兰",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "不知火舞",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "娜可露露",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "橘右京",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "孙悟空",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "百里守约",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "百里玄策",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "裴擒虎",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "元歌",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "司马懿",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "上官婉儿",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "云中君",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "马超",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "镜",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         },
  //         {
  //           name: "澜",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg",
  //           categories: [
  //             "刺客"
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "射手",
  //       herolist: [{
  //           name: "孙尚香",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "鲁班七号",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "马可波罗",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "狄仁杰",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "后羿",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "李元芳",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "虞姬",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "成吉思汗",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "黄忠",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "百里守约",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "公孙离",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "伽罗",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         },
  //         {
  //           name: "蒙犽",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg",
  //           categories: [
  //             "射手"
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       name: "辅助",
  //       herolist: [{
  //           name: "庄周",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "刘禅",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "孙膑",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "姜子牙",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "牛魔",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "张飞",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "钟馗",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "蔡文姬",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "太乙真人",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "大乔",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "东皇太一",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "鬼谷子",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "明世隐",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "杨玉环",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "盾山",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "瑶",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "鲁班大师",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         },
  //         {
  //           name: "阿古朵",
  //           avatar: "//game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg",
  //           categories: [
  //             "辅助"
  //           ]
  //         }
  //       ]
  //     }
  //   ];
  //   const heroArr = [];
  //   for(let cate of heros){
  //     if (cate.name === "热门") continue;
  //     let cateObj = await Category.findOne({
  //       name: cate.name
  //     });
  //     for(let hero of cate.herolist){
  //       hero.categories = [cateObj];
  //       heroArr.push(hero);
  //     }
  //   }
  //   await Hero.deleteMany({});
  //   await Hero.insertMany(heroArr);
  //   res.send(heroArr);
  // })


app.use('/web/api', router);
}
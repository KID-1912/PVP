(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-22eac45a"],{3540:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v(e._s(e.id?"编辑":"新建")+"英雄")]),a("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(t){return t.preventDefault(),e.save()}}},[a("el-tabs",{attrs:{type:"border-card",value:"info"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"info"}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{model:{value:e.model.name,callback:function(t){e.$set(e.model,"name",t)},expression:"model.name"}})],1),a("el-form-item",{attrs:{label:"称号"}},[a("el-input",{model:{value:e.model.title,callback:function(t){e.$set(e.model,"title",t)},expression:"model.title"}})],1),a("el-form-item",{attrs:{label:"图标"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,headers:e.getAuthHeader(),"show-file-list":!1,"on-success":function(t){return e.$set(e.model,"avatar",t.url)}}},[e.model.avatar?a("img",{staticClass:"avatar",attrs:{src:e.model.avatar}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",{attrs:{label:"banner"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,headers:e.getAuthHeader(),"show-file-list":!1,"on-success":function(t){return e.$set(e.model,"banner",t.url)}}},[e.model.banner?a("img",{staticClass:"banner",attrs:{src:e.model.banner}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",{attrs:{label:"职业"}},[a("el-select",{attrs:{multiple:""},model:{value:e.model.categories,callback:function(t){e.$set(e.model,"categories",t)},expression:"model.categories"}},e._l(e.categories,(function(e){return a("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),a("el-form-item",{attrs:{label:"难度"}},[a("el-rate",{staticStyle:{"margin-top":"0.8rem"},attrs:{max:9,"show-score":""},model:{value:e.model.scores.difficult,callback:function(t){e.$set(e.model.scores,"difficult",t)},expression:"model.scores.difficult"}})],1),a("el-form-item",{attrs:{label:"技能"}},[a("el-rate",{staticStyle:{"margin-top":"0.8rem"},attrs:{max:9,"show-score":""},model:{value:e.model.scores.skills,callback:function(t){e.$set(e.model.scores,"skills",t)},expression:"model.scores.skills"}})],1),a("el-form-item",{attrs:{label:"攻击"}},[a("el-rate",{staticStyle:{"margin-top":"0.8rem"},attrs:{max:9,"show-score":""},model:{value:e.model.scores.attack,callback:function(t){e.$set(e.model.scores,"attack",t)},expression:"model.scores.attack"}})],1),a("el-form-item",{attrs:{label:"生存"}},[a("el-rate",{staticStyle:{"margin-top":"0.8rem"},attrs:{max:9,"show-score":""},model:{value:e.model.scores.survive,callback:function(t){e.$set(e.model.scores,"survive",t)},expression:"model.scores.survive"}})],1),a("el-form-item",{attrs:{label:"顺风装备"}},[a("el-select",{attrs:{"multiple-limit":6,multiple:""},model:{value:e.model.items1,callback:function(t){e.$set(e.model,"items1",t)},expression:"model.items1"}},e._l(e.items,(function(e){return a("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),a("el-form-item",{attrs:{label:"逆风装备"}},[a("el-select",{attrs:{"multiple-limit":6,multiple:""},model:{value:e.model.items2,callback:function(t){e.$set(e.model,"items2",t)},expression:"model.items2"}},e._l(e.items,(function(e){return a("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),a("el-form-item",{attrs:{label:"使用技巧"}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},model:{value:e.model.usageTips,callback:function(t){e.$set(e.model,"usageTips",t)},expression:"model.usageTips"}})],1),a("el-form-item",{attrs:{label:"对抗技巧"}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},model:{value:e.model.battleTips,callback:function(t){e.$set(e.model,"battleTips",t)},expression:"model.battleTips"}})],1),a("el-form-item",{attrs:{label:"团战思路"}},[a("el-input",{attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},model:{value:e.model.teamTips,callback:function(t){e.$set(e.model,"teamTips",t)},expression:"model.teamTips"}})],1)],1),a("el-tab-pane",{attrs:{label:"技能信息",name:"skills"}},[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){return e.model.skills.push({})}}},[a("i",{staticClass:"el-icon-plus"}),e._v(" 添加技能 ")]),a("el-row",{staticStyle:{"flex-wrap":"wrap"},attrs:{type:"flex"}},e._l(e.model.skills,(function(t,r){return a("el-col",{key:r,attrs:{md:12}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{model:{value:t.name,callback:function(a){e.$set(t,"name",a)},expression:"item.name"}})],1),a("el-form-item",{attrs:{label:"图标"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,headers:e.getAuthHeader(),"show-file-list":!1,"on-success":function(a){return e.$set(t,"icon",a.url)}}},[t.icon?a("img",{staticClass:"avatar",attrs:{src:t.icon}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",{attrs:{label:"描述"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.description,callback:function(a){e.$set(t,"description",a)},expression:"item.description"}})],1),a("el-form-item",{attrs:{label:"小提示"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.tips,callback:function(a){e.$set(t,"tips",a)},expression:"item.tips"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){return e.model.skills.splice(r,1)}}},[e._v("删除")])],1)],1)})),1)],1),a("el-tab-pane",{attrs:{label:"英雄关系",name:"related"}},[a("h4",[e._v("最佳搭档")]),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.model.parter.length<2&&e.model.parter.push({})}}},[a("i",{staticClass:"el-icon-plus"}),e._v(" 添加英雄 ")]),a("el-row",{attrs:{type:"flex"}},e._l(e.model.parter,(function(t,r){return a("el-col",{key:r,attrs:{md:12}},[a("el-form-item",{attrs:{label:"英雄"}},[a("el-select",{attrs:{filterable:""},model:{value:t.hero,callback:function(a){e.$set(t,"hero",a)},expression:"item.hero"}},e._l(e.heros,(function(e){return a("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),a("el-form-item",{attrs:{label:"描述"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.description,callback:function(a){e.$set(t,"description",a)},expression:"item.description"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){return e.model.parter.splice(r,1)}}},[e._v("删除")])],1)],1)})),1)],1)],1),a("el-form-item",{staticStyle:{"margin-top":"1rem","text-align":"center"},attrs:{"label-width":"0"}},[a("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("提交")])],1)],1)],1)},l=[],s=(a("96cf"),a("1da1")),n=a("eecb"),o=a("b050"),i=a("8c4a"),c=a("a11d"),u={props:{id:String},mixins:[n["a"]],data:function(){return{uploadUrl:"http://localhost:3000/admin/api/upload",categories:[],items:[],heros:[],model:{scores:{difficult:0,skills:0,attack:0,survive:0},skills:[],parter:[]}}},methods:{fetch:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["b"])(e.id);case 2:a=t.sent,e.model=Object.assign({},e.model,a);case 4:case"end":return t.stop()}}),t)})))()},save:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=5;break}return t.next=3,Object(c["e"])(e.id,e.model);case 3:t.next=7;break;case 5:return t.next=7,Object(c["a"])(e.model);case 7:e.$message({message:"保存成功",type:"success"}),e.id&&e.$router.push("/heros/list");case 9:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;Object(o["b"])().then((function(t){return e.categories=t})),Object(i["c"])().then((function(t){return e.items=t})),Object(c["c"])().then((function(t){return e.heros=t})),this.id&&this.fetch()}},m=u,d=a("2877"),p=Object(d["a"])(m,r,l,!1,null,"6c5771f4",null);t["default"]=p.exports},"8c4a":function(e,t,a){"use strict";a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"e",(function(){return n})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i}));var r=a("1bab");function l(e){return Object(r["a"])({url:"/reset/items",method:"post",data:e})}function s(e){return Object(r["a"])({url:"/reset/items/".concat(e),method:"delete"})}function n(e,t){return Object(r["a"])({url:"/reset/items/".concat(e),method:"put",data:t})}function o(e){return Object(r["a"])({url:"/reset/items/".concat(e),method:"get"})}function i(){return Object(r["a"])({url:"/reset/items",method:"get"})}},a11d:function(e,t,a){"use strict";a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"e",(function(){return n})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i}));var r=a("1bab");function l(e){return Object(r["a"])({url:"/reset/heros",method:"post",data:e})}function s(e){return Object(r["a"])({url:"/reset/heros/".concat(e),method:"delete"})}function n(e,t){return Object(r["a"])({url:"/reset/heros/".concat(e),method:"put",data:t})}function o(e){return Object(r["a"])({url:"/reset/heros/".concat(e),method:"get"})}function i(){return Object(r["a"])({url:"/reset/heros",method:"get"})}},b050:function(e,t,a){"use strict";a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"e",(function(){return n})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i}));var r=a("1bab");function l(e){return Object(r["a"])({url:"reset/categories",method:"post",data:e})}function s(e){return Object(r["a"])({url:"reset/categories/".concat(e),method:"delete"})}function n(e,t){return Object(r["a"])({url:"reset/categories/".concat(e),method:"put",data:t})}function o(){return Object(r["a"])({url:"reset/categories",method:"get"})}function i(e){return Object(r["a"])({url:"reset/categories/".concat(e),method:"get"})}},eecb:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r={data:function(){return{uploadUrl:"http://localhost:3000/admin/api/upload"}},methods:{getAuthHeader:function(){var e=sessionStorage.getItem("token")||"";return{Authorization:"Basic ".concat(e)}}}}}}]);
//# sourceMappingURL=chunk-22eac45a.77408b08.js.map
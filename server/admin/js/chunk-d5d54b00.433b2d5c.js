(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d5d54b00"],{b0c0:function(t,e,n){var r=n("83ab"),c=n("9bf2").f,a=Function.prototype,u=a.toString,o=/^\s*function ([^ (]*)/,i="name";r&&!(i in a)&&c(a,i,{configurable:!0,get:function(){try{return u.call(this).match(o)[1]}catch(t){return""}}})},c2be:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"d",(function(){return a})),n.d(e,"e",(function(){return u})),n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i}));var r=n("1bab");function c(t){return Object(r["a"])({url:"/reset/ads",method:"post",data:t})}function a(t){return Object(r["a"])({url:"/reset/ads/".concat(t),method:"delete"})}function u(t,e){return Object(r["a"])({url:"/reset/ads/".concat(t),method:"put",data:e})}function o(t){return Object(r["a"])({url:"/reset/ads/".concat(t),method:"get"})}function i(){return Object(r["a"])({url:"/reset/ads",method:"get"})}},ca69:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-table",{attrs:{data:t.ads}},[n("el-table-column",{attrs:{prop:"_id",label:"ID",width:"250"}}),n("el-table-column",{attrs:{prop:"name",label:"广告栏"}}),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.$router.push("/ads/edit/"+e.row._id)}}},[t._v("编辑")])]}}])}),n("el-table-column",{attrs:{fixed:"right",label:"删除",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.remove(e.row)}}},[t._v("删除")])]}}])})],1)},c=[],a=(n("b0c0"),n("96cf"),n("1da1")),u=n("c2be"),o={data:function(){return{ads:[]}},methods:{fetch:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["c"])();case 2:t.ads=e.sent;case 3:case"end":return e.stop()}}),e)})))()},remove:function(t){var e=this;this.$confirm('是否删除英雄"'.concat(t.name,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(u["d"])(t._id);case 2:e.$message({type:"success",message:"删除成功!"}),e.fetch();case 4:case"end":return n.stop()}}),n)}))))}},created:function(){this.fetch()}},i=o,s=n("2877"),l=Object(s["a"])(i,r,c,!1,null,"7724ace2",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-d5d54b00.433b2d5c.js.map
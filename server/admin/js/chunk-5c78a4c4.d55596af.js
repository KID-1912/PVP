(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c78a4c4"],{"4ed6":function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"d",(function(){return s})),n.d(t,"e",(function(){return u})),n.d(t,"c",(function(){return c})),n.d(t,"b",(function(){return i}));var r=n("1bab");function a(e){return Object(r["a"])({url:"reset/admin_users",method:"post",data:e})}function s(e){return Object(r["a"])({url:"reset/admin_users/".concat(e),method:"delete"})}function u(e,t){return Object(r["a"])({url:"reset/admin_users/".concat(e),method:"put",data:t})}function c(){return Object(r["a"])({url:"reset/admin_users",method:"get"})}function i(e){return Object(r["a"])({url:"reset/admin_users/".concat(e),method:"get"})}},b088:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(this.id?"编辑":"新建")+"管理员")]),n("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(t){return t.preventDefault(),e.save(t)}}},[n("el-form-item",{attrs:{label:"账号名称"}},[n("el-input",{model:{value:e.model.name,callback:function(t){e.$set(e.model,"name",t)},expression:"model.name"}})],1),n("el-form-item",{attrs:{label:"密码"}},[n("el-input",{attrs:{"show-password":""},model:{value:e.model.password,callback:function(t){e.$set(e.model,"password",t)},expression:"model.password"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("提交")])],1)],1)],1)},a=[],s=(n("96cf"),n("1da1")),u=n("4ed6"),c={props:{id:String},data:function(){return{model:{}}},created:function(){this.id&&this.fetch()},methods:{save:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=5;break}return t.next=3,Object(u["e"])(e.id,e.model);case 3:t.next=7;break;case 5:return t.next=7,Object(u["a"])(e.model);case 7:e.$message({message:"保存成功",type:"success"}),e.id&&e.$router.push("/admin_users/list");case 9:case"end":return t.stop()}}),t)})))()},fetch:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(u["b"])(e.id);case 2:e.model=t.sent;case 3:case"end":return t.stop()}}),t)})))()}}},i=c,o=n("2877"),d=Object(o["a"])(i,r,a,!1,null,"318cc24e",null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-5c78a4c4.d55596af.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e7fe9328"],{"8c4a":function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"d",(function(){return i})),n.d(t,"e",(function(){return o})),n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return s}));var r=n("1bab");function a(e){return Object(r["a"])({url:"/reset/items",method:"post",data:e})}function i(e){return Object(r["a"])({url:"/reset/items/".concat(e),method:"delete"})}function o(e,t){return Object(r["a"])({url:"/reset/items/".concat(e),method:"put",data:t})}function c(e){return Object(r["a"])({url:"/reset/items/".concat(e),method:"get"})}function s(){return Object(r["a"])({url:"/reset/items",method:"get"})}},b906:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.id?"编辑":"新建")+"物品")]),n("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(t){return t.preventDefault(),e.save()}}},[n("el-form-item",{attrs:{label:"名称"}},[n("el-input",{model:{value:e.model.name,callback:function(t){e.$set(e.model,"name",t)},expression:"model.name"}})],1),n("el-form-item",{attrs:{label:"图标"}},[n("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,headers:e.getAuthHeader(),"show-file-list":!1,"on-success":e.afterUpload}},[e.model.icon?n("img",{staticClass:"avatar",attrs:{src:e.model.icon}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),n("el-form-item",[n("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("提交")])],1)],1)],1)},a=[],i=(n("96cf"),n("1da1")),o=n("eecb"),c=n("8c4a"),s={props:{id:String},mixins:[o["a"]],data:function(){return{uploadUrl:"http://localhost:3000/admin/api/upload",model:{}}},methods:{fetch:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["b"])(e.id);case 2:e.model=t.sent;case 3:case"end":return t.stop()}}),t)})))()},afterUpload:function(e){this.$set(this.model,"icon",e.url)},save:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=5;break}return t.next=3,Object(c["e"])(e.id,e.model);case 3:t.next=7;break;case 5:return t.next=7,Object(c["a"])(e.model);case 7:e.$message({message:"保存成功",type:"success"}),e.id&&e.$router.push("/items/list");case 9:case"end":return t.stop()}}),t)})))()}},created:function(){this.id&&this.fetch()}},u=s,l=n("2877"),d=Object(l["a"])(u,r,a,!1,null,"0e5b0bce",null);t["default"]=d.exports},eecb:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r={data:function(){return{uploadUrl:"http://localhost:3000/admin/api/upload"}},methods:{getAuthHeader:function(){var e=sessionStorage.getItem("token")||"";return{Authorization:"Basic ".concat(e)}}}}}}]);
//# sourceMappingURL=chunk-e7fe9328.9dcdd16b.js.map
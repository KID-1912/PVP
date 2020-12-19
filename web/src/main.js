import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'
// css
import 'assets/css/style.scss'

// 页面适配
// 1242px设计稿，1rem = 54px 
const docEle = document.documentElement;
const minDeviceWidth = 320;
const maxDeviceWidth = 540;
setRemUnit();
window.addEventListener('resize', setRemUnit);
window.addEventListener('pageshow', function(e) {
  if (e.persisited) setRemUnit();
})
//计算并设置rem单位
function setRemUnit() {
  var docEleWidth = docEle.clientWidth;
  var w = docEleWidth > maxDeviceWidth ? maxDeviceWidth :
    (docEleWidth < minDeviceWidth ? minDeviceWidth : docEleWidth);
  const remFontsize = (w / 1242) * 54 + 'px';
  docEle.style.fontSize = remFontsize;
}


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
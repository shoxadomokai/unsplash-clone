import Vue from "vue";
import App from "./App.vue";
import VueMasonry from "vue-masonry-css";
import InfiniteLoading from "vue-infinite-loading";
import VueProgressiveImage from "vue-progressive-image";

Vue.config.productionTip = false;
Vue.use(VueProgressiveImage);
Vue.use(VueMasonry);
Vue.use(InfiniteLoading);

new Vue({
  render: (h) => h(App),
}).$mount("#app");

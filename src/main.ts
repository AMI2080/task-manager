import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "./assets/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import { ar } from "vuetify/locale";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import store from "./store";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: "ar",
    messages: { ar },
    rtl: { ar: true },
  },
});

app.use(router);
app.use(vuetify);
app.use(store);

app.mount("#app");

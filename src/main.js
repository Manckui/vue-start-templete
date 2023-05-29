// Vue imports
import { createApp } from "vue"
import App from "./App.vue"

// Plugin imports
import VueScrollTo from "vue-scrollto"
import VueLazyload from "vue-lazyload"

// Local imports
import { createRouter } from "./router"
import { i18n } from "./i18n"

// Style imports
import "./index.css"

// Configuration constants
const MOUNT_ELEMENT_ID = "#app"
const LOADING_IMAGE_PATH = "./assets/images/loading.png"

// Create app
const app = createApp(App)

// Use plugins
app.use(VueScrollTo)
app.use(VueLazyload, {
  preLoad: 1.3,
  loading: LOADING_IMAGE_PATH,
  attempt: 1
})

// Create and use router and i18n
const router = createRouter()
app.use(i18n)
app.use(router)

// Mount app
app.mount(MOUNT_ELEMENT_ID)

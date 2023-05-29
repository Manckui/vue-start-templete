import { createRouter as _createRouter, createWebHistory } from "vue-router"
import { i18n } from "./i18n"
import { paths } from "./paths.js"

// Import pages
const pages = import.meta.glob("./pages/**/*.vue")

// Get component name from path
function getComponentName(path) {
  return path.match(/\.\/pages((?:\/[a-zA-Z0-9_-]+)+)\.vue$/)[1].substring(1)
}

// Build route for a page and language
function buildRoute(page, lang, path, component) {
  return {
    name: page + lang,
    path: "/" + lang + path,
    component: component,
    meta: {
      lang: lang
    }
  }
}

// Generate routes from paths
let routes = Object.keys(paths).flatMap((page) => {
  return Object.keys(paths[page]).flatMap((lang) => {
    return Object.keys(pages)
      .map((path) => {
        const component = getComponentName(path)
        if (component === page) {
          return buildRoute(page, lang, paths[page][lang].path, pages[path])
        }
      })
      .filter(Boolean) // Remove undefined routes
  })
})

// Add root and 404 routes
routes = [
  {
    path: "/",
    redirect: `/${i18n.global.locale.value}`
  },
  ...routes,
  {
    path: "/:lang/:pathMatch(.*)*",
    name: "NotFoundIT",
    component: () => import("./pages/404.vue")
  }
]

// Create router
const router = _createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0)
  }
})

// Add beforeEach navigation guard
router.beforeEach((to, from, next) => {
  const lang = to.meta.lang ?? "it"

  if (lang && i18n.global.locale.value !== lang) {
    i18n.global.locale.value = lang
  }

  if (
    to.path != "/" &&
    (!lang || to.path.substring(1).split("/")[0] !== lang)
  ) {
    next({
      path: "/" + (lang ?? "it") + to.path,
      query: to.query
    })
  } else {
    next()
  }
})

export function createRouter() {
  return router
}

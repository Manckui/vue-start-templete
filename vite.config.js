import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import svgLoader from "vite-svg-loader"
import tailwindcss from "tailwindcss"
import path from "path"

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [vue(), svgLoader()],
    css: {
      postcss: {
        plugins: [tailwindcss]
      },
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "./src/assets/styles/_variables.scss";
        `
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let mainAssetsFolder = __dirname + "/src/assets"
            let fullFolder = path.dirname(assetInfo.name)
            let folder = path.basename(fullFolder)
            if (mainAssetsFolder + "/" + folder !== fullFolder) {
              let ext = path.extname(assetInfo.name)
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                folder = "images"
              } else if (/scss|sass|css/i.test(ext)) {
                folder = "css"
              } else if (/woff?2|ttf|otf|eot/i.test(ext)) {
                folder = "fonts"
              }
            }
            let res = null
            if (folder === "css") {
              res = path.basename(assetInfo.name, ".css") + "-[hash].css"
            } else {
              res = path.basename(assetInfo.name)
            }
            return (
              (command === "build" ? "src/static/jadore" : "") +
              "/" +
              folder +
              "/" +
              res
            )
          },
          chunkFileNames:
            (command === "build" ? "src/static/jadore" : "") +
            "/scripts/[name]-[hash].js",
          entryFileNames: (chunk) => {
            return (
              (command === "build" ? "src/static/jadore" : "") +
              "/scripts/[name]-[hash].js"
            )
          }
        }
      }
    }
  }
})

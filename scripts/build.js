const path = require("path");
const {defineConfig, build} = require("vite");

const Vue = require("@vitejs/plugin-vue");
const VueJSX = require("@vitejs/plugin-vue-jsx");
const dts = require("vite-plugin-dts");
const DefineOptions = require("unplugin-vue-define-options/vite");

function resolve(...urlOrUrls) {
  return path.resolve(rootDir, ...urlOrUrls);
}

const rootDir = path.resolve(__dirname, "../");
const outDir = resolve("packages/lead-portal/dist");

const baseConfig = defineConfig({
  plugins: [
    Vue(),
    VueJSX(),
    DefineOptions(),
    dts({
      include: ["packages/lead-portal", "packages/components"],
      outputDir: path.resolve(outDir, "types")
    })
  ],
  build: {
    lib: {
      entry: resolve("packages/lead-portal/index.ts"),
      name: "lead-portal",
      fileName: format => `index.${format}.js`
    },
    outDir,
    // 解决编译后 vue 引入问题
    commonjsOptions: {
      esmExternals: true
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});

async function main() {
  // build
  await build(baseConfig);
}

main();

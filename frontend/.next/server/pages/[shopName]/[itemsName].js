const CHUNK_PUBLIC_PATH = "server/pages/[shopName]/[itemsName].js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_45f775._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__ee2ec2._.js");
runtime.loadChunk("server/chunks/ssr/src_app_globals_10507a.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/[shopName]/[itemsName].tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/src/pages/_document.tsx [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;

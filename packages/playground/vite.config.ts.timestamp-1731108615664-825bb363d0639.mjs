// vite.config.ts
import { defineConfig } from "file:///Users/calvinlee/Documents/Projects/canary/node_modules/.pnpm/vite@4.4.9_@types+node@22.2.0_sass@1.77.8_terser@5.31.3/node_modules/vite/dist/node/index.js";
import react from "file:///Users/calvinlee/Documents/Projects/canary/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_@swc+helpers@0.5.2_vite@4.4.9_@types+node@22.2.0_sass@1.77.8_terser@5.31.3_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import monacoEditorPlugin from "file:///Users/calvinlee/Documents/Projects/canary/node_modules/.pnpm/vite-plugin-monaco-editor@1.1.0_monaco-editor@0.50.0/node_modules/vite-plugin-monaco-editor/dist/index.js";
import dts from "file:///Users/calvinlee/Documents/Projects/canary/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@22.2.0_rollup@4.21.2_typescript@5.5.3_vite@4.4.9_@types+nod_57e62h5k2nbsxwyhwdyvyv24za/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
import yaml from "file:///Users/calvinlee/Documents/Projects/canary/node_modules/.pnpm/@rollup+plugin-yaml@4.1.2_rollup@4.21.2/node_modules/@rollup/plugin-yaml/dist/es/index.js";
var __vite_injected_original_dirname = "/Users/calvinlee/Documents/Projects/canary/packages/playground";
var external = [
  "react",
  "react-dom",
  "lodash-es",
  "moment",
  "@harnessio/icons-noir",
  "@harnessio/canary",
  "@harnessio/forms",
  "@harnessio/unified-pipeline",
  "react-router-dom"
];
var vite_config_default = defineConfig({
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [
    react(),
    yaml({}),
    dts({
      outDir: "dist",
      tsconfigPath: "./tsconfig.json"
    }),
    monacoEditorPlugin.default({ customWorkers: [{ entry: "monaco-yaml/yaml.worker", label: "yaml" }] })
  ],
  build: {
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "playground",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: { external }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2FsdmlubGVlL0RvY3VtZW50cy9Qcm9qZWN0cy9jYW5hcnkvcGFja2FnZXMvcGxheWdyb3VuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2NhbHZpbmxlZS9Eb2N1bWVudHMvUHJvamVjdHMvY2FuYXJ5L3BhY2thZ2VzL3BsYXlncm91bmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2NhbHZpbmxlZS9Eb2N1bWVudHMvUHJvamVjdHMvY2FuYXJ5L3BhY2thZ2VzL3BsYXlncm91bmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCBtb25hY29FZGl0b3JQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tbW9uYWNvLWVkaXRvcidcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeWFtbCBmcm9tICdAcm9sbHVwL3BsdWdpbi15YW1sJ1xuXG5jb25zdCBleHRlcm5hbCA9IFtcbiAgJ3JlYWN0JyxcbiAgJ3JlYWN0LWRvbScsXG4gICdsb2Rhc2gtZXMnLFxuICAnbW9tZW50JyxcbiAgJ0BoYXJuZXNzaW8vaWNvbnMtbm9pcicsXG4gICdAaGFybmVzc2lvL2NhbmFyeScsXG4gICdAaGFybmVzc2lvL2Zvcm1zJyxcbiAgJ0BoYXJuZXNzaW8vdW5pZmllZC1waXBlbGluZScsXG4gICdyZWFjdC1yb3V0ZXItZG9tJ1xuXVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgZGVmaW5lOiB7ICdwcm9jZXNzLmVudi5OT0RFX0VOVic6ICdcInByb2R1Y3Rpb25cIicgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgeWFtbCh7fSksXG4gICAgZHRzKHtcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgdHNjb25maWdQYXRoOiAnLi90c2NvbmZpZy5qc29uJ1xuICAgIH0pLFxuICAgIG1vbmFjb0VkaXRvclBsdWdpbi5kZWZhdWx0KHsgY3VzdG9tV29ya2VyczogW3sgZW50cnk6ICdtb25hY28teWFtbC95YW1sLndvcmtlcicsIGxhYmVsOiAneWFtbCcgfV0gfSlcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgY29weVB1YmxpY0RpcjogZmFsc2UsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdwbGF5Z3JvdW5kJyxcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnLFxuICAgICAgZm9ybWF0czogWydlcyddXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7IGV4dGVybmFsIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFcsU0FBUyxvQkFBb0I7QUFDelksT0FBTyxXQUFXO0FBQ2xCLE9BQU8sd0JBQXdCO0FBQy9CLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxVQUFVO0FBTGpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU0sV0FBVztBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUSxFQUFFLHdCQUF3QixlQUFlO0FBQUEsRUFDakQsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sS0FBSyxDQUFDLENBQUM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQSxNQUNSLGNBQWM7QUFBQSxJQUNoQixDQUFDO0FBQUEsSUFDRCxtQkFBbUIsUUFBUSxFQUFFLGVBQWUsQ0FBQyxFQUFFLE9BQU8sMkJBQTJCLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUFBLEVBQ3JHO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsSUFDZixLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWUsRUFBRSxTQUFTO0FBQUEsRUFDNUI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

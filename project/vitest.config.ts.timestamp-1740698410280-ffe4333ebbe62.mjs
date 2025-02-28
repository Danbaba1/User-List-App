// vitest.config.ts
import { defineConfig } from "file:///C:/Users/User/Downloads/User-List/project/node_modules/vitest/dist/config.js";
var vitest_config_default = defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/jest-dom-setup.ts", "./src/test/setup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.tsx", "src/**/*.ts"],
      exclude: [
        "src/test/**/*",
        "src/vite-env.d.ts",
        "src/main.tsx",
        "server/**/*"
        // Add this line
      ]
    },
    exclude: ["server", '**/node_modules/**', '**/node-websocket/**']
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVzZXJcXFxcRG93bmxvYWRzXFxcXFVzZXItTGlzdFxcXFxwcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERvd25sb2Fkc1xcXFxVc2VyLUxpc3RcXFxccHJvamVjdFxcXFx2aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9Vc2VyL0Rvd25sb2Fkcy9Vc2VyLUxpc3QvcHJvamVjdC92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIHNldHVwRmlsZXM6IFsnLi9zcmMvdGVzdC9qZXN0LWRvbS1zZXR1cC50cycsICcuL3NyYy90ZXN0L3NldHVwLnRzJ10sXG4gICAgY292ZXJhZ2U6IHtcbiAgICAgIHByb3ZpZGVyOiAnaXN0YW5idWwnLFxuICAgICAgcmVwb3J0ZXI6IFsndGV4dCcsICdqc29uJywgJ2h0bWwnXSxcbiAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoudHN4JywgJ3NyYy8qKi8qLnRzJ10sXG4gICAgICBleGNsdWRlOiBbXG4gICAgICAgICdzcmMvdGVzdC8qKi8qJyxcbiAgICAgICAgJ3NyYy92aXRlLWVudi5kLnRzJyxcbiAgICAgICAgJ3NyYy9tYWluLnRzeCcsXG4gICAgICAgICdzZXJ2ZXIvKiovKicgLy8gQWRkIHRoaXMgbGluZVxuICAgICAgXSxcbiAgICB9LFxuICAgIGV4Y2x1ZGU6IFsnc2VydmVyJ11cbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VCxTQUFTLG9CQUFvQjtBQUUxVixJQUFPLHdCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZLENBQUMsZ0NBQWdDLHFCQUFxQjtBQUFBLElBQ2xFLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFVBQVUsQ0FBQyxRQUFRLFFBQVEsTUFBTTtBQUFBLE1BQ2pDLFNBQVMsQ0FBQyxnQkFBZ0IsYUFBYTtBQUFBLE1BQ3ZDLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLFFBQVE7QUFBQSxFQUNwQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

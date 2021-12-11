module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-paper/babel"],
      ["react-native-reanimated/plugin"],
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json", ".svg", ".jpg"],
          alias: {
            "@assets": "./assets",
            "@components": "./src/components",
            "@config": "./src/config",
            "@routes": "./src/routes",
            "@reducer": "./src/reducer",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  };
};

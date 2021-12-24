// This configuration is used for IDE completion with the babel-plugin-module-resolver plugin
// eslint-disable-next-line no-undef
System.config({
  baseUrl: "./",
  paths: {
    "@/*": ["./src/*"],
    "@assets": ["./assets"],
    "@components": ["./src/components"],
    "@config": ["./src/config"],
    "@routes": ["./src/routes"],
    "@stores": ["./src/stores"],
    "@firebase": ["./src/firebase"],
    "@utils": ["./src/utils"],
  },
});

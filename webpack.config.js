/* eslint-disable global-require */
import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const mode = "development";
export const entry = "./src/index.js";
export const devServer = {
  static: "./dist",
};
export const plugins = [
  new HtmlWebpackPlugin({
    title: "Todo List",
    favicon: "./src/assets/favicon.svg",
  }),
];
export const output = {
  filename: "main.js",
  path: resolve(__dirname, "dist"),
  clean: true,
};
export const module = {
  rules: [
    {
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            implementation: require("sass"),
          },
        },
      ],
    },

    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    },
  ],
};

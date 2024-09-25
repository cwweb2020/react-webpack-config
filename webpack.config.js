const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { watch } = require("fs");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js", // Usa contenthash para generar un hash basado en el contenido del archivo
    clean: true, // Borra los archivos generados en cada compilación
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extrae el CSS a un archivo separado
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext][query]", // Guarda imágenes con hash en el nombre
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Aplica el mismo hash al CSS
    }),
    new BundleAnalyzerPlugin(),
    // new CopyPlugin({
    //   patterns: [{ from: "public/service-worker.js", to: "service-worker.js" }],
    // }),
    // Añade Workbox plugin aquí
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "images-cache",
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            },
          },
        },
        {
          urlPattern: /\.(?:js|css)$/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "static-resources",
          },
        },
        {
          urlPattern: /\/$/,
          handler: "NetworkFirst",
          options: {
            cacheName: "index-html",
          },
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["imagemin-mozjpeg", { quality: 65 }],
              ["imagemin-pngquant", { quality: [0.5, 0.7] }],
            ],
          },
        },
        // Opcional: Borrar los activos originales solo después de que se ha creado la versión optimizada
        deleteOriginalAssets: false,
      }),
    ],
    splitChunks: {
      chunks: "all", // Optimiza todos los chunks (incluso los cargados de forma lazy)
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, "public"),
  //     watch: true,
  //   },
  //   compress: true,
  //   port: 3000,
  //   hot: true, // HMR activado
  //   historyApiFallback: true,
  // },
  devServer: {
    host: "0.0.0.0", // Escucha en todas las interfaces
    publicPath: "/",
    // public: "localhost:3000", // Especifica el host público y el puerto accesibles desde el navegador
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, "public"),
      watch: true,
    },
  },
};

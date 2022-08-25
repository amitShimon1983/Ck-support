/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import path from 'path';
import autoprefixer from 'autoprefixer';
import { EnvironmentPlugin } from 'webpack';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import dotenv from 'dotenv';
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== 'production';

const getPluginsConfig = () => {
  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      templateParameters: {
        VITE_AZURE_CLIENT_ID: '<%= VITE_AZURE_CLIENT_ID %>',
        VITE_AZURE_CLIENT_SCOPE: '<%= VITE_AZURE_CLIENT_SCOPE %>',
        VITE_SERVER_BASE_URL: '<%= VITE_SERVER_BASE_URL %>',
        VITE_EXTERNAL_SITE_END_POINT: '<%= VITE_EXTERNAL_SITE_END_POINT %>',
        VERSION: '<%= VERSION %>',
      },
    }),
    // new BundleAnalyzerPlugin(),
  ];
  return isDevelopment
    ? [
        ...[
          new ReactRefreshPlugin(),
          new EnvironmentPlugin(
            Object.keys(process.env).filter(key => key.startsWith('VITE_') || ['NODE_ENV', 'DEBUG'].includes(key))
          ),
        ],
        ...plugins,
      ]
    : [
        ...[
          new CleanWebpackPlugin(),
          new CopyWebpackPlugin({
            patterns: [{ from: './src/logo.png', to: './assets' }],
          }),
          new MiniCssExtractPlugin({
            chunkFilename: 'assets/[name].[hash].css',
            filename: 'assets/[name].[hash].bundle.css',
          }),
          new CompressionPlugin(),
        ],
        ...plugins,
      ];
};

const getStyleLoaderConfig = () => {
  const loaders = [
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [autoprefixer],
        },
      },
    },
    { loader: 'sass-loader' },
  ];
  return isDevelopment
    ? [{ loader: 'style-loader' }, ...loaders]
    : [{ loader: MiniCssExtractPlugin.loader }, ...loaders];
};

export default {
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : '',
  output: {
    publicPath: process.env.PUBLIC_URL || '/',
    chunkFilename: 'assets/[name].[hash].js',
    filename: 'assets/[name].[hash].bundle.js',
  },
  mode: isDevelopment ? 'development' : 'production',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
  node: {
    module: 'empty',
    fs: 'empty',
  },
  entry: {
    main: './src/main.tsx',
  },
  module: {
    rules: [
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: '@svgr/webpack',
      //     },
      //   ],
      // },
      {
        test: /\.tsx?$/,
        exclude: [path.resolve('./', 'node_modules')],
        use: [
          isDevelopment && {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ].filter(Boolean),
      },
      {
        test: /\.(scss|css)$/,
        use: getStyleLoaderConfig(),
        exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/],
      },
      {
        test: /\.(png|jpg|gif|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader'],
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true,
              },
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                },
                minify: true,
              }),
            },
          },
        ],
      },
    ],
  },
  plugins: getPluginsConfig(),
  resolve: {
    alias: {
      '~': path.resolve('./', 'src/'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        apollo: {
          test(module: any) {
            return module.resource && module.resource.includes('@apollo');
          },
        },
        fluentui: {
          test(module: any) {
            return (
              module.resource &&
              (module.resource.includes('fluentui') ||
                module.resource.includes('office-ui-fabric-react') ||
                module.resource.includes('uifabric'))
            );
          },
        },
        ckeditor: {
          test(module: any) {
            return module.resource && module.resource.includes('ckeditor');
          },
        },
        mixpanel: {
          test(module: any) {
            return module.resource && module.resource.includes('mixpanel');
          },
        },
      },
    },
  },
};

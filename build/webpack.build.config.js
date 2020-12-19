const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const targetPath = '../src/components';

const baseConfig = {
  entry: {
    'button1': path.resolve(__dirname, `${targetPath}/button1/index.tsx`),
    'button2': path.resolve(__dirname, `${targetPath}/button2/index.tsx`)
  },
  mode: 'production',
  output: {
    filename: (pathData) => {
      return `${pathData.chunk.name}/index.js`
    },
    publicPath: '/',
    path: path.resolve(__dirname, '../lib'),
    library: '[name]',
    libraryExport: "default",
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.scss', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            context: path.resolve(__dirname, targetPath),
            name: '[name].[ext]',
            publicPath: '../images',
            outputPath: (url, resourcePath, context) => {
              const relativePath = path.relative(context, resourcePath);
              return `../lib/${relativePath}`
            },
            esModule: false,
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['lib/**/*'], {
      root: process.cwd(),
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        return `${pathData.chunk.name}/css/index.css`
      }
    })
  ]
};

webpack(baseConfig, (err, stats) => {
  if (err) {
    console.log(err)
    return;
  }
  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    performance: false
  }));
});

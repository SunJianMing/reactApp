var path = require('path')
var webpack = require('webpack')

var htmlWebpackPlugin = require('html-webpack-plugin')
var cleanWebpackPlugin = require('clean-webpack-plugin')

var dfPath = {
  src:path.resolve(__dirname,'src'),
  common:path.resolve(__dirname,'src/common'),
  components:path.resolve(__dirname,'src/components'),
  layout:path.resolve(__dirname,'src/layout'),
  view:path.resolve(__dirname,'src/view'),
  root:path.resolve(__dirname,'./'),
  semantic:path.resolve(__dirname,'./semantic')
}

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/'),
        publicPath: './'
    },
    devtool: 'cheap-module-eval-source-map',
    module:{
      rules:[
        {
          test:/\.js$/,
          use:'babel-loader',
          include:[
            dfPath.src,
            dfPath.semantic
        ]
        },{
          test:/\.css$/,
          use:['style-loader','css-loader']
        },{
          test:/\.(ttf|woff2|woff|eot|svg)$/,
          use:'url-loader'
        },
        {
          test:/\.scss$/,
          use:[
            'style-loader',
            {
              loader:'css-loader',
              options:{
                limit:5000,
                modules:true,
                localIdentName:'[local]--[hash:base64:6]'
              }
            },
            'sass-loader'
          ]
        },
        {
          test:/\.(png|jpe?g|gif)$/,
          use:[{
            loader:'url-loader',
            options:{
              limit:50000,
              name:'img/[name]-[hash:7].[ext]'
            }
          }]
        }
      ]
    },
    resolve:{
      modules:[
        'node_modules',
        dfPath.src,
        dfPath.common,
        dfPath.components,
        dfPath.layout,
        dfPath.view,
        dfPath.root
      ]
    },
    plugins: [
      new htmlWebpackPlugin({
        title:'App',
        filename: 'index.html',
         template: './src/index.html'
       }),
      new cleanWebpackPlugin([path.resolve(__dirname,'dist')]),
      new webpack.ProvidePlugin({
        React:'react',
        ReactDom:'react-dom',
        axios:'axios',
        $:'jquery',
        jQuery:'jquery',
      })
    ],
    devServer:{
      port:9999,
      contentBase:'./src',
      publicPath:'/',
      historyApiFallback:true,
      open:true
    }
}

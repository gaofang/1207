# 1207
天方前端公共组件库
## install
npm install 1207 -S
##  config
add these code to module:{loaders:[<--code-->]}
<code>
{
        test: /\.js$/,
        loaders: ['babel'],
        include: [path.join(__dirname, '../src'), path.join(__dirname, '../node_modules/1207')]
      },
      {
        test: /\.css?$/,
        include: [path.join(__dirname, '../src'), path.join(__dirname, '../node_modules/1207')],
        loaders: ['style?sourceMap',
          'css?-minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      },
<code/>
## common components
### DataLoading

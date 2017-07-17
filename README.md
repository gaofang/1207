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
数据加载中的转圈圈样式
### Pagging
监听页面滚动位置 配置页面title
### DatePanel
日期选择器 可以选择年 年月 年月日
### SinglePicker
单项选择器
### DoublePicker
双项选择器
### TipBox
需要点击关闭的白色弹框
### Toast
顶部灰条Toast
### Warning
带ICON的居中灰色toast

### webpack 4打包配置
#### 包括功能如下：
* babel
* postcss
* sass
* 缓存（js变化时，只有js文件hash发生变化；css变化时，只有css文件hash发生变化）（WebpackMd5Hash）
* css抽成独立文件（MiniCssExtractPlugin）
* 自动生成包含js，css引用的html（HtmlWebpackPlugin）

#### 命令如下
```
npm start ：启动本地服务，端口默认9000
npm run dev ：开发环境编译
npm run build ：生成环境编译
```

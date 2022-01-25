const a=require("html-webpack-plugin"),b=require("mini-css-extract-plugin"),c=require("copy-webpack-plugin"),d=require("path"),webpack=require("webpack");module.exports={entry:"./src/app.js",output:{filename:"bundle.js",path:d.resolve(__dirname,"dist"),publicPath:"/"},plugins:[new a({hash:!0,title:"Webpack Example App",header:"Webpack Example Title",metaDesc:"Webpack Example Description",template:"./src/index.html",filename:"index.html",inject:"body"}),new webpack.ProvidePlugin({$:"jquery",jQuery:"jquery","window.jQuery":"jquery"}),new b({filename:"[name].css",chunkFilename:"[id].css",ignoreOrder:!1}),new c({patterns:[{from:"src/img",to:"img"},{from:"src/fonts",to:"fonts"}],options:{concurrency:50}})],mode:"development",output:{clean:!0},devServer:{static:{directory:d.resolve(__dirname,"dist")},open:!0,devMiddleware:{writeToDisk:!0}},module:{rules:[{test:/\.(png|svg|jpg|jpeg|gif)$/i,type:"asset/resource"},{test:/\.(css)$/,use:["style-loader","css-loader"]},{test:/\.scss$/,include:[d.resolve(__dirname,"src","scss")],use:[{loader:"style-loader"},{loader:b.loader,options:{esModule:!1}},{loader:"css-loader"},{loader:"postcss-loader"},{loader:"sass-loader"}]}]}};
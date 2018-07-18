module.exports = {

  // This is the entry point or start of our react applicaton
  entry: "./resources/js/index.js",

  // The plain compiled JavaScript will be output into this file
  output: {
    filename: "public/bundle.js"
  },

  // This section desribes the transformations we will perform
  module: {
    loaders: [
      {
        // Only working with files that in in a .js or .jsx extension
        test: /\.jsx?$/,
        // Webpack will only process files in our app folder. This avoids processing
        // node modules and server files unnecessarily
        include: /resources/,
        loader: "babel-loader",
        query: {
          // These are the specific transformations we'll be using.
          presets: ["react", "latest","stage-0"]
        }
      },
      {
        test: /\.json$/,
				include: /resources/,
				loader: "json-loader"
      },
      {
				test: /\.css$/,
				loader: "style-loader!css-loader!autoprefixer-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
              'file-loader',
              {
              loader: 'image-webpack-loader',
              options: {
                        bypassOnDebug: true, // webpack@1.x
                        disable: true, // webpack@2.x and newer
                      },
              },
            ],
      }
    ]
  },
  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js
  devtool: "eval-source-map"
};

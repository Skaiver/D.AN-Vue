// const path = require('path')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')

/*
 * 
 * 
 *  DO NOT USE THIS FILE FOR CONFIGURATION IN THIS PROJECT!!!
 *  -> use "vite.config.ts" instead!
 * 
 * 
*/

module.exports = {
  // ...other vue-cli plugin options...
  // publicPath: '/D.AN-Vue/',
  // outputDir: 'dist/D.AN-Vue/',
  // configureWebpack: () => {
  //   return {
  //     plugins: [
  //       new PrerenderSPAPlugin({
  //         staticDir: path.join(__dirname, 'dist'),
  //         outputDir: path.join(__dirname, '/dist/D.AN-Vue/'),
  //         indexPath: path.join(__dirname, 'dist/D.AN-Vue/index.html'),
  //         routes: ['/D.AN-Vue', '/D.AN-Vue/dashboard', '/D.AN-Vue/export', '/D.AN-Vue/import', '/D.AN-Vue/settings']
  //       })
  //     ]
  //   }
  // },
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    }
  }
}
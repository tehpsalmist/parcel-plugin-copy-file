const path = require('path')
const fs = require('fs')

module.exports = function (bundler) {
  bundler.on('bundled', bundle => {
    const bundleDir = path.dirname(bundle.name || bundler.mainBundle.childBundles.values().next().value.name)

    fs.copyFile(path.resolve(process.cwd(), 'plugin.json'), path.resolve(bundleDir, 'plugin.json'), err => err && console.error(err))
  })
}

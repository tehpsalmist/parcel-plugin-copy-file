const path = require('path')
const fs = require('fs')

module.exports = function (bundler) {
  bundler.on('bundled', bundle => {
    const bundleDir = path.dirname(bundle.name || bundler.mainBundle.childBundles.values().next().value.name)

    const file = path.resolve(process.cwd(), 'plugin.json')

    fs.copyFile(file, path.resolve(bundleDir, 'plugin.json'), err => err && console.error(err))

    for (const childBundle of bundle.childBundles) {
      bundler.watch(file, childBundle.entryAsset)
    }
  })
}

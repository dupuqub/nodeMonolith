
'use strict'

//......................................................................................................................

const toolbox = require('./toolbox')
const hasKey = toolbox.hasKey
const sum = toolbox.sum

//......................................................................................................................

module.exports = files =>
{
  const checkEveryHtml = type =>
  {
    const passing = files[type].map(hasKey('html')).reduce(sum)
    const total = files[type].length

    return passing === total
  }

  const passing = files.types.map(checkEveryHtml).reduce(sum)
  const total = files.types.length

  return passing === total
}


'use strict'

//......................................................................................................................

module.exports = (files , filesToLoad) =>
{
  const sum     = (a , b) => a + b
  const content = file    => files[file.name]

  return filesToLoad.map(content).reduce(sum)
}


'use strict'

//......................................................................................................................

const fs = require('fs')
const files = require('./server/files')
const loaded = require('./server/loaded')
const initialize = require('./server/initialize')

//......................................................................................................................

files.types = Object.keys(files)

//......................................................................................................................

files.types.forEach(type =>
{
  files[type].forEach(file =>
  {
    fs.readFile(file.path , 'utf8' , (error , contents) =>
    {
      if (error) return 'error'

      file.html = contents

      if (loaded(files)) initialize(files)
    })
  })
})


'use strict'

//......................................................................................................................

const fs          = require('fs')
const http        = require('http')
const filesToLoad = require('./js/server/filesToLoad')
const monolith    = require('./js/server/monolith')
const writeFiles  = require('./js/server/writeFiles')

//......................................................................................................................

const files =
{
  css : {loaded : 0} ,
  js  : {loaded : 0} ,
}

//......................................................................................................................

const app = (request , response) =>
{
  const status = 200
  const type   = {'Content-Type' : 'text/html'}
  const css    = writeFiles(files.css , filesToLoad.css)
  const js     = writeFiles(files.js , filesToLoad.js)

  response.writeHead(status , type)
  response.write(monolith(css , js))
  response.end()
}

//......................................................................................................................

const initialize = () => http.createServer(app).listen(8888)

//......................................................................................................................

const loadFile = (path , name , type) =>
{
  const checkLoaded = () =>
  {
    const cssLoaded = files.css.loaded === filesToLoad.css.length
    const jsLoaded  = files.js.loaded === filesToLoad.js.length

    if (cssLoaded && jsLoaded) initialize()
  }

  const loader = (error , contents) =>
  {
    if (error) return 'error'

    files[type][name] = contents
    files[type].loaded += 1

    checkLoaded()
  }

  fs.readFile(path , 'utf8' , loader)
}

//......................................................................................................................

Object.keys(files).forEach(type =>
{
  filesToLoad[type].forEach(file =>
  {
    loadFile(file.path , file.name , type)
  })
})

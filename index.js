
'use strict'

//......................................................................................................................

const fs   = require('fs')
const http = require('http')

//......................................................................................................................

const handler = (request , response) =>
{
  const status = 200
  const type   = {'Content-Type' : 'text/html'}
  const page   =
  `
    <!doctype html>
    <html class = "center">

      <head>
        <meta charset = "utf-8">
        <title>dunp</title>
      </head>

      <body>
      </body>

      <style>${files.cssRoot}</style>
      <style>${files.cssBasic}</style>
      <style>${files.cssClass}</style>
      <style>${files.cssId}</style>

      <script>${files.jsRoot}</script>

    </html>
  `

  response.writeHead(status , type)
  response.write(page)
  response.end()
}

//......................................................................................................................

const initialize = () => http.createServer(handler).listen(8888)

//......................................................................................................................

const loadFile = (path , name) =>
{
  const loader = (error , contents) =>
  {
    if (error) return 'error'

    files[name] = contents
    files.loaded += 1

    const allLoaded = files.loaded === filesToLoad.length

    if (allLoaded) initialize()
  }

  fs.readFile(path , 'utf8' , loader)
}

//......................................................................................................................

const files       = {loaded : 0}
const filesToLoad =
[
  {path : './css/root.css' , name : 'cssRoot'} ,
  {path : './css/basic.css' , name : 'cssBasic'} ,
  {path : './css/class.css' , name : 'cssClass'} ,
  {path : './css/id.css' , name : 'cssId'} ,

  {path : './js/root.js' , name : 'jsRoot'} ,
]

//......................................................................................................................

filesToLoad.forEach(file => loadFile(file.path , file.name))


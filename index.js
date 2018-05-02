
'use strict'

//......................................................................................................................

const fs   = require('fs')
const http = require('http')

//......................................................................................................................

const app = (request , response) =>
{
  const status = 200
  const type   = {'Content-Type' : 'text/html'}
  const text   =

`
<!doctype html>

<html class = "center">

<head>
  <meta charset = "utf-8">
  <title>dunp</title>
</head>

<body>
  <div id = "screen">
</body>

<!--.................................................................................................................-->

<style>
${writeFiles('css')}
</style>

<!--.................................................................................................................-->

<script> 'use strict'
${writeFiles('js')}
</script>

</html>
`

  response.writeHead(status , type)
  response.write(text)
  response.end()
}

//......................................................................................................................

const writeFiles = type =>
{
  const sum     = (a , b) => a + b
  const content = file => files[type][file.name]

  return filesToLoad[type].map(content).reduce(sum)
}

//......................................................................................................................

const loadFile = (path , name , type) =>
{
  const loader = (error , contents) =>
  {
    if (error) return 'error'

    files[type][name] = contents
    files[type].loaded += 1

    const cssLoaded = files.css.loaded === filesToLoad.css.length
    const jsLoaded  = files.js.loaded === filesToLoad.js.length
    const allLoaded = cssLoaded && jsLoaded

    if (allLoaded) initialize()
  }

  fs.readFile(path , 'utf8' , loader)
}

//......................................................................................................................

const initialize = () => http.createServer(app).listen(8888)

//......................................................................................................................

const files =
{
  css : {loaded : 0} ,
  js  : {loaded : 0} ,
}

const filesToLoad =
{
  css :
  [
    {path : './css/root.css'  , name : 'root'} ,
    {path : './css/class.css' , name : 'class'} ,
    {path : './css/id.css'    , name : 'id'} ,
  ] ,

  js :
  [
    {path : './js/root.js' , name : 'root'} , // must be first

    {path : './js/views/main.js' , name : 'viewsMain'} ,

    {path : './js/resize.js' , name : 'resize'} ,
    {path : './js/html.js'   , name : 'html'} ,
    {path : './js/index.js'  , name : 'index'} , // must be last
  ] ,
}

//......................................................................................................................

Object.keys(files).forEach(type =>
{
  filesToLoad[type].forEach(file =>
  {
    loadFile(file.path , file.name , type)
  })
})

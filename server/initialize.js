
'use strict'

//......................................................................................................................

const http = require('http')
const monolith = require('./monolith')
const toolbox = require('./toolbox')
const only = toolbox.only
const sum = toolbox.sum

//......................................................................................................................

module.exports = files =>
{
  const css = files.css.map(only('html')).reduce(sum)
  const js = files.js.map(only('html')).reduce(sum)

  const app = (request , response) =>
  {
    response.end(monolith(css , js))
  }

  http.createServer(app).listen(8888)
}

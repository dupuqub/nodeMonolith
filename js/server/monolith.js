
'use strict'

//......................................................................................................................

module.exports = (css , js) =>

`<!doctype html>

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
${css}
</style>

<!--.................................................................................................................-->

<script> 'use strict'
${js}
</script>

</html>`

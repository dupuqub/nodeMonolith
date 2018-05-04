
'use strict'

//......................................................................................................................

module.exports =
{
  sum : (a , b) => a + b ,
  only : key => item => item[key] ,
  hasKey : key => item => item[key] !== undefined ,
}

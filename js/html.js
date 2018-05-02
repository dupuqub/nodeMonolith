
//......................................................................................................................

P.html.get    = query => document.querySelector(query)
P.html.getAll = query => document.querySelectorAll(query)

//......................................................................................................................

P.html.write = content =>
{
  const gates =
  {
    on : container =>
    {
      P.html.get(container).innerHTML = content
    }
  }

  return gates
}

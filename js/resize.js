
//......................................................................................................................

P.resize = () =>
{
  const name   = P.state.view
  const view   = P.views[name]
  const screen = view.screen
  const aspect = screen.aspect

  //....................................................................................................................
  // calculations

  const space =
  {
    w : window.innerWidth ,
    h : window.innerHeight ,
  }

  const unit =
  {
    w : space.w / screen.w ,
    h : space.h / screen.h ,
  }

  const vertical = unit.w < unit.h

  const w = ! aspect ? screen.w : vertical ? space.w : unit.h * screen.w
  const h = ! aspect ? screen.h : ! vertical ? space.h : unit.w * screen.h
  const u = ! aspect ? 1 : (w + h) / 2000

  //....................................................................................................................
  // store useful information for easy access

  P.info.body = {w , h}
  P.info.unit = u

  //....................................................................................................................
  // change the body

  const body = P.html.get('body')

  body.style.width = w + 'px'
  body.style.height = h + 'px'
}

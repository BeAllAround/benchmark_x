

function _js_spreadoperator(n, ...arguments) {
  // console.log(n)
  if(n===10000) {
    return n
  }
  return _js_spreadoperator(n+1, ...arguments)
}

function js_spreadoperator(n, arguments) {
  if(n===10000) {
    return n
  }
  return js_spreadoperator(n+1, arguments)
  
}


(function main(argc, argv) {
  let args = []
  for(let i = 0; i < 1000; i++)
    args.push(i)

  let start = Date.now()
  // RangeError: Maximum call stack size exceeded
  // TODO: WHY?
  // let x = _js_spreadoperator(0,...args)
  let x = js_spreadoperator(0, args)
  console.log( x )
  console.log(Date.now() - start)
})(process.argv.length, process.argv)

const { trace_memory } = require('../lib/trace_memory')

// > node --stack-size=65500 main.js

let N = 1000

function _js_spreadoperator(n, ...args) {
  // console.log(n)
  if(n===N) {
    // process.stdin()
    return n
  }
  return _js_spreadoperator(n+1, ...args)
}

function js_spreadoperator(n, args) {
  if(n===N) {
    return n
  }
  return js_spreadoperator(n+1, args)
  
}

function trace_spread(...args) {
  trace_memory(() => {
    _js_spreadoperator(0, ...args)
  }, { verbose: true, unit: 'MB' } )

  trace_memory(() => {
    js_spreadoperator(0, args)
  }, { verbose: true, unit: 'MB', fix_decimal: 2 })

}

(function main(argc, argv) {
  let args = []
  for(let i = 0; i < 1000; i++)
    args.push(i)

  let start = Date.now()

  trace_spread(...args)
  // RangeError: Maximum call stack size exceeded
  // TODO: WHY?

  // let x = _js_spreadoperator(0, ...args)
  // let x = js_spreadoperator(0, args)
  // console.log( x )
  console.log(Date.now() - start)

})(process.argv.length, process.argv)

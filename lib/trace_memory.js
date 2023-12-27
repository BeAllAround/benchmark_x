const {
  converter_units,
  units_supported
}  = require('./convert_memory_units')


function throw_error(message) {
  throw new Error(message)
}

async function trace_memory(func, options, ...args) {
  const memoryUsage = {}
  const memoryDataBefore = process.memoryUsage()

  const start_time = Date.now()

  await func(...args)

  const end_time = Date.now() - start_time

  const memoryData = process.memoryUsage()

  const unit = (options.unit || 'B').toUpperCase()
  const fix_decimal = options.fix_decimal == null ? 3 : options.fix_decimal

  for(let key in memoryData)
    memoryUsage[key] = formatMemoryUsage(memoryData[key] - memoryDataBefore[key])

  function formatMemoryUsage(data) {
    units_supported[unit]==null && throw_error(`Unit "${unit}" not supported!`)
    return converter_units(data, 'B', unit, fix_decimal)
  }

  memoryUsage.time = end_time

  options &&
    options.verbose===true &&
    log()

  function log() {
    console.log(func.name + ' memoryUsage:', memoryUsage)
  }


  return memoryUsage
}

module.exports = {
  trace_memory,
}



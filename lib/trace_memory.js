const {
  converter_units,
  units_supported
}  = require('./convert_memory_units')


function throw_error(message) {
  throw new Error(message)
}

async function trace_memory(func, options, ...args) {
  const memoryDataBefore = process.memoryUsage()

  await func(...args)

  const memoryData = process.memoryUsage()
  const memoryUsage = {}

  const unit = (options.unit || 'B').toUpperCase()
  const fix_decimal = options.fix_decimal == null ? 3 : options.fix_decimal

  for(let key in memoryData)
    memoryUsage[key] = formatMemoryUsage(memoryData[key] - memoryDataBefore[key])

  function formatMemoryUsage(data) {
    units_supported[unit]==null && throw_error(`Unit "${unit}" not supported!`)
    return converter_units(data, 'B', unit, fix_decimal)
  }

  options &&
    options.verbose===true &&
    console.log(func.name + ' memoryUsage:', memoryUsage)

  return memoryUsage
}

module.exports = {
  trace_memory,
}



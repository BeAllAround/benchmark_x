const units_supported = {
  'B': 0,
  'KB': 1,
  'MB': 2,
  'GB': 3,
  'TB': 4,
}

function round_max(num, _max) {
  return Math.floor(num * Math.pow(10, _max)) / Math.pow(10, _max)
}

function converter_units(size, from_unit, to_unit, fix_decimal = 3) {

  if(from_unit == to_unit) return size + ' ' + to_unit

  if(to_unit == 'B') {
    let start = 0, end = units_supported[from_unit]
    if(start < end) {
      size *= Math.pow(1024, end-start)
    }
  } else {
    let start = units_supported[from_unit],
      end = units_supported[to_unit]

    if(start < end) {
      size /= Math.pow(1024, end-start)
    } else if(end < start) {
      size *= Math.pow(1024, start-end)
    }

  }

  return round_max(size, fix_decimal) + ' ' + to_unit

}

module.exports = {
  converter_units,
  units_supported
}

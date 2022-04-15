const json2csv = require('json2csv')

const resultToCsv = (result, res) => {
  if (!Array.isArray(result)) {
    res.status(400)
    res.json('Az eredmény nem alakítható csv-vé. Array of object szükséges.')
    return 
  }

  const isAllValuePrimitive = Object.entries(result[0]).reduce((acc, [k, v]) => {
    return (typeof v !== 'object' || k === '_id') && acc
  }, true)

  if (!isAllValuePrimitive){
    res.status(400)
    res.json('A (nested) eredmény nem alakítható csv-vé. Array of object szükséges, ahol az objectek értékei primitív értékek.')
    return         
  }


  res.header('Content-Type', 'text/csv');
  result = json2csv.parse(result)
  res.send(result)
  return
}

module.exports = resultToCsv

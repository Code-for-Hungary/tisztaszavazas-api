const express = require('express')
const parseQuery = require('../functions/parseQuery')
const authorization = require('../middlewares/authorization')
const Models = require('../schemas')
const getPrevNextLinks = require('../functions/getPrevNextLinks')
const parseStringObject = require('../functions/parseStringObject')


const router = express.Router();

const DEFAULT_LIMIT = 20;

router.all('*', authorization)
let SzavazasEgyebs, db;

router.all('*', (req, res, next) => { 
  db = req.headers['x-valasztas-kodja'] || process.env.DEFAULT_DB
  const [valasztasAzonosito, version = 'latest'] = db.split('_')
  SzavazasEgyebs = Models.SzavazasEgyeb[valasztasAzonosito][version]
  if (!SzavazasEgyebs){
    res.status(400)
    res.json({'error': `Hibás választás kód: '${db}'` })
    return
  }
  next()
})

router.all('/:id?', async (req, res) => {
  try {
    let {
      params: { id },
      query,
      body,
      headers,
    } = req;

    const numParse = headers['x-num-parse'] === 'true'

    let limit, skip, result, totalCount
    query = parseQuery(query, db, numParse)

    ;({
      limit = DEFAULT_LIMIT,
      skip = 0,
      ...query
    } = query)

    if (id) {
      result = await SzavazasEgyebs.findById(id)
      totalCount = 1
    } else if (body && body.query){
      try {
        const aggregations = parseStringObject(body.query)
        result = await SzavazasEgyebs.aggregate(aggregations)
      } catch(error){
        result = error.message
      }
    } else {
      let aggregations = [
        { $match: query },
        { $skip: skip },
        { $limit: limit },
      ] 

      ;([{ result, totalCount }] = await SzavazasEgyebs.aggregate([{
        $facet: {
          result: aggregations,
          totalCount: [{ $match: query },{ $count: 'totalCount' }] }
      }]))

      totalCount = totalCount && totalCount[0] && totalCount[0].totalCount   
    }

    const prevNextLinks = getPrevNextLinks({
      route: 'szavazas-egyeb',
      skip,
      limit,
      query,
      totalCount
    })

    res.header({...prevNextLinks})
    res.header('X-Total-Count', totalCount)  
    res.json(result);
  } catch (error) {
    console.log(error)
    res.status(404);
    res.json('Szavazatok not found')
  }
});

module.exports = router;

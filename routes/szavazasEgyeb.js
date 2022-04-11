const express = require('express')
const parseQuery = require('../functions/parseQuery')
const authorization = require('../middlewares/authorization')
const Models = require('../schemas')
const getPrevNextLinks = require('../functions/getPrevNextLinks')
const parseStringObject = require('../functions/parseStringObject')


/**
* @api {get} /szavazas-egyeb/ 1.) Szavazás egyéb
* @apiName szavazas-egyeb
* @apiGroup 5. Szavazás egyéb
* @apiDescription Az érvénytelen és lebélyegzetlen szavazólapok
*
* @apiParam (Request Parameters) {Number} [limit] Csak a megadott számú találatot adja vissza (default: `20`)
* @apiParam (Request Parameters) {Number} [skip] A lapozáshoz használható paraméter. (default: `0`)
* @apiParam (Request Parameters) {Number|String|Regex|Query} [queryParameters] A rekordok bármely paramétere alapján lehet szűkíteni a listát.
* @apiHeader (Request Headers) Authorization A regisztrációkor kapott kulcs
* @apiHeader (Request Headers) X-Valasztas-Kodja A választási adatbázis kiválasztása (Lehetsésges értékek: 2018-es országgyűlési: `ogy2018`, 2022-es országgyűlési: `ogy2022`)
* @apiHeader (Response Headers) X-Total-Count A szűrési feltételeknek megfelelő, a válaszban lévő összes elem a lapozási beállításoktől függetlenül
* @apiHeader (Request Headers) [X-Num-Parse] A numerikus értékeket integerként kezeli 
* @apiHeader (Response Headers) X-Prev-Page A `limit` és `skip` paraméterekkel meghatározott lapozás következő oldala
* @apiHeader (Response Headers) X-Next-Page A `limit` és `skip` paraméterekkel meghatározott lapozás előző oldala
*
* @apiSuccessExample {json} Success-Response:
*  HTTP/1.1 200 OK
*[
*   {
*       "_id": "6253a193e2cb28add339cd32",
*       "szavazokor": {
*           "_id": "620ed7332fdd2c590712bca7",
*           "szavazokorSzama": "001",
*           "kozigEgyseg": {
*               "kozigEgysegNeve": "Budapest I. kerület",
*               "telepulesKod": "001",
*               "megyeKod": "01",
*               "megyeNeve": "BUDAPEST",
*               "letszam": {
*                   "indulo": 20090,
*                   "honos": 19809,
*                   "atjel": 137,
*                   "atjelInnen": 261,
*                   "kuvi": 184,
*                   "osszesen": 19946
*               }
*           },
*           "valasztokerulet": {
*               "szam": "01",
*               "leiras": "BUDAPEST, 01. számú OEVK",
*               "_id": "620ed5672fdd2c590712afd4"
*           }
*       },
*       "darabszam": 12,
*       "kategoria": "Érvénytelen szavazólapok",
*       "jeloles": {
*           "pozicio": "Egyéni választókerületi képviselő"
*       },
*       "__v": 0
*   },
* @apiSampleRequest off
*/

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

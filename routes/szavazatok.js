const express = require('express')
const parseQuery = require('../functions/parseQuery')
const authorization = require('../middlewares/authorization')
const Models = require('../schemas')
const getPrevNextLinks = require('../functions/getPrevNextLinks')
const parseStringObject = require('../functions/parseStringObject')
const { mapSzavazatIdResult } = require('../functions/szkProjectionAndMap')
const resultToCsv = require('../functions/resultToCsv')

/**
* @api {get} /szavazatok/ 1.) Az összes eredmény
* @apiName szavazatok
* @apiGroup 4. Szavazatok
* @apiDescription A jelöltekre leadott szavazatok listája
*
* @apiParam (Request Parameters) {Number} [limit] Csak a megadott számú találatot adja vissza (default: `20`)
* @apiParam (Request Parameters) {Number} [skip] A lapozáshoz használható paraméter. (default: `0`)
* @apiParam (Request Parameters) {Number|String|Regex|Query} [queryParameters] A rekordok bármely paramétere alapján lehet szűkíteni a listát.
* @apiHeader (Request Headers) Authorization A regisztrációkor kapott kulcs
* @apiHeader (Request Headers) X-Valasztas-Kodja A választási adatbázis kiválasztása (Lehetsésges értékek: 2018-es országgyűlési: `ogy2018`, 2022-es országgyűlési: `ogy2022`)
* @apiHeader (Request Headers) [Accept] Alaphelyzetben üres, ilyenkor JSON-t ad vissza. Beállítható `text/csv`, ekkor csv-t ad vissza, amennyiben a body adatstruktúrája megfelelő (array of objects with primitive values).
* @apiHeader (Response Headers) X-Total-Count A szűrési feltételeknek megfelelő, a válaszban lévő összes elem a lapozási beállításoktől függetlenül
* @apiHeader (Request Headers) [X-Num-Parse] A numerikus értékeket integerként kezeli 
* @apiHeader (Response Headers) X-Prev-Page A `limit` és `skip` paraméterekkel meghatározott lapozás következő oldala
* @apiHeader (Response Headers) X-Next-Page A `limit` és `skip` paraméterekkel meghatározott lapozás előző oldala
*
* @apiSuccessExample {json} Success-Response:
*  HTTP/1.1 200 OK
*  [
*     {
*        "_id": "624f29bff7d1c72624c0cdc4",
*        "szavazokor": {
*            "_id": "620ed7332fdd2c590712bca7",
*            "szavazokorSzama": "001",
*            "kozigEgyseg": {
*                "kozigEgysegNeve": "Budapest I. kerület",
*                "telepulesKod": "001",
*                "megyeKod": "01",
*                "megyeNeve": "BUDAPEST",
*                "_id": "620ed5682fdd2c590712b03e"
*            },
*            "valasztokerulet": {
*                "szam": "01",
*                "leiras": "BUDAPEST, 01. számú OEVK",
*                "_id": "620ed5672fdd2c590712afd4"
*            }
*        },
*        "jeloles": {
*            "pozicio": "Egyéni választókerületi képviselő",
*            "jelolt": "BÖRÖCZ LÁSZLÓ",
*            "jelolo": [
*                {
*                    "_id": "624f29bff7d1c72624c0cdc5",
*                    "tipus": "Közös pártlista",
*                    "szervezet": [
*                        {
*                            "_id": "624f29bff7d1c72624c0cdc6",
*                            "rovidNev": "FIDESZ"
*                        },
*                        {
*                            "_id": "624f29bff7d1c72624c0cdc7",
*                            "rovidNev": "KDNP"
*                        }
*                    ]
*                }
*            ]
*        },
*        "ervenyesSzavazat": 446,
*        "__v": 0
*    },
*   ]
* @apiSampleRequest off
*/

const router = express.Router();

const DEFAULT_LIMIT = 20;

router.all('*', authorization)
let Szavazats, db;

router.all('*', (req, res, next) => { 
  db = req.headers['x-valasztas-kodja'] || process.env.DEFAULT_DB
  const [valasztasAzonosito, version = 'latest'] = db.split('_')
  Szavazats = Models.Szavazat[valasztasAzonosito][version]
  if (!Szavazats){
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
      result = await Szavazats.findById(id)
      totalCount = 1
      result = mapSzavazatIdResult(result['_doc'], numParse)
    } else if (body && body.query){
      try {
        const aggregations = parseStringObject(body.query)
        result = await Szavazats.aggregate(aggregations)
        try {
          result = result.map(entry => mapSzavazatIdResult(entry, numParse))
        } catch(error){
          console.log('mapQueryResult cannot be applied in szavazatok')
        }
      } catch(error){
        console.log(error)
        result = error.message
      }
    } else {
      let aggregations = [
        { $match: query },
        { $skip: skip },
        { $limit: limit },
      ] 

      ;([{ result, totalCount }] = await Szavazats.aggregate([{
        $facet: {
          result: aggregations,
          totalCount: [{ $match: query },{ $count: 'totalCount' }] }
      }]))

      result = result.map(entry => mapSzavazatIdResult(entry, numParse))
      totalCount = totalCount && totalCount[0] && totalCount[0].totalCount   
    }

    const prevNextLinks = getPrevNextLinks({
      route: 'eredmenyek',
      skip,
      limit,
      query,
      totalCount
    })

    res.header({...prevNextLinks})
    res.header('X-Total-Count', totalCount)  

    if (headers.accept === 'text/csv'){
      return resultToCsv(result, res)
    }

    res.json(result);
  } catch (error) {
    console.log(error)
    res.status(404);
    res.json('Szavazatok not found')
  }
});

module.exports = router;

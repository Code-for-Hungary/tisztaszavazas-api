import express from 'express';
import { Types } from 'mongoose';
import schemas from '../schemas';
import parseQuery from '../functions/parseQuery';
import getSortObject from '../functions/getSortObject';
import authorization from '../middlewares/authorization';
import getSzkAggregationFilter from '../functions/getSzkAggregationFilter';
import { getProjection, mapQueryResult, mapIdResult } from '../functions/szkProjectionAndMap';
import reduceResultByRegex from '../functions/reduceResultByRegex';
import getPrevNextLinks from '../functions/getPrevNextLinks';

/**
 * @api {get} /szavazokorok/ 1.) Összes szavazókör
 * @apiName szavazokorok2
 * @apiGroup Szavazókörök
 *
 * @apiParam (Request Parameters) {Number} [limit] Csak a megadott számú találatot adja vissza (default: `20`)
 * @apiParam (Request Parameters) {Number} [skip] A lapozáshoz használható paraméter. (default: `0`)
 * @apiParam (Request Parameters) {Number|String|Regex|Query} [queryParameters] A rekordok bármely paramétere alapján lehet szűkíteni a listát. Használatukról bővebben a [3. pont](#api-Szavazókörök-szavazokorok3) alatt.
 * @apiHeader (Request Headers) Authorization A regisztrációkor kapott kulcs
 * @apiHeader (Request Headers) [X-Valasztas-Kodja] A választási adatbázis kiválasztása (default: `onk2019`)
 * @apiHeader (Request Headers) [X-Iterating-Query] Több paraméteres lekérdezéskor használható. `true` értéknél az API a paraméterenket egyenként alkalmazza (az általunk megadott sorrendet tartva), ezáltal fokozatosan szűkítve a keresést. Eredményként az utolsó, nem üres eredményt kapjuk vissza.
 * @apiHeader (Response Headers) X-Total-Count A szűrési feltételeknek megfelelő, a válaszban lévő összes elem a lapozási beállításoktől függetlenül
 * @apiHeader (Response Headers) X-Prev-Page A `limit` és `skip` paraméterekkel meghatározott lapozás következő oldala
 * @apiHeader (Response Headers) X-Next-Page A `limit` és `skip` paraméterekkel meghatározott lapozás előző oldala
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *     {
 *       "_id": "5e77c3f08723e7a7b25c411a",
 *       "szavazokorSzama": 1,
 *       "kozigEgyseg": {
 *           "megyeNeve": "Hajdú-Bihar",
 *           "kozigEgysegNeve": "Balmazújváros",
 *           "link": "/kozigegysegek/006f6e6b32303139232d"
 *       },
 *       "szavazokorCime": "Batthyány utca 7. (Veres Péter Gimnázium)",
 *       "akadalymentes": true,
 *       "valasztokerulet": {
 *           "leiras": "Balmazújváros 1. számú EVK",
 *           "szam": 1
 *       },
 *       "valasztokSzama": 1035,
 *       "__v": 1
 *   },
 *   {
 *       "_id": "5e77c3f08723e7a7b25c411b",
 *       "szavazokorSzama": 2,
 *       "kozigEgyseg": {
 *           "megyeNeve": "Hajdú-Bihar",
 *           "kozigEgysegNeve": "Balmazújváros",
 *           "link": "/kozigegysegek/006f6e6b32303139232d"
 *       },
 *       "szavazokorCime": "Batthyány utca 7. (Veres Péter Gimnázium)",
 *       "akadalymentes": true,
 *       "valasztokerulet": {
 *           "leiras": "Balmazújváros 1. számú EVK",
 *           "szam": 1
 *       },
 *       "valasztokSzama": 760,
 *       "__v": 1
 *   },
 * ...
 * ]
 * @apiSampleRequest off
 */


/**
 * @api {get} /szavazokorok/:id? 2.) Egy szavazókör összes adata
 * @apiName szavazokorok
 * @apiGroup Szavazókörök
 *
 * @apiParam {String} id A szavazókör azonosítója az adatbázisban
 * @apiHeader (Request Headers) Authorization A regisztrációkor kapott kulcs
 * @apiHeader (Request Headers) [X-Valasztas-Kodja] A választási adatbázis kiválasztása (default: `onk2019`)
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  
 *{
 *    "_id": "5e77c3f18723e7a7b25c5f72",
 *    "szavazokorSzama": 24,
 *    "kozigEgyseg": {
 *        "megyeNeve": "Somogy",
 *        "kozigEgysegNeve": "Kaposvár",
 *        "kozigEgysegSzavazokoreinekSzama": 59,
 *        "link": "/kozigegysegek/006f6e6b323031393af3"
 *    },
 *    "szavazokorCime": "Búzavirág utca 21. (Kinizsi Lakótelepi Tagiskola",
 *    "akadalymentes": true,
 *    "valasztokSzama": 1345,
 *    "valasztokerulet": {
 *        "leiras": "Kaposvár 2. számú EVK",
 *        "szam": 2
 *    },
 *    "kozteruletek": [
 *        {
 *            "leiras": "Füredi utca 53 - 67 2 2",
 *            "kozteruletNev": "Füredi utca",
 *            "kezdoHazszam": 53,
 *            "vegsoHazszam": 6722,
 *            "megjegyzes": "Páratlan házszámok"
 *        },
 *        {
 *            "leiras": "Kinizsi lakótelep",
 *            "kozteruletNev": "Kinizsi lakótelep",
 *            "kezdoHazszam": 0,
 *            "vegsoHazszam": 9999,
 *            "megjegyzes": "Teljes közterület"
 *        }
 *    ],
 *    "frissitveValasztasHun": "2020-01-09T14:49:48.000Z",
 *    "valasztasHuOldal": "/vhupage/5e77c3f18723e7a7b25c5f72",
 *    "updatedAt": "2020-04-12T07:47:23.094Z",
 *    "__v": 1
 *}
 * 
 * 
 * @apiSampleRequest off
 */

/**
 * @api {get} /szavazokorok?param={value|query} 3.) Szavazókörök keresése paraméter alapján
 * @apiName szavazokorok3
 * @apiGroup Szavazókörök
 * 
 * @apiHeader (Request Headers) Authorization A regisztrációkor kapott kulcs
 * @apiHeader (Request Headers) [X-Valasztas-Kodja] A választási adatbázis kiválasztása (default: `onk2019`)
 * @apiHeader (Request Headers) [X-Iterating-Query] Több paraméteres lekérdezéskor használható. `true` értéknél az API a paraméterenket egyenként alkalmazza (az általunk megadott sorrendet tartva), ezáltal fokozatosan szűkítve a keresést. Eredményként az utolsó, nem üres eredményt kapjuk vissza.
 * @apiHeader (Response Headers) X-Total-Count A szűrési feltételeknek megfelelő, a válaszban lévő összes elem a lapozási beállításoktől függetlenül
 * @apiHeader (Response Headers) X-Prev-Page A `limit` és `skip` paraméterekkel meghatározott lapozás következő oldala
 * @apiHeader (Response Headers) X-Next-Page A `limit` és `skip` paraméterekkel meghatározott lapozás előző oldala
 * 
 * @apiParam (Request Parameters) {String|Regex} [textFields] Szöveget tartalmazó mezők. (pl: megyenév: `kozigEgyseg.megyeNeve`, település vagy budapesti kerület neve: `kozigEgyseg.kozigEgysegNeve`, szavazókör címe: `szavazokorCime`, a szavazókörhöz tartozó utcák, terek stb nevei: `kozteruletek.kozteruletNev` stb.). Lekérdezhetőek teljes egyezésre (pl: `kozigEgyseg.kozigEgysegNeve=Barcs`) vagy reguláris kifejezéssel (regexel) (pl. `kozteruletek.kozteruletNev=/^hunyadi/i`)
 * @apiParam (Request Parameters) {Number|Query} [numericFields] Numberikus mezők (pl: a szavazókör száma: `szavazokorSzama`, a szavazókörbe tartozó legkisebb házszám egy adott közterületen: `kozteruletek.kezdoHazszam`, a szavazókörbe tartozó legnagyobb házszám: `kozteruletek.vegsoHazszam`, a szavazókör névjegyzékében szereplők száma: `valasztokSzama` stb). Lekérdezhető pontos egyezésre (pl. `szavazokorSzama=4`) vagy operátorok segítségével, mint: `kozteruletek.kezdoHazszam={ $lt: 22 }`, azaz a kezdő házszám kisebb, mint 22. A következő operátorok használhatók: `$gt`, `$gte`, `$lt`, `$lte`, `$eq`, `$ne`;
 * @apiParam (Request Parameters) {Number} [skip] A lapozáshoz használható paraméter. (default: `0`)
 * @apiParam (Request Parameters) {Number} [limit] Csak a megadott számú találatot adja vissza (default: `20`)
 * 
 * @apiExample {curl} Example usage:
 *   curl --location --request GET 'http://api.tisztaszavazas.hu/szavazokorok?\
 *     kozigEgyseg.kozigEgysegNeve=/Hajd%C3%BAhadh%C3%A1z/&\
 *     kozteruletek.kozteruletNev=/Bercs%C3%A9nyi/&\
 *     kozteruletek.kezdoHazszam={%20$lte:%2022%20}&\
 *     kozteruletek.vegsoHazszam={%20$gt:%2022%20}&\
 *     kozteruletek.megjegyzes=P%C3%A1ros%20h%C3%A1zsz%C3%A1mok' \
 *     --header 'Authorization: {jwt-token} \
 * 
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *   [
 *     {
 *         "_id": "5e77c3f08723e7a7b25c4089",
 *         "szavazokorSzama": 6,
 *         "kozigEgyseg": {
 *             "megyeNeve": "Hajdú-Bihar",
 *             "kozigEgysegNeve": "Hajdúhadház"
 *         },
 *         "kozteruletek": [
 *             {
 *                 "leiras": "Bercsényi utca 14 - 60",
 *                 "kozteruletNev": "Bercsényi utca",
 *                 "kezdoHazszam": 14,
 *                 "vegsoHazszam": 60,
 *                 "megjegyzes": "Páros házszámok"
 *             }
 *         ]
 *     }
 *   ]
 * @apiSampleRequest off
 */


const DEFAULT_LIMIT = 20;
const DEFAULT_SORT = 'kozigEgyseg.megyeKod,kozigEgyseg.telepulesKod,szavazokorSzama'

const router = express.Router()

router.all('*', authorization)

let Szavazokors, KozigEgysegs, db, kozigEgysegNeve, megyeNeve;

router.all('*', (req, res, next) => {
  db = req.headers['x-valasztas-kodja'] || process.env.DEFAULT_DB
  const [valasztasAzonosito, version] = db.split('_')
  Szavazokors = schemas.Szavazokor[valasztasAzonosito][version] || schemas.Szavazokor[valasztasAzonosito].latest
  KozigEgysegs = schemas.KozigEgyseg[valasztasAzonosito][version] || schemas.KozigEgyseg[valasztasAzonosito].latest

  
  if (!Szavazokors){
    res.status(400)
    res.json({'error': `Hibás választás kód: '${db}'` })
    return
  }
  next()
})


const getSzavazokorCount = async ({ kozigEgyseg }) => {
  const count = await Szavazokors.aggregate([
    { $match: { "kozigEgyseg._id": kozigEgyseg._id }},
    { $count: 'kozigEgysegSzavazokoreinekSzama' }
  ])
  return count && count[0] && count[0].kozigEgysegSzavazokoreinekSzama
}


router.get('/:szavazokorId?', async (req, res) => {
  let {
    params: { szavazokorId },
    query,
    body
  } = req;

  let limit, projection, sort, skip, totalCount;

  query = parseQuery(query)

  ;({ limit = DEFAULT_LIMIT, skip = 0, sort = DEFAULT_SORT, ...query } = query)

  sort = getSortObject(sort)

  try {
    let result;
    if (szavazokorId) {
      projection = getProjection(req.user, 'byId')
      totalCount = 1

      result = await Szavazokors.findById(szavazokorId, projection)

      let kozigEgysegSzavazokoreinekSzama = null;
      
      if (result && result.kozigEgyseg) {
        const { kozigEgyseg } = result
        kozigEgysegSzavazokoreinekSzama = await getSzavazokorCount({ kozigEgyseg })
        result = mapIdResult(result, db, kozigEgysegSzavazokoreinekSzama)
      }
    } else if (Object.keys(body).length){
      try {
        const aggregations = body
        result = await Szavazokors.aggregate(aggregations)
        result = mapQueryResult(result, query, db)

      } catch(error){
        result = error.message
      }
    } else if (!Object.keys(query).length) {
      projection = getProjection(req.user, 'noQuery')
      totalCount = await Szavazokors.estimatedDocumentCount()
      result = await Szavazokors.find({}, projection).sort(sort).skip(skip).limit(limit)

      result = mapQueryResult(result, query, db)
    } else {
      
      const [filterCond, regexStreetToFilter] = getSzkAggregationFilter(query);

      if (filterCond && filterCond.length){
        projection = {
          _id: 1,
          kozteruletek: {
            $filter: {
              input: '$kozteruletek',
              as: 'kozteruletek',
              cond: {
                $and: filterCond
              }
            }
          },
          ...getProjection(req.user, 'filterStreet')
        }
      } else if (regexStreetToFilter) {
        projection = getProjection(req.user, 'withRegex')
      } else {
        projection = getProjection(req.user, 'withQuery')       
      }


      Object.keys(query).forEach(key => {
        if (projection[key] === 0) delete projection[key]
      })      

      let aggregations = [
        { $match: query },
        { $project: projection },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
      ];

      if (!req.headers['x-iterating-query']) {
        ;([{ result, totalCount }] = await Szavazokors.aggregate([{
          $facet: {
            result: aggregations,
            totalCount: [{ $match: query },{ $count: 'totalCount' }] }
        }]))

        totalCount = totalCount && totalCount[0] && totalCount[0].totalCount
  
        if (!totalCount) result = []
  
        result = reduceResultByRegex(result, regexStreetToFilter, projection)
      } else {
        let $match;
        ;([ { $match }, ...aggregations] = aggregations)
        const [facet] = Object.entries($match).reduce((acc, [key, value], i) => {
          acc[1] = { ...acc[1], [key]: value }
          acc[0] = {
            ...acc[0],
            [`result${i}`]: [
              { $match: acc[1] },
              ...aggregations
            ]
          }
          return acc
        }, [{}, {}])

        let [results] = await Szavazokors.aggregate([{
          $facet: facet
        }])

        results = Object.values(results)
        result = results[0]

        for (let r of results) {
          if (r.length) result = r
        }

        const resultAfterRegex = reduceResultByRegex(result, regexStreetToFilter, projection)
        result = resultAfterRegex.length ? resultAfterRegex : result
      }

      if (regexStreetToFilter && totalCount <= limit){
        totalCount = result.length
      } else if (regexStreetToFilter){
        totalCount = undefined
      }

      let szkSzamIfLengthOne;
      
      if (result.length === 1) {
        szkSzamIfLengthOne = await getSzavazokorCount({ kozigEgyseg: result[0].kozigEgyseg })
      }

      result = mapQueryResult(result, query, db, szkSzamIfLengthOne)
    }

    const prevNextLinks = getPrevNextLinks({
      route: 'szavazokorok',
      skip,
      limit,
      query,
      totalCount
    })

    res.header({...prevNextLinks})
    res.header('X-Total-Count', totalCount)
    res.status(result && result.length ? 200 : 404)
    res.json(result || 'Szavazokor not found')
  } catch(error) {
    console.log(error)
    res.json({ error: error.message })
  }
})

export default router;
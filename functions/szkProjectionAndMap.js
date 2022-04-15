const mapKozteruletek = kozteruletek => kozteruletek && kozteruletek.map(({
  leiras, kozteruletNev, kezdoHazszam, vegsoHazszam, megjegyzes
}) => ({ leiras, kozteruletNev, kezdoHazszam, vegsoHazszam, megjegyzes }))

const getProjection = ({ roles }, context) => {
  const isAdmin = roles && roles.includes('admin')

  let projection = {
    sourceHtmlUpdated: 0,
    parsedFromSrcHtml: 0,
    createdAt: 0,
    vhuUrl: 0,
    polygonUrl: 0,
		helyadatok: 0
  }

  switch (context) {
    case 'withQuery':
    case 'noQuery': return ({
      kozteruletek: 0,
      sourceHtmlUpdated: 0,
      frissitveValasztasHun: 0,
      parsedFromSrcHtml: 0,
      vhuUrl: 0,
      polygonUrl: 0,
      createdAt: 0,
      updatedAt: 0,
      valasztasAzonosito: 0,
      helyadatok: 0
    })

    case 'filterStreet': return ({
      szavazokorSzama: 1,
      'kozigEgyseg._id': 1,
      'kozigEgyseg.kozigEgysegNeve': 1,
      'kozigEgyseg.megyeNeve': 1,
      'kozigEgyseg.megyeKod': 1,
      'kozigEgyseg.telepulesKod': 1,
      'valasztokerulet': 1,
      szavazokorCime: 1,
    })

    case 'withRegex': return ({
      ...projection,
      frissitveValasztasHun: 0,
      szavazokorCime: 0,
      valasztokSzama: 0,
      // valasztokerulet: 0,
      akadalymentes: 0,
      telepulesSzintu: 0,
      szamlKijelolt: 0,
      atjKijelolt: 0,
      updatedAt: 0,
      helyadatok: 0
    })

    case 'byId':
    default:
      if (isAdmin) {
        delete projection['kozigEgyseg.megyeKod']
        delete projection['kozigEgyseg.telepulesKod']
        delete projection.polygonUrl
        delete projection.vhuUrl
      }
      return projection
  }
}

const mapQueryResult = (result, query, numParse) => {
  return result.map(({
    _id,
    __v,
    ...doc
}) => {
  doc = doc._doc || doc

  const {
    kozigEgyseg,
    szavazokorSzama,
    kozteruletek,
    szavazokorCime,
    akadalymentes,
    telepulesSzintu,
    szamlKijelolt,
    atjKijelolt,
    valasztokerulet,
    valasztokSzama,
    korzethatar,
    szavazohelyisegHelye,
    ...rest
  } = doc

  const entry = {
    _id,
    szavazokorSzama: numParse ? parseInt(szavazokorSzama) : szavazokorSzama,
    kozigEgyseg: {
      _id: kozigEgyseg['_id'],
      ...kozigEgyseg,
      telepulesKod: numParse ? parseInt(kozigEgyseg.telepulesKod) : kozigEgyseg.telepulesKod,
      megyeKod: numParse ? parseInt(kozigEgyseg.megyeKod) : kozigEgyseg.megyeKod,
      __v: undefined,
      linc: `/kozigegysegek/${kozigEgyseg['_id']}`
    },
    szavazokorCime,
    akadalymentes,
    telepulesSzintu,
    szamlKijelolt,
    atjKijelolt,
    valasztokerulet: {
      ...valasztokerulet,
      szam: numParse ? parseInt(valasztokerulet.szam) : valasztokerulet.szam
    },
    kozteruletek: mapKozteruletek(kozteruletek),
    valasztokSzama,
    korzethatar,
    szavazohelyisegHelye,
    __v
  }

  Object.keys(query).forEach(key => {
    key = key.split('.')[0]
    if (rest[key]) entry[key] = rest[key]
  })           

  return entry
})}

const mapIdResult = (
  {
    _id,
    szavazokorSzama,
    valasztokerulet,
    kozigEgyseg,
    szavazokorCime,
    akadalymentes,
    telepulesSzintu,
    szamlKijelolt,
    atjKijelolt,
    valasztokSzama,
    kozteruletek,
    frissitveValasztasHun,
    updatedAt,
    helyadatok,
    korzethatar,
    szavazohelyisegHelye,
    valasztas,
    __v
  }, db, kozigEgysegSzavazokoreinekSzama, numParse
  ) => ({
    _id,
    szavazokorSzama: numParse ? parseInt(szavazokorSzama) : szavazokorSzama,
    kozigEgyseg: {
      _id: kozigEgyseg['_id'],
      kozigEgysegNeve: kozigEgyseg.kozigEgysegNeve,
      megyeNeve: kozigEgyseg.megyeNeve,
      kozigEgysegSzavazokoreinekSzama,
      link: `/kozigegysegek/${kozigEgyseg['_id']}`
    },
    szavazokorCime,
    akadalymentes,
    telepulesSzintu,
    szamlKijelolt,
    atjKijelolt,
    valasztokSzama,
    valasztokerulet: {
      ...valasztokerulet,
      szam: numParse ? parseInt(valasztokerulet.szam) : valasztokerulet.szam
    },
    kozteruletek: mapKozteruletek(kozteruletek),
    helyadatok,
    korzethatar,
    szavazohelyisegHelye,
    frissitveValasztasHun,
    valasztasHuOldal: `/vhupage/${db}/${_id}`,
    valasztas,
    updatedAt,
    __v
})

const mapSzavazatIdResult = ({
  _id,
  szavazokor,
  jeloles,
  ervenyesSzavazat,
}, numParse) => {
  return {
    _id,
    szavazokor: {
      _id: szavazokor._id,
      szavazokorSzama: numParse ? parseInt(szavazokor.szavazokorSzama) : szavazokor.szavazokorSzama,
      kozigEgyseg: {
        kozigEgysegNeve: szavazokor.kozigEgyseg.kozigEgysegNeve,
        telepulesKod: numParse ? parseInt(szavazokor.kozigEgyseg.telepulesKod) : szavazokor.kozigEgyseg.telepulesKod,
        megyeKod: numParse ? parseInt(szavazokor.kozigEgyseg.megyeKod) : szavazokor.kozigEgyseg.megyeKod,
        megyeNeve: szavazokor.kozigEgyseg.megyeNeve,
        letszam: szavazokor.kozigEgyseg.letszam,
      },
      valasztokerulet: {
        _id: szavazokor.valasztokerulet._id,
        szam: numParse ? parseInt(szavazokor.valasztokerulet.szam) : szavazokor.valasztokerulet.szam,
        leiras: szavazokor.valasztokerulet.leiras
      }
    },
    jeloles,
    ervenyesSzavazat,
  }
}

module.exports = {
  getProjection,
  mapQueryResult,
  mapIdResult,
  mapSzavazatIdResult,
}
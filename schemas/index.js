const { model, Schema } = require('mongoose')

const SzavazokorUrlSchema = new Schema()
const SzavazokorSchema = new Schema()
const KozigEgysegSchema = new Schema()
const ValasztokeruletSchema = new Schema()
const SzavazatSchema = new Schema()
const ValasztasSchema = new Schema()
const SzavazasEgyeb = new Schema()

const onk2019_v1_szavazokor_url = model('onk2019_v1_szavazokor_url', SzavazokorUrlSchema)
const onk2019_v2_szavazokor_url = model('onk2019_v2_szavazokor_url', SzavazokorUrlSchema)
const ogy2018_v1_szavazokor_url = model('ogy2018_v1_szavazokor_url', SzavazokorUrlSchema)
const ogy2018_v2_szavazokor_url = model('ogy2018_v2_szavazokor_url', SzavazokorUrlSchema)
const idbo620_v1_szavazokor_url = model('idbo620_v1_szavazokor_url', SzavazokorUrlSchema)

const onk2019_v1_kozigegyseg = model('onk2019_v1_kozigegyseg', KozigEgysegSchema)
const onk2019_v2_kozigegyseg = model('onk2019_v2_kozigegyseg', KozigEgysegSchema)
const ogy2018_v1_kozigegyseg = model('ogy2018_v1_kozigegyseg', KozigEgysegSchema)
const ogy2018_v2_kozigegyseg = model('ogy2018_v2_kozigegyseg', KozigEgysegSchema)
const idbo620_v1_kozigegyseg = model('idbo620_v1_kozigegyseg', KozigEgysegSchema)
const ogy2022_v1_kozigegyseg = model('ogy2022_v1_kozigegyseg', new Schema({}, { collection: 'ogy2022_v1_kozigegysegs' }))

const onk2019_v1_valasztokerulet = model('onk2019_v1_valasztokerulet', ValasztokeruletSchema)
const onk2019_v2_valasztokerulet = model('onk2019_v2_valasztokerulet', ValasztokeruletSchema)
const ogy2018_v1_valasztokerulet = model('ogy2018_v1_valasztokerulet', ValasztokeruletSchema)
const ogy2018_v2_valasztokerulet = model('ogy2018_v2_valasztokerulet', ValasztokeruletSchema)
const idbo620_v1_valasztokerulet = model('idbo620_v1_valasztokerulet', ValasztokeruletSchema)
const ogy2022_v1_valasztokerulet = model('ogy2022_v1_valasztokerulet', new Schema({}, { collection: 'ogy2022_v1_valasztokerulets' }))
const epv2024_v1_valasztokerulet = model('epv2024_v1_valasztokerulet', new Schema({}, { collection: 'epv2024_v1_valasztokerulets' }))

const onk2019_v1_szavazokor = model('onk2019_v1_szavazokor', SzavazokorSchema)
const onk2019_v2_szavazokor = model('onk2019_v2_szavazokor', SzavazokorSchema)
const ogy2018_v1_szavazokor = model('ogy2018_v1_szavazokor', SzavazokorSchema)
const ogy2018_v2_szavazokor = model('ogy2018_v2_szavazokor', SzavazokorSchema)
const idbo620_v1_szavazokor = model('idbo620_v1_szavazokor', SzavazokorSchema)
const ogy2022_v1_szavazokor = model('ogy2022_v1_szavazokor', new Schema({}, { collection: 'ogy2022_v1_szavazokors' }))

const ogy2018_v2_szavazat = model('ogy2018_v2_szavazat', SzavazatSchema)
const ogy2022_v1_szavazat = model('ogy2022_v1_szavazat', SzavazatSchema)
const ogy2022_v2_szavazat = model('ogy2022_v2_szavazat', SzavazatSchema)

const valasztasok = model('valasztasok', ValasztasSchema)

const ogy2022_v2_szavazas_egyeb = model('ogy2022_v2_szavazas_egyeb', SzavazasEgyeb)



module.exports = {
  SzavazokorUrl: {
    onk2019: {
      v1: onk2019_v1_szavazokor_url,
      v2: onk2019_v2_szavazokor_url,
      latest: onk2019_v2_szavazokor
    },
    ogy2018: {
      v1: ogy2018_v1_szavazokor_url,
      v2: ogy2018_v2_szavazokor_url,
      latest: ogy2018_v1_szavazokor
    },
    idbo620: {
      v1: idbo620_v1_szavazokor_url,
      latest: idbo620_v1_szavazokor_url,
    }
  },
  Szavazokor: {
    onk2019: {
      v1: onk2019_v1_szavazokor,
      v2: onk2019_v2_szavazokor,
      latest: onk2019_v2_szavazokor
    },
    ogy2018: {
      v1: ogy2018_v1_szavazokor,
      v2: ogy2018_v2_szavazokor,
      latest: ogy2018_v2_szavazokor,
    },
    idbo620: {
      v1: idbo620_v1_szavazokor,
      latest: idbo620_v1_szavazokor,
    },
    ogy2022: {
      v1: ogy2022_v1_szavazokor,
      latest: ogy2022_v1_szavazokor,
    }
  },
  KozigEgyseg: {
    onk2019: {
      v1: onk2019_v1_kozigegyseg,
      v2: onk2019_v2_kozigegyseg,
      latest: onk2019_v2_kozigegyseg,
    },
    ogy2018: {
      v1: ogy2018_v1_kozigegyseg,
      v2: ogy2018_v2_kozigegyseg,
      latest: ogy2018_v2_kozigegyseg,
    },
    idbo620: {
      v1: idbo620_v1_kozigegyseg,
      latest: idbo620_v1_kozigegyseg,
    },
    ogy2022: {
      v1: ogy2022_v1_kozigegyseg,
      latest: ogy2022_v1_kozigegyseg,
    }
  },
  Valasztokerulet: {
    onk2019: {
      v1: onk2019_v1_valasztokerulet,
      v2: onk2019_v2_valasztokerulet,
      latest: onk2019_v2_valasztokerulet
    },
    ogy2018: {
      v1: ogy2018_v1_valasztokerulet,
      v2: ogy2018_v2_valasztokerulet,
      latest: ogy2018_v2_valasztokerulet
    },
    idbo620: {
      v1: idbo620_v1_valasztokerulet,
      latest: idbo620_v1_valasztokerulet,
    },
    ogy2022: {
      v1: ogy2022_v1_valasztokerulet,
      latest: ogy2022_v1_valasztokerulet,
    },
    epv2024: {
      v1: epv2024_v1_valasztokerulet,
      latest: epv2024_v1_valasztokerulet
    }
	},
	Szavazat: {
		ogy2018: {
      v2: ogy2018_v2_szavazat,
      latest: ogy2018_v2_szavazat
		},
		ogy2022: {
      v1: ogy2022_v1_szavazat,
      v2: ogy2022_v2_szavazat,
      latest: ogy2022_v2_szavazat
		}
	},
	Valasztas: valasztasok,
  SzavazasEgyeb: {
    ogy2022: {
      v2: ogy2022_v2_szavazas_egyeb,
      latest: ogy2022_v2_szavazas_egyeb
    }
  }
}

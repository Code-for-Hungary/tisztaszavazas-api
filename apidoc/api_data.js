define({ "api": [
  {
    "type": "get",
    "url": "/kozigegysegek/",
    "title": "1.) Összes közigazgatási egység",
    "name": "kozigegysegek2",
    "group": "1._Közigegységek",
    "parameter": {
      "fields": {
        "Request Parameters": [
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Csak a megadott számú találatot adja vissza (default: <code>20</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>A lapozáshoz használható paraméter. (default: <code>0</code>)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Request Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A regisztrációkor kapott kulcs</p>"
          },
          {
            "group": "Request Headers",
            "optional": true,
            "field": "X-Valasztas-Kodja",
            "description": "<p>A választási adatbázis kiválasztása. (Lehetsésges értékek: 2019-es önkormányzati: <code>onk2019</code>, 2018-as országgyűlési: <code>ogy2018</code>, 2020-as borsodi időközi: <code>idbo620</code>)</p>"
          }
        ],
        "Response Headers": [
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Total-Count",
            "description": "<p>A szűrési feltételeknek megfelelő, a válaszban lévő összes elem a lapozási beállításoktől függetlenül</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Prev-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás következő oldala</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Next-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás előző oldala</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n   {\n     \"_id\": \"006f6e6b3230313903f2\",\n     \"megyeNeve\": \"Budapest\",\n     \"kozigEgysegNeve\": \"Budapest X.ker\",\n     \"kozigEgysegSzavazokoreinekSzama\": 76\n   },\n   {\n     \"_id\": \"006f6e6b3230313903f3\",\n     \"megyeNeve\": \"Budapest\",\n     \"kozigEgysegNeve\": \"Budapest XI.ker\",\n     \"kozigEgysegSzavazokoreinekSzama\": 115\n   },\n\t\t...\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/kozigegysegek.js",
    "groupTitle": "1._Közigegységek"
  },
  {
    "type": "get",
    "url": "/kozigegysegek/:id?",
    "title": "2.) Egy közigazgatási egység összes adata",
    "name": "kozigegysegek3",
    "group": "1._Közigegységek",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>A közigazgatási egység azonosítója az adatbázisban</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Request Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A regisztrációkor kapott kulcs</p>"
          },
          {
            "group": "Request Headers",
            "optional": true,
            "field": "X-Valasztas-Kodja",
            "description": "<p>A választási adatbázis kiválasztása (lásd fent)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n \n{\n  \"_id\": \"006f6e6b3230313903f2\",\n  \"megyeNeve\": \"Budapest\",\n  \"kozigEgysegNeve\": \"Budapest X.ker\",\n  \"kozigEgysegSzavazokoreinekSzama\": 76,\n  \"szavazokorok\": [\n    {\n      \"szavazokorSzama\": 1,\n      \"link\": \"/szavazokorok/5e77c3f08723e7a7b25c47c6\"\n    },\n    {\n      \"szavazokorSzama\": 2,\n      \"link\": \"/szavazokorok/5e77c3f08723e7a7b25c47c7\"\n    },\n  ...\n    {\n      \"szavazokorSzama\": 76,\n      \"link\": \"/szavazokorok/5e77c3f08723e7a7b25c47c9\"\n    }\n  ],\n  \"kozteruletek\": [\n    {\n      \"kozteruletNev\": \"Agyagfejtő utca\",\n      \"kozteruletSzavazokorei\": \"/szavazokorok?kozigEgyseg.kozigEgysegNeve=Budapest%20X.ker&kozteruletek.kozteruletNev=Agyagfejt%C5%91%20utca\"\n    },\n    {\n      \"kozteruletNev\": \"Akna utca\",\n      \"kozteruletSzavazokorei\": \"/szavazokorok?kozigEgyseg.kozigEgysegNeve=Budapest%20X.ker&kozteruletek.kozteruletNev=Akna%20utca\"\n    },\n ...\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/kozigegysegek.js",
    "groupTitle": "1._Közigegységek"
  },
  {
    "type": "get",
    "url": "/szavazokorok/:id?",
    "title": "2.) Egy szavazókör összes adata",
    "name": "szavazokorok",
    "group": "2._Szavazókörök",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>A szavazókör azonosítója az adatbázisban</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Request Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A regisztrációkor kapott kulcs</p>"
          },
          {
            "group": "Request Headers",
            "optional": true,
            "field": "X-Valasztas-Kodja",
            "description": "<p>A választási adatbázis kiválasztása (lásd fent)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n \n{\n   \"_id\": \"5e77c3f18723e7a7b25c5f72\",\n   \"szavazokorSzama\": 24,\n   \"kozigEgyseg\": {\n       \"megyeNeve\": \"Somogy\",\n       \"kozigEgysegNeve\": \"Kaposvár\",\n       \"kozigEgysegSzavazokoreinekSzama\": 59,\n       \"link\": \"/kozigegysegek/006f6e6b323031393af3\"\n   },\n   \"szavazokorCime\": \"Búzavirág utca 21. (Kinizsi Lakótelepi Tagiskola\",\n   \"akadalymentes\": true,\n   \"valasztokSzama\": 1345,\n   \"valasztokerulet\": {\n       \"leiras\": \"Kaposvár 2. számú EVK\",\n       \"szam\": 2\n   },\n   \"kozteruletek\": [\n       {\n           \"leiras\": \"Füredi utca 53 - 67 2 2\",\n           \"kozteruletNev\": \"Füredi utca\",\n           \"kezdoHazszam\": 53,\n           \"vegsoHazszam\": 6722,\n           \"megjegyzes\": \"Páratlan házszámok\"\n       },\n       {\n           \"leiras\": \"Kinizsi lakótelep\",\n           \"kozteruletNev\": \"Kinizsi lakótelep\",\n           \"kezdoHazszam\": 0,\n           \"vegsoHazszam\": 9999,\n           \"megjegyzes\": \"Teljes közterület\"\n       }\n   ],\n   \"korzethatar\": {\n     \"coordinates\": [\n       [\n         [\n           19.025320053100586,\n           47.50591278076172\n         ],\n         [\n           19.027719497680664,\n           47.505340576171875\n         ],\n         ...\n       ]\n     ],\n     \"type\": \"Polygon\"\n   },\n   \"frissitveValasztasHun\": \"2020-01-09T14:49:48.000Z\",\n   \"valasztasHuOldal\": \"/vhupage/5e77c3f18723e7a7b25c5f72\",\n   \"updatedAt\": \"2020-04-12T07:47:23.094Z\",\n   \"__v\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/szavazokorok.js",
    "groupTitle": "2._Szavazókörök"
  },
  {
    "type": "get",
    "url": "/szavazokorok/",
    "title": "1.) Összes szavazókör",
    "name": "szavazokorok2",
    "group": "2._Szavazókörök",
    "parameter": {
      "fields": {
        "Request Parameters": [
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Csak a megadott számú találatot adja vissza (default: <code>20</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>A lapozáshoz használható paraméter. (default: <code>0</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number|String|Regex|Query",
            "optional": true,
            "field": "queryParameters",
            "description": "<p>A rekordok bármely paramétere alapján lehet szűkíteni a listát. Használatukról bővebben a <a href=\"#api-Szavaz%C3%B3k%C3%B6r%C3%B6k-szavazokorok3\">3. pont</a> alatt.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Request Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A regisztrációkor kapott kulcs</p>"
          },
          {
            "group": "Request Headers",
            "optional": true,
            "field": "X-Valasztas-Kodja",
            "description": "<p>A választási adatbázis kiválasztása (Lehetsésges értékek: 2019-es önkormányzati: <code>onk2019</code>, 2018-as országgyűlési: <code>ogy2018</code>, 2020-as borsodi időközi: <code>idbo620</code>)</p>"
          },
          {
            "group": "Request Headers",
            "optional": true,
            "field": "X-Iterating-Query",
            "description": "<p>Több paraméteres lekérdezéskor használható. <code>true</code> értéknél az API a paraméterenket egyenként alkalmazza (az általunk megadott sorrendet tartva), ezáltal fokozatosan szűkítve a keresést. Eredményként az utolsó, nem üres eredményt kapjuk vissza.</p>"
          }
        ],
        "Response Headers": [
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Total-Count",
            "description": "<p>A szűrési feltételeknek megfelelő, a válaszban lévő összes elem a lapozási beállításoktől függetlenül</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Prev-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás következő oldala</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Next-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás előző oldala</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n      \"_id\": \"5e77c3f08723e7a7b25c411a\",\n      \"szavazokorSzama\": 1,\n      \"kozigEgyseg\": {\n          \"megyeNeve\": \"Hajdú-Bihar\",\n          \"kozigEgysegNeve\": \"Balmazújváros\",\n          \"link\": \"/kozigegysegek/006f6e6b32303139232d\"\n      },\n      \"szavazokorCime\": \"Batthyány utca 7. (Veres Péter Gimnázium)\",\n      \"akadalymentes\": true,\n      \"valasztokerulet\": {\n          \"leiras\": \"Balmazújváros 1. számú EVK\",\n          \"szam\": 1\n      },\n      \"valasztokSzama\": 1035,\n      \"__v\": 1\n  },\n  {\n      \"_id\": \"5e77c3f08723e7a7b25c411b\",\n      \"szavazokorSzama\": 2,\n      \"kozigEgyseg\": {\n          \"megyeNeve\": \"Hajdú-Bihar\",\n          \"kozigEgysegNeve\": \"Balmazújváros\",\n          \"link\": \"/kozigegysegek/006f6e6b32303139232d\"\n      },\n      \"szavazokorCime\": \"Batthyány utca 7. (Veres Péter Gimnázium)\",\n      \"akadalymentes\": true,\n      \"valasztokerulet\": {\n          \"leiras\": \"Balmazújváros 1. számú EVK\",\n          \"szam\": 1\n      },\n      \"valasztokSzama\": 760,\n      \"__v\": 1\n  },\n...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/szavazokorok.js",
    "groupTitle": "2._Szavazókörök"
  },
  {
    "type": "get",
    "url": "/szavazokorok?param={value|query}",
    "title": "3.) Szavazókörök keresése paraméter alapján",
    "name": "szavazokorok3",
    "group": "2._Szavazókörök",
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Request Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A regisztrációkor kapott kulcs</p>"
          },
          {
            "group": "Request Headers",
            "optional": true,
            "field": "X-Valasztas-Kodja",
            "description": "<p>A választási adatbázis kiválasztása (lásd fent)</p>"
          },
          {
            "group": "Request Headers",
            "optional": true,
            "field": "X-Iterating-Query",
            "description": "<p>Több paraméteres lekérdezéskor használható. <code>true</code> értéknél az API a paraméterenket egyenként alkalmazza (az általunk megadott sorrendet tartva), ezáltal fokozatosan szűkítve a keresést. Eredményként az utolsó, nem üres eredményt kapjuk vissza.</p>"
          }
        ],
        "Response Headers": [
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Total-Count",
            "description": "<p>A szűrési feltételeknek megfelelő, a válaszban lévő összes elem a lapozási beállításoktől függetlenül</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Prev-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás következő oldala</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Next-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás előző oldala</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request Parameters": [
          {
            "group": "Request Parameters",
            "type": "String|Regex",
            "optional": true,
            "field": "textFields",
            "description": "<p>Szöveget tartalmazó mezők. (pl: megyenév: <code>kozigEgyseg.megyeNeve</code>, település vagy budapesti kerület neve: <code>kozigEgyseg.kozigEgysegNeve</code>, szavazókör címe: <code>szavazokorCime</code>, a szavazókörhöz tartozó utcák, terek stb nevei: <code>kozteruletek.kozteruletNev</code> stb.). Lekérdezhetőek teljes egyezésre (pl: <code>kozigEgyseg.kozigEgysegNeve=Barcs</code>) vagy reguláris kifejezéssel (regexel) (pl. <code>kozteruletek.kozteruletNev=/^hunyadi/i</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number|Query",
            "optional": true,
            "field": "numericFields",
            "description": "<p>Numberikus mezők (pl: a szavazókör száma: <code>szavazokorSzama</code>, a szavazókörbe tartozó legkisebb házszám egy adott közterületen: <code>kozteruletek.kezdoHazszam</code>, a szavazókörbe tartozó legnagyobb házszám: <code>kozteruletek.vegsoHazszam</code>, a szavazókör névjegyzékében szereplők száma: <code>valasztokSzama</code> stb). Lekérdezhető pontos egyezésre (pl. <code>szavazokorSzama=4</code>) vagy operátorok segítségével, mint: <code>kozteruletek.kezdoHazszam={ $lt: 22 }</code>, azaz a kezdő házszám kisebb, mint 22. A következő operátorok használhatók: <code>$gt</code>, <code>$gte</code>, <code>$lt</code>, <code>$lte</code>, <code>$eq</code>, <code>$ne</code>;</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>A lapozáshoz használható paraméter. (default: <code>0</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Csak a megadott számú találatot adja vissza (default: <code>20</code>)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl --location --request GET 'http://api.tisztaszavazas.hu/szavazokorok?\\\n  kozigEgyseg.kozigEgysegNeve=/Hajd%C3%BAhadh%C3%A1z/&\\\n  kozteruletek.kozteruletNev=/Bercs%C3%A9nyi/&\\\n  kozteruletek.kezdoHazszam={%20$lte:%2022%20}&\\\n  kozteruletek.vegsoHazszam={%20$gt:%2022%20}&\\\n  kozteruletek.megjegyzes=P%C3%A1ros%20h%C3%A1zsz%C3%A1mok' \\\n  --header 'Authorization: {jwt-token} \\",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [\n   {\n       \"_id\": \"5e77c3f08723e7a7b25c4089\",\n       \"szavazokorSzama\": 6,\n       \"kozigEgyseg\": {\n           \"megyeNeve\": \"Hajdú-Bihar\",\n           \"kozigEgysegNeve\": \"Hajdúhadház\"\n       },\n       \"kozteruletek\": [\n           {\n               \"leiras\": \"Bercsényi utca 14 - 60\",\n               \"kozteruletNev\": \"Bercsényi utca\",\n               \"kezdoHazszam\": 14,\n               \"vegsoHazszam\": 60,\n               \"megjegyzes\": \"Páros házszámok\"\n           }\n       ]\n   }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/szavazokorok.js",
    "groupTitle": "2._Szavazókörök"
  },
  {
    "type": "get",
    "url": "/valasztokeruletek/",
    "title": "1.) Összes választókerület",
    "name": "valasztokeruletek",
    "group": "3._Választókerületek",
    "parameter": {
      "fields": {
        "Request Parameters": [
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Csak a megadott számú találatot adja vissza (default: <code>20</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>A lapozáshoz használható paraméter. (default: <code>0</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number|String|Regex|Query",
            "optional": true,
            "field": "queryParameters",
            "description": "<p>A rekordok bármely paramétere alapján lehet szűkíteni a listát.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Request Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A regisztrációkor kapott kulcs</p>"
          },
          {
            "group": "Request Headers",
            "optional": true,
            "field": "X-Valasztas-Kodja",
            "description": "<p>A választási adatbázis kiválasztása (Lehetsésges értékek: 2018-as országgyűlési: <code>ogy2018</code>)</p>"
          }
        ],
        "Response Headers": [
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Total-Count",
            "description": "<p>A szűrési feltételeknek megfelelő, a válaszban lévő összes elem a lapozási beállításoktől függetlenül</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Prev-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás következő oldala</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Next-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás előző oldala</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n   { \n     \"_id\": \"5eee424dac32540023500d13\",\n     \"leiras\": \"Budapest 1. számú OEVK\",\n     \"szam\": 1,\n     \"korzethatar\": {\n       \"type\": \"Polygon\",\n       \"coordinates\": [\n          [\n            [\n              19.066171646118164,\n              47.47514343261719\n            ],\n            [\n              19.074604034423828,\n              47.477970123291016\n            ],\n\t  \t      ...\n          ]\n        ]\n      }\n    }\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/valasztokeruletek.js",
    "groupTitle": "3._Választókerületek"
  },
  {
    "type": "get",
    "url": "/valasztokeruletek/:id",
    "title": "2.) Egy választókerület összes adata",
    "name": "valasztokeruletek2",
    "group": "3._Választókerületek",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>A Választókerület azonosítója az adatbázisban</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Request Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A regisztrációkor kapott kulcs</p>"
          },
          {
            "group": "Request Headers",
            "optional": true,
            "field": "X-Valasztas-Kodja",
            "description": "<p>A választási adatbázis kiválasztása (lásd fent)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n \n { \n   \"_id\": \"5eee424dac32540023500d13\",\n   \"leiras\": \"Budapest 1. számú OEVK\",\n   \"szam\": 1,\n   \"korzethatar\": {\n     \"type\": \"Polygon\",\n     \"coordinates\": [\n       [\n          [\n            19.066171646118164,\n            47.47514343261719\n          ],\n          [\n            19.074604034423828,\n            47.477970123291016\n          ],\n\t\t      ...\n        ]\n      ]\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/valasztokeruletek.js",
    "groupTitle": "3._Választókerületek"
  },
  {
    "type": "get",
    "url": "/szavazatok/",
    "title": "1.) Az összes eredmény",
    "name": "szavazatok",
    "group": "4._Szavazatok",
    "description": "<p>A jelöltekre leadott szavazatok listája</p>",
    "parameter": {
      "fields": {
        "Request Parameters": [
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Csak a megadott számú találatot adja vissza (default: <code>20</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>A lapozáshoz használható paraméter. (default: <code>0</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number|String|Regex|Query",
            "optional": true,
            "field": "queryParameters",
            "description": "<p>A rekordok bármely paramétere alapján lehet szűkíteni a listát.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Request Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A regisztrációkor kapott kulcs</p>"
          },
          {
            "group": "Request Headers",
            "optional": true,
            "field": "X-Valasztas-Kodja",
            "description": "<p>A választási adatbázis kiválasztása (Lehetsésges értékek: 2018-as országgyűlési: <code>ogy2018</code>)</p>"
          }
        ],
        "Response Headers": [
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Total-Count",
            "description": "<p>A szűrési feltételeknek megfelelő, a válaszban lévő összes elem a lapozási beállításoktől függetlenül</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Prev-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás következő oldala</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Next-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás előző oldala</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n   { \n     \"_id\": \"5eee424dac32540023500d13\",\n     \"leiras\": \"Budapest 1. számú OEVK\",\n     \"szam\": 1,\n     \"korzethatar\": {\n       \"type\": \"Polygon\",\n       \"coordinates\": [\n          [\n            [\n              19.066171646118164,\n              47.47514343261719\n            ],\n            [\n              19.074604034423828,\n              47.477970123291016\n            ],\n\t  \t      ...\n          ]\n        ]\n      }\n    }\n  ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/szavazatok.js",
    "groupTitle": "4._Szavazatok"
  },
  {
    "type": "get",
    "url": "/usage/",
    "title": "1.) A felhasználó szerver-eléréseinek időbélyegei és IP-i.",
    "name": "usage",
    "group": "4._Usage",
    "description": "<p>Az API más adatot nem tárol a lekérésekről, úgy mint a lekérés vagy a válasz tartalmát stb. Csupán a túlhasználat elkerülése érdekében naplózza az egyes felhasználók által indított kérések időbélyegét és IP címét.</p>",
    "parameter": {
      "fields": {
        "Request Parameters": [
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Csak a megadott számú találatot adja vissza (default: <code>20</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>A lapozáshoz használható paraméter. (default: <code>0</code>)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Request Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A regisztrációkor kapott kulcs</p>"
          }
        ],
        "Response Headers": [
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Prev-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás következő oldala</p>"
          },
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Next-Page",
            "description": "<p>A <code>limit</code> és <code>skip</code> paraméterekkel meghatározott lapozás előző oldala</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n   {\n      \"_id\": \"5e9b4f3ecfc988ec3350685a\",\n      \"name\": \"Your Name\",\n      \"__v\": 0,\n      \"createdAt\": \"2020-04-18T19:04:30.001Z\",\n      \"updatedAt\": \"2020-04-18T19:04:30.001Z\"\n  },\n  {\n      \"_id\": \"5e9b50eaf7bd64fefb24bc60\",\n      \"name\": \"Your Name\",\n      \"ip\": \"::1\",\n      \"__v\": 0,\n      \"createdAt\": \"2020-04-18T19:11:38.935Z\",\n      \"updatedAt\": \"2020-04-18T19:11:38.936Z\"\n  }\n...\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/usage.js",
    "groupTitle": "4._Usage"
  },
  {
    "type": "get",
    "url": "/valasztasok/",
    "title": "1.) Az összes választás",
    "name": "valasztasok",
    "group": "5._Választások",
    "description": "<p>Az adatbázisban feldolgozott választások</p>",
    "parameter": {
      "fields": {
        "Request Parameters": [
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Csak a megadott számú találatot adja vissza (default: <code>20</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>A lapozáshoz használható paraméter. (default: <code>0</code>)</p>"
          },
          {
            "group": "Request Parameters",
            "type": "Number|String|Regex|Query",
            "optional": true,
            "field": "queryParameters",
            "description": "<p>A rekordok bármely paramétere alapján lehet szűkíteni a listát.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Request Headers",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A regisztrációkor kapott kulcs</p>"
          }
        ],
        "Response Headers": [
          {
            "group": "Response Headers",
            "optional": false,
            "field": "X-Total-Count",
            "description": "<p>A szűrési feltételeknek megfelelő, a válaszban lévő összes elem a lapozási beállításoktől függetlenül</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  { \n    \"_id\": \"600471eda6932f5deae8f45b\",\n    \"kod\": \"ogy2018\",\n    \"leiras\": \"Országgyűlési képviselők választása 2018\",\n    \"tipus\": \"Általános országgyűlési választás\"\n   },\n  { \n    \"_id\": \"600471eda6932f5deae8f45c\",\n    \"kod\": \"onk2019\",\n    \"leiras\": \"Helyi önkormányzati választások 2019\",\n    \"tipus\": \"Általános országgyűlési választás\"\n   },\n   ...\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/valasztasok.js",
    "groupTitle": "5._Választások"
  }
] });
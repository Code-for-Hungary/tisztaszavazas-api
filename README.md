# Szavazokorok

## Authorization

Add your token to the header of the request:

```json
{ "header": {
	"Authorization": "{{authtoken}}"
}}
```

## Endpoints

### Szavazokorok

#### Get all ballot office

`GET /szavazokorok`

#### Get a single ballot office

`GET /szavazokorok/5e405d6a0ff37a310a0840dd`

#### Query ballot offices

*Find by match with multiple properties*

`GET /szavazokorok?kozigEgyseg.megyeKod=1&kozigEgyseg.telepulesKod=1&szavazokorSzama=12`

#### Curl examples

`curl --location --request GET 'http://localhost:1338/szavazokorok' \
 --header 'Authorization: {{authtoken}}' \
 --header 'X-Valasztas-Kodja: ogy2018'`

`curl --location --request GET 'http://localhost:1338/szavazokorok/szavazokorok?kozigEgyseg.megyeKod=1&kozigEgyseg.telepulesKod=1&szavazokorSzama=12' --header 'Authorization: {{authtoken}}' --header 'X-Valasztas-Kodja: ogy2018'`

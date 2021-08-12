# Tisztaszavazás API

A simple app to get Hungarian ballot office data. You can get an API key and access to database at info@tisztaszavazas.hu e-mail address.

You can get detailed (Hungarian) API documentation after running the app and browse http://localhost:1338/ or [here](https://api.tisztaszavazas.hu/).

## Deployment

Clone the repository like this:

`git clone git@github.com:Code-for-Hungary/tisztaszavazas-api.git`

## Run

```shell script
cd tisztaszavazas-api
cp .env.example .env
# configure the environment vars in .env file
yarn
yarn start
```

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
 --header "Connection: close" \
 --header 'X-Valasztas-Kodja: ogy2018' \
 --header 'Authorization: {{authtoken}}'`

`curl --location --request GET 'http://localhost:1338/szavazokorok' --header "Connection: close" --header 'X-Valasztas-Kodja: ogy2018' --header 'Authorization: {{authtoken}}'`

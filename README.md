# Banking API Server

The purpose of this server is to provides banking data through its API.

## API Specification

The application is currently hosted as a free application in heroku. All API as authentiated with JWT.

__Application URL__: https://banking-api-server.herokuapp.com


1. __POST /login API__

This API can be used to generate new JWT in case the current one is expired. A JWT expires in 5 days. The following curl command generates a new JWT.

```
curl -X POST \
  'https://banking-api-server.herokuapp.com/login' \
  -H 'content-type: application/json' \
  -d '{
	"username": "admin",
	"password": "password"
  }'
```
2. __GET /bank API__

This API fetches details of a bank given its IFSC code. IFSC code needs to specified as query parameter. Access token needs to provided as header.

```
curl -X GET \
  'https://banking-api-server.herokuapp.com/bank?ifsc=ABHY0065009' \
  -H 'content-type: application/json' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTc3ODA1NTU2LCJleHAiOjE1NzgyMzc1NTZ9.hIeUGftHWBim5hEc_DeN69khqgDqfcqHwu5GUNR4Z4Q'
```

3. __GET /branches API__

This API fetches the branch list with details given bank name and city. All params are specified as query params. Access token needs to provided as header.

###### Params
1. `bank_name` required name of the bank
2. `city` required city where the bank is located
3. `limit` Optional limit field
4. `offset` Optional offset field

```
curl -X GET \
  'https://banking-api-server.herokuapp.com/branches?bank_name=ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED&city=MUMBAI&limit=4&offset=2' \
  -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTc3ODE0NzMyLCJleHAiOjE1NzgyNDY3MzJ9.JHp-jjLM2DKSg3qfJkyNaT4HZwg8Z1ZVQOrf2iNte-U'
  
 ```


## Technology Stack

- Language: `Node.js`
- Database: `PostgreSQL`

## Getting Started

Clone the repo and install the packages.

``` bash
$ git clone https://github.com/chaythanyanair/banking_api.git
$ npm install
```

Add data to database as specified [here](https://github.com/snarayanank2/indian_banks).


### Local API Server in Local Environment

To start the API server locally do the following:

```bash
$ npm start 
```

Now the server would be up and running successfully in port 3001:

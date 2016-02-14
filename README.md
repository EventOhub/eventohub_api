# eventohub_api

Geolocation API
Request: /geolocation/getstates/:country_id # /geolocation/getstates/1 (1 for india)
Response:

{
  "status": "success",
  "err": "",
  "json": [
    {
      "id": 1,
      "name": "Maharashtra"
    },
    {
      "id": 2,
      "name": "Punjab"
    },
    {
      "id": 3,
      "name": "Uttar Pradesh"
    },
    {
      "id": 4,
      "name": "Rajasthan"
    }
  ]
}

Request: /geolocation/getcities/:state_id # /geolocation/getcities/1 
Response:

{
  "status": "success",
  "err": "",
  "json": [
    {
      "id": 1,
      "name": "Pune"
    },
    {
      "id": 2,
      "name": "Mumbai"
    },
    {
      "id": 3,
      "name": "kohlapur"
    },
    {
      "id": 4,
      "name": "Solapur"
    }
  ]
}


database.json is in the app/config folder
command to set node env : export NODE_ENV=development
sql queries inside in app/sql folder


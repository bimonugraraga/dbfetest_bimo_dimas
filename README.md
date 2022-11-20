# dbfetest_bimo_dimas

## SETUP :
### Front End
 - Open Folder `/front-end/dbj`
 - npm i
 - npm run serve

### Back End
 - Open Folder `/back-end/server`
 - npm i
 - create file `.env`
 - Change the `.env `file to your liking
 - Run ```npx sequelize db:create```
 - Run ```npx sequelize db:migrate```
 - Run ```npx sequelize db:seed:all```
 - Run ```npm start``` to start the API

## API DOCS FOR BE

### Endpoints
- `GET /v1/transactions`

&nbsp;

### 1. GET /v1/transactions
Get All Transaction Data


Request:
  - Query
    1. limit (default = 10)
    2. page (default  = 0)
    3. merchant_name (default = "")
    4. sorted_from (default = "id")
    5. sorted_by (default = "ASC")

Response:
- Base query
```json
{
    "count": 100,
    "rows": [
        {
            "id": 1,
            "company_id": 1,
            "description": "FOR XL",
            "purpose": "TESTING",
            "merchant_id": 3,
            "amount": "26974",
            "created_by": "admin",
            "createdAt": "2022-11-20T10:33:41.136Z",
            "updatedAt": "2022-11-20T10:33:41.136Z",
            "Company": {
                "id": 1,
                "company_name": "Test Company",
                "createdAt": "2022-11-20T10:32:40.353Z",
                "updatedAt": "2022-11-20T10:32:40.353Z"
            },
            "Merchant": {
                "id": 3,
                "merchant_name": "XL",
                "merchant_address": "Jakarta",
                "created_by": "admin",
                "createdAt": "2022-11-20T10:31:15.460Z",
                "updatedAt": "2022-11-20T10:31:15.460Z"
            }
        },
        ...
    ]
}
```
- Search By `merchant_name = telkom`
```json
{
    "count": 60,
    "rows": [
        {
            "id": 41,
            "company_id": 1,
            "description": "FOR Telkomsel",
            "purpose": "TESTING",
            "merchant_id": 1,
            "amount": "18534",
            "created_by": "admin",
            "createdAt": "2022-11-20T10:33:41.136Z",
            "updatedAt": "2022-11-20T10:33:41.136Z",
            "Company": {
                "id": 1,
                "company_name": "Test Company",
                "createdAt": "2022-11-20T10:32:40.353Z",
                "updatedAt": "2022-11-20T10:32:40.353Z"
            },
            "Merchant": {
                "id": 1,
                "merchant_name": "Telkomsel",
                "merchant_address": "Jakarta",
                "created_by": "admin",
                "createdAt": "2022-11-20T10:31:15.460Z",
                "updatedAt": "2022-11-20T10:31:15.460Z"
            }
        },
        {
            "id": 42,
            "company_id": 1,
            "description": "FOR Telkomsel",
            "purpose": "TESTING",
            "merchant_id": 1,
            "amount": "44001",
            "created_by": "admin",
            "createdAt": "2022-11-20T10:33:41.136Z",
            "updatedAt": "2022-11-20T10:33:41.136Z",
            "Company": {
                "id": 1,
                "company_name": "Test Company",
                "createdAt": "2022-11-20T10:32:40.353Z",
                "updatedAt": "2022-11-20T10:32:40.353Z"
            },
            "Merchant": {
                "id": 1,
                "merchant_name": "Telkomsel",
                "merchant_address": "Jakarta",
                "created_by": "admin",
                "createdAt": "2022-11-20T10:31:15.460Z",
                "updatedAt": "2022-11-20T10:31:15.460Z"
            }
        },
        ...
    ]
```


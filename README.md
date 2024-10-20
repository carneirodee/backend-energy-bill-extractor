# Backend-Energy-Bill-Extractor

Backend application for monitoring and managing water and gas meter readings.

## Libs

* cors
* dotenv
* debug
* dotenv
* pdf-parse
* pg-pool
* sequelize-typescript
* swagger-ui-express
* jest
* nodemon
* pg
* supertest
* ts-jest
* tsx
* typescript

## Code Snippets

* Scraping data from PDF

  ```js
  export const scrapingDataPdf = async (file: any, key?: any): Promise<any> => {
      let dataBuffer = fs.readFileSync(`bills/${file}`);
      return pdf(dataBuffer).then(async function (data) {
          let arrayOfLines = [];
          arrayOfLines = data.text.split("\n");
          [...]
      });
  }
  ```

## Running Test Environment

Defining environment

Change the envoriment variable NODE_ENV in src/envoriment.env file to 'test'

```javascript
PORT='8080'
DB_HOST_TEST='localhost'
DB_URL=postgresql://energy_measure_owner:pb8PNSe5mwcx@ep-frosty-rice-a565pfm1.us-east-2.aws.neon.tech/energy_measure?sslmode=require
DB_HOST='localhost'
LOCALHOST='localhost'
DB_USER='postgres'
DB_PASSWORD=admin
DB_DATABASE_TEST='energy_measure'
DB_DATABASE=energy_measure
DB_PORT=5432
DB_DIALECT='postgres'
NODE_ENV='test'
```

### Installing packages

#### ```npm install```

### Running development

#### ```npm test```

## Running Development Environment

### Defining environment

Change the envoriment variable NODE_ENV in src/envoriment.env file to 'development'

```javascript
PORT='8080'
DB_HOST_TEST='localhost'
DB_URL=postgresql://energy_measure_owner:pb8PNSe5mwcx@ep-frosty-rice-a565pfm1.us-east-2.aws.neon.tech/energy_measure?sslmode=require
DB_HOST='localhost'
LOCALHOST='localhost'
DB_USER='postgres'
DB_PASSWORD=admin
DB_DATABASE_TEST='energy_measure'
DB_DATABASE=energy_measure
DB_PORT=5432
DB_DIALECT='postgres'
NODE_ENV='development'
```

### Installing packages

Run on the command line

#### ```npm install```

### Running tests

Run on the command line

#### ```npm run dev```

## Documentation

Run the application and access [http://localhost:3000/api-v1/docs](http://localhost:3000/api-v1/docs)

## Endpoints

### POST /api-v1/clients

Create new client

Request Body:

```json
{
    "client_code": "7204076117",
    "installation_number": "3021116735",
    "name": "SELFWAY TREINAMENTO PERSONALIZADO LTDA"
}
```

### GET /api-v1/clients

Get all customers

### GET /api-v1/clients/:id

Get customer by Id

### PUT /api-v1/clients /:id

Update customer

Request Body:

```json
{
    "client_code": "7204076117",
    "installation_number": "3021116735",
    "name": "SELFWAY TREINAMENTO PERSONALIZADO LTDA"
}
```

### DELETE /api-v1/clients /:id

Delete customer

### POST /api-v1/bills

Create a new bill

Request Body:

```json

{
    "id": 999,
    "client_code": "7204076117",
    "installation_number": "3021116735",
    "reference_date_month": "SET",
    "reference_date_year": "2024",
    "due_date": "09/10/2024",
    "total_value": 49.9,
    "energy_qt": 100,
    "energy_value": 140.0,
    "energy_scee_s_icms_qt": 100,
    "energy_scee_s_icms_value": 89.99,
    "compensated_energy_qt": 100,
    "compensated_energy_value": 90.00,
    "public_lighting_value": 56.70

}
```

### GET /api-v1/bills

Get all bills by client

### GET /api-v1/bills/:id

Get bill by id

### PUT /api-v1/bills/:id

Update a address

Request Body

```json
{
    "id": 999,
    "client_code": "7204076117",
    "installation_number": "3021116735",
    "reference_date_month": "SET",
    "reference_date_year": "2024",
    "due_date": "09/10/2024",
    "total_value": 49.9,
    "energy_qt": 100,
    "energy_value": 140.0,
    "energy_scee_s_icms_qt": 100,
    "energy_scee_s_icms_value": 89.99,
    "compensated_energy_qt": 100,
    "compensated_energy_value": 90.00,
    "public_lighting_value": 56.70

}
```

### DELETE /api-v1/bills/:id

Delete a bill

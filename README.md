<h1 align="center"> Nodepop 👋</h1>

### Practice WEB-API/Node.js/MongoDB - Advanced Backend- KeepCoding

## Description

<p>Backend to support a second-hand goods sales app.</p>

## News of the Advanced Version

* Advanced Nodepop, is updated by incorporating the bootstrap template 'Freelancer'.

* Advanced Nodepop, uses an .env file to store passwords and generally private information, that is not updated in the repository.

* Advanced Nodepop, converts the frontend of the ads in multi-language, it has a language selector, which can change from Spanish to English or vice versa.

* Advanced Nodepop has photo upload for ads.
Now Postman's POST requests, must be made of type 'form-data' and change the type of photo file. It goes from being a string (where the url was entered manually), to be a file that can be selected from Postman itself.

* Advanced Nodepop, uses microservices for the thumbnail generation of each photo, that is uploaded.

A Client and a Server have been created.

The Client launches the request to generate a thumbnail with the url of an image recently uploaded to the server. That is, it starts with the application itself.

The Server receives the request, generates the image thumbnail, saves it in the same folder and responds with the image url. To start it:

Go to / lib / microservices and run:

```sh
nodemon thumbService.js
```

## Installation requirements

* node >= V12.13.1
* npm >= 6.12.1
* MongoDB
* Git


## Install

```sh
git clone https://github.com/Maryery/nodepop-backend-avanzado.git
cd nodepop-backend-avanzado
npm install
```

You must copy .env.example to .env and review your configuration

```shell
cp .env.example .env
```

## Start the database

```sh
 npm run install-db
```

## Start the app in development enviroment, port 3000. It runs with Nodemon.

```sh
npm run dev
```

# API METHODS

## Authentication

POST /api/Authentication
{
    email: string,
    password: string
}

returns: { token: string }

## Endpoint /anuncios

The endpoint /anuncios in our API it allows us to consult, paginate, and filter data from all the ads registered in the MongoDB database of our Nodepop application.

## [GET] List of ads

<em>[GET]</em> http://localhost:3000/api/anuncios

Header: Authorization: token

## Example:

**Default limit is 10000**


```sh
[
    {
    "tags": [
    "lifestyle",
    "motor"
    ],
    "_id": "5e88d0cf3e18582584ae664a",
    "name": "Bicycle",
    "sell": true,
    "price": 150,
    "photo": "bicycle.jpg",
    "__v": 0
    },
    {
    "tags": [
    "lifestyle",
    "mobile"
    ],
    "_id": "5e88d0cf3e18582584ae664b",
    "name": "Iphone 3GS",
    "sell": false,
    "price": 100,
    "photo": "iphone.jpg",
    "__v": 0
    }
]
```

## [GET] List of advertisements with the possibility of pagination. With filters by tag, type of sell (true  or false), price range (min. Price and max. Price) and article name (starting with the data sought)

## Example of pagination:

<em>[GET]</em> http://localhost:3000/api/anuncios?limit=2

```sh
[
    {
        "tags": [
        "lifestyle",
        "motor"
        ],
        "_id": "5e8e21a4ba35a52848e1c78a",
        "name": "Bicycle",
        "sell": true,
        "price": 150,
        "photo": "bicycle.jpg",
        "__v": 0
        },
        {
        "tags": [
        "lifestyle",
        "mobile"
        ],
        "_id": "5e8e21a4ba35a52848e1c78b",
        "name": "Iphone 3GS",
        "sell": false,
        "price": 100,
        "photo": "iphone.jpg",
        "__v": 0
    }
]
```

## Example filter by tags:

<em>[GET]</em> http://localhost:3000/api/anuncios?tags=work

```sh
[
    {
        "tags": [
        "lifestyle",
        "work"
        ],
        "_id": "5e8e21a4ba35a52848e1c78c",
        "name": "Laptop HP",
        "sell": true,
        "price": 500,
        "photo": "hp.jpg",
        "__v": 0
        },
        {
        "tags": [
        "work"
        ],
        "_id": "5e9044cc00351a26048afbb5",
        "name": "Laptop hp",
        "sell": false,
        "price": 450,
        "photo": "hp.jpg",
        "__v": 0
    }
]
```

## Example filter by sell:

<em>[GET]</em> http://localhost:3000/api/anuncios?sell=true

```sh
[
    {
        "tags": [
        "lifestyle",
        "motor"
        ],
        "_id": "5e8e21a4ba35a52848e1c78a",
        "name": "Bicycle",
        "sell": true,
        "price": 150,
        "photo": "bicycle.jpg",
        "__v": 0
        },
        {
        "tags": [
        "lifestyle",
        "work"
        ],
        "_id": "5e8e21a4ba35a52848e1c78c",
        "name": "Laptop HP",
        "sell": true,
        "price": 500,
        "photo": "hp.jpg",
        "__v": 0
    }
]
```

## Example filter by price:

Examples of Combinations: 

* 450-500 will search for ads with price included among these values.

    <em>[GET]</em> http://localhost:3000/api/anuncios?price=450-500

    
    ```sh
    [
        {
            "tags": [
            "lifestyle",
            "work"
            ],
            "_id": "5e8e21a4ba35a52848e1c78c",
            "name": "Laptop HP",
            "sell": true,
            "price": 500,
            "photo": "hp.jpg",
            "__v": 0
            },
            {
            "tags": [
            "lifestyle",
            "mobile"
            ],
            "_id": "5e8e21a4ba35a52848e1c78d",
            "name": "Samsung galaxy S9",
            "sell": false,
            "price": 450,
            "photo": "samsung.jpg",
            "__v": 0
            },
            {
            "tags": [
            "work"
            ],
            "_id": "5e9044cc00351a26048afbb5",
            "name": "Laptop hp",
            "sell": false,
            "price": 450,
            "photo": "hp.jpg",
            "__v": 0
        }
    ]
    ```

* 500- will search for those with a price greater than 500.

    <em>[GET]</em> http://localhost:3000/api/anuncios?price=500-

    ```sh
    [
        {
            "tags": [
            "lifestyle",
            "work"
            ],
            "_id": "5e8e21a4ba35a52848e1c78c",
            "name": "Laptop HP",
            "sell": true,
            "price": 500,
            "photo": "hp.jpg",
            "__v": 0
        }
    ]
    ```

* -100 will search for those with a price less than 100.

    <em>[GET]</em> http://localhost:3000/api/anuncios?price=-100

    ```sh
    [
        {
        "tags": [
        "lifestyle",
        "mobile"
        ],
        "_id": "5e8e21a4ba35a52848e1c78b",
        "name": "Iphone 3GS",
        "sell": false,
        "price": 100,
        "photo": "iphone.jpg",
        "__v": 0
        }
    ]
    ```

## Example filter by name:

<em>[GET]</em> http://localhost:3000/api/anuncios?name=bicy

```sh
[
    {
    "tags": [
    "lifestyle",
    "motor"
    ],
    "_id": "5e8e21a4ba35a52848e1c78a",
    "name": "Bicycle",
    "sell": true,
    "price": 150,
    "photo": "bicycle.jpg",
    "__v": 0
    },
    {
    "tags": [
    "lifestyle",
    "motor"
    ],
    "_id": "5e908f359f269a3068b390a3",
    "name": "Bicycle",
    "sell": false,
    "price": 200,
    "photo": "bicycle.jpg",
    "__v": 0
    }
]
```

## Endpoint /tags

El endpoint /tags returns an existing tag list

## [GET] existing tags list

<em>[GET]</em> http://localhost:3000/tags

```sh
[
    {
    "_id": "5e8e21a4ba35a52848e1c78e",
    "tag": "lifestyle",
    "__v": 0
    },
    {
    "_id": "5e8e21a4ba35a52848e1c78f",
    "tag": "work",
    "__v": 0
    },
    {
    "_id": "5e8e21a4ba35a52848e1c790",
    "tag": "motor",
    "__v": 0
    },
    {
    "_id": "5e8e21a4ba35a52848e1c791",
    "tag": "mobile",
    "__v": 0
    }
]
```

## Endpoint /anuncios

El endpoint /anuncios in our API it allows us to consult, paginate, and filter data from all the ads registered in the MongoDB database of our Nodepop application.

## [POST] Create an ad

<em>[POST]</em> http://localhost:3000/api/anuncios

## Body Params:

* name : String. Name of article.
* sell: Boolean. If the item is true, for sale. if it is false, it is searched.
* Price: Number. Price of the article.
* Photo: String. Article photo.
* Tags: String. It may contain one or more of these four: [work, lifestyle, motor and mobile]

Example

[POST] http://localhost:3000/api/anuncios

For this you will have to use a Postman type request software

Headers Content-Type: application/form-data Body name: Bicycle, sell: false, price: 200, photo:File, tags: lifestyle, tags: motor

```sh
status: 201 created
{
    "result": {
        "tags": [
            "lifestyle",
            "motor"
        ],
        "_id": "5e908f359f269a3068b390a3",
        "name": "Bicycle",
        "sell": false,
        "price": 200,
        "photo": "bicycle.jpg",
        "__v": 0
    }
}
```

# WEBSITE NODEPOP

We can see the site at home. Here all the ads registered in the NodePop app database will be listed.
In addition, this site has filters on the URL:

http://localhost:3000/?sort=nombre&tags=mobile

This filter returns, the articles ordered by name with tag mobile.

## Author


👤 **MARYERY, VARGAS MORENO**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
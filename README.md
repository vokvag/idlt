# IDLT website

AN AWESOME DOCUMENTATION USED TO COMPARE DIFFERENT PROGRAMMING LANGUAGES AND HELP YOUR KNOWLEDGE TRANSFER.

## Endpoints
### Authentication:

`POST /api/users/login`

Example request body:
```JSON
{
  "user":{
    "email": "example@example.com",
    "password": "example"
  }
}
```

No authentication required, returns a [User](#users-for-authentication)

Required fields: `email`, `password`


### Registration:

`POST /api/users`

Example request body:
```JSON
{
  "user":{
    "username": "example",
    "email": "example@example.com",
    "password": "example"
  }
}
```

No authentication required, returns a [User](#users-for-authentication)

Required fields: `email`, `username`, `password`



### Get Current User

`GET /api/user`

Authentication required, returns a [User](#users-for-authentication) that's the current user



### Update User

`PUT /api/user`

Example request body:
```JSON
{
  "user":{
    "email": "example@example.example",
    "bio": "Anything about your profile",
    "image": "your profile image"
  }
}
```

Authentication required, returns the [User](#users-for-authentication)


Accepted fields: `email`, `username`, `password`, `image`, `bio`



### Get Profile

`GET /api/profiles/:username`

Authentication optional, returns a [Profile](#profile)

### Get Available Programming Language List

`GET /api/prolangs`

```JSON
{
    "prolangs": [
        {
            "id": 1,
            "name": "java"
        },
        {
            "id": 2,
            "name": "php"
        },
        {
            "id": 3,
            "name": "c++"
        }
    ]
}
```

No authentication required, returns a [prolangs](#prolangs)

### Get the shared category menu

`GET /api/categories&prolang2=2`

Filter by first Programming language:

`?prolang1=1`

Filter by second Programming language:

`?prolang2=2`

```JSON
{
    "categories": {
        "id": 0,
        "name": "root",
        "nameslug": "root",
        "sort_order": 1,
        "parentcategory": null,
        "pl": [],
        "subcategories": [
            {
                "id": 1,
                "name": "cat1",
                "nameslug": "cat1",
                "sort_order": 1,
                "parentcategory": 0,
                "pl": [
                    {
                        "id": 1,
                        "prolang": 1,
                        "plname": "java",
                        "category": 1
                    },
                    {
                        "id": 2,
                        "prolang": 2,
                        "plname": "php",
                        "category": 1
                    }
                ],
                "subcategories": [
                    {
                        "id": 2,
                        "name": "cat2",
                        "nameslug": "cat2",
                        "sort_order": 1,
                        "parentcategory": 1,
                        "pl": [
                            {
                                "id": 4,
                                "prolang": 1,
                                "plname": "java",
                                "category": 2
                            },
                            {
                                "id": 13,
                                "prolang": 2,
                                "plname": "php",
                                "category": 2
                            }
                        ],
                        "subcategories": [
                            {
                                "id": 5,
                                "name": "cat5",
                                "nameslug": "cat5",
                                "sort_order": 1,
                                "parentcategory": 2,
                                "pl": [
                                    {
                                        "id": 7,
                                        "prolang": 1,
                                        "plname": "java",
                                        "category": 5
                                    },
                                    {
                                        "id": 15,
                                        "prolang": 2,
                                        "plname": "php",
                                        "category": 5
                                    }
                                ],
                                "subcategories": []
                            }
                        ]
                    }                
                ]
            }     
        ]
    }
}
```

No authentication required, returns a [category](#category)

### Create the shared Categories

`POST /modifycategory`

```JSON
{
    "category":
    {
	    "name": "new5",
	    "nameslug": "new5",
	    "sort_order": "3",
	    "parentcategory": "24"
    }
}
```

Admin required, returns the new [Category](#category)

### Update the shared Categories

`PUT /modifycategory/:nameslug`

```JSON
{
    "category":
    {
	    "name": "new5",
	    "nameslug": "new5",
	    "sort_order": "3",
	    "parentcategory": "24"
    }
}
```

Admin required, returns the new [Category](#category)

### Delete the shared Categories

`DELETE /modifycategory/:nameslug`

Admin required, returns success or error(#category)

### Get the docs

`GET /api/articles`

Filter by first Programming language:

`?prolang1=1`

Filter by second Programming language:

`?prolang2=2`

Filter by nameslug:

`?nameslug={nameslug}`

Filter by whether return all subcategories' articles:

`?subcategory=no`

only option `no` is detected

```JSON
{
    "articles": {
        "id": 2,
        "name": "cat2",
        "nameslug": "cat2",
        "pl": [
            {
                "id": 13,
                "prolang": 2,
                "plname": "php",
                "category": 2,
                "article": null
            }
        ],
        "subcategories": [
            {
                "id": 5,
                "name": "cat5",
                "nameslug": "cat5",
                "pl": [
                    {
                        "id": 15,
                        "prolang": 2,
                        "plname": "php",
                        "category": 5,
                        "article": {
                            "plwc": 15,
                            "title": "pcat5",
                            "body": "This is the 5th topic about Php.",
                            "createdAt": "2018-08-17T03:21:05.100188+00:00",
                            "updatedAt": "2018-08-17T03:21:05.100188+00:00"
                        }
                    }
                ],
                "subcategories": []
            },
            {
                "id": 6,
                "name": "cat6",
                "nameslug": "cat6",
                "pl": [
                    {
                        "id": 16,
                        "prolang": 2,
                        "plname": "php",
                        "category": 6,
                        "article": {
                            "plwc": 16,
                            "title": "pcat6",
                            "body": "This is the 6th topic about Php.",
                            "createdAt": "2018-08-17T03:21:51.620636+00:00",
                            "updatedAt": "2018-08-17T03:21:51.620636+00:00"
                        }
                    }
                ],
                "subcategories": []
            },
            {
                "id": 7,
                "name": "cat7",
                "nameslug": "cat7",
                "pl": [
                    {
                        "id": 17,
                        "prolang": 2,
                        "plname": "php",
                        "category": 7,
                        "article": {
                            "plwc": 17,
                            "title": "pcat7",
                            "body": "This is the 7th topic about Php.",
                            "createdAt": "2018-08-17T03:22:28.012082+00:00",
                            "updatedAt": "2018-08-17T03:22:28.012082+00:00"
                        }
                    }
                ],
                "subcategories": []
            }
        ]
    }
}
```

No permission required, returns all [Articles](#article)

###Create the article of Doc

`POST /modifyarticle`

```JSON
{
	"article": {
		"plwc": "41",
		"title": "newnew41",
		"body": "newnew41414141414111111111111111111111111111111111111111"
	}
}
```
Admin required, returns the new [Article](#article)

###Delete the article of Doc

`DELETE /modifyarticle/:id`

Admin required, returns success or errors(#article)

###Update the article of Doc

`PUT /updatearticle/:plwc`

```JSON
{
	"article": {
		"plwc": "41",
		"title": "newnew41",
		"body": "newnew41414141414111111111111111111111111111111111111111"
	}
}
```

Admin required, returns the updated [Article](#article)

### Bookmark the bullet point of docs

haven't finished yet

### Comments or Reports

haven't finished yet

### create and update docs in profiles

haven't finished yet

### add admin users for website

haven't finished yet
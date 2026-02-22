migrate((db) => {
    const collection = new Collection({
        "id": "posts_collection",
        "name": "posts",
        "type": "base",
        "system": false,
        "schema": [
            {
                "id": "post_title",
                "name": "title",
                "type": "text",
                "required": true,
                "presentable": true,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "post_slug",
                "name": "slug",
                "type": "text",
                "required": true,
                "presentable": false,
                "unique": true,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": "^[a-z0-9]+(?:-[a-z0-9]+)*$"
                }
            },
            {
                "id": "post_content",
                "name": "content",
                "type": "editor",
                "required": true,
                "presentable": false,
                "unique": false,
                "options": {
                    "convertUrls": false
                }
            },
            {
                "id": "post_excerpt",
                "name": "excerpt",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": 200,
                    "pattern": ""
                }
            },
            {
                "id": "post_image",
                "name": "featured_image",
                "type": "file",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "mimeTypes": [
                        "image/jpeg",
                        "image/png",
                        "image/svg+xml",
                        "image/gif",
                        "image/webp"
                    ],
                    "thumbs": [
                        "100x100"
                    ],
                    "protected": false
                }
            },
            {
                "id": "post_status",
                "name": "status",
                "type": "select",
                "required": true,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "values": [
                        "draft",
                        "published"
                    ]
                }
            }
        ],
        "indexes": [
            "CREATE UNIQUE INDEX `idx_slug` ON `posts` (`slug`)"
        ],
        "listRule": "",
        "viewRule": "",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    });

    return Dao(db).saveCollection(collection);
}, (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("posts");

    return dao.deleteCollection(collection);
})

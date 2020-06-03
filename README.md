## Plant BE
GraphQL database for React Native Plant App

Schema:
- Categories
- Products
- Users
- Explore

NodeJs
Express (web framework for Node)
Apllo (tools to create GraphQL endpoints)
Sequelize (Obj-relational mapping package)
Webpack (to package the app)
Docer (create local MySQL db)


## Users
| Field | Type             | Null | Key | Default | Extra          |
+-------+------------------+------+-----+---------+----------------+
| id    | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name  | varchar(256)     | NO   |     | NULL    |                |
| email | varchar(256)     | NO   |     | NULL    |                |
| avatar | varchar(256)     |    |     | NULL    |                |
| password | varchar(256)     | NO   |     | NULL    |                |
+-------+------------------+------+-----+---------+----------------+


## Products
| Field | Type             | Null | Key | Default | Extra          |
+-------+------------------+------+-----+---------+----------------+
| id    | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name  | varchar(256)     | NO   |     | NULL    |                |
| description | varchar(256)     | NO   |     | NULL    |                |
| tags | varchar(256)     |    |     | NULL    |                |
| images | varchar(256)     |    |     | NULL    |                |
+-------+------------------+------+-----+---------+----------------+
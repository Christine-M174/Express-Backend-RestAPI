Setting up the environment
Inside the repository's main directory, create a plain text file named '.env' that will hold the configuration. The file should look like this:  

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=full_stack_dev
POSTGRES_USER=postgres
POSTGRES_PORT= 5432      (Default port)
POSTGRES_PASSWORD=goog1234
POSTGRES_TEST_DB=store_test
SALT_ROUNDS=10
MY_PLAIN_TEXT_PASSWORD=text8text
TOKEN_SECRET= popopop
SET ENV=dev

If the ENV variable is set to test, the store_test database will be used instead of the store database later on.
-------------------------------------------------------------------------------------------------------------
Setting up postgresql 
on local dvice then set a server password name then create new database 

Run npm install postgresql to install postgresql if you don't have it running already.
Create A User
CREATE USER mahmoud WITH PASSWORD 'secret' SUPERUSER;

Create A Database
CREATE DATABASE dailynews
    OWNER 
    ENCODING UTF8;

db-migrate commands
Create Migration:
db-migrate create Users --sql-file

Run Migrations:
db-migrate:run
Reset Migrations:
db-migrate reset
Example migration up sql file:
CREATE TABLE users(id SERIAL PRIMARY KEY, user_name VARCHAR(200), first_name VARCHAR(200), last_name VARCHAR(200), password VARCHAR(400));

.................................................................................................................

Install the modules
Run npm run install to install all required modules.

tests
Run npm run test to build the serer and run Jasmine tests.
 The test will switch to the store_test database automatically, run db-migrate, 

Run the server
Run npm run run run db-migrate up  to set up the regular database tables.
Run npm run build to build the server.
Run npm run watch to compile the code and run the server.

server will run on this port -->> open -->>http://localhost:3000. It will give you a greeting message.


Users routes
Create: [post] http://localhost:3000/api/users to create a user. Parameters are: user_name, first_name, last_name and password. You will receive a JWT that is required for accessing most other routes.
Index: [get] http://localhost:3000/api/users while providing authorization will list all users.
Show: [get] http://localhost:3000/api/users/:id while providing authorization will list the information for the user with the id.
Edit: [put] http://localhost:3000/api/users/:id while providing authorization will edit the user with the id and set user_name, first_name, last_name and password as provided as parameters.
Delete: [delete] http://localhost:3000/api/users/:id while providing authorization will delete the user with the id.


Products routes
Index: [get] http://localhost:3000/api/products to get a list of all products.
Show: [get] http://localhost:3000/api/products/:id to get the product with id.
Create: [post] http://localhost:3000/api/products while providing authorization to create a product. Parameters are: name, price and category.
Edit: [put] http://localhost:3000/api/products/:id while providing authorization to edit a product with id. Parameters are: name, price and category.
Delete: [delete] http://localhost:3000/api/products/:id while providing authorization to delete a product with id.


Order routes
Index: [get] http://localhost:3000/api/orders while providing authorization to get a list of all orders.
Show: [get] http://localhost:3000/api/orders/:user_id while providing authorization to get a list of all orders from user user_id.
Create: [post] http://localhost:3000/api/orders while providing authorization to create an order. Parameters are: user_id and status.
Edit: [put] http://localhost:3000/api/orders/:id while providing authorization to edit an order with id. Parameters are: user_id and status.
Delete: [delete] http://localhost:3000/api/orders/:id while providing authorization to delete an order with id.


Order product routes
Index: [get] http://localhost:3000/api/orderproducts while providing authorization to get a list of all order/product combinations.
Show: [get] http://localhost:3000/api/orderproducts/:id while providing authorization to get order/product combination with id.
Create: [post] http://localhost:3000/api/orderproducts while providing authorization to add a product with parameter product_id to order with order_id in quantity of parameter quantity.
Edit: [put] http://localhost:3000/api/orderproducts/:id while providing authorization to edit a product/order combination with id. Parameters are product_id, order_id and quantity.
Delete: [delete] http://localhost:3000/api/orderproducts/:id while providing authorization to delete an order/product combination with id.
 

 resources : 
 https://stackoverflow.com/questions/53866343/node-js-error-assertionerror-err-assertion-pattern-should-not-use-global-or

 https://www.enterprisedb.com/postgres-tutorials/connecting-postgresql-using-psql-and-pgadmin
 https://dataschool.com/learn-sql/meta-commands-in-psql/
 https://stackoverflow.com/questions/39293636/npm-err-error-eperm-operation-not-permitted-rename
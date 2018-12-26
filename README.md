# Arcus
An application for searching PA's experience in Cloud related products and services.

## Running
### Locally
These instructions are specifically for a Mac and will need to be adapted for Linux and Windows.
You'll need the following installed:
* Docker
* Node v10
* Make

1. Start a MySQL server inside a docker container: `make mysql`.
This will also create a database and load 4 records into it. To load more, edit the contents of `tests/insertdata_arcus.sql` and stop/delete the mysql-server container
2. Start the Node Express server: `make run`. You should see log messages confirming connection to MySQL and the web server listening on port 3001.
3. In your web browser visit http://localhost:3001
4. To stop the web server use Ctrl+c
5. To stop and remove the MySQL container:
`docker stop mysql-sever && docker rm mysql-server`
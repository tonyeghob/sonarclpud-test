MYSQL_USER ?= root
MYSQL_HOST ?= localhost
MYSQL_DATABASE ?= node_project
MYSQL_PASSWORD ?= pass123
MYSQL_PORT ?= 3306

.PHONY: build

build:
	docker build -t eu.gcr.io/pa-stevejudd/arcus .

mysql:
	docker run --name mysql-server \
	-e MYSQL_ROOT_PASSWORD=$(MYSQL_PASSWORD) -e MYSQL_DATABASE=$(MYSQL_DATABASE) -d \
	-p $(MYSQL_PORT):$(MYSQL_PORT) \
	-v $(CURDIR)/tests/data:/docker-entrypoint-initdb.d/ \
	mysql:5.7

run:
	ARCUS_LOG_LEVEL=debug MYSQL_USER=$(MYSQL_USER) MYSQL_HOST=$(MYSQL_HOST) \
	MYSQL_DATABASE=$(MYSQL_DATABASE) MYSQL_PASSWORD=$(MYSQL_PASSWORD) MYSQL_PORT=$(MYSQL_PORT) node index.js
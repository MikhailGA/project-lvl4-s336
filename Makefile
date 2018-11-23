# install: install-deps install-flow-typed

start:
	DEBUG="app" NODE_ENV=production npx nodemon --watch .  --ext '.js,.pug' --exec npx gulp server

start_dev:
	DEBUG="app" NODE_ENV=development npx nodemon --watch .  --ext '.js,.pug' --exec npx gulp server

# install-deps:
# 	npm install

# install-flow-typed:
# 	npx flow-typed install

build:
	rm -rf dist
	npm run build

test:
	DEBUG=app npm test --detectOpenHandles

# check-types:
# 	npx flow

# lint:
# 	npx eslint .

# publish:
# 	npm publish

# .PHONY: test

all: compose-setup

prepare:
	touch .bash_history
	touch .env

compose:
	docker-compose up

compose-install:
	docker-compose run web npm install

compose-setup: prepare compose-build compose-install

compose-kill:
	docker-compose kill

compose-build:
	docker-compose build

compose-test:
	docker-compose run web make test

compose-bash:
	docker-compose run web bash

compose-console:
	docker-compose npx gulp console

compose-lint:
	docker-compose run web npx eslint .

compose-check-types:
	docker-compose run web npx flow

compose-rm:
	docker-compose rm

compose-dist-build:
	rm -rf dist
	docker-compose run web npm run build

compose-publish: compose-dist-build
	docker-compose run web npm publish

test-db-connect:
	npx babel-node ./models/test.js
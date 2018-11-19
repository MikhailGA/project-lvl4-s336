install: install-deps install-flow-typed

start:
	DEBUG="application:*" NODE_ENV=production npx nodemon --watch .  --ext '.js' --exec npx gulp server

install-deps:
	npm install

install-flow-typed:
	npx flow-typed install

build:
	rm -rf dist
	npm run build

test:
	NODE_ENV=development DEBUG=app npm test --detectOpenHandles

check-types:
	npx flow

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test

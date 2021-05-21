PWD=$(shell pwd)

run:
	docker run -v $(PWD)/public:/app/public -v $(PWD)/src:/app/src  -d --name webapp web/app

rerun: clean run

clean:
	docker stop webapp
	docker rm webapp

build:
	docker build . -t web/app

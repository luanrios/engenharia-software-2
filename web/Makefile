PWD=$(shell pwd)

build:
	docker build . -t web/app

run:
	docker run -v $(PWD)/public:/app/public -v $(PWD)/src:/app/src  -d --name webapp web/app

clean:
	docker stop webapp
	docker rm webapp

rerun: clean run

status:
	docker logs webapp

where:
	docker logs webapp | grep 'Project is running at'

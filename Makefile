start-dev-containers:
	docker compose -f ./docker/dev/docker-compose.yml up -d

stop-dev-containers:
	docker compose -f ./docker/dev/docker-compose.yml down

clean-dev-containers:
	docker compose -f ./docker/dev/docker-compose.yml down --rmi local -v

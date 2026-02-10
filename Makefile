.PHONY: up up-d down build logs dev dev-down

up:
	NO_COLOR=1 docker compose up --build

up-d:
	NO_COLOR=1 docker compose up -d --build

down:
	docker compose down

build:
	docker compose build

logs:
	NO_COLOR=1 docker compose logs -f

# Dev avec Turbopack (hot-reload, pas de rebuild)
dev:
	NO_COLOR=1 docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

dev-down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down

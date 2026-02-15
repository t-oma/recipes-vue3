docker-up:
	@echo "Starting docker containers..."
	@docker compose up -d
	@sleep 2

build: docker-up
	@echo "Building api..."
	@pnpm build

start: build
	@echo "Starting api..."
	@pnpm start
.PHONY: build run dev clean help

# Default target when just running 'make'
all: dev

dev:
	DOCKERFILE=service/Dockerfile \
    docker-compose -f service/docker-compose.yml build && \
    docker-compose -f service/docker-compose.yml up -d && \
	open http://localhost:3000

test-lib:
	cd lib && go test -v ./...

test-service: dev
	@echo "Running integration tests..."
	@echo "Waiting for service to be ready..."
	@sleep 5  # Give containers time to start up
	cd service && go test -v ./...

test: test-service test-lib

# Clean up
clean:
	docker-compose -f service/docker-compose.yml down
	docker rmi -f docker.io/library/service-espresso-ui docker.io/localstack/localstack docker.io/library/service-espresso


# Show help
help:
	@echo "Available targets:"
	@echo "  make          - build and run the service"
	@echo "  make clean    - Clean up Docker resources"
	@echo "  make test     - Run all tests (both lib and service)"
	@echo "  make test-lib - Run only lib tests"
	@echo "  make test-service - Run only service tests"
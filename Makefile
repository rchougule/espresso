.PHONY: build run dev clean help

# Default target when just running 'make'
all: dev

init:
	@echo "== 👩‍🌾 init =="
	brew install go
	brew install node
	brew install pre-commit
	brew install golangci-lint
	brew upgrade golangci-lint

	@echo "== pre-commit setup =="
	pre-commit install

	@echo "== install ginkgo =="
	go install -mod=mod github.com/onsi/ginkgo/v2/ginkgo
	go get github.com/onsi/gomega/...

	@echo "== install gomock =="
	go install github.com/golang/mock/mockgen@v1.6.0

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

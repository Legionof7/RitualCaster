DOCKER_ORG := rankjay
NAME := ritual-frame
TAG := $(DOCKER_ORG)/$(NAME):latest

.phony: build run publish build-multiplatform try-prompt

build:
	@docker build -t $(TAG) .

run: build
	docker run --rm --name $(NAME) --env-file ./sample-gpt.env -p 3000:3000 $(TAG)

# You may need to set up a docker builder, to do so run:
# docker buildx create --name mybuilder --bootstrap --use
# refer to https://docs.docker.com/build/building/multi-platform/#building-multi-platform-images for more info
build-multiplatform:
	docker buildx build --platform linux/amd64,linux/arm64 -t $(TAG) --push .

try-prompt:
	curl -X POST http://127.0.0.1:3000/service_output \
	     -H "Content-Type: application/json" \
	     -d '{"prompt": "Hello how are you"}'

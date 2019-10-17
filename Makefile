# image
USERNAME=rchatham
IMAGE_NAME=api.reidchatham.com-comments
VERSION=1.0.0-beta1
CONTAINER_NAME=api.reidchatham.com-comments
CONTAINER_PORT=3000
EXPOSED_PORT=3000

docker_build:
	docker build -t $(IMAGE_NAME):$(VERSION) .

docker_run:
	docker run -it --name=$(CONTAINER_NAME) -p $(CONTAINER_PORT):$(EXPOSED_PORT) $(IMAGE_NAME):$(VERSION)

docker_build_run: docker_build docker_run

docker_tag:
	docker tag $(IMAGE_NAME):$(VERSION) $(USERNAME)/$(IMAGE_NAME):$(VERSION)

docker_push:
	docker push $(USERNAME)/$(IMAGE_NAME):$(VERSION)

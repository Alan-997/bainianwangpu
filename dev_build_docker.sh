# 镜像仓库地址
# REPOSITORY_ADDRESS=192.168.50.200:1180
REPOSITORY_ADDRESS=harbor.tunnel.ccapp.co

# 镜像地址
IMAGE_UUID=${REPOSITORY_ADDRESS}/public/node:8.16.0

docker run --rm --name cc-build-node --privileged -v $(pwd):/wwwroot/ ${IMAGE_UUID}  sh -c "cd /wwwroot && yarn && npm run build:prod"

sudo chown -R ${USER}:${USER} dist

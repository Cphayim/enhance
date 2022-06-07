#!/bin/sh

cd playground
pnpm build

cd dist
rsync --no-o --no-g -av "$(pwd)/" vrn:/data/vrndeco/enhance

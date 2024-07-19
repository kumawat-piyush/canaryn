#pnpm install
# pnpm deps

set -e

cd packages/svg-icon-cli; npm install
cd ../svg-icon; npm install && npm run build
cd ../svg-icon-react; npm install && npm run build
cd ../icons-noir; npm install && npm run build
cd ../canary; npm install && npm run build

cd ../../apps/storybook; npm install && npm run build && npm run build-storybook

pnpm install
pnpm deps

cd packages/svg-icon; pnpm build
cd ../svg-icon-svg; pnpm build
cd ../icons-noir; pnpm build
cd ../canary; pnpm build

cd ../../apps/storybook; pnpm build; pnpm build-storybook

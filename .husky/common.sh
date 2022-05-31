#!/bin/sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && echo "nvm version: $(nvm --version)" && nvm use
echo "node version: $(node --version)"
echo "pnpm version: $(pnpm --version)"

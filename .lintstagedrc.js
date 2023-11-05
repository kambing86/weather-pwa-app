module.exports = {
  "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write"],
  "src/**/*.{js,jsx,ts,tsx}": ["eslint --fix --max-warnings=0"],
};

const { writeFileSync } = require("fs");

const targetPath = "./src/environments/environment.prod.ts";

const envConfigFile = `export const environment = {
  production: true,
  tmdbApiKey: '${process.env.TMDB_API_KEY}',
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
};
`;

writeFileSync(targetPath, envConfigFile);

console.log(
  `Wrote environment.prod.ts with TMDB_API_KEY=${process.env.TMDB_API_KEY}`
);

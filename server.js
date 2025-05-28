require("dotenv").config();
const Hapi = require("@hapi/hapi");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const bookmarkRoutes = require("./src/routes/bookmarkRoutes");
const recipeRoutes = require("./src/routes/recipeRoutes");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route([
    ...authRoutes,
    ...userRoutes,
    ...bookmarkRoutes, 
    ...recipeRoutes, 
  ]);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

init();

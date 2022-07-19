import app from "./app.js";
import { init } from "./app.js";

const PORT = process.env.PORT || 5000;
init().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
  });
});

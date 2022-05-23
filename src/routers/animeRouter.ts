import { Router } from "express";
import { getRandomAnime } from "../controllers/aniListController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { animeDataSchema } from "../schemas/animeSchema.js";
import { insertAnime, getAnimeListById, updateAnimeStatus } from "../controllers/animeController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";


const animeRouter = Router();

animeRouter.get('/',ensureAuthenticatedMiddleware,  getRandomAnime);
animeRouter.post('/', ensureAuthenticatedMiddleware ,validateSchemaMiddleware(animeDataSchema), insertAnime);
animeRouter.get('/animelist', ensureAuthenticatedMiddleware, getAnimeListById);
animeRouter.put('/status', ensureAuthenticatedMiddleware, updateAnimeStatus);
export default animeRouter;
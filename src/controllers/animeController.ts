
import { Request, Response } from "express";
import { CreateAnimeData, AnimeData } from "../services/aniListServices.js";
import * as animeServices from  '../services/animeServices.js'
import { User } from "@prisma/client";

export async function insertAnime(req: Request, res: Response){

    const {user} = res.locals as {user: User};
    const anime = req.body as AnimeData
    await animeServices.insertAnime(anime, user);

    res.sendStatus(201);
}

export async function getAnimeListById(req: Request, res: Response){

    const {user} = res.locals as {user: User};

    const animeList = await animeServices.getAnimeListById(user);

    res.send(animeList);
}

export async function updateAnimeStatus(req: Request, res: Response) {
    
    const {status} = req.body as {status: string};
    const {animeId} = req.body;

    await animeServices.updateAnime(status, parseInt(animeId));
    res.sendStatus(200)
}
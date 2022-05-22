import axios from "axios";
import { instance, createConfig } from "../utils/aniListUtils.js";
import { Request, Response, NextFunction } from "express";
import * as aniListServices from '../services/aniListServices.js'
import * as animeServices from  '../services/animeServices.js'
import { CreateAnimeData } from "../services/aniListServices.js";

export async function getRandomAnime(req:Request, res: Response){

    const {user} = res.locals;
    const {score} = req.query as {score: string};


    const animeIdArray = await animeServices.getAnimesIds(user.id);
    const body = aniListServices.createGraphQLQuery(animeIdArray, parseInt(score));
    const result = await aniListServices.getAnimes(body) as CreateAnimeData[];

    const randomAnime = aniListServices.pickRandomAnime(result);
    res.send(randomAnime);

}
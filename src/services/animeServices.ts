
import { CreateAnimeData, AnimeData } from "./aniListServices";
import * as animeRepository from '../repositories/animeRepository.js'
import { User } from "@prisma/client";


export async function pickRandomAnime(animeList: CreateAnimeData[]){

    const animeListLength = animeList.length;
    const randomIndex = Math.round(Math.random()*(animeListLength-1))
    console.log(animeList[randomIndex].title)

}

export async function getAnimesIds(userId: number){

    return await animeRepository.animeListIds(userId);
}

export async function insertAnime(anime: AnimeData, user: User){

    await animeRepository.insertAnime(anime, user);
    return
}

export async function getAnimeListById(user: User){
    return await animeRepository.getAnimeListById(user);
    
}

export async function updateAnime(status: string, animeId: number){
    return await animeRepository.updateAnimeStatus(status, animeId);
}
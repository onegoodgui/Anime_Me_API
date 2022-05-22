import { Request } from "express";
import * as aniListRepository from '../repositories/aniListRepository.js'

export interface AnimeData {

    id: number;
    title: {english: string};
    averageScore: number;
    status: "watched" | "watching" | "to_watch"
    description: string;
    genres: string[];
    coverImage: Image
  }

  interface Image {
    large: string,
    medium: string
  }

export type CreateAnimeData = Omit<AnimeData, 'id'>



export async function getAnimes(body: string){

    return await aniListRepository.getAnimes(body)
}

export function createGraphQLQuery(animeIdArray: number[], score: number){
  return aniListRepository.createGraphQLQuery(animeIdArray, score)
}

export function pickRandomAnime(animeList: CreateAnimeData[]){

    const animeListLength = animeList.length;
    const randomIndex = Math.round(Math.random()*(animeListLength-1))
    return animeList[randomIndex]

}
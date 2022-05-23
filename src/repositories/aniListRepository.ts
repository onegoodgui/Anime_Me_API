import { Request, Response, NextFunction } from "express";
import { createConfig, removeTags } from "../utils/aniListUtils.js";
import { instance } from "../utils/aniListUtils.js";

export async function getAnimes(body: string){

    const config = createConfig();

    const result = await instance.post('https://graphql.anilist.co',body ,config);
    const animeList = result.data.data.Page.media;
    animeList.map(anime => {
       anime.description = removeTags(anime.description)
    })
    return animeList

}

export function createGraphQLQuery(animeIdArray: number[], score: number){
    
    var query = 
`query ($score: Int, $page: Int, $perPage: Int, $id_array: [Int]) { 
    Page (page: $page, perPage: $perPage){

        media(averageScore_greater: $score, id_not_in: $id_array, type: ANIME){
            id

            title {
                english
            }
            genres
            coverImage{
                large
            }
            description
            averageScore
            
        }

    }
  
}
`;

var variables = {
    score: score,
    page: 1,
    perPage: 50,
    id_array: animeIdArray
};

return JSON.stringify({query, variables});


}
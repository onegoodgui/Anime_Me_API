import { User } from "@prisma/client";
import { prisma } from "../config/database.js";
import { CreateAnimeData, AnimeData } from "../services/aniListServices.js";

export async function animeListIds(userId: number) {
  const result = await prisma.anime.findMany({
    where: {
      animeUsers: {
        some: {
          userId: userId,
        },
      },
    },

    select: {
      dbId: true,
    },
  });

  return result.map((item) => item.dbId);
}

export async function findAnimeById(animeId: number) {
  return await prisma.anime.findFirst({ where: { dbId: animeId } });
}

export async function insertAnime(anime: AnimeData, user: User) {
  const storedAnime = await findAnimeById(anime.id);

  if (storedAnime) {
    await prisma.animeUser.create({
      data: {
        animeId: storedAnime.dbId,
        userId: user.id,
      },
    });

    return;
  } else {
    const storingAnime = await prisma.anime.create({
      data: {
        dbId: anime.id,
        title: anime.title.english ? anime.title.english : anime.title.romaji,
        description: anime.description,
        averageScore: anime.averageScore,
        status: anime.status,
      },
    });

    await prisma.animeUser.create({
      data: {
        animeId: storingAnime.dbId,
        userId: user.id,
      },
    });

    await prisma.image.create({
      data: {
        animeId: storingAnime.dbId,
        large: anime.coverImage.large,
      },
    });
  }

  anime.genres.map(async (genre) => {
    const storedGenre = await prisma.genre.findFirst({
      where: { name: genre },
    });
    if (storedGenre) {
      await prisma.animeGenre.create({
        data: {
          animeId: anime.id,
          genreId: storedGenre.id,
        },
      });

      return;
    } else {
      const newGenre = await prisma.genre.create({
        data: {
          name: genre,
        },
      });
      await prisma.animeGenre.create({
        data: {
          animeId: anime.id,
          genreId: newGenre.id,
        },
      });
    }
  });
  return;
}

export async function getAnimeListById(user: User) {
  const animeList = await prisma.anime.findMany({
    where: {
      animeUsers: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      animeGenres: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },
      images: {
        select: {
          large: true,
        },
      },
    },
  });

  return animeList;
}

export async function updateAnimeStatus(status: string, animeId: number) {
  const result = await prisma.anime.update({
    where: {
      dbId: animeId,
    },
    data: {
      status: status,
    },
  });
  return result;
}

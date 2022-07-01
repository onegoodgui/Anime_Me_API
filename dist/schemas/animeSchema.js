import joi from 'joi';
export var animeDataSchema = joi.object({
    id: joi.number().required(),
    title: joi.object({
        english: joi.string().required()
    }),
    averageScore: joi.number().required(),
    status: joi.string().valid("watched", "watching", "to_watch").required(),
    description: joi.string(),
    genres: joi.array().items(joi.string()).required(),
    coverImage: joi.object({
        large: joi.string(),
        medium: joi.string()
    })
});

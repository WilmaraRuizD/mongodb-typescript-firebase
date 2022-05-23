import Joi from "joi";

const movieSchema= Joi.object({
adult:Joi.boolean().required(),
backdrop_path:Joi.string().min(1).max(50),
genre_ids:Joi.string().min(1).max(25),
original_language:Joi.string().required(),
original_title:Joi.string().required(),
overview:Joi.string().min(1).max(250),
popularity:Joi.number(),
poster_path:Joi.string().min(1).max(50),
release_date: Joi.date().less('now'),
title: Joi.string().required(),
video:Joi.boolean(),
vote_average:Joi.number(),
vote_count:Joi.number()

})

export default movieSchema
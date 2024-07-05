import TMDB_API from "../api/TMDB_API.js";

export const getTV = async (req, res) => {
  const page = req.query.page || 1;
  const language = req.query.language || 'en-US';
  const genres = req.query.genres;
  const query = req.query.query;
  const region = req.query.region;

  const response = await TMDB_API.get("/search/tv", {
    params: {
      page: page,
      language: language,
      query: query,
      region: region,
    },
  });

  if (!genres) {
    return res.send(response.data.results);
  }

  const genreList = await TMDB_API.get("/genre/tv/list", {
    params: {
      language: language,
    },
  });

  const genre = genreList.data.genres.find((genre) => {
    return genre.name === genres;
  }).id;

  const dataFilter = response.data.results.filter((movie) => {
    return movie.genre_ids.includes(parseInt(genre));
  });

  return res.send(dataFilter);
};

export const getTVById = async (req, res) => {
  const { id } = req.params;
  const { language } = req.query;

  try {
    const response = await TMDB_API.get(`/tv/${id}`, {
      params: {
        language: language,
      },
    });

    return res.send(response.data);
  } catch (error) {
    return res.status(404).send();
  }
};

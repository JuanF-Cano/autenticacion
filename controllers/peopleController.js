import TMDB_API from "../api/TMDB_API.js";

export const getPeople = async (req, res) => {
  const query = req.query.query;
  const language = req.query.language || 'en-US';
  const page = req.query.page || 1;
  const include_adult = req.query.include_adult;

  try {
    const response = await TMDB_API.get("/search/person", {
      params: {
        query: query,
        language: language,
        page: page,
        include_adult: include_adult,
      },
    });
    return res.send(response.data.results);
  } catch (error) {
    return res.status(404).send();
  }
};

export const getPeopleById = async (req, res) => {
  const { id } = req.params;
  const { language } = req.query;

  try {
    const response = await TMDB_API.get(`/person/${id}`, {
      params: {
        language: language,
      },
    });

    return res.send(response.data);
  } catch (error) {
    return res.status(404).send();
  }
};

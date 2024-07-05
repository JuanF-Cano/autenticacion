import TMDB_API from "../api/TMDB_API.js";
export const getTrending = async (req, res) => {
  const type = req.params.type;
  const time_window = req.query.time_window || 'day';
  const language = req.query.language || 'en-US';

  try {
    const response = await TMDB_API.get(`/trending/${type}/${time_window}`, {
      params: {
        language: language,
      },
    });
    return res.send(response.data);
  } catch (error) {
    return res.status(404).send();
  }
};

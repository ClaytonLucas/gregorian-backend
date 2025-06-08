const Music = require('../models/music');

exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const musicas = await Music.findAll({
      limit,
      offset,
      order: [['title', 'ASC']], 
    });

    res.json(musicas);
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
    res.status(500).json({ error: 'Erro ao buscar músicas' });
  }
};

exports.searchByTitle = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Parâmetro "title" é obrigatório' });
  }

  try {
    const musicas = await Music.findAll({
      where: {
        title: {
          [require('sequelize').Op.iLike]: `%${title}%`, 
        },
      },
      order: [['title', 'ASC']],
    });

    res.json(musicas);
  } catch (error) {
    console.error('Erro ao buscar músicas pelo título:', error);
    res.status(500).json({ error: 'Erro ao buscar músicas pelo título' });
  }
};

exports.getOne = async (req, res) => {
  const musica = await Music.findByPk(req.params.id);
  if (musica) return res.json(musica);
  res.status(404).json({ error: 'Música não encontrada' });
};

exports.create = async (req, res) => {
  const { title, type, audioUrl, sheetUrl } = req.body;
  const musica = await Music.create({ title, type, audioUrl, sheetUrl });
  res.status(201).json(musica);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, type, audioUrl, sheetUrl } = req.body;

  try {
    const musica = await Music.findByPk(id);
    if (!musica) {
      return res.status(404).json({ error: 'Música não encontrada' });
    }

    await musica.update({ title, type, audioUrl, sheetUrl });
    res.json(musica);
  } catch (error) {
    console.error('Erro ao atualizar música:', error);
    res.status(500).json({ error: 'Erro ao atualizar música' });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const musica = await Music.findByPk(id);
    if (!musica) {
      return res.status(404).json({ error: 'Música não encontrada' });
    }

    await musica.destroy();
    res.status(204).send(); 
  } catch (error) {
    console.error('Erro ao deletar música:', error);
    res.status(500).json({ error: 'Erro ao deletar música' });
  }
};

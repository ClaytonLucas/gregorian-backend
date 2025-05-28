const Music = require('../models/music');

exports.getAll = async (req, res) => {
  const musicas = await Music.findAll();
  res.json(musicas);
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
    res.status(204).send(); // ou res.json({ message: 'Música deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar música:', error);
    res.status(500).json({ error: 'Erro ao deletar música' });
  }
};

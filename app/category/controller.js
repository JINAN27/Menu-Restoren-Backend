const Categories = require('./model');

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = new Categories(payload);
    await category.save();
    return res.status(201).json(category);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        error: 1,
        message: 'Validasi gagal',
        fields: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = await Categories.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({
        error: 1,
        message: 'Kategori tidak ditemukan',
      });
    }
    return res.json(category);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        error: 1,
        message: 'Validasi gagal',
        fields: err.errors,
      });
    }
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    let category = await Categories.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        error: 1,
        message: 'Kategori tidak ditemukan',
      });
    }
    return res.json({
      message: 'Kategori berhasil dihapus',
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let categories = await Categories.find();
    return res.json(categories);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  store,
  update,
  destroy,
  index,
};

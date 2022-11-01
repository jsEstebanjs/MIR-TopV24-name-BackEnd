const Categories = require("./categories.model");
const User = require("../user/user.model");

module.exports = {
  async listById(req, res) {
    try {
      const categories = await Categories.find();
      res
        .status(200)
        .json({ message: "Categorias encontradas", data: categories });
    } catch (err) {
      res.status(404).json({ message: "Categorias no encontradas", data: err });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;

      const category = await Categories.findById(id);

      res.status(200).json({ message: "Categoria encontrada", data: category });
    } catch (err) {
      res.status(400).json({ message: "Categoria no encontrada", data: err });
    }
  },

  async create(req, res) {
    try {
      const user = await User.findById(req.user);
      const data = req.body;

      if (!user) {
        throw new Error("Usuario no existente");
      }

      const category = await Categories.create({ ...data, idUser: req.user });

      user.idCategories.push(category);
      await user.save({ validateBeforeSave: false });

      res
        .status(200)
        .json({ message: "Categoria creada", data: category });
    } catch (err) {
      res
        .status(400)
        .json({ message: "No se ha podido crear la categoria", error: err });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const category = await Categories.findById(id);
      const infoUpdateCategory = req.body;

      if (!category) {
        throw new Error("Categoria no encontrada");
      }
      const updateCategory = await Categories.findByIdAndUpdate(
        id,
        infoUpdateCategory,
        { new: true }
      );

      res.status(200).json({
        message: "Categoria actualizada correctamente",
        data: updateCategory,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Categoria no actualizada", data: error });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const category = await Categories.findByIdAndDelete(id);

      res
        .status(200)
        .json({ message: "Categoria eliminada exitosamente", data: category });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al eliminar la categoria", data: err });
    }
  },
};

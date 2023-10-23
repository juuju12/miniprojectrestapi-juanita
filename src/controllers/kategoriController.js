const kategoriModel = require("../models/kategoriModel");

const kategoriController = {};

kategoriController.getAll = async (req, res) => {
  try {
    const kategoriData = await kategoriModel.getAll();
    res.status(200).json({
      message: "Kategori Berhasil di Akses",
      data: kategoriData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan!",
      error: error.message,
    });
  }
};

kategoriController.create = async (req, res) => {
  try {
    const newKategori = await kategoriModel.create(req.body);
    res.status(201).json({
      message: "Kategori Menu Berhasil ditambahkan",
      data: newKategori,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan!",
      error: error.message,
    });
  }
};

kategoriController.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedKategori = req.body;
    const success = await kategoriModel.update(id, updatedKategori);

    if (success) {
      res.status(200).json({
        message: "Data berhasil di Update!",
        data: updatedKategori,
      });
    } else {
      res.status(404).json({
        message: "Data tidak ditemukan atau update gagal!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan!",
      error: error.message,
    });
  }
};

kategoriController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await kategoriModel.delete(id);

    if (success) {
      res.status(200).json({
        message: "Kategori Berhasil Dihapus",
      });
    } else {
      res.status(404).json({
        message: "Data Kategori tidak ditemukan atau gagal menghapus!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan",
      error: error.message,
    });
  }
};

module.exports = kategoriController;

//1
const kategoriModel = require("../models/kategoriModel");
const menuModel = require("../models/menuModel");

const exampleController = {};
const kategori = {};

exampleController.getAll = async (req, res) => {
  try {
    const dataMenu = await menuModel.getAll();
    res.status(200).json({
      message: "Menu berhasil di akses",
      data: dataMenu,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan!",
      error: error.message,
    });
  }
};
// silahkan buat varian controller lain sesuai fitur masing masing
exampleController.create = async (req, res) => {
  try {
    const menuBaru = await menuModel.create(req.body);
    res.status(201).json({
      message: "Menu Baru Berhasil Ditambahkan!",
      data: menuBaru,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan!",
      error: error.message,
    });
  }
};
exampleController.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateMenus = req.body;
    const success = menuModel.update(id, updateMenus);

    if (success) {
      res.status(200).json({
        message: "Data Menu Berhasil di Update!",
        data: updateMenus,
      });
    } else {
      res.status(404).json({
        message: "Data Tidak Berhasil Ditemukan atau Data gagal di Update!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan!",
      error: error.message,
    });
  }
};
exampleController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await menuModel.delete(id);

    if (success) {
      res.status(200).json({
        message: "Data Menu Berhasil diHapus",
      });
    } else {
      res.status(404).json({
        message: "Data Tidak Berhasil Ditemukan atau Data gagal di Update!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan!",
      error: error.message,
    });
  }
};

kategori.getAll = async (req, res) => {
  try {
    const dataKategori = await kategoriModel.getAll();
    res.status(200).json({
      message: "Kategori Berhasil di Akses",
      data: dataKategori,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan!",
      error: error.message,
    });
  }
};

kategori.create = async (req, res) => {
  try {
    const newKategori = await kategoriModel.create(req.body);
    res.status(201).json({
      message: "Menu Berhasil ditambahkan",
      data: newKategori,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan",
      error: error.message,
    });
  }
};

module.exports = exampleController;

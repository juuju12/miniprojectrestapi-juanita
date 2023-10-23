const pelangganModel = require("../models/pelangganModel");

const pelangganController = {};

pelangganController.getAll = async (req, res) => {
  try {
    const pelangganData = await pelangganModel.getAll();
    res.status(200).json({
      message: "Pelanggan berhasil diakses",
      data: pelangganData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan Akses!",
      error: error.message,
    });
  }
};

// silahkan buat varian controller lain sesuai fitur masing masing
pelangganController.create = async (req, res) => {
  try {
    const newPelanggan = await pelangganModel.create(req.body);
    res.status(201).json({
      message: "Pelanggan Berhasil ditambahkan",
      data: newPelanggan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan!",
      error: error.message,
    });
  }
};

pelangganController.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPelanggan = req.body;
    const success = await pelangganModel.update(id, updatedPelanggan);

    if (success) {
      res.status(200).json({
        message: "Data Berhasil di Update!",
        data: updatedPelanggan,
      });
    } else {
      res.status(404).json({
        message: "Data Tidak Dapat Ditemukan Atau Terjadi Kesalahan Update",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan!",
      error: error.message,
    });
  }
};

pelangganController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await pelangganModel.delete(id);

    if (success) {
      res.status(200).json({
        message: "Data Berhasil di Hapus!",
      });
    } else {
      res.status(404).json({
        message: "Data Tidak Dapat Ditemukan Atau Terjadi Kesalahan Hapus",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan",
      error: error.message,
    });
  }
};

module.exports = pelangganController;

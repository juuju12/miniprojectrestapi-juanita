const pelangganModel = require("../models/pelangganModel");
const menuModel = require("../models/menuModel");
const orderModel = require("../models/orderModel");

const orderController = {};

orderController.createOrder = (req, res) => {
  const { customerId, items } = req.body;

  // Validasi data pelanggan
  pelangganModel.getByName(customerId, (err, customerData) => {
    if (!customerData) {
      return res.status(400).json({
        status: "Error",
        message: "Data Pelanggan tidak ditemukan!",
      });
    }

    // Inisialisasi variabel untuk pesanan dan total harga
    const orders = [];
    let totalOrder = 0;

    const promises = [];

    // Iterasi setiap item yang dipesan
    for (const item of items) {
      const { menu, price, qty } = item;

      // Validasi menu
      promises.push(
        new Promise((resolve, reject) => {
          menuModel.getByName(menu, (err, menuData) => {
            if (!menuData) {
              reject("Menu tidak ditemukan: " + menu);
            } else {
              const order = {
                menu: menu,
                price: price,
                qty: qty,
              };
              orders.push(order);

              // Menambahkan total harga
              totalOrder += price * qty;

              // Menyimpan pesanan ke basis data
              orderModel
                .addItem([{ customerId, menuId: menuData.id, qty }])
                .then((orderData) => {
                  resolve();
                })
                .catch((error) => {
                  reject(error);
                });
            }
          });
        })
      );
    }

    Promise.all(promises)
      .then(() => {
        // memanggil orderModel.addItem untuk mendapatkan orderDate
        const currentDate = new Date();
        const orderDate = currentDate.toISOString().split("T")[0];
        return res.json({
          status: "OK",
          message: "Data Berhasil Ditambahkan !",
          orders: orders,
          totalOrder: totalOrder,
          orderDate: orderDate,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          status: "Error",
          message: "Terjadi Kesalahan : " + error,
        });
      });
  });
};

orderController.getAllOrderHistory = (req, res) => {
  orderModel
    .getAllOrderHistory()
    .then((orderHistory) => {
      res.json({ status: "OK", data: orderHistory });
    })
    .catch((error) => {
      console.error("Error in order history request:", error);
      res.status(500).json({ status: "Error", message: error });
    });
};
module.exports = orderController;

const express = require("express");
const exampleController = require("../controllers/ExampleController"); // Impor objek exampleController
const kategoriController = require("../controllers/kategoriController.js"); // Impor objek kategoriController
const pelangganController = require("../controllers/pelangganController.js");
const orderController = require("../controllers/orderController.js");
const router = express.Router();

// Router untuk menu
router.post("/menus", exampleController.create);
router.get("/menus", exampleController.getAll);
router.put("/menus/:id", exampleController.update);
router.delete("/menus/:id", exampleController.delete);

// Router untuk kategori
router.post("/kategori", kategoriController.create);
router.get("/kategori", kategoriController.getAll);
router.put("/kategori/:id", kategoriController.update);
router.delete("/kategori/:id", kategoriController.delete);

// Router untuk pelanggan
router.post("/pelanggan", pelangganController.create);
router.get("/pelanggan", pelangganController.getAll);
router.put("/pelanggan/:id", pelangganController.update);
router.delete("/pelanggan/:id", pelangganController.delete);

//Router untuk order
router.post("/order/create", orderController.createOrder);
router.get("/order/history", orderController.getAllOrderHistory);
module.exports = router;

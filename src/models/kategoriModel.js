const db = require("../../db/config");

const kategoriModel = {};
kategoriModel.getAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM categories", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// lanjutkan disini
//menambah kategori baru
kategoriModel.create = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO categories (name) VALUES (?)`,
      [data.name],
      function (err) {
        if (err) {
          reject(err);
        } else {
          const createdCategories = {
            name: data.name,
            id: this.lastID,
          };
          resolve(createdCategories);
        }
      }
    );
  });
};

//mengupdate kategori
kategoriModel.update = (id, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE categories SET name = ? WHERE id = ?",
      [data.name, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      }
    );
  });
};

//menghapus kategori
kategoriModel.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM categories WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
      } else {
        if (this.changes > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

module.exports = kategoriModel;

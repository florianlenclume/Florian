const { BrowserWindow } = require("electron");
const { getConnection } = require("./database");

let window;



// Fonctions pour les produits
const createProduit = async (produit) => {
  const conn = await getConnection();
  const result = await conn.query("INSERT INTO produit SET ?", produit);
  return result.insertId;
};

const getProduits = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM produit ORDER BY id DESC");
  return results;
};

const deleteProduit = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM produit WHERE id = ?", id);
  return result;
};

const getProduitById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM produit WHERE id = ?", id);
  return result[0];
};

const updateProduit = async (id, produit) => {
  const conn = await getConnection();
  const result = await conn.query("UPDATE produit SET ? WHERE id = ?", [
    produit,
    id,
  ]);
  console.log(result);
};

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile("src/ui/index-produit.html");
}

module.exports = {
  createWindow,
  createProduit,
  getProduits,
  deleteProduit,
  getProduitById,
  updateProduit,
};


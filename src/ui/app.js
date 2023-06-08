const { remote } = require("electron");
const main = remote.require("./main");

const produitForm = document.querySelector("#produitForm");
const produitNom = document.querySelector("#nom");
const produitPrix = document.querySelector("#prix");
const produitStock = document.querySelector("#stock");
const produitDescription = document.querySelector("#description");
const produitsList = document.querySelector("#produits");


let produits = [];
let editProduitId;




let editingStatus = false;




const deleteProduit = async (id) => {
  const response = confirm("Etes vous sur de vouloir supprimer ce produit ?");
  if (response) {
    await main.deleteProduit(id);
    await getProduits();
  }
  return;
};






const editProduit = async (id) => {
  const produit = await main.getProduitById(id);
  produitNom.value = produit.nom;
  produitPrix.value = produit.prix;
  produitStock.value = produit.stock;
  produitDescription.value = produit.description;

  editingStatus = true;
  editProduitId = id;
};





produitForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const produit = {
      nom: produitNom.value,
      prix: produitPrix.value,
      stock: produitStock.value,
      description: produitDescription.value,
    };

    if (!editingStatus) {
      const savedProduit = await main.createProduit(produit);
      console.log(savedProduit);
    } else {
      const produitUpdated = await main.updateProduit(editProduitId, produit);
      console.log(produitUpdated);

      // Reset
      editingStatus = false;
      editProduitId = "";
    }

    produitForm.reset();
    produitNom.focus();
    getProduits();
  } catch (error) {
    console.log(error);
  }
});




 


function renderProduits(tasks) {
  produitsList.innerHTML = "";
  tasks.forEach((t) => {
    produitsList.innerHTML += `
      <div class="card card-body my-2 animated fadeInLeft">
        <h4>${t.nom}</h4>
        <p>${t.description}</p>
        <p>${t.stock}</p>
        <h3>${t.prix}$</h3>
        <p>
        <button class="btn btn-danger btn-sm" onclick="deleteProduit('${t.id}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editProduit('${t.id}')">
          EDIT 
        </button>
        </p>
      </div>
    `;
  });
}


 function renderClients(tasks) {
  clientsList.innerHTML = "";
  tasks.forEach((t) => {
    clientsList.innerHTML += `
      <div class="card card-body my-2 animated fadeInLeft">
        <h4>${t.nomClient}</h4>
        <p>${t.prenomClient}</p>
        <p>${t.email}</p>
        <h3>${t.motdepasse}$</h3>
        <p>
        <button class="btn btn-danger btn-sm" onclick="deleteClient('${t.id}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editClient('${t.id}')">
          EDIT 
        </button>
        </p>
      </div>
    `;
  });
} 

const getProduits = async () => {
  produits = await main.getProduits();
  renderProduits(produits);
};



async function init() {
  getProduts();
  getClients();
}

init();

const eventForm = document.getElementById("event-form");

class Item {
  constructor(_name, _description, _image, _price, _brand) {
    this.name = _name;
    this.description = _description;
    this.imageUrl = _image;
    this.price = _price;
    this.brand = _brand;
  }
}

const submitEvent = function (e) {
  e.preventDefault();
  const inputName = document.getElementById("name");
  const inputDescription = document.getElementById("description");
  const inputImg = document.getElementById("image-url");
  const inputPrice = document.getElementById("price");
  const inputBrand = document.getElementById("brand");

  const newItem = new Item(
    inputName.value,
    inputDescription.value,
    inputImg.value,
    inputPrice.value,
    inputBrand.value
  );

  console.log(newItem);
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    body: JSON.stringify(newItem),
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZWUwOTgxODQ0MjAwMTUzNzU5M2MiLCJpYXQiOjE3MTUzMzQ2NjUsImV4cCI6MTcxNjU0NDI2NX0.rXuuh1pDrQCcsDgqkGaUUWV2IJ0hIP2cSwXw-yJj23c",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("ok", response);
        alert("Il prodotto è stato salvato con successo!");
      } else {
        throw new Errore("Non è stato possibile creare il prodotto");
      }
    })
    .catch((err) => {
      alert(err);
    });
};

eventForm.addEventListener("submit", submitEvent);

const generateList = function (array) {
  const ul = document.getElementById("list-item");
  array.forEach((item) => {
    const newLi = document.createElement("li");
    newLi.classList.add("list");
    newLi.innerHTML = `
    <div class="d-flex gap-3 justify-content-between">
    <div> 
        <img src="${item.imageUrl}" alt="product image">
    </div>
    <div class="d-flex gap-5">
        <p>Nome : ${item.name}</p>
        <p>Brand: ${item.brand}</p>
        <p>Descrizione: ${item.description}</p>
        <p> Price: ${item.price}$ </p> 
    </div> 
    <div> 
    <a href="backoffice.html?id=${item._id}" class="btn btn-outline-warning"> Modify </a>
    <a href="backoffice.html?id=${item._id}" class="btn btn-outline-danger" id='delete-btn'> Delete </a>
    </div>    
  </div>

    `;
    ul.appendChild(newLi);
  });
};

const getFetch = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZWUwOTgxODQ0MjAwMTUzNzU5M2MiLCJpYXQiOjE3MTUzMzQ2NjUsImV4cCI6MTcxNjU0NDI2NX0.rXuuh1pDrQCcsDgqkGaUUWV2IJ0hIP2cSwXw-yJj23c",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("ok", response);
        return response.json();
      } else {
        throw new Error("Errore");
      }
    })
    .then((array) => {
      generateList(array);
      console.log(array);
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getFetch();

const urlContent = new URLSearchParams(location.search);
const itemId = urlContent.get("id");

const getItemData = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZWUwOTgxODQ0MjAwMTUzNzU5M2MiLCJpYXQiOjE3MTUzMzQ2NjUsImV4cCI6MTcxNjU0NDI2NX0.rXuuh1pDrQCcsDgqkGaUUWV2IJ0hIP2cSwXw-yJj23c",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("ok", response);
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'oggetto");
      }
    })
    .then((item) => {
      document.getElementById("name").value = item.name;
      document.getElementById("description").value = item.description;
      document.getElementById("image-url").value = item.imageUrl;
      document.getElementById("price").value = item.price;
      document.getElementById("brand").value = item.brand;
      const formButton = document.getElementById("form-button");
      formButton.innerText = "Modifica";
      formButton.classList.remove("btn-outline-light");
      formButton.classList.add("btn-outline-warning");
      formButton.innerText = "Modifica";
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};
getItemData();

const deleteItem = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZWUwOTgxODQ0MjAwMTUzNzU5M2MiLCJpYXQiOjE3MTUzMzQ2NjUsImV4cCI6MTcxNjU0NDI2NX0.rXuuh1pDrQCcsDgqkGaUUWV2IJ0hIP2cSwXw-yJj23c",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Oggetto eliminato con successo!");
      } else {
        throw new Error("Errore nell'eliminazione dell'oggetto");
      }
    })
    .then(() => {
      location.assign("index.html");
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

document.getElementById("delete-btn").addEventListener("click", deleteItem);

if (itemId) {
  getItemData();
  eventForm.removeEventListener("submit", submitEvent);
  eventForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputName = document.getElementById("name");
    const inputDescription = document.getElementById("description");
    const inputImg = document.getElementById("image-url");
    const inputPrice = document.getElementById("price");
    const inputBrand = document.getElementById("brand");

    const newItem = new Item(
      inputName.value,
      inputDescription.value,
      inputImg.value,
      inputPrice.value,
      inputBrand.value
    );
    fetch("https://striveschool-api.herokuapp.com/api/product/" + itemId, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZWUwOTgxODQ0MjAwMTUzNzU5M2MiLCJpYXQiOjE3MTUzMzQ2NjUsImV4cCI6MTcxNjU0NDI2NX0.rXuuh1pDrQCcsDgqkGaUUWV2IJ0hIP2cSwXw-yJj23c",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (response.ok) {
          console.log("ok", response);
          return response.json();
        } else {
          throw new Error("Errore");
        }
      })
      .then((array) => {
        console.log(array);
      })
      .catch((err) => {
        console.log("ERRORE", err);
      });
  });
}

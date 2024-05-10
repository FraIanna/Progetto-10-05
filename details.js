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
      console.log("Dettagli recuperati", item);
      document.getElementById("name").innerText = item.name;
      document.getElementById("description").innerText = item.description;
      document.getElementById("price").innerText = item.price + "$";
      document.getElementById("image-url").innerHTML = `${item.imageUrl}`;
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};
getItemData();

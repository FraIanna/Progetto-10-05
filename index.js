const generateCards = function (array) {
  const rowDiv = document.getElementById("main-div");
  array.forEach((item) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col");
    newCol.innerHTML = `
    <div class="card"">
      <img src="${item.imageUrl}" class="card-img-top" alt="product image">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>=
        <p class="card-text">${item.brand}</p>
        <p class="card-text">${item.description}</p>
        <div class='d-flex gap-3'> 
          <button class="btn btn-success">${item.price}$ BUY!</button>
          <a href="details.html?id=${item._id}" class="btn btn-info"> INFO </a>
        </div>
      </div>
  </div>
    `;
    rowDiv.appendChild(newCol);
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
      generateCards(array);
      console.log(array);
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getFetch();

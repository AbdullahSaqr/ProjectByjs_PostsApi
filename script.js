
// ================== DEV BY Abdullah Saqr ================== //


const viewButtons = document.querySelectorAll(".view-button");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeButton = document.querySelector(".close-button");
const cardContainer = document.getElementById("card-container")
// viewButtons.forEach(button => {
//     button.addEventListener("click", function() {
//         const imgUrl = this.closest(".card").querySelector("img").getAttribute("src");
//         modalImage.src = imgUrl;
//         modal.style.display = "block";
//     });
// });

// closeButton.addEventListener("click", function() {
//     modal.style.display = "none";
// })

async function dispatchData(callback) {
    const data = await fetch('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=100').then((response) =>  response.json());
    callback(data);
}
async function dispatchSingleData(callback, id) {
    const data = await fetch('https://jsonplaceholder.typicode.com/photos?id=' + id).then((response) =>  response.json());
    return callback(data);
}
function assignFormData(data) {
    data = data[0];
    document.querySelector("#photo-title").value = data.title;    
}
function saveStorage(name, value) {
    localStorage.setItem(name, value);
}
function getStorage(name) {
    localStorage.getItem(name);
}
function edit(data) {
    saveStorage(data.id, data);
}
function handleDeleteClick() {
    const confirmDelete = confirm("Do you want to delete this post?");
    if (confirmDelete) {
        const card = this.closest(".card");
        cardContainer.removeChild(card);
    }
}
function handleButtonClick() { 
}
function showData (data)
{
     data.forEach(post => {
    const card = document.createElement("div");
    card.className = "card col-3";
    card.innerHTML = `
        <img src="${post.thumbnailUrl}" alt="Thumbnail">
        <h2>${post.title}</h2>
        <div class="buttons mt-auto">
            <button data-photo-id="${post.id}" class="update-button">Update</button>
            <button class="delete-button">Delete</button>
            <button class="view-button">View</button>
            <button class="select-button">Select</button>
        </div>
    `;
    cardContainer.appendChild(card);
    setTimeout(() => {
        card.classList.add("show");
    }, 100 * data.indexOf(post));
});
document.querySelectorAll(".update-button").forEach(function(button) {
    button.addEventListener("click", function(e) {
        const photoId = e.target.getAttribute("data-photo-id");
        window.location.href = `edit.html?photoId=${photoId}`;
    });
});
document.querySelectorAll(".delete-button").forEach(function(deleteButton) {
deleteButton.addEventListener("click", handleDeleteClick);});
document.querySelectorAll(".update-button, .view-button, .select-button").forEach(button => {
    button.addEventListener("click", handleButtonClick);
});

}


// ================== DEV BY Abdullah Saqr ================== //





// ================== Section Of save The Data ================== //

function populateFormFromLocalStorage() {
    const editedDataJSON = getStorage("editedData");
    if (editedDataJSON) {
        const editedData = JSON.parse(editedDataJSON);
        document.getElementById("photo-title").value = editedData.photoTitle;
        document.getElementById("album-id").value = editedData.albumId;
    }
}


window.addEventListener("load", populateFormFromLocalStorage);

const editForm = document.getElementById("edit-form");

editForm.addEventListener("submit", function (e) {
    e.preventDefault();

  
    const photoTitle = document.getElementById("photo-title").value;
    const albumId = document.getElementById("album-id").value;

    
    const editedData = {
        photoTitle: photoTitle,
        albumId: albumId
    };

    
    const editedDataJSON = JSON.stringify(editedData);

    
    saveStorage("editedData", editedDataJSON);

    
    window.location.href = "index.html";
});



// ================== DEV BY Abdullah Saqr ================== //

let result = document.querySelector("#result");
let API_KEY = "AIzaSyCqjvqFjXzffr3yog5gs_tS8x6zoDjWrPk";

let input_search = document.querySelector("#Search");
let form = document.querySelector("#form");
let searchbtn = document.querySelector("#SearchBtn");

// TODO: faire barre de recherche pour trouver un livre qui nous interesse
// TODO: faire pagination grace au nombre


function SearchBooks() {

  // function who requested the api and return results of this request
  // input => null
  // request =>  https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=0&maxResults=40&langRestrict=fr&key=${API_KEY}
  // return => result of the request, and card for any result in request

  event.preventDefault();

  let search = input_search.value;
  if (search === "") {
    return;
  } else {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=0&maxResults=40&langRestrict=fr&key=${API_KEY}`)
      .then((response) => {
        if (response.status === 200) {
          deleteAllChild(result);
          return response.json();
        }
      })
      .then((values) => {
        let array_books = values.items;
        let url_cover_not_fund = "https://libribook.com/Images/les-jardins-de-lumiere-pdf.jpg";

        array_books.forEach((book) => {
          let TempBook = book.volumeInfo;
          createCard(
            TempBook.title,
            TempBook.subtitle ? TempBook.subtitle : " ",
            TempBook.publishedDate,
            TempBook.description ? TempBook.description : " ",
            TempBook.imageLinks ? TempBook.imageLinks.thumbnail : url_cover_not_fund,
            TempBook.authors ? TempBook.authors[0] : "Auteurs Inconue"
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function deleteAllChild(parent) {

  // function who deleted all child of the parent
  // input => parent: tag
  // return => nothing
  
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createCard(titre, sous_titre, date, desc, img, auteurs) {

  // function who was created card
  // input => titre: STR, sous_titre: STR, date: INT, desc: STR, img: STR(URL), auteurs: STR
  // return => element card with different informations 

  let div = document.createElement("div");
  div.className = "card m-3 ";
  div.style.width = "18rem";
  div.innerHTML = `
          <div class="d-flex justify-content-center">
            <img class="card-img-top" style="width:50%;max-width:185.25px" src="${img}" alt="${titre}"/>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <h4 class="card-title restrict-title">${titre}</h4>
            <h6 class="card-title restrict-title">${sous_titre}</h6>
            <p class="card-text restrict-text" style="color:grey">${desc}</p>
            <p class="card-text">${date}</p>
            <p class="card-text">${auteurs ? auteurs : "Auteurs Inconue"}</p>
        </div>
          `;
  result.appendChild(div);
}

// AddEventListener 

// click on button to show the search bar
searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.toggle("visually-hidden");
});

// submit the request on input[type="text"]
form.addEventListener("submit", (e) => {
  e.preventDefault();
  SearchBooks();
});

let btns = document.querySelectorAll("#btn_new");
let new_result = document.querySelector("#new_result");
let new_result_love = document.querySelector("#new_result_love")
let valuebtns = document.querySelectorAll(".category");
let category = "Love";

search(new_result,category);
search(new_result_love,"Love")
search(new_result_fiction,"fiction")
search(new_result_poetry,"poetry")
search(new_result_novels,"novels")

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    let current = document.querySelector(".active");
    current.classList.remove("active");
    btns[i].classList.add("active");
  });
}

for (let i = 0; i < valuebtns.length; i++) {
  valuebtns[i].addEventListener("click", () => {
    if (category === valuebtns[i].innerHTML) {
      return;
    } else {
      category = valuebtns[i].innerHTML;
      search(new_result,category);
    }
  });
}




async function search(element,Cat) {
  await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${Cat}&startIndex=0&maxResults=10&langRestrict=fr&orderBy=newest&key=${API_KEY}`)
    .then((response) => {
      if (response.status === 200) {
        deleteAllChild(element);
        return response.json();
      }
    })
    .then((value) => {
      let array_new = value.items;
      let url_cover_not_fund = "https://libribook.com/Images/les-jardins-de-lumiere-pdf.jpg";

      array_new.forEach((v) => {
        let TempBook = v.volumeInfo;
        //   console.log(TempBook);
        CreateCardNew(
          TempBook.title,
          TempBook.subtitle ? TempBook.subtitle : " ",
          TempBook.publishedDate.substring(0, 10),
          TempBook.description ? TempBook.description : " ",
          TempBook.imageLinks ? TempBook.imageLinks.thumbnail : url_cover_not_fund,
          TempBook.authors ? TempBook.authors[0] : "Auteurs Inconue",
          element
        );
      });
    })
    .catch((error) => {
      console.error(error);
    });

  function CreateCardNew(titre, sous_titre, date, desc, img, auteurs,element) {
    // function who was created card
    // input => titre: STR, sous_titre: STR, date: INT, desc: STR, img: STR(URL), auteurs: STR
    // return => element card with different informations

    let div = document.createElement("div");
    div.className = "card m-3 ";
    div.style.minWidth = "18rem";
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
    element.appendChild(div);
  }
}

let elForm = document.querySelector(".js-form");
let elCategoriesSelect = document.querySelector(".js-categories-select");
let elSearchInput = document.querySelector(".js-search-input");
let elSortSelect = document.querySelector(".js-sort-select");
let elFilmRating = document.querySelector(".js-film-rating");

let ellist = document.querySelector(".js-list");

let elModal = document.querySelector(".js-modal");
let elModalContent = document.querySelector(".modal-contents");
let elModalOppen = document.querySelector(".modal-oppen");

//bookmarkList
let elBookmark = document.querySelector(".bookmark-list")

let options = [];

let moviesSort = movies.map((movie,i) => {
    return {
        id: i+1,
        title:movie.Title.toString(),
        sub_title: movie.fulltitle,
        year: movie.movie_year,
        categories: movie.Categories.split("|"),
        summary: movie.summary,
        img: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
        imdb_id: movie.imdb_id,
        rating: movie.imdb_rating,
        runtime: movie.runtime,
        language: movie.language,
        ytid: movie.ytid,
    }
})

//locoleStorogeAddInfo
localStorage.setItem("movies", JSON.stringify(moviesSort))

//LocaleStorageGet
let moviesTop = JSON.parse(localStorage.getItem("movies")) ? JSON.parse(localStorage.getItem("movies")).slice(0,50) : [];



function listItemRender(movies) {
    ellist.innerHTML = null;
    movies.forEach((movie,i) => {
        ellist.innerHTML += `
            <li class="col-md-12 col-lg-6 col-xxl-4 js-list-item">
                <div class="content card">
                    <img class="js-card-img card-img-top" src="${movie.img}" alt=${movie.title}>
                    <div class="card-body">
                        <h4 class="card-title h5 js-card-title" title= "${movie.title}">${movie.title.slice(0,20) + "... "}</h4>

                        <strong class="card-year mb-1 js-card-year d-block"><i class="bi bi-calendar"></i> ${ movie.year}</strong>

                        <strong class="card-rating mb-1 js-card-rating d-block">
                        <span><i class="bi bi-star-fill"></i></span>
                         ${movie.rating}</strong>
                        <button class=bookmark><i class="bi bi-bookmark-heart"></i></button>                       
                    </div>

                    <div class="card-footer d-flex justify-content-between  bg-white" >
                    <a  class="btn btn-outline-dark js-card-youtube" href=https://www.youtube.com/watch?v=${movie.ytid}_channel target=blank>Youtube Link</a>
                    <button class=" btn btn-outline-success modal-oppen ">More info</button>
                </div>
                </div>
            </li>
        ` 
    })

    modalOppenfunction (movies)
}
listItemRender(moviesTop);

//ilterOptionElements
function filterOptionElements (array) {
    array.forEach(option => {
        option.categories.forEach(element => {
            if(!options.includes(element)) options.push(element);
        })
    })
}
filterOptionElements(moviesTop)

//addSelectOption
function addSelectOption() {
    options.forEach(option => {
        let elOption = document.createElement("option");
        elOption.value = option;
        elOption.textContent = option;

        elCategoriesSelect.appendChild(elOption)
    })
}
addSelectOption();

//MoviesFilter
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let titleRegex = new RegExp(elSearchInput.value.trim(), "gi");
    let filmRating = Number(elFilmRating.value)
    console.log(filmRating);
    
    let filterMovies = moviesTop.filter(movie => {
        let gener = elCategoriesSelect.value == "All" || movie.categories.includes(elCategoriesSelect.value)
        console.log(filmRating > movie.rating);
        return gener && movie.title.match(titleRegex) && (movie.rating > filmRating
        );
    })

    sortedMovies(filterMovies)

    listItemRender(filterMovies)

})

Array.prototype.SortedTitle = function () {
    return this.sort((a,b) => {
        if(a.title > b.title) return 1;
        if(b.title > a.title) return -1;
        return 0;
    })
}
Array.prototype.SortedRating = function () {
    return this.sort((a,b) => b.rating - a.rating)
}

function sortedMovies(arr) {
    if(elSortSelect.value == "az") listItemRender(arr.SortedTitle());
    else if(elSortSelect.value == "za") listItemRender(arr.SortedTitle().reverse())
    else if(elSortSelect.value == "ratingTop") listItemRender(arr.SortedRating())
    else if(elSortSelect.value == "ratingBottom") listItemRender(arr.SortedRating().reverse())
}

[].rev

modalOppenfunction(moviesTop)

//oppenModal
function modalOppenfunction (movies1) {
    let modalOppenBtn = document.querySelectorAll(".modal-oppen");
    modalOppenBtn.forEach((oppen,index) => {

    oppen.addEventListener("click",(evt) => {
            console.log(evt);
            console.log(oppen.id);
            elModal.innerHTML = `
                <div class="modal-contents">
                    <div class=card-top>
                        <img class="img" src=${movies1[index].img} alt=${moviesTop[index].title} width="280" height="400">
                        <div class="modal-left">
                            <h4 class="modal-title">${movies1[index].title}</h4>
                            
                            <ul class="movie-info">
                                <li class="movie-info-item">
                                    <b class="span">Year:</b> ${movies1[index].year}
                                </li>
                                
                                <li class="movie-info-item">
                                    <b class="span">Rating: </b>${movies1[index].rating}
                                </li>
    
                                <li class="movie-info-item">
                                    <b class="span">Categories: </b> ${movies1[index].categories}
                                </li>
    
                                <li class="movie-info-item">
                                    <b class="span">Language </b> ${movies1[index].language}
                                </li>
    
                                <li class="movie-info-item">
                                    <b class="span">Runtime: </b> ${
                                        movies1[index].runtime / 60 > 1 ? Math.floor( movies1[index].runtime / 60) + " soat " + movies1[index].runtime % 60 + " min" : movies1[index].runtime + " min"
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-white px-3 mt-2">
                        <a class="btn btn-outline-dark js-card-youtube">Youtube Link</a>
                        <button class=bookmark><i class="bi bi-bookmark-heart"></i></button>
                        <button class="btn btn-outline-success">Ulashish</button>
                    </div>
                    <p class="movi-summary">${moviesTop[index].summary}</p>
                    
                    <button class="modal-clouse" type="button"><i class="bi bi-x"></i></button>
                </div>
            `
            elModal.classList.add("active")
            console.log(index);
        })
      
    })

}

//modalClouse
elModal.addEventListener("click", (evt) => {
    if(evt.target.className === "bi bi-x") {
        elModal.classList.remove("active") 
    }
})

document.addEventListener("click", (e) => {
    if(e.target == elModal) elModal.classList.remove("active");
})

//Bookmark
let bookmarkArr = JSON.parse(localStorage.getItem("Bookmark")) ? JSON.parse(localStorage.getItem("Bookmark")) : [];

function locoleStorageSet (arr) {
    return localStorage.setItem("Bookmark", JSON.stringify(arr))
}

ellist.addEventListener("click", (evt) => {
    if(evt.target.className == "bi bi-bookmark-heart") {
        let movieTitle = evt.path[2].firstChild.nextElementSibling.getAttribute("title")
        if(!bookmarkArr.includes(movieTitle)) bookmarkArr.push(movieTitle);
    }
    locoleStorageSet(bookmarkArr)
    bookmarkRenderList(bookmarkArr)
})

bookmarkRenderList(bookmarkArr)

function bookmarkRenderList (bookmarkArr) {
    elBookmark.innerHTML = null;
    bookmarkArr.forEach((el,i) => {
        elBookmark.innerHTML += `
            <li class="list-group-item-action py-2 my-1 bg-danger bg-opacity-10 d-flex justify-content-between">
                <span class="d-block">${i+1} ${el}</span> <span><i onClick="bookmarkElRemov(${i})" class="bi bi-trash text-danger fs-4 d-block"></i></span>
            </li>    
        `
    }) 
}

function bookmarkElRemov (num) {
   bookmarkArr.forEach((el,i) => {
    if(i == num) bookmarkArr.splice(num,1);
   })

   locoleStorageSet(bookmarkArr)
   bookmarkRenderList (bookmarkArr)
} 



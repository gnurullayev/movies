let elSelect = document.querySelector(".js-select");
let ellist = document.querySelector(".js-list");
let elTemplate = document.querySelector(".js-template").content;
let elSearchInput = document.querySelector(".js-search-input");
let elSearchBtn = document.querySelector(".js-search-btn");
let sortSelect = document.querySelector(".js-sort-select");
let elSortBtn = document.querySelector(".js-sort-btn");



let options = [];


let moviesSort = movies.map(movie => {
    return {
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

let moviesTop = moviesSort.slice(0,100)

// addTemplateClone
function addTemplateClone (movie) {
    let elItemElement = elTemplate.cloneNode(true);

    elItemElement.querySelector(".js-card-img").src = movie.img;
    elItemElement.querySelector(".js-card-img").alt = movie.title;
    elItemElement.querySelector(".js-card-title").textContent = movie.title.slice(0,20) + "...";
    elItemElement.querySelector(".js-card-subtitle").textContent = movie.sub_title.slice(0,20) +"...";
    elItemElement.querySelector(".js-card-year").textContent ="year: " + movie.year;
    elItemElement.querySelector(".js-card-rating").textContent ="rating: " + movie.rating;
    elItemElement.querySelector(".js-card-summary").textContent = movie.summary.slice(0,50) +"...";

    return elItemElement
}

// listItemRender
function listItemRender(movies) {
   let elWrapperTemplate = document.createDocumentFragment();

    ellist.innerHTML = null;
    movies.forEach(move => {
        elWrapperTemplate.append(addTemplateClone(move));
    })

    return ellist.appendChild(elWrapperTemplate)
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
filterOptionElements(moviesSort)

//addSelectOption
function addSelectOption() {
    options.forEach(option => {
        let elOption = document.createElement("option");
        elOption.value = option;
        elOption.textContent = option;

        elSelect.appendChild(elOption)
    })
}
addSelectOption();

// listfilter
elSelect.addEventListener("change", () => {
    let filterFilms = moviesTop.filter(film => film.categories.includes(elSelect.value));

    console.log(filterFilms);
    if(elSelect.value == "all") {
        return listItemRender(moviesTop);
    }else {
        return listItemRender(filterFilms);
    }
})

//searchFilms
elSearchBtn.addEventListener("click", () => {
    sortMovies()
    let searchFilim;
    if(elSelect.value == "all") {
        searchFilim = moviesTop.filter(film =>  elSelect.value == "all" && film.year > elSearchInput.value.trim());
        return listItemRender(searchFilim);
    }else {
        searchFilim = moviesTop.filter(film =>   film.categories.includes(elSelect.value) && film.year > elSearchInput.value.trim());
        return listItemRender(searchFilim);
    }
})

document.addEventListener("keydown", (evt) => {
    if(evt.keyCode == 13) {
        let searchFilim;
        if(elSelect.value == "all") {
            searchFilim =moviesTop.filter(film =>  elSelect.value == "all" && film.year > elSearchInput.value.trim());
            return listItemRender(searchFilim);
        }else {
            searchFilim = moviesTop.filter(film =>   film.categories.includes(elSelect.value) && film.year > elSearchInput.value.trim());
            return listItemRender(searchFilim);
        }
    }
})

function sortMovies () {
   
    let sortMovies = moviesTop.sort((a,b) => {
        if(a.title > b.title) return 1;
        if(a.title < b.title) return -1;
        return 0;
    })

    let MoviesRatingSort = moviesSort.sort((a,b) => b.rating-a.rating);

    if (sortSelect.value == "a-z") listItemRender(sortMovies);
    else if(sortSelect.value == "z-a") listItemRender(sortMovies.reverse());
    else if(sortSelect.value == "rating") listItemRender(MoviesRatingSort);

    console.log(sortMovies);
}

sortSelect.addEventListener("change", sortMovies)



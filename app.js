const searchIcon = document.getElementById('searchIcon')
const closeSearch = document.getElementById('closeSearch')
const input = document.getElementById('input')
const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.menu')
const mainCategory = document.querySelector('.main__category')
const mainContent = document.querySelector('.main__content')

const randomImg = document.querySelector('.random__meal__box__img')
const randomImgContainer = document.querySelector('.random__meal__box__img__container')
const randomMealBoxContent = document.querySelector('.random__meal__box__content')
const randomTitleContainer = document.querySelector('.random__meal__box__content__title__container')
const randomDescriptionContainer = document.querySelector('.random__meal__box__content__description__container')
const randomTitle = document.querySelector('.random__meal__box__title')
const randomButton = document.querySelector('.random__meal__box__button')
const randomSteps = document.querySelector('.random__steps')
const singolArea = document.querySelectorAll('.singolArea')


const areeGeograficheContainer = document.querySelector('.menu__sotto')

const form = document.querySelector('.form')
const ricerca = ''




hamburger.addEventListener('click', function() {
  menu.classList.toggle('menu__active')
})

searchIcon.addEventListener('click', function() {
  input.classList.add('input__active')
  closeSearch.classList.add('closeSearch__active')
})

closeSearch.addEventListener('click', function() {
  input.classList.remove('input__active')
  closeSearch.classList.remove('closeSearch__active')
})


function getApi(){

    // chiamata per la lista delle categorie
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((data) => data.json())
      .then((data) =>{
      console.log(data)

        data.categories.forEach((meal) =>{
          const category = document.createElement('div')
          category.innerHTML =    `
            <div class="category__box">
              <img src="${meal.strCategoryThumb}" alt="">
              <h3 >${meal.strCategory}</h3>
            </div>
            `
          mainCategory.appendChild(category)
          category.addEventListener('click', function(){
            console.log(meal.strCategory)
            mainContent.innerHTML = ' '
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal.strCategory}`)
              .then((data6) => data6.json())
              .then((data6) =>{
                console.log(data6)
                data6.meals.forEach((meal) => {
                  const categoryMeal = document.createElement('div')
                  categoryMeal.classList.add('fullsize')
                   categoryMeal.innerHTML = `
                  <div class="area__meal__box">
                    <div class="area__meal__box__img__container">
                      <img class="area__meal__box__img" src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="area__meal__box__content">
                      <div class="area__meal__box__content__title__container">
                        <p class="area__meal__box__title">${meal.strMeal}</p>

                      </div>
                      <div class="area__meal__box__content__description__container">

                      </div>
                    </div>
                  </div>
                  `

                  mainContent.appendChild(categoryMeal)

                });

              })
          })
        })
      })


      // chiamata per il random meal
      fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((data2) => data2.json())
        .then((data2) =>{
          console.log(data2)
          randomImg.src = data2.meals[0].strMealThumb;
          randomTitle.innerHTML = data2.meals[0].strMeal;
          randomSteps.innerHTML = data2.meals[0].strInstructions

          randomButton.addEventListener('click', function(){
            randomImgContainer.classList.toggle('img__container__active')
            randomMealBoxContent.classList.toggle('meal__container__active')
            randomTitleContainer.classList.toggle('title__container__active')
            randomDescriptionContainer.classList.toggle('description__container__active')
            randomButton.classList.toggle('hide')
            if(randomButton.classList.contains('hide')){
              randomButton.textContent = 'hide recipe'
            }else{
              randomButton.innerHTML = 'show recipe'
            }
          })
      })

      //chiamata per le aree geografiche
      fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        .then((data3) => data3.json())
        .then((data3) =>{
          console.log(data3)
          data3.meals.forEach((meal) =>{
            const area = document.createElement('p')
            area.innerHTML = meal.strArea
            areeGeograficheContainer.appendChild(area)

            area.addEventListener('click', function(){
              console.log(area.textContent)
              mainContent.innerHTML = ' '
              menu.classList.remove('menu__active')
              fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area.textContent}`)
                .then((data5) => data5.json())
                .then((data5) =>{
                   console.log(data5)
                   data5.meals.forEach((meal) => {
                    const mealArea = document.createElement('div')
                    mealArea.classList.add('fullsize')
                     mealArea.innerHTML = `
                    <div class="area__meal__box">
                      <div class="area__meal__box__img__container">
                        <img class="area__meal__box__img" src="${meal.strMealThumb}" alt="">
                      </div>
                      <div class="area__meal__box__content">
                        <div class="area__meal__box__content__title__container">
                          <p class="area__meal__box__title">${meal.strMeal}</p>

                        </div>
                        <div class="area__meal__box__content__description__container">
                           <p class="area__steps"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita quae, nobis accusamus cupiditate suscipit, saepe?</p>
                        </div>
                      </div>
                    </div>
                    `

                    mainContent.appendChild(mealArea)

                   });

                })

            })
          })




        })

        //chiamata per mostrare l'elemente cercato
        form.addEventListener('submit', function(e){
          e.preventDefault()
          let parola = document.getElementById('input').value
          console.log(parola)
          //chiamata per il singolo piatto preso dalla ricerca
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${parola}`)
            .then((data4) => data4.json())
            .then((data4) =>{
            console.log(data4)
            mainContent.innerHTML = `
            <div class="search__meal__box">
              <div class="search__meal__box__img__container">
                <img class="search__meal__box__img" src="${data4.meals[0].strMealThumb}" alt="">
              </div>
              <div class="search__meal__box__content">
                <div class="search__meal__box__content__title__container">
                  <p class="search__meal__box__title">${data4.meals[0].strMeal}</p>
                  <button id="searchButton" class="search__meal__box__button">show recipe</button>
                </div>
                <div class="search__meal__box__content__description__container">
                   <p class="search__steps">${data4.meals[0].strInstructions}</p>
                </div>
              </div>
            </div>
            `
            })
        })








    }


    //fa funzionare il tasto show recipe nel search box
    document.addEventListener('click', function(e){
    if(e.target && e.target.id== 'searchButton'){
      const searchImg = document.querySelector('.search__meal__box__img')
      const searchImgContainer = document.querySelector('.search__meal__box__img__container')
      const searchMealBoxContent = document.querySelector('.search__meal__box__content')
      const searchTitleContainer = document.querySelector('.search__meal__box__content__title__container')
      const searchDescriptionContainer = document.querySelector('.search__meal__box__content__description__container')
      const searchTitle = document.querySelector('.search__meal__box__title')
      const searchButton = document.querySelector('.search__meal__box__button')
      const searchSteps = document.querySelector('.search__steps')

      searchImgContainer.classList.toggle('img__container__active')
      searchMealBoxContent.classList.toggle('meal__container__active')
      searchTitleContainer.classList.toggle('title__container__active')
      searchDescriptionContainer.classList.toggle('description__container__active')
      searchButton.classList.toggle('hide')
      if(searchButton.classList.contains('hide')){
        searchButton.textContent = 'hide recipe'
      }else{
        searchButton.innerHTML = 'show recipe'
      }
     }

    });

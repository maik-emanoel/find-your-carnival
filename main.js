const states = document.querySelector('#states')
const cities = document.querySelector('#cities')
const searchName = document.querySelector('#search-name')
const searchBtn = document.querySelector('#searchBtn')

window.addEventListener('load', async () => {
    const urlStates = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    const statesResponse = await urlStates.json()
    statesResponse.sort((a, b) => (a.sigla > b.sigla ? 1 : -1))

    statesResponse.forEach( state => {
        states.appendChild(new Option(state.sigla, state.id))
    });
})

states.addEventListener('change', async () => {
    const urlCities = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${states.value}/municipios`)
    const citiesResponse = await urlCities.json()

    cities.length = 0
    cities.appendChild(new Option('Selecione uma cidade'))

    citiesResponse.forEach((city) => {
        cities.appendChild(new Option(city.nome, city.id))
    })
})

cities.addEventListener('change', function activateSearchBtn() {
    if(searchName.value.length > 3) {
        searchBtn.removeAttribute('disabled')
    }
})



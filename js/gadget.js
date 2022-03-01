const loadSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear searchbox value
    const searchText = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResults(data.data))
}

const displaySearchResults = phones => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card">
        <img  src="${phone.image}" class="card-img-top w-50 mx-auto mt-2" alt="...">
       <div class="card-body ">
           <h3 class="card-title text-center my-3">${phone.phone_name}</h3>
           <h2 class="text-center">${phone.brand}</h2>
       </div>
       <div class="mx-auto pb-3 ">
           <button type="button" class="btn btn-primary px-3 fs-5 ">Details</button>
       </div>
     </div>
       `
        searchResult.appendChild(div)
    });
}
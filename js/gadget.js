const loadSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResults(data.data.slice(0, 20)))
}

const displaySearchResults = phones => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        const phoneIdName = phone.slug;
        console.log(phoneIdName);
        div.classList.add('col');
        div.innerHTML = `
    <div class="card">
        <img  src="${phone.image}" class="card-img-top w-50 mx-auto mt-2" alt="...">
       <div class="card-body ">
           <h3 class="card-title text-center my-3">${phone.phone_name}</h3>
           <h2 class="text-center">${phone.brand}</h2>
       </div>
       <div class="mx-auto pb-3 ">
           <button onclick="loadPhoneDetails('${phoneIdName}')" type="button" class="btn btn-primary px-3 fs-5 ">Details</button>
       </div>
     </div>
       `
        searchResult.appendChild(div)
    });
}
const loadPhoneDetails = phoneId => {
    console.log(phoneId);
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayloadDetails(data.data))
}

const displayloadDetails = phone => {
    const phoneFeature = document.getElementById('phone-details');
    phoneFeature.textContent = '';
    const div = document.createElement('div');
    div.classList.add('row', 'container', 'mx-auto', 'gx-5', 'my-5')
    div.innerHTML = `
    
    <div class="col-lg-5">
        <div class="p-3 mx-auto  bg-light">
        <img  src="${phone.image}" class=" w-75 ps-5 mx-3  mt-2" alt="...">
        <h6 class="text-center my-3">${phone.releaseDate}</h6>
        </div>
    </div>
    <div class="col-lg-7">
        <div class="p-3 border bg-light">
        <p class="text-center fw-bold my-1">Phone Feature</p>
        
        </div>
    </div>
  
        `
    phoneFeature.appendChild(div);
}
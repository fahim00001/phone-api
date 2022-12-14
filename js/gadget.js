const loadSearch = () => {
    const searchField = document.getElementById('search-field');
    //just for clear phone details
    const phoneFeature = document.getElementById('phone-details');
    phoneFeature.textContent = '';
    const searchText = searchField.value;
    searchField.value = '';

    const errorMassage = document.getElementById('error-massage')

    if (searchText == '') {
        errorMassage.style.display = 'block'
    }
    else {
        errorMassage.style.display = 'none'
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResults(data.data.slice(0, 20)))
    }
}

const displaySearchResults = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const availableError = document.getElementById('error-available');
    if (phones.length === 0) {
        availableError.style.display = 'block';
    }
    else {
        availableError.style.display = 'none';
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
           <a href="#" class="card-link"><button onclick="loadPhoneDetails('${phoneIdName}')" type="button" class="btn btn-primary px-3 fs-5 ">Details</button></a>
               
           </div>
         </div>
           `
            searchResult.appendChild(div)
        });
    }
}

const loadPhoneDetails = phoneId => {
    //console.log(phoneId);
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayloadDetails(data.data))
}

const featureDeatial = (feature) => {
    if (feature == undefined || feature == '') {
        return 'Not available'
    }
    else {
        return `${feature}`
    }
}

const displayloadDetails = phone => {
    const phoneFeature = document.getElementById('phone-details');
    phoneFeature.textContent = '';
    const div = document.createElement('div');
    div.classList.add('row', 'container', 'mx-auto', 'gx-5', 'my-5')

    div.innerHTML = `
    <div class="col-lg-5">
        <div class=" mx-auto ">
        <img  src="${phone?.image}" class=" w-75 mx-3  mt-3" alt="...">
        </div>
    </div>
    <div class="col-lg-7">
        <div class="p-3  border bg-light">
        <p class="text-center fw-bold my-1">Phone Feature</p>
         <h5 class="card-title">Name : ${featureDeatial(phone?.name)}</h5>
         <p class="card-text">Brand : ${featureDeatial(phone?.brand)}</p>
         <p class="card-text">ReleaseDate : ${featureDeatial(phone?.releaseDate)}</p>
         <p class="card-text">DisplaySize : ${featureDeatial(phone?.mainFeatures?.displaySize)}</p>
         <p class="card-text">ChipSet : ${featureDeatial(phone?.mainFeatures?.chipSet)}</p>
        <p class="card-text">Storage : ${featureDeatial(phone?.mainFeatures?.storage)}</p>
         <p class="card-text">Memory : ${featureDeatial(phone?.mainFeatures?.memory)}</p>
         <p class="card-text">Sensors : ${featureDeatial(phone?.mainFeatures?.sensors)}</p>
         <p class="card-text">WLAN : ${featureDeatial(phone?.others?.WLAN)}</p>
        <p class="card-text">Bluetooth : ${featureDeatial(phone?.others?.Bluetooth)}</p>
         <p class="card-text">GPS : ${featureDeatial(phone?.others?.GPS)}</p>

        </div>
    </div>
        `
    phoneFeature.appendChild(div);

}
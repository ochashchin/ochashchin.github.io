const cityForm = document.getElementById("cityForm");
const card = document.getElementById("card");
const details = document.getElementById("details");
const time = document.getElementById("time");
const icon = document.getElementById("icon");
let isError = false;
let throttling = true;

function updateText(weather) {
    //update icon
    let weatherIcon = `https://raw.githubusercontent.com/iamshaunjp/modern-javascript/4fa8460583b40f180fbb42126cb2c35c628dc629/weather_app/img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", weatherIcon);

    //update background
    let dayOrNightBackground = `https://raw.githubusercontent.com/iamshaunjp/modern-javascript/4fa8460583b40f180fbb42126cb2c35c628dc629/weather_app/img/${weather.IsDayTime ? "day" : "night"}.svg`;
    time.setAttribute("src", dayOrNightBackground);


    //update text
    details.innerHTML = `
    <h5 class="my-3">${cityForm.city.value}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;</span>
    </div>
    `;

    cityForm.reset();
}

const updateUI = (cityObj) => {

    console.log("updateUI")

    const cityCode = cityObj.city;
    const weather = cityObj.weather[0];

    if (card.style.opacity === "1") {
        // hide card
        showCard();
        setTimeout(() => {
            updateText(weather);
            // show card
            showCard();
        }, 1000);
    } else {
        updateText(weather);
        showCard();
    }
    removeAutofill();
};

const updateCity = async (city) => {

    console.log("updateCity");
    console.log(city);

    const weather = await getConditions(city.Key);

    console.log("weather");
    console.log(weather);

    return {
        city: city,
        weather: weather
    }
}

cityForm.city.addEventListener("input", e => {
    e.preventDefault();

    let city = cityForm.city.value.trim();

    runThrottling(city);
});

function showCard() {
    if (card.style.opacity === "0") {
        card.classList.remove("fade-out-down");
        card.classList.toggle('fade-in-up');
        setTimeout(() => {
            card.style.opacity = "1";
        }, 1000)
    } else {
        card.classList.remove("fade-in-up");
        card.classList.toggle("fade-out-down");
        setTimeout(() => {
            card.style.opacity = "0";
        }, 1000)
    }
}

function runThrottling(city) {

    if (throttling === true) {

        suggestCity(city);

        throttling = false;
        setTimeout(function () {
            throttling = true;
        }, 100)
    }
}

const suggestCity = (city) => {

    getCity(city).then(
        (listCity) => {

            addDropDown(listCity).then(
                (ulist) => {

                    ulist.addEventListener("click", (e) => {
                        e.preventDefault();

                        cityForm.city.value = listCity[e.target.id].AdministrativeArea.EnglishName;

                        finalSearch(listCity[e.target.id]);
                    });

                });

        });
}

function removeAutofill() {

    console.log("removeAutofill")

    let autofill = document.querySelectorAll('[id=autofill]');

    if (document.body.contains(document.getElementById("autofill"))) {
        for(let i = 0; i < autofill.length; i++) {
            autofill[i].remove()
        }
    }
}

const addDropDown = async (list) => {

    if (list !== undefined) {
        let ulist = document.createElement('ul');
        ulist.id = 'autofill';
        ulist.style.position = 'absolute';
        ulist.style.left = cityForm.getElementsByTagName("input").offsetLeft;
        ulist.style.top = cityForm.getElementsByTagName("input").offsetTop;
        ulist.style.zIndex = "1";
        ulist.style.width = cityForm.offsetWidth;
        ulist.className = "list-group text-light";

        for (let i = 0; i < list.length; i++) {
            let listItem = document.createElement('li');
            listItem.id = i;
            listItem.className = "list-group-item btn d-flex justify-content-between align-items-center";
            listItem.textContent = `${list[i].AdministrativeArea.LocalizedName}`;
            ulist.appendChild(listItem);
        }

        cityForm.appendChild(ulist);

        return ulist;
    }
}

const finalSearch = (city) => {
    console.log("finalSearch")

    updateCity(city)
        .then(data => {
            updateUI(data);
        })
        .catch(
            (error) => {
                isError = true;
                removeAutofill();
            }
        );
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    let city = cityForm.city.value.trim();

    removeAutofill();

    getCity(city).then(
        (listCity) => {
            finalSearch(listCity[0]);
        });

    if (localStorage.getItem("city") === null) {
        localStorage.setItem("city", city);
    } else {
        if (isError === false) {
            localStorage.setItem("city", city);
        }
    }
});

const readCity = () => {
    let city;

    if (localStorage.getItem("city") !== null) {
        city = localStorage.getItem("city", city);

        cityForm.city.value = city;

        getCity(city).then(
            (listCity) => {
                finalSearch(listCity[0]);
            });
    }
};

readCity();

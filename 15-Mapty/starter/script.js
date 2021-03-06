'use strict';

class Workout {
  date = new Date();
  // To create id, use library in real app
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    // min / km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    // km /h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnReset = document.querySelector('.reset');
const btnSort = document.querySelector('.sort');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnResize = document.querySelector('.resize');
const workoutsContainer = document.querySelector('.workouts_container');
let markers;
let editable = false;

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];
  #latlngs = [];
  #sorted = false;

  constructor() {
    // Get User's Position
    this._getPosition();

    // Get Data from local storage
    this._getLocalStorage();

    // Attach Event handler
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    containerWorkouts.addEventListener('click', this._deleteWorkout.bind(this));
    containerWorkouts.addEventListener('click', this._editWorkout.bind(this));
    btnReset.addEventListener('click', this._reset);
    btnSort.addEventListener('click', this._sort.bind(this));
    btnCloseModal.addEventListener('click', this._closeModal);
    btnResize.addEventListener('click', this._resize.bind(this));
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // Can simply add some small helper funtions
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    let param4;

    // If worktout Exist, Go to update
    if (type === 'running') {
      param4 = +inputCadence.value;
    }
    if (type === 'cycling') {
      param4 = +inputElevation.value;
    }
    if (
      // !Number.isFinite(distance) ||
      // !Number.isFinite(duration) ||
      // !Number.isFinite(cadence)
      !validInputs(distance, duration, param4) ||
      !allPositive(distance, duration, param4)
    )
      return this._showAlertModal();

    if (editable)
      return this._editWorkoutData(type, distance, duration, param4);

    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];
    let workout;

    workout =
      type === 'running'
        ? new Running(coords, distance, duration, param4)
        : new Cycling(coords, distance, duration, param4);
    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._displayWorkout();

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    const marker_id = L.marker(workout.coords)
      .addTo(markers)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '?????????????' : '?????????????'} ${workout.description}`
      )
      .openPopup();
    // markers.removeLayer(marker_id._leaflet_id);
    workout.marker = marker_id._leaflet_id;
  }

  _displayWorkout(sort = false) {
    workoutsContainer.innerHTML = '';
    // form??? ????????? ?????? ?????????, workoutsContainer??? ?????? div??? ???????????? ??????????????? ???!!
    // ??? ????????? insertAdjacentHTMl - afterend ?????? ????????? ????????????. --> workoutsContainer??? ?????? ????????? afterbegin?????? ??????.

    const workouts = sort
      ? this.#workouts.slice().sort((a, b) => a.distance - b.distance)
      : this.#workouts;

    workouts.forEach(function (workout) {
      let html = `<li class="workout workout--${workout.type}" data-id="${
        workout.id
      }">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="editDelete_div">
            <span class="edit">Edit</span>
            <span class="delete">Delete</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '?????????????' : '?????????????'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">???</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;

      if (workout.type === 'running')
        html += `
         <div class="workout__details">
           <span class="workout__icon">??????</span>
           <span class="workout__value">${workout.pace.toFixed(1)}</span>
           <span class="workout__unit">min/km</span>
         </div>
         <div class="workout__details">
           <span class="workout__icon">????????</span>
           <span class="workout__value">${workout.cadence}</span>
           <span class="workout__unit">spm</span>
         </div>
       </li>
     `;
      if (workout.type === 'cycling')
        html += `
         <div class="workout__details">
           <span class="workout__icon">??????</span>
           <span class="workout__value">${workout.speed.toFixed(1)}</span>
           <span class="workout__unit">km/h</span>
         </div>
         <div class="workout__details">
           <span class="workout__icon">???</span>
           <span class="workout__value">${workout.elevation}</span>
           <span class="workout__unit">m</span>
         </div>
       </li>
      `;
      workoutsContainer.insertAdjacentHTML('afterbegin', html);
    });
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position.');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // leaflet library method
    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    markers = L.layerGroup().addTo(this.#map);

    this.#workouts.forEach(workout => {
      // Render workout on map as marker
      this._renderWorkoutMarker(workout);
    });

    // Show current position
    this.#map.setView(coords, this.#mapZoomLevel);
    let myIcon = L.icon({
      iconUrl: 'myIcon.png',
      iconSize: [10, 10],
    });
    console.log(coords);

    L.marker(coords, { icon: myIcon }).addTo(this.#map);
    L.circle(coords, {
      stroke: false,
      radius: 700,
      color: 'orangered',
      opacity: 0.9,
    }).addTo(this.#map);
  }
  _showForm(mapE = 0) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // prettier-ignore
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // hide form (with animation)
    // prettier-ignore
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    form.classList.add('hidden');
  }

  _setLocalStorage() {
    // very simple API from browser given. (Only small data)
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    this.#workouts.length = 0;
    const dataAry = JSON.parse(localStorage.getItem('workouts'));
    // localStorage ?????? ??? Prototype chain??? ?????????!!
    // No longer object we created.. just Object??? ????????????.
    // ?????????, data??? parsing?????? ?????? ?????? ?????????, data string??? ???????????? ????????? object??? ?????? ???????????? insert. (but not gonna do this in here)

    if (!dataAry) return;

    // this.#workouts = dataAry;

    // Create new Object instead just do this (this.#workouts = dataAry) -> shallow copy
    let workout;
    dataAry.forEach(data => {
      workout = data.pace
        ? new Running(data.coords, data.distance, data.duration, data.cadence)
        : new Cycling(
            data.coords,
            data.distance,
            data.duration,
            data.elevation
          );
      workout.id = data.id;
      this.#workouts.push(workout);
    });

    // Display workouts in list
    this._displayWorkout();
  }

  _reset() {
    localStorage.removeItem('workouts');
    location.reload(); // location??? big object???. ?????? ???????????? reload??? ??? ??? ??????.
  }

  _sort() {
    this._displayWorkout(!this.#sorted);
    this.#sorted = !this.#sorted;
  }

  _editWorkout(e) {
    const editEl = e.target.closest('.edit');

    if (!editEl) return;

    const workoutEl = e.target.closest('.workout');

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    workout.editing = true;
    editable = true;
    this._showForm();

    // Block to running -> cycling or cycling -> running
    const selectVal = document.getElementById('select');
    selectVal.disabled = true;
    if (workout.type === 'running' && selectVal.value === 'cycling') {
      document.getElementById('select').value = 'running';
      this._toggleElevationField();
    }
    if (workout.type === 'cycling' && selectVal.value === 'running') {
      document.getElementById('select').value = 'cycling';
      this._toggleElevationField();
    }
  }

  _editWorkoutData(type, dis, dur, param4) {
    console.log('editing');

    const workout = this.#workouts.find(work => work.editing === true);
    const workoutEl = document.querySelector(`[data-id="${workout.id}"]`);
    let thirdParam;

    // edit object
    workout.type = type;
    workout.distance = dis;
    workout.duration = dur;
    console.log('workout:  ', workout);
    if (type === 'running') {
      workout.cadence = param4;
      workout.calcPace();
      thirdParam = workout.pace;
    }
    if (type === 'cycling') {
      workout.elevation = param4;
      workout.calcSpeed();
      thirdParam = workout.speed;
    }

    // edit html
    workoutEl.children[2].children[1].innerHTML = dis;
    workoutEl.children[3].children[1].innerHTML = dur;
    workoutEl.children[4].children[1].innerHTML = thirdParam.toFixed(1);
    workoutEl.children[5].children[1].innerHTML = param4;

    // restore object & store localStorage & hide form
    workout.editing = false;
    editable = false;
    document.getElementById('select').disabled = false;
    this._setLocalStorage();
    this._hideForm();
  }

  _deleteWorkout(e) {
    const deleteEl = e.target.closest('.delete');

    if (!deleteEl) return;

    const workoutEl = e.target.closest('.workout');

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // Remove object from workouts array
    // this.#workouts.pop(idx);
    const idx = this.#workouts.indexOf(workout);
    this.#workouts.splice(idx, 1);

    this._setLocalStorage();

    // Remove marker and from list
    markers.removeLayer(workout.marker);
    workoutEl.style.display = 'none';
  }

  _showAlertModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }

  _closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }

  _resize() {
    console.log('resize clicked!');
    this.#workouts.forEach(workout => {
      this.#latlngs.push(workout.coords);
    });
    this.#map.fitBounds(L.latLngBounds(this.#latlngs));
    L.polyline(this.#latlngs, { color: '#Ee262d' }).addTo(this.#map);
  }
}

const app = new App();

// ADDITIONAL FEATURE IDEAS (CHALLENGES)
// 1. Ability to edit a workout
// 2. Ability to delete a workout
// 3. Ability to delete all workouts
// 4. Ability to sort workouts by a certain field (ex- by distance) - inpiration from bankist app
// 5. Re-build Running and Cycling objects coming from LocalStorage.
// 6. More realistic error and confirmation messages

// Harder things
// 7. Ability to position the map to show all workouts (shows all the workouts on the map at once.) - leaflet library
// 8. Ability to draw lines and shapes instead of just points

// Other two things would can be Implement after study next section.
// 9. Geocode location from coordinates ("Run in Gangnam, Seoul Korea") - use third party API
// 10. Display weather data for workout time and place

///////////////////////////////////////////////////////////////
// window.onload = function () {
//   const deleteWorkout = document.querySelector('.delete');
//   deleteWorkout.addEventListener('click', app._deleteWorkout);
// };

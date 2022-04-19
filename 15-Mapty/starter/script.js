'use strict';

class Workout {
  date = new Date();
  // To create id, use library in real app
  id = (Date.now() + '').slice(-10);
  clicks = 0;

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
  click() {
    this.clicks++;
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
const resetBtn = document.querySelector('.reset');
const sortBtn = document.querySelector('.sort');
const workoutsContainer = document.querySelector('.workouts_container');
let markers;
let editable = false;

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];
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
    resetBtn.addEventListener('click', this._reset);
    sortBtn.addEventListener('click', this._sort.bind(this));
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
    let exval;

    // If worktout Exist, Go to update
    if (type === 'running') {
      exval = +inputCadence.value;
    }
    if (type === 'cycling') {
      exval = +inputElevation.value;
    }

    if (editable) return this._editWorkoutData(type, distance, duration, exval);

    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadance = +inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadance)
        !validInputs(distance, duration, cadance) ||
        !allPositive(distance, duration, cadance)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running(coords, distance, duration, cadance);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration) // elevation can be negative
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling(coords, distance, duration, elevation);
    }

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
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
    // markers.removeLayer(marker_id._leaflet_id);
    workout.marker = marker_id._leaflet_id;
  }

  _displayWorkout(sort = false) {
    workoutsContainer.innerHTML = '';
    // form과 겹치는 문제 때문에, workoutsContainer를 따로 div로 정의하고 사용했다는 점!!
    // 맨 끝부분 insertAdjacentHTMl - afterend 에서 문제가 생겼었음. --> workoutsContainer를 따로 만들고 afterbegin으로 해결.

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
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;

      if (workout.type === 'running')
        html += `
         <div class="workout__details">
           <span class="workout__icon">⚡️</span>
           <span class="workout__value">${workout.pace.toFixed(1)}</span>
           <span class="workout__unit">min/km</span>
         </div>
         <div class="workout__details">
           <span class="workout__icon">🦶🏼</span>
           <span class="workout__value">${workout.cadence}</span>
           <span class="workout__unit">spm</span>
         </div>
       </li>
     `;
      if (workout.type === 'cycling')
        html += `
         <div class="workout__details">
           <span class="workout__icon">⚡️</span>
           <span class="workout__value">${workout.speed.toFixed(1)}</span>
           <span class="workout__unit">km/h</span>
         </div>
         <div class="workout__details">
           <span class="workout__icon">⛰</span>
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

    // using the Public Interface
    // workout.click();

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
    const data = JSON.parse(localStorage.getItem('workouts'));
    // localStorage 사용 시 Prototype chain이 끊어짐!!
    // No longer object we created.. just Object로 되어버림.
    // 방법은, data를 parsing해서 받는 것이 아니라, data string을 기반으로 새로운 object를 직접 만들어서 insert. (but not gonna do this in here)

    if (!data) return;

    this.#workouts = data;

    this._displayWorkout();
  }

  _reset() {
    localStorage.removeItem('workouts');
    location.reload(); // location은 big object임. 이걸 이용해서 reload를 할 수 있음.
  }

  _sort() {
    this._displayWorkout(!this.#sorted);
    this.#sorted = !this.sorted;
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

  _editWorkoutData(type, dis, dur, exval) {
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
      workout.cadence = exval;
      workout.calcPace();
      thirdParam = workout.pace;
    }
    if (type === 'cycling') {
      workout.elevation = exval;
      workout.calcSpeed();
      thirdParam = workout.speed;
    }

    // edit html
    workoutEl.children[2].children[1].innerHTML = dis;
    workoutEl.children[3].children[1].innerHTML = dur;
    workoutEl.children[4].children[1].innerHTML = thirdParam.toFixed(1);
    workoutEl.children[5].children[1].innerHTML = exval;

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
    // location.reload(); // location은 big object임. 이걸 이용해서 reload를 할 수 있음.

    // Remove marker and from list
    markers.removeLayer(workout.marker);
    workoutEl.style.display = 'none';
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

'use strict';

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed; // km/h
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};

const myCar1 = new Car('BMW', 120);
const myCar2 = new Car('Mercedes', 95);
myCar1.accelerate();
console.log(myCar1);

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  }
  get speedUS() {
    return this.speed;
  }
  set speedUS(speed) {
    this.speed = speed / 1.6;
  }
}

const myCar3 = new CarCl('Ford', 120);
myCar3.accelerate();
myCar3.brake();
console.log(myCar3.speedUS);
myCar3.speedUS = 45;
console.log(myCar3.speedUS);

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 100, 50);
tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake();
myCar3.accelerate();

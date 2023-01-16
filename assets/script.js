let ageEl = $(".ageEl");
let genderEl = $(".gender-btn");
let heightEl = $(".heightEl");
let submitEl = $(".submit-btn");
let weightEl = $(".weightEl");
let activityEl = $(".activityEl");
let maintenanceEl = $(".maintenance");
let sessionsPerWeekEL = $(".sessions-per-week");
let sessionIntensityEl = $(".session-intensity");
let maintenance;

let user = {
  age: undefined,
  gender: undefined,
  height: undefined,
  weight: undefined,
  exerciseActivity: undefined,
  sessionsPerWeek: undefined,
  averageSessionIntensity: undefined,
};

sessionIntensityEl.click(function (event) {
  event.preventDefault();
  user.averageSessionIntensity = this.value;
});

sessionsPerWeekEL.click(function (event) {
  event.preventDefault();
  user.sessionsPerWeek = this.value;
});

genderEl.click(function (event) {
  event.preventDefault();
  user.gender = this.value;
});

activityEl.click(function (event) {
  event.preventDefault();
  user.exerciseActivity = this.value;
});

sessionsPerWeekEL.click(function (event) {
  event.preventDefault();
  user.sessionsPerWeek = this.value;
});

submitEl.click(function (event) {
  event.preventDefault();
  user.age = ageEl.val();
  user.height = heightEl.val();
  user.weight = weightEl.val();

  maintenanceEl.text(
    `${calculateCals() - 50} - ${calculateCals() + 50}   calories`
  );
});

let calculateCals = function () {
  let maintenance;
  let sessionWeekIntensity;
  if (user.gender == "male") {
    var maleBmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
  } else if (user.gender == "female") {
    var femaleBmr = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
  }

  if (user.averageSessionIntensity == "low") {
    sessionWeekIntensity = lowSessionIntensityFunc();
  } else if (user.averageSessionIntensity == "moderate") {
    sessionWeekIntensity = midSessionIntensityFunc();
  } else if (user.averageSessionIntensity == "high") {
    sessionWeekIntensity = midSessionIntensityFunc();
  }

  if (maleBmr) {
    if (user.exerciseActivity == "sedentary") {
      maintenance = sedentaryFunc(maleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "light active") {
      maintenance = lightActiveFunc(maleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "active") {
      maintenance = activeFunc(maleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "very active") {
      maintenance = VeryActiveFunc(maleBmr) + sessionWeekIntensity;
    }
  } else if (femaleBmr) {
    if (user.exerciseActivity == "sedentary") {
      maintenance = sedentaryFunc(femaleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "light active") {
      maintenance = lightActiveFunc(femaleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "active") {
      maintenance = activeFunc(femaleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "very active") {
      maintenance = VeryActiveFunc(femaleBmr) + sessionWeekIntensity;
    }
  }
  console.log(maintenance);
  return Math.round(maintenance);
};

let sedentaryFunc = function (bmr) {
  return bmr * 1.1;
};

let lightActiveFunc = function (bmr) {
  return bmr * 1.1;
};

let activeFunc = function (bmr) {
  return bmr * 1.1;
};

let VeryActiveFunc = function (bmr) {
  return bmr * 1.1;
};

let lowSessionIntensityFunc = function () {
  return (150 * user.sessionsPerWeek) / 7;
};

let midSessionIntensityFunc = function () {
  return (200 * user.sessionsPerWeek) / 7;
};
let highSessionIntensityFunc = function () {
  return (250 * user.sessionsPerWeek) / 7;
};

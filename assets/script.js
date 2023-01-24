let ageEl = $(".ageEl");
let genderEl = $(".gender-btn");
let heightEl = $(".heightEl");
let submitEl = $(".submit-btn");
let weightEl = $(".weightEl");
let activityEl = $(".activityEl");
let maintenanceEl = $(".maintenance");
let sessionsPerWeekEL = $(".sessions-per-week");
let sessionIntensityEl = $(".session-intensity");
let maintenanceMacrosEl = $(".maintenance-macros");
let loseEl = $(".lose");
let loseMacrosEl = $(".lose-macros");
let gainEl = $(".gain");
let gainMactrosEl = $(".gain-macros");
let inputBtnEl = $(".input-button");
let genderInputEl = $(".genderInput");
let sessionNumInput = $(".sessions-num-input");
let nonExerciseInput = $(".exercise-activity-input");
let sessionActivityInput = $(".session-intensity-input");

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
  let word;
  if (this.value == 1) {
    word = "Low";
  } else if (this.value == 2) {
    word = "Moderate";
  } else if (this.value == 3) {
    word = "High";
  }
  sessionActivityInput.text(word);
});

sessionsPerWeekEL.click(function (event) {
  event.preventDefault();
  user.sessionsPerWeek = this.value;
});

genderEl.click(function (event) {
  event.preventDefault();
  user.gender = this.value;
  genderInputEl.text(this.value);
});

activityEl.click(function (event) {
  event.preventDefault();
  user.exerciseActivity = this.value;
  let word;
  if (this.value == 1) {
    word = "Sedentary";
  } else if (this.value == 2) {
    word = "Light Active";
  } else if (this.value == 3) {
    word = "Active";
  } else if (this.value == 4) {
    word = "Very Active";
  }
  nonExerciseInput.text(word);
});

sessionsPerWeekEL.click(function (event) {
  event.preventDefault();
  user.sessionsPerWeek = this.value;
  sessionNumInput.text(this.value);
});

submitEl.click(function (event) {
  $(document).ready(function () {
    for (const key in user) {
      console.log(user[key], key);
      if (user[key] == undefined || "") {
        console.log(key);
        return $("#my-toast").toast("show");
      }
    }
  });

  event.preventDefault();
  user.age = ageEl.val();
  user.height = heightEl.val();
  user.weight = weightEl.val();

  let maintenanceCals = calculateCals();
  maintenanceEl.text(`${maintenanceCals - 50} - ${maintenanceCals + 50} Kcals`);
  maintenanceMacrosEl.text(`${maintenanceMacros(maintenanceCals)}`);

  let loseCals = maintenanceCals - maintenanceCals * 0.2;
  loseEl.text(`${loseCals - 50} - ${loseCals + 50} Kcals`);
  loseMacrosEl.text(`${loseMacros(loseCals)}`);

  let gainCals = maintenanceCals * 1.1;
  gainEl.text(`${gainCals - 50} - ${gainCals + 50} Kcals`);
  gainMactrosEl.text(`${gainMacros(gainCals)}`);
});

let calculateCals = function () {
  let maintenance;
  let sessionWeekIntensity;
  if (user.gender == "male") {
    var maleBmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
  } else if (user.gender == "female") {
    var femaleBmr = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
  }

  if (user.averageSessionIntensity == "1") {
    sessionWeekIntensity = lowSessionIntensityFunc();
  } else if (user.averageSessionIntensity == "2") {
    sessionWeekIntensity = midSessionIntensityFunc();
  } else if (user.averageSessionIntensity == "3") {
    sessionWeekIntensity = midSessionIntensityFunc();
  }

  if (maleBmr) {
    if (user.exerciseActivity == "1") {
      maintenance = sedentaryFunc(maleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "2") {
      maintenance = lightActiveFunc(maleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "3") {
      maintenance = activeFunc(maleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "4") {
      maintenance = VeryActiveFunc(maleBmr) + sessionWeekIntensity;
    }
  } else if (femaleBmr) {
    if (user.exerciseActivity == "1") {
      maintenance = sedentaryFunc(femaleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "2") {
      maintenance = lightActiveFunc(femaleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "3") {
      maintenance = activeFunc(femaleBmr) + sessionWeekIntensity;
    } else if (user.exerciseActivity == "4") {
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

let maintenanceMacros = function (calories) {
  let leftover = calories;
  let proteinGrams = Math.round(user.weight * 2);
  let proteinCals = proteinGrams * 4;
  let fatGrams = Math.round((calories * 0.25) / 9);
  let fatCals = calories * 0.25;
  leftover = leftover - proteinCals - fatCals;
  let carbGrams = Math.round(leftover / 4);
  return `P: ${proteinGrams} C: ${carbGrams} F: ${fatGrams}`;
};

let loseMacros = function (calories) {
  let leftover = calories;
  let proteinGrams = Math.round(user.weight * 2.2);
  let proteinCals = proteinGrams * 4;
  let fatGrams = Math.round((calories * 0.25) / 9);
  let fatCals = calories * 0.25;
  leftover = leftover - proteinCals - fatCals;
  let carbGrams = Math.round(leftover / 4);
  return `P: ${proteinGrams} C: ${carbGrams} F: ${fatGrams}`;
};

let gainMacros = function (calories) {
  let leftover = calories;
  let proteinGrams = Math.round(user.weight * 1.8);
  let proteinCals = proteinGrams * 4;
  let fatGrams = Math.round((calories * 0.3) / 9);
  let fatCals = calories * 0.25;
  leftover = leftover - proteinCals - fatCals;
  let carbGrams = Math.round(leftover / 4);
  return `P: ${proteinGrams} C: ${carbGrams} F: ${fatGrams}`;
};

// inputBtnEl.click((event) => {
//   console.log(event.target.style.backgroundColor);
//   if (event.target.style.backgroundColor == "rgb(200, 198, 198)") {
//     console.log("true");
//     event.target.style.backgroundColor = "#f8f9fa";
//     return;
//   }
//   event.target.style.backgroundColor = "#C8C6C6";
// });

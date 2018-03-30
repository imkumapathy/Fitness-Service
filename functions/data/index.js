(function (data) {
    var _ = require("lodash");
    var workoutData = require("./workouts");
    var myworkouts = require("./myworkouts");
    var allExcercises = require("./excersices");


    data.getWorkout = function (workoutId, next) {
        var allMyWorkouts = myworkouts.data;
        let workout = _.find(allMyWorkouts, (myWorkout => myWorkout.id == workoutId));
        next(null, workout);
    }

    data.getMyWorkouts = function (next) {
        var allMyExcercies = allExcercises.data;
        let allMyworkouts = myworkouts.data;
        allMyworkouts.forEach(workouts => {
            workouts.excercises.forEach(myexcercise => {
                let dexcerice = _.find(allMyExcercies, (excercise => excercise.id == myexcercise.id));
                myexcercise.name = dexcerice.name;
            });
        });
        next(null, allMyworkouts);
    }

    data.getNoteCategories = function (next) {
        next(null, seedData.initialNotes);
    }

    data.getWorkouts = function (next) {
        next(null, workoutData.data);
    }
})(module.exports);
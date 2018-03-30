(function (myworkouts) {
    myworkouts.data = [
        {
            id: "1",
            name: "Workout 1",
            createdOn: "3/21/18",
            excercises: [{
                id: 1,
                sets: [{
                    weight: 10,
                    reps: 18
                },
                {
                    weight: 15,
                    reps: 15
                },
                {
                    weight: 20,
                    reps: 12
                },
                ]
            },
            {
                id: 2,
                sets: [{
                    weight: 10,
                    reps: 18
                },
                {
                    weight: 15,
                    reps: 15
                },
                {
                    weight: 20,
                    reps: 12
                }]
            }]
        },

        {
            id: "2",
            name: "Workout 2",
            createdOn: "3/22/18",
            excercises: [{
                id: 3,
                sets: [{
                    weight: 10,
                    reps: 18
                },
                {
                    weight: 15,
                    reps: 15
                },
                {
                    weight: 20,
                    reps: 12
                }]
            },                
            {
                id: 4,
                sets: [{
                    weight: 10,
                    reps: 18
                },
                {
                    weight: 15,
                    reps: 15
                },
                {
                    weight: 20,
                    reps: 12
                }]
            }]
        }

    ]
})(module.exports)
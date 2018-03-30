(function (excerciseController) {


    var allExcercises = require("../data/excersices");

    excerciseController.init = function (app,db) {

        app.get("/api/excercise/getAllExcercises", function (req, res) {

            db.collection('excercises').get()    
            .then((snapshot) => {       
                let excercises = [];
                snapshot.forEach((doc) => {
                    excercises.push(doc.data());                        
                });
                res.set("Content-Type", "application/json");
                res.send(excercises);
            })
            .catch((err) => {
                res.status(500).send('Something broke!' + err);                
            });

        });


        app.get('/api/excercise/resetData', function (req, res) {

            var batch = db.batch();
            let allExcercisesData = allExcercises.data;
            allExcercisesData.forEach(excercise => {
                let newExcercise = db.collection('excercises').doc("excercise_" + excercise.id);
                batch.set(newExcercise, excercise);
            });

            batch.commit().then(()=> {
                db.collection('excercises').get()    
                .then((snapshot) => {       
                    let excercises = [];
                    snapshot.forEach((doc) => {                        
                        excercises.push(doc.data());                        
                    });
                    res.send(excercises);
                })
                .catch((err) => {
                    console.log('Error getting documents', err);
                });

            }).catch((err) => {

                res.status(500).send('Something broke!' + err);
            });


        });


    }

})(module.exports);
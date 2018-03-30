(function (setsController) {

    var _ = require('lodash');
    var allSets = require("../data/sets");

    setsController.init = function (app, db) {

        app.get('/api/set/getAllSets', function (req, res) {
            db.collection('sets').get()
                .then((snapshot) => {
                    let sets = [];
                    snapshot.forEach((doc) => {
                        let set = doc.data();
                        set.id = doc.id;
                        sets.push(set);
                    });
                    res.set("Content-Type", "application/json");
                    res.send(sets);
                })
                .catch((err) => {
                    console.log('Error getting documents', err);
                });
        });

        app.get('/api/set/resetData', function (req, res) {

            var batch = db.batch();
            let allSetData = allSets.data;
            allSetData.forEach(set => {
                let newSet = db.collection('sets').doc("set_" + set.id);

                batch.set(newSet, set);
            })

            // Commit the batch
            batch.commit().then(() => {
                db.collection('sets').get()
                    .then((snapshot) => {
                        let something = [];
                        snapshot.forEach((doc) => {
                            something.push(doc.data());
                        });
                        res.send(something);
                    })
                    .catch((err) => {
                        console.log('Error getting documents', err);
                    });

            }).catch((err) => {

                res.status(500).send('Something broke!' + err);
            });
        });

        app.put('/api/set/update', function (req, res) {
            let set = req.body;
            var doc = db.collection('sets').doc(set.id);

            var updateSingle = doc.update({ 'reps': set.reps, 'weight': set.weight }).then(ref => {
                res.send(set);
            }).catch((err) => {
                res.status(500).send('Something broke!' + err);
            });
        });


        app.post('/api/set/create', function (req, res) {
            res.set("Content-Type", "application/json");
            let newSet = req.body;
            var addDoc = db.collection('sets').add(newSet).then(ref => {
                newSet.id = ref.id;
                console.log('Added document with ID: ', ref.id);
                res.send(newSet);
            }).catch((err) => {
                res.status(500).send('Something broke!' + err);
            });

        });

        app.delete('/api/set/delete/:setId', function (req, res) {  
            res.set("Content-Type", "application/json");
            var setId = req.params.setId;
             console.log("Delete:"+ setId);
            db.collection('sets').doc(setId).delete().then(ref => {
                res.send({"setId": setId});
            }).catch((err) => {
                res.status(500).send('Something broke!' + err);
            });
        });


    }

})(module.exports);
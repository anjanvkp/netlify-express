const Notes = require("../models/notes");

exports.list = (req, res) => {
    Notes.find((err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving note list: ' + err);
        }
    });
}

exports.add = (req, res) => {
    const details = new Notes();
    details.DT = req.body.DT;
    details.NOTE = req.body.NOTE;
    details.usern = req.body.usern;
    details.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            res.send(err);
        }
    });
}


exports.getid = (req, res) => {
    let id = req.params.id;
    Notes.findById(id, function (err, note) {
        res.json(note);
    });
}

exports.update = (req, res) => {
    Notes.findById(req.params.id, function (err, employee) {
        if (!employee)
            return next(new Error('Unable To Find Note With This Id'));
        else {
            employee.DT = req.body.DT;
            employee.NOTE = req.body.NOTE;
            employee.usern = req.body.usern;

            employee.save().then(emp => {
                res.json('Note Updated Successfully');
            })
                .catch(err => {
                    res.status(400).send("Unable To Update Note");
                });
        }
    });
}

exports.del = (req, res) => {
    Notes.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
        if (err) res.json(err);
        else res.json('Employee Deleted Successfully');
    });
}

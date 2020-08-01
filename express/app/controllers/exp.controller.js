const Exp = require("../models/EXP");

exports.list = (req, res) => {
    Exp.find((err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.add = (req, res) => {
    const details = new Exp();
    details.rid = req.body.rid;
    details.dt = req.body.dt;
    details.mode = req.body.mode;
    details.pto = req.body.pto;
    details.head = req.body.head;
    details.grp = req.body.grp;
    details.amt = req.body.amt;
    details.purp = req.body.purp;
    details.usern = req.body.usern;
    details.type = req.body.type;
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
    Exp.findById(id, function (err, exp) {
        res.json(exp);
    });
}

exports.update = (req, res) => {
    Exp.findById(req.params.id, function (err, details) {
        if (!details)
            return next(new Error('Unable To Find Exp With This Id'));
        else {
            details.rid = req.body.rid;
            details.dt = req.body.dt;
            details.mode = req.body.mode;
            details.pto = req.body.pto;
            details.head = req.body.head;
            details.grp = req.body.grp;
            details.amt = req.body.amt;
            details.purp = req.body.purp;
            details.usern = req.body.usern;
            details.type = req.body.type;

            details.save().then(emp => {
                res.json('Exp Updated Successfully');
            })
                .catch(err => {
                    res.status(400).send("Unable To Update Exp");
                });
        }
    });
}

exports.del = (req, res) => {
    Exp.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
        if (err) res.json(err);
        else res.json('Exp Deleted Successfully');
    });
}

const { authJwt } = require("../middlewares");
const controller = require("../controllers/notes.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/notes", [authJwt.verifyToken], controller.list);

    app.get("/api/notes/edit/:id", [authJwt.verifyToken], controller.getid);

    app.post("/api/notes", [authJwt.verifyToken], controller.add);

    app.post("/api/notes/edit/:id", [authJwt.verifyToken], controller.update);

    app.get("/api/notes/del/:id", [authJwt.verifyToken], controller.del);
}
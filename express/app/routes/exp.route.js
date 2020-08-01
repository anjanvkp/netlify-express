const { authJwt } = require("../middlewares");
const controller = require("../controllers/exp.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/.netlify/functions/server/api/exp", controller.list);

    app.get("/.netlify/functions/server/api/exp/edit/:id", [authJwt.verifyToken], controller.getid);

    app.post("/.netlify/functions/server/api/exp", [authJwt.verifyToken], controller.add);

    app.post("/.netlify/functions/server/api/exp/edit/:id", [authJwt.verifyToken], controller.update);

    app.get("/api/exp/del/:id", [authJwt.verifyToken], controller.del);
}
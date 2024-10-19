async function init(req, res, next) {
    try {
        next();
    } catch (error) {
        next(error);
    }
}

async function post(req, res, next) {
    try {
        res.json({ message: "post" });
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    try {
        res.json({ message: "get" });
    } catch (error) {
        next(error);
    }
}

async function getAll(req, res, next) {
    try {
        res.json({ message: "getAll" });
    } catch (error) {
        next(error);
    }
}

async function patch(req, res, next) {
    try {
        res.json({ message: "patch" });
    } catch (error) {
        next(error);
    }
}

async function put(req, res, next) {
    try {
        res.json({ message: "put" });
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        res.json({ message: "remove" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    init,
    post,
    get,
    getAll,
    patch,
    put,
    remove,
};

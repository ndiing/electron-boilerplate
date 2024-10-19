const stream = require("stream");
const zlib = require("zlib");

function security(headers = {}) {
    return function (req, res, next) {
        try {
            headers = {
                "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
                "X-Frame-Options": "DENY",
                "Content-Security-Policy": "default-src 'self'",
                "Referrer-Policy": "no-referrer",
                "Cross-Origin-Resource-Policy": "same-origin",
                ...headers,
            };

            for (const name in headers) {
                const value = headers[name];

                res.setHeader(name, value);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

function cors(headers = {}) {
    return function (req, res, next) {
        try {
            headers = {
                "Access-Control-Allow-Origin": "*",
                ...headers,
            };

            for (const name in headers) {
                const value = headers[name];

                res.setHeader(name, value);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

function cookies() {
    const COOKIE_ATTRIBUTES = { domain: "Domain", expires: "Expires", httpOnly: "HttpOnly", maxAge: "Max-Age", partitioned: "Partitioned", path: "Path", secure: "Secure", sameSite: "SameSite" };

    return function (req, res, next) {
        try {
            req.cookies = {};

            const cookie = req.headers["cookie"] || "";

            if (cookie) {
                for (const [, name, value] of cookie.matchAll(/([^=\s]+)=([^;]+)/g)) {
                    req.cookies[name] = value;
                }
            }

            const setCookie = [];

            res.cookie = function (name, value, attributes = {}) {
                const cookies = [];

                cookies.push([name, value].join("="));

                for (const key in attributes) {
                    const value = attributes[key];
                    const name = COOKIE_ATTRIBUTES[key];

                    if (!name) {
                        continue;
                    }

                    cookies.push([name, value].join("="));
                }

                setCookie.push(cookies.join("; "));

                res.setHeader("Set-Cookie", setCookie);
            };

            next();
        } catch (error) {
            next(error);
        }
    };
}

function compression() {
    return function (req, res, next) {
        try {
            res.send = function (body) {
                if (!(body instanceof stream.Readable)) {
                    const readable = new stream.Readable();

                    readable.push(body);
                    readable.push(null);

                    body = readable;
                }

                const acceptEncoding = req.headers["accept-encoding"] || "";

                if (/\bbr\b/.test(acceptEncoding)) {
                    body = body.pipe(zlib.createBrotliCompress());

                    res.setHeader("Content-Encoding", "br");
                } else if (/\bgzip\b/.test(acceptEncoding)) {
                    body = body.pipe(zlib.createGzip());

                    res.setHeader("Content-Encoding", "gzip");
                } else if (/\bdeflate\b/.test(acceptEncoding)) {
                    body = body.pipe(zlib.createDeflate());

                    res.setHeader("Content-Encoding", "deflate");
                }

                res.removeHeader("X-Powered-By");

                body.pipe(res);
            };

            next();
        } catch (error) {
            next(error);
        }
    };
}

function body() {
    return async function (req, res, next) {
        try {
            if (["POST", "PATCH", "PUT"].includes(req.method)) {
                const chunks = [];

                for await (const chunk of req) {
                    chunks.push(chunk);
                }

                const buffer = Buffer.concat(chunks);

                const contentType = req.headers["content-type"] || "";

                if (/^application\/json/.test(contentType)) {
                    req.body = JSON.parse(buffer);
                } else if (/^application\/x-www-form-urlencoded/.test(contentType)) {
                    req.body = Object.fromEntries(new URLSearchParams(buffer.toString()).entries());
                }
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

function authorization() {
    return function (req, res, next) {
        try {
            next();
        } catch (error) {
            next(error);
        }
    };
}

function redirect() {
    return function (req, res, next) {
        try {
            if (!req.socket.encrypted) {
                return res.redirect(`https://${req.headers.host}${req.url}`);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

function missing() {
    return function (req, res, next) {
        res.status(404);

        next(new Error("Not Found"));
    };
}

function catchAll() {
    return function (err, req, res, next) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            res.status(500);
        }

        err = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

        res.json({ message: err.message });
    };
}

module.exports = {
    security,
    cors,
    cookies,
    compression,
    body,
    authorization,
    redirect,
    missing,
    catchAll,
};

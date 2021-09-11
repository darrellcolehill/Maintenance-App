const app = require("../app")
const request = require("supertest")
const dbHandler = require("./db-handler")

let testuser = {}
testuser["username"] = "musa"
testuser["password"] = "53cur3"

describe("Signup route", () => {
    before(async () => { await dbHandler.connect() })

    after(async () => { await dbHandler.closeDatabase() })

    it("returns 200 OK on success", (done) => {
        request(app)
            .post("/auth/signup")
            .send(testuser)
            .expect(200, done)
    })

    it("returns 401 Bad Request if username is already taken", (done) => {
        request(app)
            .post("/auth/signup")
            .send(testuser)
            .expect(400, done)
    })
})

describe("Login route", () => {
    /**
     * Setting up a test user before the test runs
     */
    before(async () => {
        await dbHandler.connect()
        await request(app)
            .post("/auth/signup")
            .send(testuser)
    })

    after(async () => { await dbHandler.closeDatabase() })

    it("returns 401 Unauthorized on incorrect login details", (done) => {
        request(app)
            .post("/auth/login")
            .send({ "username": testuser["username"], "password": "mongoose" })
            .expect(401, done)
    })

    it("returns 200 OK on successful login", (done) => {
        request(app)
            .post("/auth/login")
            .send(testuser)
            .expect(200, done)
    })
})

describe("A route that requires a valid authorization token", () => {
    let token

    /**
     * Setting up a test user and getting the token before the test runs
     */
    before(async () => {
        await dbHandler.connect()

        await request(app)
            .post("/auth/signup")
            .send(testuser)

        let resp = await request(app)
            .post("/auth/login")
            .send(testuser)

        token = resp.body.token
    })

    after(async () => { await dbHandler.closeDatabase() })

    it("returns 401 Unauthorized if no valid token given", (done) => {
        request(app)
            .get("/secret")
            .expect(401, done)
    })

    it("returns 200 OK if a valid token is given", (done) => {
        request(app)
            .get("/secret")
            .set("Authorization", "Bearer " + token)
            .expect(200, done)
    })
})
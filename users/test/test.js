const request = require("supertest");
const express = require("express");
const app = express();

describe("get", function () {
  it("responds with json", function (done) {
    request(app).get("/v1/user/users").expect(404, done);
  });
});

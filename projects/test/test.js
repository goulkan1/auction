var expect = require("chai").expect;
var request = require("request");

it("Main page status", function (done) {
  request(
    "http://localhost:8002/v1/project/projects",
    function (error, response, body) {
      console.log(response);
      expect(response.statusCode).to.equal(200);
      done();
    }
  );
});

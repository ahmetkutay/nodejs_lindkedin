var request = require("request");

describe("calc", () => {
  it("should multipyle 2 and 2", () => {
    expect(2 * 2).toBe(4);
  });
});

describe("get messages", () => {
  it("should return 200 ok", (done) => {
    request.get("http://localhost:8000/messages", (err, response) => {
      expect(JSON.parse(response.body).length).toBeGreaterThan(0);
      done();
    });
  });
});

describe("get messages from user", () => {
  it("should return 200 ok", (done) => {
    request.get("http://localhost:8000/messages/ahmet", (err, response) => {
      expect(JSON.parse(response.body).length).toBeGreaterThan(0);
      done();
    });
  });
  it("name should be tim", (done) => {
    request.get("http://localhost:8000/messages/tim", (err, response) => {
      expect(JSON.parse(response.body)[0].name).toEqual("ahmet");
      done();
    });
  });
});

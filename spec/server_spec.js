const { addNewVisitor, app, mongoose, db, mongoDB } = require("../src/server");

const axios = require("axios");
const jsdom = require("jsdom");
const fs = require("file-system");
const { JSDOM } = jsdom;
const path = require("path").resolve(__dirname, "../views/template.pug");
console.log(path);
const pug = fs.readFileSync(path, "utf-8");
const { document } = new JSDOM(pug).window;
global.document = document;

const visitorData = {
  name: `Vicky Vilakazi`,
  assistant: `Benjamin Dube`,
  age: `45`,
  date: `06/05/2020`,
  time: `13:47`,
  comments: `Jerusalema`,
};

mongoose.connect(mongoDB, function (err, db) {
  if (err) throw err;
  db.collection("visitor")
    .insertOne(visitorData)
    .then((result) => {});
});

describe(`This checks if mongoDB works`, () => {
  it(`should save data into the database and retrive that data`, () => {
    mongoose.connect(mongoDB, function (err, db) {
      if (err) throw err;
      db.collection("visitor")
        .find()
        .limit(1)
        .sort({ _id: -1 })
        .toArray(function (err, result) {
          expect(visitorData.name).toBe(result[0].name);
          expect(visitorData.assistant).toBe(result[0].assistant);
          expect(visitorData.age).toBe(result[0].age);
          expect(visitorData.date).toBe(result[0].date);
          expect(visitorData.time).toBe(result[0].time);
          expect(visitorData.comments).toBe(result[0].comments);
        });
      db.close();
    });
  });
});

describe("addNewVisitor", function () {
  it("should check if function is defined", function () {
    expect(addNewVisitor).toBeDefined();
  });
  it("should check if the addNewVisitor is not undefined", function () {
    expect(addNewVisitor).not.toBeUndefined();
  });
});

describe("url", () => {
  var res;
  async function get() {
    res = await axios.get("http://localhost:3000");
  }
  it("should check database url", () => {
    expect(mongoDB).toBe("mongodb://127.0.0.1/mydb");
  });
  it("should check if status code is 200", async (done) => {
    try {
      const route = await axios.get("http://127.0.0.1:3000");
      expect(route.status).toEqual(200);
    } catch (err) {
      console.log(err);
    }
    done();
  });
});

var browser;
describe("thank you page", () => {
  beforeEach(function (done) {
    JSDOM.fromFile(path, {}).then(function (response) {
      browser = response;
      done();
    });
  });

  afterEach(function () {
    browser.window.close();
  });

  it("should have 0 div tags", () => {
    var divForm = browser.window.document.getElementsByTagName("div");
    expect(divForm.length).toEqual(0);
  });
});

describe("SQL Database Testing", () => {
  // Drop and Create Tables
  it("Drop class table if exist", function () {
    cy.task("queryDatabase", `DROP TABLE IF EXISTS class`).then((result) => {
      expect(result.message).to.equal("");
    });
  });
  it("Drop student table if exist", function () {
    cy.task("queryDatabase", `DROP TABLE IF EXISTS student`).then((result) => {
      expect(result.message).to.equal("");
    });
  });
  it("Drop studentclass table if exist", function () {
    cy.task("queryDatabase", `DROP TABLE IF EXISTS studentclass`).then(
      (result) => {
        expect(result.message).to.equal("");
      }
    );
  });
  it("Create table class", function () {
    cy.task(
      "queryDatabase",
      `CREATE TABLE class(
        classId int ,
        description varchar(50),
        postGraduate int
        );`
    ).then((result) => {
      expect(result.message).to.equal("");
    });
  });
  it("Create table student", function () {
    cy.task(
      "queryDatabase",
      `CREATE TABLE student(
        studentId int ,
        Name varchar(50)
        )`
    ).then((result) => {
      expect(result.message).to.equal("");
    });
  });
  it("Create table studentclass", function () {
    cy.task(
      "queryDatabase",
      `CREATE TABLE studentclass(
        studentId int ,
        classId int
        )`
    ).then((result) => {
      expect(result.message).to.equal("");
    });
  });
  // Inserting the data to the tables
  it("Insert into class", function () {
    cy.task(
      "queryDatabase",
      `INSERT into class (classId, description, postGraduate) VALUES (1, N'Art', 0), (2, N'Comp Sci', 0), (3, N'Advanced Comp Sci', 1), (4, N'Advanced Stats', 1)`
    ).then((result) => {
      console.log(result);
      expect(result.affectedRows).to.equal(4);
    });
  });
  it("Insert into student", function () {
    cy.task(
      "queryDatabase",
      `INSERT into student (studentId, Name) VALUES (1, N'Steve'), (2, N'Chris'), (3, N'Scott'), (4, N'John'), (5, N'KC')`
    ).then((result) => {
      expect(result.affectedRows).to.equal(5);
    });
  });
  it("Insert into student", function () {
    cy.task(
      "queryDatabase",
      `INSERT into studentclass (studentId, classId) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (2, 1), (2, 2), (3, 2), (3, 1), (4, 1), (4, 4)`
    ).then((result) => {
      expect(result.affectedRows).to.equal(10);
    });
  });
  // Below query brings the required results.
  it("Select Query to Verify the Given Results", function () {
    cy.task(
      "queryDatabase",
      `SELECT s.Name, COUNT(sc.classId) AS "Classes Taken"
      FROM student s
      LEFT JOIN studentclass sc ON s.studentId = sc.studentId
      GROUP BY s.Name order by s.Name asc;`
    ).then((result) => {
      expect(result).to.have.lengthOf(5); // Checking if the result contains 5 results
      expect(result[0]["Name"]).to.equal("Chris"); // Cross checking the result for Name
      expect(result[0]["Classes Taken"]).to.equal(2); // Cross checking the result for Classes Taken
    });
  });
});

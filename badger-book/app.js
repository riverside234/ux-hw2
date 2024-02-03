let rawData = [];

fetch("https://cs571.org/api/f23/hw2/students", {
  method: "GET",
  headers: {
    "X-CS571-ID": CS571.getBadgerId(),
  },
})
  .then((res) => res.json())
  .then((data) => {
    rawData = data;
  });

let searchData = [];
let nameElement = document.getElementById("search-name");
let inputName = "";

let majorElement = document.getElementById("search-major");
let inputMajor = "";

let interestElement = document.getElementById("search-interest");
let inputInterest = "";

majorElement.addEventListener("input", function (event) {
  inputMajor = event.target.value;
});

nameElement.addEventListener("input", function (event) {
  inputName = event.target.value;
});

interestElement.addEventListener("input", function (event) {
  inputInterest = event.target.value;
});

document.getElementById("search-btn").addEventListener("click", handleSearch);

let numberResult = document.getElementById("num-results");
numberResult.innerText = rawData.length;

let studList = document.getElementById("students");
studList.removeAttribute("id");
studList.className = "row";

studList.innerHTML = buildStudentsHtml(rawData);

/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 *
 * @param {*} studs array of students
 * @returns html containing all students
 */

function buildStudentsHtml(studs) {
  return studs.map((stud) => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 *
 * @param {*} stud
 * @returns
 */
function buildStudentHtml(stud) {
  let html = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
  html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
  html += `<p> <strong>${stud.major} </strong> </p>`;
  html += `<p> ${stud.name.first} is taking ${stud.numCredits} credits and is ${
    stud.fromWisconsin ? "" : "not"
  } from Wisconsin. </p>`;
  html += `<p> They have ${stud.interests.length} interests including... </p>`;
  html += `<ul>`;
  stud.interests.forEach((interest) => {
    html += `<li>${interest}</li>`;
  });

  html += `<ul>`;
  html += `</div>`;
  return html;
}

function handleSearch(e) {
  e.preventDefault();

  // TODO
  // For Step 5, implement the rest of this function!
  searchData = rawData.filter((student) => {
    if (
      (inputName === "" ||
        (student.name.first + student.name.last)
          .toLowerCase()
          .match(inputName.toLowerCase().trim().replace(/\s/g, ""))) &&
      (inputMajor === "" ||
        student.major
          .toLowerCase()
          .match(inputMajor.toLowerCase().trim().replace(/\s/g, ""))) &&
      (inputInterest === "" ||
        student.interests.some((stu) => {
          return stu
            .toLowerCase()
            .match(inputInterest.toLowerCase().trim().replace(/\s/g, ""));
        }))
    ) {
      return true;
    }
  });

  numberResult.innerText = searchData.length;

  studList.innerHTML = buildStudentsHtml(searchData);
}

document.getElementById("search-btn").addEventListener("click", handleSearch);

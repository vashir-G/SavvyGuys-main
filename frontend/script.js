const main = async () => {

  // Element differences
  let teachersCountDisplay = document.querySelector("#professors_count_display");
  let teachersListDisplay = document.querySelector(".popup_container.teachersListDisplay .wrapper .content");
  let teachersListDisplayPopUpContainer = document.querySelector(".popup_container.teachersListDisplay");
  let teachersListDisplayCloseBtn = document.querySelector("section.teachersListDisplay .closeBtn");
  let teachersListDisplayViewBtn = document.querySelector(".teachersListDisplayViewBtn");


  const updateTeachersList = async () => {
    let teachersListData = await fetch("http://localhost:3000/api/teachers");
    teachersListData = await teachersListData.json();

    teachersListDisplay.innerHTML = "";
    console.log(teachersListData);
    teachersCountDisplay.innerHTML = teachersListData.length;

    let listDisplayHTML = "";

    teachersListData.map((teacher) => {
      classesElems = "";

      for (let i = 0; i < teacher.classes.length; i++) {
        classesElems += `<div class="class">${teacher.classes[i]}</div>`
      }

      listDisplayHTML += `
        <div class="teacherCard">
          <div class="name">${teacher.name}</div>
          <div class="subject">
            <label for="subjectName">Subject: </label>
            <p class="subjectName" id="subjectName">${teacher.subject}</p>
          </div>
          <div class="classes" id="classesList">
          ${classesElems}
          </div>
        </div>
        `;
    })

    teachersListDisplay.innerHTML = listDisplayHTML;
  }

  updateTeachersList();
  // Function Definitions

  const toggleTeachersListDisplayVisibility = () => {
    teachersListDisplayPopUpContainer.classList.toggle("hidden");
  }

  teachersListDisplayCloseBtn.onclick = toggleTeachersListDisplayVisibility;
  teachersListDisplayViewBtn.onclick = toggleTeachersListDisplayVisibility;


};

document.addEventListener("DOMContentLoaded", main)
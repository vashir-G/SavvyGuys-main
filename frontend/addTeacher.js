const addTeacherMainForm = async () => {
  let closeBtn = document.querySelector(".popup_container.newTeacherForm .title .closeIcon");
  let addNewTeacherBtn = document.querySelector(".addNewTeacherBtn");
  let newTeacherFormPopup = document.querySelector(".popup_container.newTeacherForm");
  let newTeacherForm = document.querySelector("#newTeacherForm");

  let classesList = await fetch("http://localhost:3000/api/classes");
  classesList = await classesList.json();

  let subjectsList = await fetch("http://localhost:3000/api/subjects");
  subjectsList = await subjectsList.json();

  let newTeacherFormClassesList = document.querySelector("#newTeacherClasses");
  newTeacherFormClassesList.innerHTML = `<option value='select'>Select the classes</option>`;
  let newTeacherFormSubjectsList = document.querySelector("#newTeacherSubject");
  newTeacherFormSubjectsList.innerHTML = `<option value="select">Select a subject</option>`;

  for (let i = 0; i < classesList.length; i++) {
    let optionElem = document.createElement("option");
    optionElem.setAttribute("value", classesList[i]);
    optionElem.innerHTML = classesList[i];

    newTeacherFormClassesList.appendChild(optionElem);
  }


  for (let i = 0; i < subjectsList.length; i++) {
    let optionElem = document.createElement("option");
    optionElem.setAttribute("value", subjectsList[i]);
    optionElem.innerHTML = subjectsList[i];

    newTeacherFormSubjectsList.appendChild(optionElem);
  }



  const handleNewTeacherFormSubmit = async (e) => {
    e.preventDefault();
    let [newTeacherName, newTeacherSubject, newTeacherClasses] = [document.querySelector("#newTeacherName"), document.querySelector("#newTeacherSubject"), document.querySelector("#newTeacherClasses")];
    console.log("Form Submitted")
    console.table({
      newTeacherName: newTeacherName.value,
      newTeacherSubject: newTeacherSubject.value,
      newTeacherClasses: newTeacherClasses.value
    })

    let response = await fetch(`http://localhost:3000/api/teachers/add?name=${encodeURIComponent(newTeacherName.value)}&subject=${encodeURIComponent(newTeacherSubject.value)}&classes=${encodeURIComponent(newTeacherClasses.value)}`)
    response = await response.json()
    console.table(response)
    newTeacherForm.reset();

    main();
  }


  const toggleNewTeacherFormVisibility = () => {
    newTeacherFormPopup.classList.toggle("hidden");
  }

  newTeacherForm.onsubmit = handleNewTeacherFormSubmit;
  closeBtn.onclick = toggleNewTeacherFormVisibility;
  addNewTeacherBtn.onclick = toggleNewTeacherFormVisibility;

};

document.addEventListener("DOMContentLoaded", addTeacherMainForm)
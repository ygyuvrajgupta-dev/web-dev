let todoArr = JSON.parse(localStorage.getItem("todo")) || [];
let favArr = JSON.parse(localStorage.getItem("fav")) || [];

document.querySelector("form").addEventListener("submit", getData);

displayTable(todoArr);

function getData(e) {
  e.preventDefault();

  const taskName = document.querySelector("#task").value;
  const taskPriority = document.querySelector("#priority").value;

  let taskObj = {
    taskName,
    taskPriority,
  };

  todoArr.push(taskObj);

  localStorage.setItem("todo", JSON.stringify(todoArr));

  displayTable(todoArr);

  document.querySelector("form").reset();
}

function displayTable(arr) {
  document.querySelector("tbody").innerText = "";

  arr.forEach((el) => {
    let row = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerText = el.taskName;

    let td2 = document.createElement("td");
    td2.innerText = el.taskPriority;

    if (el.taskPriority == "High") {
      td2.style.color = "red";
    } else {
      td2.style.color = "green";
    }

    let td3 = document.createElement("td");

    let favBtn = document.createElement("button");
    favBtn.innerText = "Add";

    favBtn.addEventListener("click", function () {
      favArr.push(el);
      localStorage.setItem("fav", JSON.stringify(favArr));
      alert("Todo added to Fav");
    });

    td3.append(favBtn);

    row.append(td1, td2, td3);

    document.querySelector("tbody").append(row);
  });
}

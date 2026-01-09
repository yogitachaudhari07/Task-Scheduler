const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const button = document.querySelector('button');
const timeline = document.getElementById('timeline');
const prev = document.getElementById('prev');
const monthText = document.getElementById('month');
const next = document.getElementById('next');
const daysBox = document.getElementById('days');

let task_list = [];
let currentDate = new Date(); 

button.addEventListener('click', function () {
  let task = taskInput.value;
  let date = dateInput.value;
  let time = timeInput.value;

  if (!task || !date) {
    alert('Enter task and date');
    return;
  }

  task_list.push({ task, date, time });

  const div = document.createElement('div');
  div.className = 'task-item';
  div.innerHTML = `
    <strong>${task}</strong><br>
    <small>${date} ${time}</small>
  `;

  timeline.appendChild(div);

  showCalender();

  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
});

function showCalender() {
  daysBox.innerHTML = "";

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();

  monthText.innerText =
    currentDate.toLocaleString("default", { month: "long" }) + " " + year;

  let totalDays = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= totalDays; day++) {
    let li = document.createElement('li');

    // Day number
    let dayNumber = document.createElement('div');
    dayNumber.innerText = day;
    li.appendChild(dayNumber);

    // Check tasks
    task_list.forEach(t => {
      let taskDate = new Date(t.date);

      if (
        taskDate.getDate() === day &&
        taskDate.getMonth() === month &&
        taskDate.getFullYear() === year
      ) {
        let taskDiv = document.createElement('small');
        taskDiv.innerText = t.task;
        li.appendChild(taskDiv);
      }
    });

    daysBox.appendChild(li);
  }
}

prev.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  showCalender();
};

next.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  showCalender();
};

showCalender();



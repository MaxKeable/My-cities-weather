

var current = document.getElementById("current-day");

var currentdaydisplay = dayjs().format("dddd, MMMM D, YYYY");
console.log(currentdaydisplay);

current.textContent = currentdaydisplay;

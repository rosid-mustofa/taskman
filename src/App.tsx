interface Task {
	id: number;
	name: string;
	completed: boolean;
}

let tasks: Task[] = [];
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

addTaskBtn.addEventListener("click", () => {
	const taskName = taskInput.value.trim();
	if (taskName !== "") {
		const newTask: Task = {
			id: tasks.length + 1,
			name: taskName,
			completed: false,
		};
		tasks.push(newTask);
		renderTasks();
		taskInput.value = "";
	}
});

function renderTasks() {
	taskList.innerHTML = "";
	tasks.forEach((task) => {
		const li = document.createElement("li");
		li.textContent = task.name;
		li.className =
			"bg-white border rounded-md px-3 py-2 mb-2 flex justify-between items-center";
		if (task.completed) {
			li.classList.add("line-through", "text-gray-500");
		}
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = task.completed;
		checkbox.addEventListener("change", () => {
			task.completed = checkbox.checked;
			renderTasks();
		});
		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "Delete";
		deleteBtn.className =
			"bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded";
		deleteBtn.addEventListener("click", () => {
			tasks = tasks.filter((t) => t.id !== task.id);
			renderTasks();
		});
		li.appendChild(checkbox);
		li.appendChild(deleteBtn);
		taskList.appendChild(li);
	});
}

renderTasks();
// Function to toggle all tasks as completed or not completed
function toggleAllTasks(completed: boolean) {
	tasks.forEach((task) => {
		task.completed = completed;
	});
	renderTasks();
}

// Function to clear all completed tasks
function clearCompletedTasks() {
	tasks = tasks.filter((task) => !task.completed);
	renderTasks();
}

// Event listener for "Toggle All" button
const toggleAllBtn = document.getElementById(
	"toggleAllBtn"
) as HTMLButtonElement;
toggleAllBtn.addEventListener("click", () => {
	const areAllCompleted = tasks.every((task) => task.completed);
	toggleAllTasks(!areAllCompleted);
});

// Event listener for "Clear Completed" button
const clearCompletedBtn = document.getElementById(
	"clearCompletedBtn"
) as HTMLButtonElement;
clearCompletedBtn.addEventListener("click", () => {
	clearCompletedTasks();
});
// app.ts (lanjutan)

// Function to render the total number of tasks and the number of completed tasks
function renderTaskCount() {
	const totalTasks = tasks.length;
	const completedTasks = tasks.filter((task) => task.completed).length;
	const taskCountContainer = document.getElementById(
		"taskCount"
	) as HTMLDivElement;
	taskCountContainer.textContent = `Total Tasks: ${totalTasks} | Completed: ${completedTasks}`;
}

// Call the renderTaskCount function to initially render the task count
renderTaskCount();

// Add event listener for the Clear All button
const clearAllBtn = document.getElementById("clearAllBtn") as HTMLButtonElement;
clearAllBtn.addEventListener("click", () => {
	tasks = [];
	renderTasks();
});

// Update renderTasks function to include the task count rendering

const fs = require('fs');
const readline = require('readline');

const FILE_P = './tasks.json';

let tasks = [];
if (fs.existsSync(FILE_P)) {
    tasks = JSON.parse(fs.readFileSync(FILE_P, 'utf8'));
} else {
    fs.writeFileSync(FILE_P, JSON.stringify(tasks));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function saveTasks() {
    fs.writeFileSync(FILE_P, JSON.stringify(tasks, null));
}

function addTask() {
    rl.question('Enter the task description: ', (description) => {
        tasks.push({ description, completed: false });
        saveTasks();
        console.log('Task added.');
        mainMenu();
    });
}

function viewTasks() {
    console.log('\nTo-Do List:');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. [${task.completed ? 'x' : ' '}] ${task.description}`);
    });
    mainMenu();
}

function markAsComplete() {
    rl.question('Enter the task number to mark as complete: ', (number) => {
        const index = parseInt(number) - 1;
        if (index >= 0 && index < tasks.length) {
            tasks[index].completed = true;
            saveTasks();
            console.log('Task marked as complete.');
        } else {
            console.log('Invalid task number.');
        }
        mainMenu();
    });
}

function deleteTask() {
    rl.question('Enter the task number to delete: ', (number) => {
        const index = parseInt(number) - 1;
        if (index >= 0 && index < tasks.length) {
            tasks.splice(index, 1);
            saveTasks();
            console.log('Task deleted.');
        } else {
            console.log('Invalid task number.');
        }
        mainMenu();
    });
}

function mainMenu() {
    console.log('\nChoose an option:');
    console.log('1. Add a Task');
    console.log('2. View Tasks');
    console.log('3. Mark as Complete');
    console.log('4. Delete Task');
    console.log('5. Exit');
    rl.question('Enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                addTask();
                break;
            case '2':
                viewTasks();
                break;
            case '3':
                markAsComplete();
                break;
            case '4':
                deleteTask();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                mainMenu();
                break;
        }
    });
}

console.log('Welcome to To-Do List App!');
mainMenu();

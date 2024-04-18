import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
console.log(chalk.magenta.bold("\n \t Welcome to Samrah - Todo-List Application\n"));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do:",
                choices: ["Add Task", "Deleted Task", "Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Deleted Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
// function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task :",
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n${newTask.task} task added successfully in Todo-List`);
};
// function to view all Todo-List Tasks
let viewTask = () => {
    console.log("\nYour Todo-list: \n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
};
// function to delete a task from the list.
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to delete :",
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n${deletedTask} this task has been deleted successfully from your Todo-List\n`);
};
// Function to update a task
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the task 'index no' of the task you want to update :"
        },
        {
            name: "new_task",
            type: "input",
            message: "Now Enter new task name :",
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log(`\nTask at index no. ${update_task_index.index} updated successfully [for updated list check option: "View Todo-List"]`);
};
main();

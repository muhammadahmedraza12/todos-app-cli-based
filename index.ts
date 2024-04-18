#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.yellow.bgGreenBright("Task Manager"));
console.log(chalk.bold.yellowBright("Created by M. Ahmed Raza"));

let tasks: string[] = [];

async function manageTasks(taskList: string[]) {
    do {
        const selectedOperation = await inquirer.prompt({
            type: "list",
            name: "operation",
            message: "Choose an Operation",
            choices: [
                "Add New Task",
                "Update Existing Task",
                "View All Tasks",
                "Mark Task as Completed",
                "Delete Task",
                "Exit"
            ]
        });

        switch (selectedOperation.operation) {
            case "Add New Task":
                await addNewTask(tasks);
                break;
            case "Update Existing Task":
                await updateExistingTask(tasks);
                break;
            case "View All Tasks":
                displayTaskList(tasks);
                break;
            case "Mark Task as Completed":
                await markTaskAsCompleted(tasks);
                break;
            case "Delete Task":
                await deleteSelectedTask(tasks);
                break;
            case "Exit":
                console.log(chalk.bold.yellow.bgGreenBright("Thank you for using Task Manager!"));
                return;
            default:
                break;
        }
    } while (true);
}

async function addNewTask(tasks: string[]) {
    const newTaskInput = await inquirer.prompt({
        type: "input",
        name: "taskDescription",
        message: "Enter the task description:"
    });
    tasks.push(newTaskInput.taskDescription);
    console.log(chalk.bold.redBright("Task added successfully!"));
    displayTaskList(tasks);
}

async function updateExistingTask(tasks: string[]) {
    const taskToUpdate = await inquirer.prompt({
        type: "list",
        name: "selectedTask",
        message: "Select the task to update:",
        choices: tasks
    });

    const updatedTaskDescription = await inquirer.prompt({
        type: "input",
        name: "taskDescription",
        message: "Enter the updated task description:"
    });

    const taskIndex = tasks.indexOf(taskToUpdate.selectedTask);
    if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTaskDescription.taskDescription;
        console.log(chalk.bold.redBright("Task updated successfully!"));
    }
    displayTaskList(tasks);
}

function displayTaskList(tasks: string[]) {
    console.log(chalk.bold.yellowBright("***** Task List *****"));
    tasks.forEach(task => {
        console.log(task);
    });
    console.log(chalk.bold.yellowBright("**********************"));
}

async function markTaskAsCompleted(tasks: string[]) {
    const taskToComplete = await inquirer.prompt({
        type: "list",
        name: "selectedTask",
        message: "Select the task to mark as completed:",
        choices: tasks
    });

    tasks = tasks.filter(task => task !== taskToComplete.selectedTask);
    console.log(chalk.bold.greenBright("Task marked as completed successfully!"));
    displayTaskList(tasks);
}

async function deleteSelectedTask(tasks: string[]) {
    const taskToDelete = await inquirer.prompt({
        type: "list",
        name: "selectedTask",
        message: "Select the task to delete:",
        choices: tasks
    });

    tasks = tasks.filter(task => task !== taskToDelete.selectedTask);
    console.log(chalk.bold.redBright("Task deleted successfully!"));
    displayTaskList(tasks);
}

manageTasks(tasks);

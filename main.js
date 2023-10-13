#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
console.clear();
let todos = [];
let loop = true;
let answer1;
let answer2;
let answer3;
const time = (ms = 3000) => new Promise((resolve, rejects) => setTimeout(resolve, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.glitch("GET ORGANIZED WITH YOUR OWN TODOLIST");
    await time();
    rainbowTitle.stop();
}
await welcome();
async function startLoop() {
    while (loop) {
        await displayMenu();
    }
}
;
startLoop();
async function displayMenu() {
    let answer1 = await inquirer.prompt([
        {
            name: "menuOption",
            type: "list",
            choices: ["Add Todo Items", "Delete Items", "Exit"],
            message: chalk.blue("Please select from options:")
        }
    ]);
    switch (answer1.menuOption) {
        case "Add Todo Items": {
            await addTodo();
            break;
        }
        case "Delete Items": {
            await deleteTodo();
            break;
        }
        default: {
            loop = false;
            if (todos.length > 0) {
                console.log(chalk.green("Here is your compiled todo list:"));
                todos.forEach(todo => {
                    console.log(todo);
                });
            }
            console.log(chalk.green("Thank you for using the TODOLIST."));
            break;
        }
    }
}
;
async function addTodo() {
    let answer2 = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: chalk.blue("Please enter the item for todolist:")
        }
    ]);
    todos.push(answer2.todo);
    console.log(todos);
}
;
async function deleteTodo() {
    if (todos.length > 0) {
        answer3 = await inquirer.prompt([
            {
                name: "menuOption",
                type: "list",
                choices: todos,
                message: chalk.red.italic("Please select the item to be deleted from todolist:")
            }
        ]);
        let i = 0;
        do {
            if (todos[i] == answer3.menuOption) {
                todos.splice(i, 1);
                break;
            }
            i++;
        } while (i < todos.length);
        console.log(todos);
    }
    else {
        console.log(chalk.red.bold("No todos were found in the todolist"));
    }
}

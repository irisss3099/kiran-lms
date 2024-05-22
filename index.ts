#!/usr/bin/env node

import  inquirer from "inquirer";
import chalk from "chalk";


//create student class
class Student
{
    static idNumber = 123
    id: number;
    name: string;
    courses: string[];
    balance: number;
    attendance: string[];
    static student_balance: number;
   

    constructor (name : string)
    {
        this.id = Student.idNumber++
        this.name = name
        this.courses = []
        this.balance = 5000
        this.attendance = []
        

    }

    // create a method for enroll student in course
    enroll_course(course: string)
    {
        this.courses.push(course)
         
        
    }


    //create a method to view student balance
    student_balance()
    {
        console.log(chalk.blue.bold(`Dear ${this.name} , your current balance is ${this.balance}`));
        
    }


    //create a method to pay student fee
    student_fee(amount: number)
    {
        this.balance -= amount
        console.log(chalk.blue.bold(`You successfully paid your fee`));
        console.log(chalk.red.bold(`Your current balance is ${this.balance}`));
        
    } 


    //create a method to mark attendance
    mark_attendance()
    {
        let date = new Date().toLocaleDateString()
        this.attendance.push(date)
        console.log(chalk.blue.bold(`Attendance marked for ${this.name} on ${date}`));
        
    }


    // create a method to view attendance 
    view_attendance()
    {
        console.log(chalk.blue.bold(`Attendance for ${this.name}:`));
        this.attendance.forEach
        ((date,index) => 
            {
                console.log(chalk.yellow(`${index + 1}. ${date}`));
                
            }
        )    
    }


    //create a method to display student status
    student_status()
    {
        console.log(`ID: (${chalk.yellow(this.id)})`);
        console.log(`Name: (${chalk.yellow(this.name)})`);
        console.log(`Courses: (${chalk.yellow(this.courses)})`);
        console.log(`Balance: (${chalk.yellow(this.balance)})`);
        console.log(`Attendance: (${chalk.yellow(this.attendance.join(" , "))})`);
    }
}

//-----------------------------------------------------------------***----------------------------------------------------------//



//create another class for student management
class student_management
{
    student:Student[]               //this class is create to store all student data
    static add_student: any;

    constructor()
    {
        this.student = []
    } 


    //create method for add student
    add_student(name: string)
    {
        let student =  new Student (name) 
        this.student.push(student)  
        console.log(chalk.blue.bold(`${name} added successfully`,(chalk.yellow(">>>>>>")), (chalk.red(`Student id is: ${student.id}`))));
        
    }


    //create a method to enroll student
    enroll_student(id: number , course: string)
    {
        let student= this.find_student(id)
        if (student)
        {
            student.enroll_course(course)
            console.log(chalk.blue.bold(`${student.name} enrolled in ${course}  course successfully`));
        }
    }


    //create a method to view student balance
    student_balance(id: number)
    {
        let student= this.find_student(id)
        if(student)
        {
            student.student_balance()
        }
        else
        {
            console.log(chalk.red.bold("Student not appear ... Please  enter correct id !!"));
            
        }
    }


    //create method to pay fee
    student_fee(id: number , amount: number)
    {
        let student = this.find_student(id)
        if(student)
        {
            student.student_fee(amount)  
        }
        else
        {
            console.log(chalk.red.bold("Student not appear ... Please  enter correct id !!"));
            
        }
    }


    //create a method to mark attendance 
    mark_attendance(id: number)
    {
        let student = this.find_student(id)
        if(student)
        {
            student.mark_attendance()
        }
         else
        {
            console.log(chalk.red.bold("Student not found.. please enter the correct ID !! "));
            
        }
    }


    //create a method to view attendance
    view_attendance(id: number)
    {
        let student = this.find_student(id)
        if(student)
        {
            student.view_attendance()
        }
        else
        {
            console.log(chalk.red.bold("Student not found.. please enter the correct ID !!"));
            
        }  
    }


    //create method to show student status
    student_status(id: number )
    {
        let student = this.find_student(id)
        if(student)
        {
            student.student_status()
        }
    }


    //create a method to find student by student id 
    find_student(id: number)
    {
        return this.student.find(stu => stu.id === id)
    }

}

//-----------------------------------------------------------------***----------------------------------------------------------//

//main function to run the program
async function main() 
{
    console.log(chalk.cyanBright.bold.underline.italic("\n\t WELLCOME TO LEARNING MANAGEMENT SYSTEM \t\n"));
    

    let student_management1 = new student_management()

    //create a while loop to keep program running
    while(true)
        {
         let Lms = await inquirer.prompt
         (
            [
                {
                    name: "choice",
                    type:"list",
                    message:"select an options:",
                    choices:["Add Student", "Enroll Student","Pay Student Fee","Student Status", "Student Balance","Mark Attendance","View Attendance","Exit"]   
                }
            ]
         ) 

            //use switch case for user choice
            switch (Lms.choice)
            {
                case "Add Student":
                    let name = await inquirer.prompt
                    (
                        [
                            {
                                name: "name",
                                type: "input",
                                message: "Enter Student Name:",
                            
                            }
                        ]
                    )
                student_management1.add_student(name.name)
                break;

                case "Enroll Student":
                    let courseEnroll = await inquirer.prompt
                        (
                            [
                                {
                                    name: "id",
                                    type: "number",
                                    message: "Enter a student ID:",
                                },

                                {
                                    name: "course",
                                    type: "list",
                                    message: "Enter a course name to enroll:",
                                    choices: ["IT", "LANGUAGE", "MCAT", "BCAT", "ECAT", "ILETS", "TOWFEL"],
                                }
                            ]
                        )

                student_management1.enroll_student(courseEnroll.id , courseEnroll.course)
                break;

                case "Pay Student Fee":
                    let payment = await inquirer.prompt
                        (
                            [
                                {
                                    name: "id",
                                    type: "number",
                                    message: "Enter a student ID:",
                                },

                                {
                                    name: "amount",
                                    type: "number",
                                    message: "Enter a amount:",
                                    
                                }
                            ]
                        )
                       
                student_management1.student_fee(payment.id , payment.amount)
                break;


                case "Student Balance":
                    let balance = await inquirer.prompt
                        (
                            [
                                {
                                    name: "id",
                                    type: "number",
                                    message: "Enter a student ID:",
                                }
                            ]
                        )

                student_management1.student_balance(balance.id)
                break;


                case "Mark Attendance":
                    let markAttendance = await inquirer.prompt
                        (
                            [
                                {
                                    name: "id",
                                    type: "number",
                                    message: "Enter a student ID:",
                                }
                            ]
                        )       
                student_management1.mark_attendance(markAttendance.id) 
                break;
                
                
                case "View Attendance":
                    let viewAttendance = await inquirer.prompt
                        (
                            [
                                {
                                    name: "id",
                                    type: "number",
                                    message: "Enter a student ID:",
                                }
                            ]
                        )       
                student_management1.view_attendance(viewAttendance.id) 
                break;


                case "Student Status":
                    let status = await inquirer.prompt
                        (
                            [
                                {
                                    name: "id",
                                    type: "number",
                                    message: "Enter a student ID:",  
                                }
                            ]
                        )
                student_management1.student_status(status.id)
                break;



                case "Exit":
                 console.log(chalk.green.bold(" EXIT >>>>  Bye Bye"));
                 process.exit()    
            }
        }
}

//call main function
main()

# Metis
> Metis - Ancient Greek for "skill" or "wisdom" - is an exercise tracker application that you can use to log your workout progress.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Future Updates](#room-for-improvement)

## General Information
Metis is an exercise tracker/logger application. It allows a user to create an account and save their workout history so that it can be referred to later, across multiple devices.

Workouts are collections of exercises, and exercises allow you to track sets, reps, weight and other information. 

For example, a user could define a chest day workout as:
- Bench press: 90kg, 2 sets, 5 reps
- Lateral raises: 10kg, 3 sets, 15 reps
- Incline dumbell bench press: 40kg, 3 sets, 7 reps

I built this application because I wanted a better way to review my previous workouts without using my phone's notes application. 
It was also an opportunity for me to push my skills by using Firebase for the first time.

## Technologies Used
- React 18
- React Bootstrap 5.2
- CSS
- Firebase Authentication
- Firebase Realtime Database

## Features
List the ready features here:
- User authentication: Create an account with a username and password
- Cross-platform data retrieval: Firebase Realtime Database integration allows you to view workouts on multiple devices
- Save workouts and exercises: Flexibility to save workout and exercise details as necessary. Workouts are saved as collections of exercises for easy grouping.

## Future Updates
Include areas you believe need improvement / could be improved. Also add TODOs for future development.

Room for improvement:
- Positioning of the "Add new exercise/workout" pop-ups
- Improvement colour schemes to add contrast on buttons / text

To do:
- Replace current workout input with a datalist populated with popular exercises (e.g. Bench Press) or workouts (e.g. Chest Day). A datalist will allow users to quickly enter a workout/exercise while allowing the flexibility for them to write their own title.
- Add date filter functionality to workouts list
- Allow users to update their profile (e.g. add a display name)
- Add a change / retrieve password option
- Add ability for an exercise to be tagged as a record or personal best. Personal bests will be visible in a separate window.
- Automatically define a workout as "selected" after it is added



## Boilerplate for Movies App Assignment - 10 Movies to Watch Before I Die

The folders and files you see in this repositories, is how it is expected to be in projects, which are submitted for Automated Evaluations

	Project
	|
	├── server 			// All server code should be inside this folder
	|
	├── index.js 			// The main entry point for the project
	|
	├── package.json 		// Automated Evaluation system will invoke npm commands, such as `npm start`, `npm test`, which refer to this file
	|
	├── .hobbes   			// Please do not delete - meant for Automated Evaluation
	|
	├── .eslintrc.js 		// Rules for Javascript lint checks, these are common or generic JS rules, project is evaluated against these rule.
	|
	├── .htmlhintrc 		// Rules for HTML Lint rules, project is evaluated against these rule.
	|
	├── .smellsrc.js 			// ESLint based code smell rules, project is evaluated against these rule.
	|
	└── PROBLEM.md  		// The problem of the assignment/project

	server  // Contains several other folders and files
	├── test			//  You Unit test cases, which are executed using mocha, files should end with or suffix at end with 'test.js', these test cases can run before or in parallel to running of the application/program
	├── index.js 			// Contains the default express code with certain middlewares
	|
	├── bin/www 			// Contains the web server code and becomes the entry point of the server app
	|
	├── public, routes, views // Are standard folders comes with express boilerplate


> PS: All lint rule files are by default copied during the evaluation process, however if need to be customizing, you should copy from this repo and modify in your project repo


#### To use this as a boilerplate for your new project, you can follow these steps

1. Clone the base boilerplate in your local

	`git clone ssh://git@gitlab-wd.stackroute.in:2222/HobbesCadets/movieapp-boilerplate.git` (If you are using the Cloud Based Dev Environment)

2. Remove its remote or original reference

	`git remote rm origin`

3. Add your new repository reference as remote

	`git remote add origin ssh://git@gitlab-wd.stackroute.in:2222/<USERNAME>/<your-new-project-repo.git>`

4. Commit and Push the project to git

	`git commit -a -m "Initial commit | or place your comments according to your need"`

	`git push -u origin master`

5. Check on the git repo online, if the files have been pushed

### Important
> - We expect you to write the assignment on your own by following through the guidelines, learning plan, and the practice exercises
> - The code must not be plagiarised, the mentors will randomly pick the submissions and may ask you to explain the solution
> - The code must be properly indented, code structure maintained as per the boilerplate and properly commented
> - Follow through the problem statement and stories shared with you

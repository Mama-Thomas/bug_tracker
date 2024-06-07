# Bug Tracker Application - CSS475 Final Project

This is a comprehensive bug tracking application built with a Node.js and Express backend and a React and MUI frontend. The application allows users to manage projects, report bugs, assign bugs to users, and track changes through audit logs. The application supports different roles: Admin, Project Manager, Developer, and Tester.


## Introduction:
Team: YMK
Members: Yabisera Azzew Demelie, Kerima M Hussen, Mama Thomas Project: Bug Tracking System

## Business Problem:
Our software development suffers from inefficient bug tracking, leading to missed reports, delayed fixes, and reduced visibility. These issues cause downtime and slow improvement, impacting software quality and customer satisfaction.

## High Level Interface:
We are planning to make our bug tracking system better by using a simple and focused API. This will help us manage bug reports more effectively and keep everyone updated.

- **Bug Submission Endpoint: Users can report new bugs by giving details like how severe the bug is, what type it is, and what went wrong. This helps us figure out which bugs to fix first.

- **Bug Status and Details Endpoint: This lets users see the latest updates and detailed information about bugs. Users can choose to see just the bugs they reported or bugs assigned to them, making it easier to follow what's important to them.

- **Bug Update Endpoint: Users can change the details or status of the bugs they're working on. We'll have a simple alert on the user's dashboard to let them know when there's an update. We'll also keep a complete record (audit log) of all changes.

- **User Management Endpoint: This manages who can do what in the system. Only administrators can add new users or change their roles to things like Admin,Project Manager, Developer, and Tester. Administrators can also safely add or remove users. This helps keep our system secure and ensures that only the right people can make important changes.

## Schema Design:
Link to Lucidcahrt https://lucid.app/lucidchart/3ea45360-d346-443d-9889-941329946833/edit?viewport_loc=-1 43%2C568%2C2466%2C1216%2C0_0&invitationId=inv_ec04d029-32f8-4e44-9b03-b14e5 e17ca9e

![Schema](bug_tracker/images/schema_image.png)

## API Endpoints and Functions

### User API

- **Register User**: `POST /api/users/register`
  - Registers a new user with the system.
  - Requires: `firstname`, `lastname`, `email`, `password`, `roleid`
  
- **Login User**: `POST /api/users/login`
  - Authenticates a user and returns a JWT token.
  - Requires: `email`, `password`
  
- **Get All Users**: `GET /api/users`
  - Retrieves a list of all users.
  
- **Get User By ID**: `GET /api/users/:id`
  - Retrieves a user by their ID.
  
- **Update User**: `PUT /api/users/:id`
  - Updates a user's information.
  - Requires: `firstname`, `lastname`, `email`, `roleid`, `isactive`
  
- **Delete User**: `DELETE /api/users/:id`
  - Deletes a user by their ID.

### Project API

- **Get All Projects**: `GET /api/projects`
  - Retrieves a list of all projects.
  
- **Get Project By ID**: `GET /api/projects/:id`
  - Retrieves a project by its ID.
  
- **Create Project**: `POST /api/projects`
  - Creates a new project.
  - Requires: `name`, `startdate`, `enddate`, `projectmanagerid`, `userids`
  
- **Update Project**: `PUT /api/projects/:id`
  - Updates a project's information.
  - Requires: `name`, `startdate`, `enddate`, `projectmanagerid`, `userids`
  
- **Delete Project**: `DELETE /api/projects/:id`
  - Deletes a project by its ID.

### Bug API

- **Get All Bugs**: `GET /api/bugs`
  - Retrieves a list of all bugs.
  
- **Get Bug By ID**: `GET /api/bugs/:id`
  - Retrieves a bug by its ID.
  
- **Get Bugs By Project ID**: `GET /api/bugs/project/:projectId`
  - Retrieves all bugs associated with a specific project.
  
- **Create Bug**: `POST /api/bugs`
  - Creates a new bug.
  - Requires: `title`, `description`, `projectid`, `statusid`, `severityid`, `assignedto`, `reportedby`
  
- **Update Bug**: `PUT /api/bugs/:id`
  - Updates a bug's information.
  - Requires: `title`, `description`, `projectid`, `statusid`, `severityid`, `assignedto`, `reportedby`
  
- **Delete Bug**: `DELETE /api/bugs/:id`
  - Deletes a bug by its ID.
  
### Handling Bugs for Finished Projects
- Checking if the Project is ended: Before anyone can report a bug, our system checks if the project is still ongoing. We look at the project's end date and make sure it hasn't passed yet. If the project is finished, the project detail's page and project buglist will not show the create/add bug button.  "

### Audit Log API

- **Get All Audit Logs**: `GET /api/auditlogs`
  - Retrieves all audit logs.
  
- **Get Audit Logs By Project ID**: `GET /api/auditlogs/project/:projectId`
  - Retrieves all audit logs for a specific project.
  
- **Get Audit Logs By Bug ID**: `GET /api/auditlogs/bug/:bugId`
  - Retrieves all audit logs for a specific bug.
  
- **Get Audit Logs By User Projects**: `GET /api/auditlogs/user/:userId`
  - Retrieves all audit logs for projects associated with a specific user.

## Development Tools and Environment


### Database Software (DBMS)

- PostgreSQL: We selected PostgreSQL for its robustness and ability to handle complex queries, which is ideal for our bug tracking system.
  
### UI Tools:
- React.js and MUI: We are using React.js for building a dynamic user interface and MUI for implementing our UI components.
### Database Hosting:
- Stored locally.
  
### Additional Tools
- Node.js: Used for backend development to handle our application's data processing efficiently.
- Express.js: Lightweight backend framework used as an application server.
- JWT (jsonwebtoken): Used for handling authentication and securing API endpoints.
- Axios: Used for making HTTP requests from the frontend to the backend.
- Visual Studio Code (VS Code): Chosen for our IDE due to its robust support for JavaScript and React.js.


## How to Run the Project:
1. Clone the the github repository:
   git@github.com:Mama-Thomas/bug_tracker.git
2. Setup Backend:
- Navigate to the backend directory:
    cd bug_tracker_backend
- Install dependencies: npm install
- Create a .env file with the following variables:
    PORT=3000 
    DATABASE_URL=your_postgresql_database_url JWT_SECRET=your_jwt_secret
- Run the backend server: node server.js
3. Setup Frontend:
- Navigate to the frontend directory:
    cd bug_tracker_frontend
- Install dependencies: npm install
    Run the frontend server: npm start
4. Access the Application:
- Open your browser and go to http://localhost:3001 for the frontend.
- Use Postman or any API client to interact with the backend API at
http://localhost:3000/api.


![image] (bug_tracker/images/img1.png)

![image] (bug_tracker/images/img2.png)

![image] (bug_tracker/images/img3.png)

![image] (bug_tracker/images/img4.png)

![image] (bug_tracker/images/img5.png)

![image] (bug_tracker/images/img6.png)

![image] (bug_tracker/images/img7.png)

![image] (bug_tracker/images/img8.png)

![image] (bug_tracker/images/img9.png)


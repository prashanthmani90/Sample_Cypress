# cypress-exercise
Automated Testing exercise solutions

# How to run the automation

download the project

npm install

To open a Cypress UI, Choose the e2e testing, choose a browser and run the specs file to execute the test

npm run cypress:open or npx cypress open

To run the test on terminal and get reports

npm run cypress:run or npx cypress run

# Setup Project

npm init

npm install cypress -D

npm install mysql -D

# Requirement


There are three testing automated as per the requirement.

1. GOOGLE SEARCH

Visit Google
Search for Taylor & Francis
Check if any of the result on page 1 containes given urls
a) taylorandfrancis.com
b) tandfonline.com
c) routledge.com

![Alt text](/assests/google_report.png "Google Report")

2. SQL TESTING

Given Schema.sql
Autoamte to query the given schema to find the given results.

![Alt text](/assests/sql_test_report.png "SQL Testing Report")

Drop/Create Table
Insert the data
Execute the query to get the desired result and check the expected results.

![Alt text](/assests/db_fiddle_sql_query.png "DB Fiddle - Query")

3. API TESTING

For the Given URL

Find the top 10 Music Genre
Check if the results contain acoustic blues

Find the artist Madonna
Check the life-span begin date is 25th June 1958

Carried out three different test automation to fullfil the requirement.


![Alt text](/assests/api_test_report.png "API Testing Report")






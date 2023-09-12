# ሰራተኛ API ምሳሌ With AWS RDS/Mock Employee API With AWS RDS

ይህ ፕሮጀክት ምሳሌ ለሰራተኞች ዳታቤዝ የሚያስተዳድር በጣም ቀላል የሆነ API አገልጋይ ይዟል።

ይህ ቀላል የAPI አገልጋይ ምሳሌ ለዩቲዩብ ቻናል, [EthioSilverApps](https://www.youtube.com/@ethiosilverapps), ለAWS RDS database መሳሪያ ሆኖ እንዲያገለግል የታሰበ ነው።

This project contains a very simple API Server that will connect to SQL database to get some data from RDS database. 

This API Server example is intended to be used as an instrument for AWS RDS tutorial on Youtube channel [EthioSilverApps](https://www.youtube.com/@ethiosilverapps).

## ቅድመ-ሁኔታዎች/Prerequisites

- ጫን/Install [Node.js](https://nodejs.org/en/download/) (Note: If you want to deploy to EC2, you can use the [starter script](#running-the-server-on-ec2) to install Node.js and run the server)

## ድህረገፅ መጀመር/Running the Server Locally

- የሚከተለውን ትዕዛዝ ይተይቡ/Run the following command `npm install`
- የሚከተለውን ትዕዛዝ ይተይቡ/Run the following command `node app.js`
- ከዚያም ይህንን መልእክት ታያለህ/Then, you should see `Node Server Listening on port 8080` log.

## Running the server on EC2

- Run the server starter script `./start_server.sh` (You can pass `-s` flag to skip installing npm package)

## Available API Endpoints

- `GET: /employees` :- ሁሉንም የሰራተኞች መረጃ ሰርስሮ ያወጣል / Retrieves all employee data.
- `GET: /get-all-person` :- Retrieves all users in the person table. 
- `POST: /person` (with JSON body {firstName, lastName, email}) :- ሰራተኛ ይጨምራል / Adds user to person table.
- `DELETE: /person?id={person-id}` :- የሰራተኛ ID ከተሰጠው በኋላ የሰራተኛውን መረጃ ያስወግደዋል። / Given the person id, it will delete that person's data.
- `GET: /server-info` :- It returns the EC2's Availability Zone it is running in and the EC2's instance-Id. (Note: Make sure you start your server with `./start_server.sh` to make this endpoint work.)
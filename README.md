# Collectively.Web

|Branch             |Build status                                                  
|-------------------|-----------------------------------------------------
|master             |[![master branch build status](https://api.travis-ci.org/noordwind/Collectively.Web.svg?branch=master)](https://travis-ci.org/noordwind/Collectively.Web)
|develop            |[![develop branch build status](https://api.travis-ci.org/noordwind/Collectively.Web.svg?branch=develop)](https://travis-ci.org/noordwind/Collectively.Web/branches)

**Let's go for the better, Collectively​​.**
----------------

**Collectively** is an open platform to enhance communication between counties and its residents​. It's made as a fully open source & cross-platform solution by [Noordwind](https://noordwind.com).

Find out more at [becollective.ly](http://becollective.ly)

**Collectively.Web**
----------------

The **Collectively.Web** is a responsive web application which allows to make full use of the features available within the Collectively system:
- Sign up and sign in (via email or Facebook).
- Reset or change password, edit account.
- Browse remarks on map or list.
- Filter remarks.
- Submit new remarks.
- Resolve or delete existing remarks.
- Dynamically update the content via WebSockets and server side notifications.

**Quick start**
----------------

Collectively is built as a set of microservices, therefore the easiest way is to run the whole system using the *docker-compose*.

Clone the [Collectively.Docker](https://github.com/noordwind/Collectively.Docker) repository and run the *start.sh* script:

```
git clone https://github.com/noordwind/Collectively.Docker
./start.sh
```

For the list of available services and their endpoints [click here](https://github.com/noordwind/Collectively).

## Classic way

In order to run the **Collectively.Web** you need to have installed:
- [Node.js](https://nodejs.org)

Clone the repository and run the *start.sh* script:

```
git clone https://github.com/noordwind/Collectively.Web
cd Collectively.Web
npm install
./start.sh
```

Once executed, you shall be able to access the web application at [http://localhost:9000](http://localhost:9000)

Please note that the following solution will only run the Web application which will not work properly unless the whole Collectively system will be up and running.

**Configuration**
----------------

Please edit the specific *[environment].json* file that can be found under the *aurelia_project* directory to use the custom application settings. To configure the docker environment update the *dockerfile* - if you would like to change the exposed port, you need to also update it's value that can be found within *start.sh*.
For the local testing purposes the *.local* or *.docker* configuration files are being used (for both *[environment].json* and *dockerfile*), so feel free to create or edit them.

**Tech stack**
----------------
- **[Aurelia](http://aurelia.io)** - an open source & cross-platform framework for building web applications using JavaScript language.
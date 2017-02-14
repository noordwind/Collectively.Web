# Coolector.Web

|Branch             |Build status                                                  
|-------------------|-----------------------------------------------------
|master             |[![master branch build status](https://api.travis-ci.org/noordwind/Coolector.Web.svg?branch=master)](https://travis-ci.org/noordwind/Coolector.Web)
|develop            |[![develop branch build status](https://api.travis-ci.org/noordwind/Coolector.Web.svg?branch=develop)](https://travis-ci.org/noordwind/Coolector.Web/branches)

####**Keep your commune clean in just a few clicks.**

**What is Coolector?**
----------------

Have you ever felt unhappy or even angry about the litter left on the streets or in the woods? Or the damaged things that should've been fixed a long time ago, yet the city council might not even be aware of them?

**Coolector** is an open source & cross-platform solution that provides applications and a services made for all of the inhabitants to make them even more aware about keeping the community clean. 
Within a few clicks you can greatly improve the overall tidiness of the place where you live in. 

**Coolector** may help you not only to quickly submit a new remark about the pollution or broken stuff, but also to browse the already sent remarks and help to clean them up if you feel up to the task of keeping your neighborhood a clean place.

**Coolector.Web**
----------------

The **Coolector.Web** is a responsive web application which allows to make full use of the features available within the Coolector system:
- Sign up and sign in (via email or Facebook).
- Reset or change password, edit account.
- Browse remarks on map or list.
- Filter remarks.
- Submit new remarks.
- Resolve or delete existing remarks.
- Dynamically update the content via WebSockets and server side notifications.

**Quick start**
----------------

Coolector is built as a set of microservices, therefore the easiest way is to run the whole system using the *docker-compose*.

Clone the [Coolector.Docker](https://github.com/noordwind/Coolector.Docker) repository and run the *start.sh* script:

```
git clone https://github.com/noordwind/Coolector.Docker
./start.sh
```

Once executed, you shall be able to access the following services:

|Name               |URL                                                  |Repository 
|-------------------|-----------------------------------------------------|-----------------------------------------------------------------------------------------------
|API                |[http://localhost:5000](http://localhost:5000)       |[Coolector.Api](https://github.com/noordwind/Coolector.Api) 
|Mailing            |[http://localhost:10005](http://localhost:10005)     |[Coolector.Services.Mailing](https://github.com/noordwind/Coolector.Services.Mailing)
|Medium             |[http://localhost:11100](http://localhost:11100)     |[Coolector.Services.Medium](https://github.com/noordwind/Coolector.Services.Medium) 
|Operations         |[http://localhost:10000](http://localhost:10000)     |[Coolector.Services.Operations](https://github.com/noordwind/Coolector.Services.Operations)
|Remark             |[http://localhost:10002](http://localhost:10002)     |[Coolector.Services.Remarks](https://github.com/noordwind/Coolector.Services.Remarks)
|SignalR            |[http://localhost:15000](http://localhost:15000)     |[Coolector.Services.SignalR](https://github.com/noordwind/Coolector.Services.SignalR) 
|Statistics         |[http://localhost:10006](http://localhost:10006)     |[Coolector.Services.Statistics](https://github.com/noordwind/Coolector.Services.Statistics)
|Storage            |[http://localhost:10000](http://localhost:10000)     |[Coolector.Services.Storage](https://github.com/noordwind/Coolector.Services.Storage)
|Supervisor         |[http://localhost:11000](http://localhost:11000)     |[Coolector.Services.Supervisor](https://github.com/noordwind/Coolector.Services.Supervisor)
|Users              |[http://localhost:10001](http://localhost:10001)     |[Coolector.Services.Users](https://github.com/noordwind/Coolector.Services.Users)
|**Web**            |**[http://localhost:9000](http://localhost:9000)**   |**[Coolector.Web](https://github.com/noordwind/Coolector.Web)** 

## Classic way

In order to run the **Coolector.Web** you need to have installed:
- [Node.js](https://nodejs.org)

Clone the repository and run the *start.sh* script:

```
git clone https://github.com/noordwind/Coolector.Web
cd Coolector.Web
npm install
./start.sh
```

Now you should be able to access the web application under the [http://localhost:9000](http://localhost:9000). 

Please note that the following solution will only run the Web application which will not work properly unless the whole Coolector system will be up and running.

**Configuration**
----------------

Please edit the specific *[environment].json* file that can be found under the *aurelia_project* directory to use the custom application settings. To configure the docker environment update the *dockerfile* - if you would like to change the exposed port, you need to also update it's value that can be found within *start.sh*.
For the local testing purposes the *.local* or *.docker* configuration files are being used (for both *[environment].json* and *dockerfile*), so feel free to create or edit them.

**Tech stack**
----------------
- **[Aurelia](http://aurelia.io)** - an open source & cross-platform framework for building web applications using JavaScript language.
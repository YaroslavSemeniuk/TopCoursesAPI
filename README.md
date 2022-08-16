<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Created backend application for the educational platform.  
The site allows you to publish and search for courses on various topics, taking into account reviews, ratings, etc.

Used technologies:
* TypeScript
* Nest.js Framework
* MongoDB
* Typegoose
* Clinic.js
* Autocannon

## Installation

```bash
$ n̶p̶m̶ ̶i̶n̶s̶t̶a̶l̶l̶
$ npm i --legacy-peer-deps (have problem with dependencies)
$ docker build -t top-api . (build image after Dockerfile creation)
```

## Running the app

```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
# e2e tests
$ npm run test:e2e
# test coverage
$ npm run test:cov
```

## Architecture

Splitting application into modules:  
![Splitting application into modules](images/readme/architecture.png)  


DTO (Data Transfer Objects) - classes for describe "body" data, which be transmitted in our methods

## Controllers

Controller input:  
![Controller input](images/readme/controller_input.png)
URL decoding:  
![URL decoding](images/readme/url_decoding.png)

**Argument decorators**  
![Argument decorators](images/readme/argument_decorators.png)
**Parsing decorators**  
![Parsing decorators](images/readme/parsing_decorators.png)
**Additional capabilities in controllers**  
![Additional capabilities in controllers](images/readme/additional_capabilities.png)
![Additional capabilities in controllers #2](images/readme/additional_capabilities2.png)
Warning! @Res() - this is 'express' response type (not 'Node' type):
![Res Import](images/readme/res.png)

## Providers

This is a class, or a factory, that allows you to use the nested model for dependency injection and embed into each other (in controllers, services and perform certain functions or share common data)
![Providers schema](images/readme/providers_schema.png)

**Simple service** - which inject providers (other classes)  
`@Injectable` - indicates that it can be used as a provider and participate in the dependency tree
![Simple service](images/readme/simple_service.png)
![Simple service](images/readme/simple_use_case.png)  
  
**Provider types**  
![Provider types](images/readme/provider_types.png)  
  
**useClass** - use class as provider  
![useClass](images/readme/useClass.png)  
**useFactory** - use factory (class that instantiates an object with some data)  
![useFactory](images/readme/useFactory.png)
**useValue** - inject value which we want to use in other classes  
![useValue](images/readme/useValue.png)
![useValue without class](images/readme/useValueWithoutClass.png)
**useExisting** - rename an existing provider with a different alias  
![useExisting](images/readme/useExisting.png)

## Execution scopes
![Scope Types](images/readme/scopeTypes.png)

_Example:_ `@Injectable({ scope: Scope.REQUEST })`  
**DEFAULT** **_(Singleton)_** - 1 provider(service) instance for all app  
**REQUEST** - for every request create new service instance  
**TRANSIENT** - each service that inject this provider take new provider instance

## Types of tests

![Scope Types](images/readme/testsTypes.png)

**e2e Tests** - are targeted directly to the API & can also be done through the browser (from Frontend)
![Scope Types](images/readme/e2eTools.png)
**Unit Test**
![Example of generating a class with tests for a service](images/readme/genClassForTestingService.png)
Example of generating a class with tests for a service.

**beforeEach** - will be executed before each test run (before each "it")  
**beforeAll** - will be executed before all tests   
**afterEach** - will be executed after each "it"  
**afterAll** - will be executed after all tests  

## Exception filters & Pipes
Schema:
![Exception filters & Pipes](images/readme/exceptionsPipes.png)

**Pipes**
![Built-in pipes](images/readme/built-inPipes.png)  
**Pipes** - allows to validate or modify incoming data between request on API and receiving on our route. Nest already has some built-in pipes for data validation or conversion.  

![Validation Pipe](images/readme/validationPipe.png)  
**ValidationPipe** - (built in NestJS) internally uses the class-validator & class-transformer libraries. That allows you to convert an object into a class and then validate the properties of this class.  

![Custom Pipe](images/readme/customPipe.png)  
Example of **creating custom pipe**.  

**Exceptions**  
![Exceptions](images/readme/exceptions.png)  

**Exceptions Filter** - allows to make changes between throwing an exception and returning it to the front in the form of json.  
![Exceptions Filter](images/readme/exceptionsFilter.png)  
For use it, need to set the @useFilters decorator in the rout. After this, all errors that will occur in this route will fall into our exception filter.  

## Nest CLI

`nest g module <name>` - generate module (optional `--no-spec`)  
`nest g class <folder>/<name>.model` - generate model (use classes as models we can hang different decorators on classes (for validation, DB, create extend classes)) (optional `--no-spec`)  
`nest g controller <name>` - generate controller by path <name>/<name>.controller (optional `--no-spec`)  
`nest g service <name>` - generate service 

` npm run test:e2e` - run e2e tests  
` npm run test` - run unit tests  

## Autocannon <a href="https://www.npmjs.com/package/autocannon?ref=hackernoon.com" target="blank"><img src="https://react-etc.net/files/2017-12/autocannon-logo.png" width="30" alt="Autocannon Logo" /></a>  

`npm i autocannon`  

Used for load testing, by sending a batch of requests to the specified route.

`autocannon http://localhost:3000/api/review/byProduct/603c9d5ffa373014e6cd3ed2` - will test the speed of processing requests on a specific route (our app must first be launched)  


## Clinic.js Utilities <a href="https://clinicjs.org/" target="blank"><img src="https://clinicjs.org/assets/images/clinic-social-media-image.png" width="50" alt="Clinic.js Logo" /></a>

`npm i clinic`  

**Clinic.js Doctor** - shows basic memory, event loop, cpu, event handler problems.  
For using:
1. Build project (create dist/main.js)  

`npm run build`  

3. Make sure the database is running  
4. Run Clinic.js Doctor will analyze the load that it will create when sending requests using autocannon and build graphs based on this in folder _.clinic_. It independently raises the application instance.  

`clinic doctor --on-port 'autocannon localhost:$PORT/api/review/byProduct/603c9d5ffa373014e6cd3ed2' -- node dist/main.js`

**Clinic.js Bubbleprof** - shows in detail how the data moves, functions are called (used when detailed application analytics is needed)  
**Clinic.js Flame** - build a graph showing the generated load by individual application modules  

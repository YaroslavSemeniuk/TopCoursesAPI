<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Udemy course about NestJS

## Installation

```bash
$ n̶p̶m̶ ̶i̶n̶s̶t̶a̶l̶l̶
$ npm i --legacy-peer-deps (have problem with dependencies)
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

## Nest CLI

`nest g module <name>` - generate module (optional `--no-spec`)  
`nest g class <folder>/<name>.model` - generate model (use classes as models we can hang different decorators on classes (for validation, DB, create extend classes)) (optional `--no-spec`)  
`nest g controller <name>` - generate controller by path <name>/<name>.controller (optional `--no-spec`)  
`nest g service <name>` - generate service 

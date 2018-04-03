# pgh-spa

This repository contains styling & scaffolding for a react app that is served to the client from an asp.net core application.  Prior to spinning up react, user is passed through the same auth workflow found in [pgh-mvc](https://github.com/CityofPittsburgh/pgh-mvc).

All further communication with the server occurs through rest endpoints defined in the controller classes.

## Installation

### prereq

1. [.net sdk](https://www.microsoft.com/net/learn/get-started/) 
2. [client ID & secret for authentication](https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1518569020&rver=6.7.6643.0&wp=SAPI_LONG&wreply=https%3a%2f%2fapps.dev.microsoft.com%2fLoginPostBack%3fru%3dhttps%253a%252f%252fapps.dev.microsoft.com%252f&lc=1033&id=293053&aadredir=1)
 
### new project

1. Clone this repository in some place `~/nice`
2. Create new directory
3. Install `~/nice` as template
```bash
dotnet new -i ~/nice
```
4. Create pghspa project
```bash
dotnet new pghspa --name <if different than name of directory>
```
5. Restore dependencies
```bash
dotnet restore
```
6. Set environment variables
```bash
dotnet user-secrets set MSClientID <enter here>
dotnet user-secrets set MSCliendSecret <enter here>
```
7. Change site title & nav header in ` __Layout.cshtml ` & ` NavMenu.tsx ` 
```html
<title>pgh-SPA</title>
 ...
<Link className='navbar-brand' to={ '/' } data-toggle="collapse" data-target=".in">pgh <strong>SPA</strong></Link>

```
8. Build & run
# IP-help
# IP-help

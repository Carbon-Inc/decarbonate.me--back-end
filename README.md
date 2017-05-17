# decarbonate.me
This is the back-end repo for the app decarbonate.me app.

The decarbonate.me API is used for retrieving and storing carbon offset information for an individual Eventbrite user's events.

## Getting Started

This API uses the Eventbrite API for gathering event data, and therefore uses OAuth for communicating with Eventbrite. The API requires a user's access code returned from OAuth login.
<Additional info on how to pass User Access Code>

### API Architecture

<diagram of all the moving parts>

### Methods and Routes
- ```/api/???```
- ```/api/???```
- ```GET /api/event```
- ```GET /api/event/:id```
- ```PUT /api/event/:id```


### Example JSON

Event
```
{ “eventId”: “123456789”,
  “userId”: “123458932”,
	“name”: “exName”,
	“start”: “exStartDate”,
	“end”: “exEndDate”,
	“description”: “exDescription”,
	“eventAddress”:{ "1234 1st Ave, Seattle, WA 98111"},
	"img": "https://img.evbuc.com/123104u2035u20",
	"category": "exCategory",
	"carbon": "exTonnesVal",
	"carbonPrice": "exPrice"
	"paid": boolean,
	"transport": "exTransport"}
```


## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Brianna Burrows** -[brisourceful](https://github.com/brisourceful)
* **Cameron Bacon** -[cameronmbacon](https://github.com/cameronmbacon)
* **Scott Brenden** -[scottbrenden](https://github.com/scottbrenden)
* **Steven Johnson** -[stevenjohnson86](https://github.com/stevenjohnson86)

See also the full list of [developers](https://github.com/Carbon-Inc/people) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

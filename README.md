# Decarbonate.me

[![Build Status](https://travis-ci.org/Carbon-Inc/decarbonate.me--back-end.svg?branch=master)](https://travis-ci.org/Carbon-Inc/decarbonate.me--back-end) [![Coverage Status](https://coveralls.io/repos/github/Carbon-Inc/decarbonate.me--back-end/badge.svg?branch=staging)](https://coveralls.io/github/Carbon-Inc/decarbonate.me--back-end?branch=staging)
### Overveiw

This is a RESTful API that provides the back-end functionality to create, read, update and delete data related to the users carbon offsets for their Eventbrite events.

At the moment there is no easy way someone to pay for a carbon offset for their trip to an event. Decarbonate.me allows a user to sign in through their eventbrite account. Then by entering a starting point and mode of transportation the user will be presented with an estimated carbon footprint and ability to purchase an offset for that footprint.
The user is also given the oppertunity purchase a carbon offset for that trip.


### Carbon offesting

Every time you travel to anywhere using a car, bus or plane you create harmful emissions in the form of CO~2~ (There are other modes of transportation that also create a carbon footprint but those are out of the scope of the current version of this API). In an ideal world we would not need to rely on fossil fuels, but in many cases they are unaviodable for the average person trying to get from point A to point B. That is where carbon offseing comes in.

A **carbon offset** can come in many forms. It can be planting trees that convert CO~2~ into oxygen, putting in solar pannels to provide sustainable energy,and so on. However these all require funding that can be hard to get on the scale needed to make a substantial differance. So by purchasing a carbon offset you help fund a third party aimed at creating a sustainable world.

There are hundereds of projects working toward a more sustainable world, each requires differnt amount of funding to offset a ton of CO~2~. The initial version will use a static value of $4.99 per ton.

### Current Version (0.8.0)

- User can log in through an Eventbrite account  (Eventbrite account is required to get passed the sign in. This uses Oauth to signin through a third party verification).
- The users events are fetched from Eventbrite and populated into the users event database.
- The user selects a single event.
- The provides a start point and mode of transportation (Automobile, Bus, or Flight) for the selected event.
- Using the start point provided by the user and the destination provided by Eventbrite the deistance is determined
- The distance, start time of the event and user provided mode of transportation are used to call the Brighter Planet footprint calculator.
- Price of an the carbon offset for that trip calculated using a flat $4.99 per ton.

### Future Functionality

- App sends updates for upcoming events that have not been offset.
- Ability for an event organizer to see how many people have offset their trip.
- More modes of transportation.
- More specific modes of transportation (ex: Car || diesel, hybrid, electric, ect.).
- Optional ability for a user to select an offset project to pay for.
- Allow event organizers to pay for offsets

### Architecture

This API uses the Model View Controller (MVC) architecture pattern. It is built using Node.js with express routing middleware, and a mongo database for data presistance.

### Data Schemas

### Routes
##### POST /decarbonate/events
User sign in through use of Oauth Eventbrite token. Then events are retrieved from Eventbrite account using Eventbrite token stored in .env file. Ex:
```
EB_ACCESS_TOKEN='token goes here'
```
Each event is then used to produce a new event Schema with only the properties we need. Example event:
```
{
  eventId: '12345678901',
  userId: '41994236240',
  name: 'Example Event Name',
  start: '2017-05-17T21:01:39Z',
  end: '2017-05-17T21:05:10Z',
  description: 'This is a test event description. It will likely be a few sentances in length.',
  eventAddress: '1233 Example place, Seattle, WA 98111',
  originAddress: '1234 1st Ave, Seattle, WA 98111',
  img: 'https://img.evbuc.com/1234imgaddresshere',
  category: 'Music',
  carbon: null,
  carbonPrice: null,
  paid: false,
  transport: null,
};
```

##### GET /decarbonate/events
Used to get all the event generated event schemas from mongo storage.
##### POST /decarbonate/footprint/automobile
Used to call to Brighter Planet API to get the carbon footprint in kg given a distance(km) and event start date for an automobile.
Example output for 100km on November 17th 2017:
```
30.167784708327414
```
##### POST /decarbonate/footprint/bus
Used to call to Brighter Planet API to get the carbon footprint in kg given a distance(km) and event start date for a bus.
Example output for 100km on November 17th 2017:
```
14.36814128473358
```
##### POST /decarbonate/footprint/plane
Used to call to Brighter Planet API to get the carbon footprint in kg given a distance(km) and event start date for a flight.
Example output for 100km on November 17th 2017:
```
1081.5518293028124
```

### Testing
Testing framework Mocha using Chai http plugin.
Continuous integration with Travis-CI through .travis.yml file.
Running through Coveralls for app test coverage.


### Deployment

Add additional notes about how to deploy this on a live system

### Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

### Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

### Authors

* **Brianna Burrows** -[brisourceful](https://github.com/brisourceful)
* **Cameron Bacon** -[cameronmbacon](https://github.com/cameronmbacon)
* **Scott Brenden** -[scottbrenden](https://github.com/scottbrenden)
* **Steven Johnson** -[stevenjohnson86](https://github.com/stevenjohnson86)

See also the full list of [developers](https://github.com/Carbon-Inc/people) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

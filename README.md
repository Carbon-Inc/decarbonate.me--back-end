# Decarbonate.me

[![Build Status](https://travis-ci.org/Carbon-Inc/decarbonate.me--back-end.svg?branch=master)](https://travis-ci.org/Carbon-Inc/decarbonate.me--back-end) [![Coverage Status](https://coveralls.io/repos/github/Carbon-Inc/decarbonate.me--back-end/badge.svg?branch=staging)](https://coveralls.io/github/Carbon-Inc/decarbonate.me--back-end?branch=staging)

### Overview

This is a RESTful API that provides the back-end functionality to create and read data relating to the users carbon offsets based on their Eventbrite events.

At the moment there is no convenient app for consumers to pay for carbon offsets for their travel to an event. Decarbonate.me allows a user to sign in through their Eventbrite account. By entering a starting point and method of transportation the user will be presented with an estimated carbon footprint and the ability to purchase an offset for that commute's trip.


### Carbon Offsetting

Every time you travel using a car, bus, or plane you create harmful emissions in the form of CO~2~ (There are other modes of transportation that also create a carbon footprint but those are out of the scope of the current version of this API). In an ideal world we would not need to rely on fossil fuels, but in many cases this is unavoidable for the average person trying to get from point A to point B. That is where carbon offsetting comes in.

A **carbon offset** is a reduction in emissions of carbon dioxide or greenhouse gases made in order to compensate for, or to offset, an emission made elsewhere. A carbon offset can be planting trees that convert CO~2~ into oxygen, installing solar panels to provide sustainable and clean energy, reducing methane gases from animal waste on farms, and many more.  However, these all require funding that can be hard to get on the scale needed to make a substantial difference. By purchasing a carbon offset, you help fund a third party aimed at creating a sustainable world and help reduce your carbon footprint.

There are hundreds of projects working toward a more sustainable world, each requiring different amounts of funding to offset a ton of CO~2~. The initial version will use a static value of $4.99 per ton.

### Current Version (0.8.0)

- User can log in through an Eventbrite account  (Eventbrite account is required to get passed the sign in. This uses OAuth2 to sign-in).
- The users events are fetched from Eventbrite and populated into the user and event schema.
- The user selects a single event.
- The user provides a starting point and mode of transportation (Automobile, Bus, or Flight) for the selected event.
- Using the starting point provided by the user and the destination provided by Eventbrite the distance is calculated.
- The distance and mode of transportation are used to request the Brighter Planet API's footprint calculator.
- Price of a carbon offset for that trip is calculated using a flat rate of $4.99 per ton.
  - For example: the user travels 5 miles via automobile and emits 3 tons of CO2 which costs $14.97 to offset.

### Future Functionality

- App sends updates for upcoming events that have not been offset.
- Ability for an event organizer to see how many people have offset their trip.
- More modes of transportation.
- More specific types of transportation (ex: Car || diesel, hybrid, electric, ect.).
- Optional ability for a user to select an offset project to pay for.
- Allow event organizers to pay for offsets

### Architecture

This API uses the Model View Controller (MVC) architecture pattern. It is built using Node.js with Express routing middleware, and a MongoDB database for data persistence.

### Data Schemas

### Routes
##### POST /decarbonate/events
User signs-in through use of OAuth2 to receive an Eventbrite token. Then events are retrieved from the user's Eventbrite account using the Eventbrite token.

Each event is then used to produce a new event Schema with only the properties we need. Example event:
```
{
  eventId: '12345678901',
  userId: '41994236240',
  name: 'Example Event Name',
  start: '2017-05-17T21:01:39Z',
  end: '2017-05-17T21:05:10Z',
  description: 'This is a test event description. It will likely be a few sentences in length.',
  eventAddress: '1233 2nd Ave, Seattle, WA 98111',
  originAddress: '1234 1st Ave, Seattle, WA 98111',
  img: 'https://img.evbuc.com/1234imgaddresshere',
  category: 'Music',
  carbon: null,
  carbonPrice: null,
  paid: false,
};
```

##### GET /decarbonate/events
Used to get all the events in the event schemas from MongoDB.

##### GET /decarbonate/footprint/automobile/:startDate/:distance
Used to call the Brighter Planet API to get the carbon footprint in kg given a distance(km) and event start date(YYYY-MM-DD) for an automobile.
Example output for 100km on November 17th 2017:
```
{
  footprint: 66.51 //(lbs)
  price: 0.33 //($)
}
```
##### GET /decarbonate/footprint/bus/:startDate/:distance
Used to call the Brighter Planet API to get the carbon footprint in kg given a distance(km) and event start date(YYYY-MM-DD) for a bus.
Example output for 100km on November 17th 2017:
```
{
  footprint: 31.68 //(lbs)
  price: 0.16 //($)
}
```
##### GET /decarbonate/footprint/plane/:startDate/:distance
Used to call the Brighter Planet API to get the carbon footprint in kg given a distance(km) and event start date(YYYY-MM-DD) for a flight.
Example output for 1000km on November 17th 2017:
```
{
  footprint: 2384.41 //(lbs)
  price: 11.91 //($)
}
```

### Testing
Testing framework is Mocha using Chai HTTP plugin.
Continuous integration with Travis-CI through .travis.yml file.
Running through Coveralls for app test coverage.


### Deployment

Add additional notes about how to deploy this on a live system

### Built With

* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)



### Authors

* **Brianna Burrows** -[brisourceful](https://github.com/brisourceful)
* **Cameron Bacon** -[cameronmbacon](https://github.com/cameronmbacon)
* **Scott Brenden** -[scottbrenden](https://github.com/scottbrenden)
* **Steven Johnson** -[stevenjohnson86](https://github.com/stevenjohnson86)

See also the full list of [developers](https://github.com/Carbon-Inc/people) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

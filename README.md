# Flarum-osm

![License](https://img.shields.io/badge/license-GPL-3.0-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/jeromegillard/flarum-osm.svg)](https://packagist.org/packages/jeromegillard/flarum-osm) [![Total Downloads](https://img.shields.io/packagist/dt/jeromegillard/flarum-osm.svg)](https://packagist.org/packages/jeromegillard/flarum-osm)

A [Flarum](http://flarum.org) extension. OpenStreetMap in flarum.

## Installation

Install with composer:

```sh
composer require jeromegillard/flarum-osm:"*"
```

## Updating

```sh
composer update jeromegillard/flarum-osm:"*"
php flarum migrate
php flarum cache:clear
```

## Development

I've prepared a all-in-one `docker-compose` file to get up and running to develop this Flarum extension easily.

### Prepare the environment
1. create the `flarum-dev.env.local` file. There's an example just nearby.
1. Spin the containers: `docker-compose up -d`
1. Enter the container: `docker exec -it -w /flarum/app flarum-dev /bin/sh`
1. Allow local packages sources: `composer config repositories.0 path "packages/*"`
1. Install the extension: `composer require jeromegillard/flarum-osm *@dev`

## Links

- [Packagist](https://packagist.org/packages/jeromegillard/flarum-osm)
- [GitHub](https://github.com/jeromegillard/flarum-osm)
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)

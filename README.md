# OSM

![License](https://img.shields.io/badge/license-GPL-3.0-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/jeromegillard/osm.svg)](https://packagist.org/packages/jeromegillard/osm) [![Total Downloads](https://img.shields.io/packagist/dt/jeromegillard/osm.svg)](https://packagist.org/packages/jeromegillard/osm)

A [Flarum](http://flarum.org) extension. OpenStreetMap in flarum.

## Installation

Install with composer:

```sh
composer require jeromegillard/osm:"*"
```

Configure FoF/Uploads to add the new GPX Template for `^application\/.*(gpx|xml)` files.

## Updating

```sh
composer update jeromegillard/osm:"*"
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
1. Install the extension: `composer require jeromegillard/osm *@dev`
1. Wait for the container to start. It might be long stuck on last log "[INFO] Setting folder permissions", just wait.
1. You can browse to `http://localhost` when logs shows "[INFO] End of startup script. Forum is starting."
1. To rebuild the front-end, outside the container, go to the `js` folder and do `npm install` then `npm run dev` (you'll need npm installed on your computer). 

## Links

- [Packagist](https://packagist.org/packages/jeromegillard/osm)
- [GitHub](https://github.com/jeromegillard/osm)
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)

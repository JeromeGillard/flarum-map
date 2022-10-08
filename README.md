# Flarum Map extension

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/FriendsOfFlarum/upload/blob/master/LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/jeromegillard/map.svg)](https://packagist.org/packages/jeromegillard/map) [![Total Downloads](https://img.shields.io/packagist/dt/jeromegillard/map.svg)](https://packagist.org/packages/jeromegillard/map)

A [Flarum](http://flarum.org) extension.  
Display a map in flarum in those ways:
 - insert a BBCode in a post
 - upload a `.gpx` file to display it on a map and a download link
 - upload a `GeoJSON` file (`.geojson` of `.json`) display it on a map and a download link

 ![Snaphost](assets/readme-snapshot.png)  
The post above was written like this:  
 ![Post icon](assets/readme-post-icon.png)

## Installation

### Composer
Install with composer:

```sh
composer require jeromegillard/map:"*"
```

### Configure extensions
1. Enable the `FoF Uploads` extension.
2. Enable the `Map` extension.
3. Configure `FoF Uploads` to add the new GPX Template: 
  - Add `^application\/.*(gpx|json|xml|geojson|geo.json)` mime type upload adapter mapping.
  - Select `Map` as template.  
![Setup FoF Upload MIME type](assets/readme-fof-upload-mime.png)  
4. Then add `gpx,json,geojson` extensions to this list:  
![Setup FoF Upload MIME type](assets/readme-fof-upload-extensions.png)  
5. Configure the `Map` extension (optional).


:warning: Don't forget to save your changes!

## Updating

```sh
composer update jeromegillard/map:"*"
php flarum migrate
php flarum cache:clear
```

## GeoJSON

FeatureCollection can be displayed.

As an example, to generate the GeoJSON file `assets/GeoJSON.example.json` to get a view of all trails of the [Amblève Trail Center](https://endurovtt.be), follow those steps:
```
# Go to https://overpass-turbo.eu/
# Input that query:
[out:json][timeout:25];
(
  relation(13959062);>>;
)->.a;
rel.a;
out body;
>;
out skel qt;

# Click export, as GeoJSON
```

## Development

I've prepared a all-in-one `docker-compose` file to get up and running to develop this Flarum extension easily.

### Prepare the environment
1. create the `flarum-dev.env.local` file. There's an example just nearby.
1. Spin the containers: `docker-compose up -d`
1. Enter the container: `docker exec -it -w /flarum/app flarum-dev /bin/sh`
1. Allow local packages sources: `composer config repositories.0 path "packages/*"`
1. Install the extension: `composer require jeromegillard/map *@dev`
1. Wait for the container to start. It might be long stuck on last log "[INFO] Setting folder permissions", just wait.
1. You can browse to `http://localhost` when logs shows "[INFO] End of startup script. Forum is starting."
1. To rebuild the front-end, outside the container, go to the `js` folder and do `npm install` then `npm run dev` (you'll need npm installed on your computer). 

## Links

- [Packagist](https://packagist.org/packages/jeromegillard/map)
- [GitHub](https://github.com/JeromeGillard/flarum-map)
- [Discuss](https://discuss.flarum.org/d/31732-map-extension-display-a-map-a-gpx-or-a-geojson-file-in-a-post)

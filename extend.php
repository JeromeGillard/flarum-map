<?php

/*
 * This file is part of jeromegillard/osm.
 *
 * Copyright (c) 2022 Jérôme Gillard.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace JeromeGillard\FlarumMap;

use Flarum\Extend;
use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface as Request;
use Flarum\Settings\SettingsRepositoryInterface;
use JeromeGillard\FlarumMap\Providers\BBCodesProvider;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\ServiceProvider())
        ->register(Providers\MapProvider::class),

    (new Extend\Settings())
        ->serializeToForum('tilesProvider', 'jeromegillard-map.tilesProvider')
        ->serializeToForum('zoom', 'jeromegillard-map.zoom')
        ->serializeToForum('maptiler.key', 'jeromegillard-map.maptiler.key')
        ->serializeToForum('maptiler.style', 'jeromegillard-map.maptiler.style')
        ->serializeToForum('mapbox.key', 'jeromegillard-map.mapbox.key')
        ->serializeToForum('mapbox.style', 'jeromegillard-map.mapbox.style')
        ->serializeToForum('thunderforest.key', 'jeromegillard-map.thunderforest.key')
        ->serializeToForum('thunderforest.style', 'jeromegillard-map.thunderforest.style'),

    (new Extend\View())
        ->namespace('fof-upload.templates', __DIR__.'/resources/templates'),

    (new Extend\Frontend('forum'))
            ->content(function (Document $document, Request $request) {
                $settings = resolve(SettingsRepositoryInterface::class);
                $document->head[] ='
                    <!-- Leaflet -->
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
                    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>

                    <!-- Mapbox-gl -->
                    <script src="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js"></script>
                    <link href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css" rel="stylesheet" />
                    <script src="https://unpkg.com/mapbox-gl-leaflet/leaflet-mapbox-gl.js"></script>

                    <script src="https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js"></script>
                    <link rel="stylesheet" href="https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css" />

                    <!-- TODO: find leaflet-gpx URL on unpkg -->
                    <script src="https://cdn.bootcdn.net/ajax/libs/leaflet-gpx/1.7.0/gpx.min.js"></script>
                    ';

            }),

    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            new BBCodesProvider($config);
        })


];

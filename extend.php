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
                $document->head[] =
                    '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css" integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14=" crossorigin=""/>
                    <link rel="stylesheet" href="https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/1.13.1/mapbox-gl.min.css" />
                    <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js" integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg=" crossorigin=""></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/gpx.min.js"></script>
                    <script src="https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/1.13.1/mapbox-gl.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl-leaflet/0.0.15/leaflet-mapbox-gl.min.js"></script>';
            }),

    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            new BBCodesProvider($config);
        })


];

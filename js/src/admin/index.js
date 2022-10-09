import app from 'flarum/admin/app';

app.initializers.add('jeromegillard/osm', () => {

  app.extensionData
    .for('jeromegillard-map')

    // Tile provider selection
    .registerSetting(
      {
        setting: 'jeromegillard-map.tilesProvider',
        label: app.translator.trans('jeromegillard-map.admin.settings.tiles_provider.label'),
        help: app.translator.trans('jeromegillard-map.admin.settings.tiles_provider.help'),
        type: 'select',
        options: {
          'maptiler': 'MapTiler',
          'osm': 'OpenStreetMap',
          'mapbox': 'Mapbox',
          'thunderforest': 'Thunderforest'
        },
        default: 'osm',
        className: 'select-tilesProvider'
      },
      100
    )
    // Default zoom
    .registerSetting(
      {
        setting: 'jeromegillard-map.zoom',
        label: app.translator.trans('jeromegillard-map.admin.settings.zoom.label'),
        help: app.translator.trans('jeromegillard-map.admin.settings.zoom.help'),
        type: 'text',
        className: 'zoom-setting',
        default: 13
      },
      90)

    // OpenStreetMap
    .registerSetting(
      {
        label: 'OpenStreetMap',
        help: app.translator.trans('jeromegillard-map.admin.settings.osm.help',{
                a: <a href="https://operations.osmfoundation.org/policies/tiles" target="_blank"/>
              }),
        type: 'hidden'
      },
      80)

    // MapTiler key
    .registerSetting(
      {
        setting: 'jeromegillard-map.maptiler.key',
        label: app.translator.trans('jeromegillard-map.admin.settings.maptiler.label'),
        help: app.translator.trans('jeromegillard-map.admin.settings.maptiler.help', {
          a: <a href="https://www.maptiler.com" target="_blank"/>,
          b: <a href="https://www.maptiler.com/copyright/" target="_blank"/>
        }),
        type: 'text',
        className: 'maptiler-setting toggle-setting-block'
      },
      76)
    // MapTiler styles (https://cloud.maptiler.com/maps/)
    .registerSetting(
      {
        setting: 'jeromegillard-map.maptiler.style',
        label: app.translator.trans('jeromegillard-map.admin.settings.style.label', {provider:'MapTiler'}),
        help: app.translator.trans('jeromegillard-map.admin.settings.style.help',{
          a: <a href="https://cloud.maptiler.com/maps/" target="_blank"/>
        }),
        type: 'select',
        options: {
          'basic-v2': 'Basic (basic-v2)',
          'basic-4326': 'Basic EPSG:4326 (basic-4326)',
          'bright-v2': 'Bright (bright-v2)',
          'openstreetmap': 'OpenStreetMap (openstreetmap)',
          'outdoor': 'Outdoor (outdoor)',
          'pastel': 'Pasterl (pastel)',
          'hybrid': 'Satelite hybrid (hybrid)',
          'streets-v2': 'Street (streets-v2)',
          'toner': 'Toner (toner)',
          'topo': 'Topo (topo)',
          'topographique': 'Topographique (topographique)',
          'voyager': 'Voyager (voyager)',
          'winter': 'Winter (winter)'
        },
        default: 'basic-v2',
        className: 'maptiler-setting maptiler-style toggle-setting-block'
      },
      75)

    // Mapbox key
    .registerSetting(
      {
        setting: 'jeromegillard-map.mapbox.key',
        label: app.translator.trans('jeromegillard-map.admin.settings.mapbox.label'),
        help: app.translator.trans('jeromegillard-map.admin.settings.mapbox.help', {
          a: <a href="https://www.mapbox.com" target="_blank"/>,
          b: <a href="https://docs.mapbox.com/help/how-mapbox-works/attribution/"/>
        }),
        type: 'text',
        className: 'mapbox-setting toggle-setting-block'
      },
      71)
    // Mapbox styles (https://docs.mapbox.com/api/maps/styles/#mapbox-styles)
    .registerSetting(
      {
        setting: 'jeromegillard-map.mapbox.style',
        label: app.translator.trans('jeromegillard-map.admin.settings.style.label', {provider:'Mapbox'}),
        help: app.translator.trans('jeromegillard-map.admin.settings.style.help',{
          a: <a href="https://docs.mapbox.com/api/maps/styles/#mapbox-styles" target="_blank"/>
        }),
        type: 'select',
        options: {
          'mapbox/streets-v11': 'Streets (mapbox/streets-v11)',
          'mapbox/outdoors-v11': 'Outdoors (mapbox/outdoors-v11)',
          'mapbox/light-v10': 'Light (mapbox/light-v10)',
          'mapbox/dark-v10': 'Dark (mapbox/dark-v10)',
          'mapbox/satellite-v9': 'Satelite (mapbox/satellite-v9)',
          'mapbox/satellite-streets-v11': 'Satelite streets (mapbox/satellite-streets-v11)',
          'mapbox/navigation-day-v1': 'Navigation day (mapbox/navigation-day-v1)',
          'mapbox/navigation-night-v1': 'Navigation night (mapbox/navigation-night-v1)',
        },
        default: 'mapbox/streets-v11',
        className: 'mapbox-setting mapbox-style toggle-setting-block'
      },
      70)

    // Thunderforest key https://www.thunderforest.com/terms/
    .registerSetting(
      {
        setting: 'jeromegillard-map.thunderforest.key',
        label: app.translator.trans('jeromegillard-map.admin.settings.thunderforest.label'),
        help: app.translator.trans('jeromegillard-map.admin.settings.thunderforest.help',{
          a: <a href="https://www.thunderforest.com" target="_blank"/>,
          b: <a href="https://www.thunderforest.com/terms/" target="_blank"/>
        }),
        type: 'text',
        className: 'thunderforest-setting toggle-setting-block'
      },
      61)
    // Thunderforest style
    .registerSetting(
      {
        setting: 'jeromegillard-map.thunderforest.style',
        label: app.translator.trans('jeromegillard-map.admin.settings.style.label', {provider:'Thunderforest'}),
        help: app.translator.trans('jeromegillard-map.admin.settings.style.help',{
          a: <a href="https://www.thunderforest.com/maps/" target="_blank"/>
        }),
        type: 'select',
        options: {
          'cycle': 'cycle',
          'transport': 'transport',
          'landscape': 'landscape',
          'outdoors': 'outdoors',
          'transport-dark': 'transport-dark',
          'spinal-map': 'spinal-map',
          'pioneer': 'pioneer',
          'mobile-atlas': 'mobile-atlas',
          'neighbourhood': 'neighbourhood',
          'atlas': 'atlas',
        },
        default: 'atlas',
        className: 'thunderforest-setting thunderforest-style toggle-setting-block'
      },
      60)

    // TODO: add openmaptiles https://openmaptiles.org/styles/

});

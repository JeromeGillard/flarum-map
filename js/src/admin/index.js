import app from 'flarum/admin/app';

app.initializers.add('jeromegillard/osm', () => {

  let currentTilesProvider = app.data.settings["jeromegillard-osm.tilesProvider"]??'osm';

  app.extensionData
    .for('jeromegillard-osm')

    // Tile provider selection
    .registerSetting(
      {
        setting: 'jeromegillard-osm.tilesProvider',
        label: app.translator.trans('jeromegillard-osm.admin.settings.tiles_provider.label'),
        help: app.translator.trans('jeromegillard-osm.admin.settings.tiles_provider.help'),
        type: 'select',
        options: {
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
        setting: 'jeromegillard-osm.zoom',
        label: app.translator.trans('jeromegillard-osm.admin.settings.zoom.label'),
        help: app.translator.trans('jeromegillard-osm.admin.settings.zoom.help'),
        type: 'text',
        className: 'zoom-setting',
        placeholder: 13
      },
      90)

    // OpenStreetMap
    .registerSetting(
      {
        label: 'OpenStreetMap',
        help: app.translator.trans('jeromegillard-osm.admin.settings.osm.help',{
                a: <a href="https://operations.osmfoundation.org/policies/tiles" target="_blank"/>
              }),
        type: 'hidden'
      },
      80)

    // Mapbox key
    .registerSetting(
      {
        setting: 'jeromegillard-osm.mapbox.key',
        label: app.translator.trans('jeromegillard-osm.admin.settings.mapbox.label'),
        help: app.translator.trans('jeromegillard-osm.admin.settings.mapbox.help', {
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
        setting: 'jeromegillard-osm.mapbox.style',
        label: app.translator.trans('jeromegillard-osm.admin.settings.style.label', {provider:'Mapbox'}),
        help: app.translator.trans('jeromegillard-osm.admin.settings.style.help',{
          a: <a href="https://docs.mapbox.com/api/maps/styles/#mapbox-styles" target="_blank"/>
        }),
        type: 'select',
        options: {
          'mapbox/streets-v11': 'Streets',
          'mapbox/outdoors-v11': 'Outdoors',
          'mapbox/light-v10': 'Light',
          'mapbox/dark-v10': 'Dark',
          'mapbox/satellite-v9': 'Satelite',
          'mapbox/satellite-streets-v11': 'Satelite streets',
          'mapbox/navigation-day-v1': 'Navigation day',
          'mapbox/navigation-night-v1': 'Navigation night',
        },
        default: 'mapbox/streets-v11',
        className: 'mapbox-setting mapbox-style toggle-setting-block'
      },
      70)

    // Thunderforest key https://www.thunderforest.com/terms/
    .registerSetting(
      {
        setting: 'jeromegillard-osm.thunderforest.key',
        label: app.translator.trans('jeromegillard-osm.admin.settings.thunderforest.label'),
        help: app.translator.trans('jeromegillard-osm.admin.settings.thunderforest.help',{
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
        setting: 'jeromegillard-osm.thunderforest.style',
        label: app.translator.trans('jeromegillard-osm.admin.settings.style.label', {provider:'Thunderforest'}),
        help: app.translator.trans('jeromegillard-osm.admin.settings.style.help',{
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

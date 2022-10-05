import app from 'flarum/admin/app';

app.initializers.add('jeromegillard/osm', () => {

  let currentTilesProvider = app.data.settings["jeromegillard-osm.tilesProvider"];

  // As we don't know when the elements will be created, wait for them to display only the relevant ones.
  const observer = new MutationObserver(function() {
      if ($('.toggle-setting-block').length == 5) {
          toggleSettingBlocks();
          observer.disconnect();
      }
  });
  observer.observe(document.querySelector('body'), { childList: true });

  // Display only the relevant settings block
  const toggleSettingBlocks= () => {
    $('.toggle-setting-block').closest('.Form-group').hide();
    $('.'+currentTilesProvider+'-setting').closest('.Form-group').show();
  };
  
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
      30
    )

    // OpenStreetMap
    .registerSetting( () => {
      return(
        <div className="Form-group">
            <div class="helpText osm-setting  toggle-setting-block">{app.translator.trans('jeromegillard-osm.admin.settings.osm.help')} | <a href="https://operations.osmfoundation.org/policies/tiles" target="_blank">{app.translator.trans('jeromegillard-osm.admin.settings.tiles_provider.tile_usage_policy')}.</a></div>
          </div>
        )
      },
      30)

    // Mapbox key
    .registerSetting(
      {
        setting: 'jeromegillard-osm.mapbox.key',
        label: app.translator.trans('jeromegillard-osm.admin.settings.mapbox.label'),
        help: app.translator.trans('jeromegillard-osm.admin.settings.mapbox.help'),
        type: 'text',
        className: 'mapbox-setting toggle-setting-block'
      },
      21)
    // Mapbox styles (https://docs.mapbox.com/api/maps/styles/#mapbox-styles)
    .registerSetting(
      {
        setting: 'jeromegillard-osm.mapbox.style',
        label: app.translator.trans('jeromegillard-osm.admin.settings.style.label'),
        help: app.translator.trans('jeromegillard-osm.admin.settings.style.help'),
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
      20)

    // Thunderforest key  
    .registerSetting(
      {
        setting: 'jeromegillard-osm.thunderforest.key',
        label: app.translator.trans('jeromegillard-osm.admin.settings.thunderforest.label'),
        help: app.translator.trans('jeromegillard-osm.admin.settings.thunderforest.help'),
        type: 'text',
        className: 'thunderforest-setting toggle-setting-block'
      },
      31)
    // Thunderforest style
    .registerSetting(
      {
        setting: 'jeromegillard-osm.thunderforest.style',
        label: app.translator.trans('jeromegillard-osm.admin.settings.style.label'),
        help: app.translator.trans('jeromegillard-osm.admin.settings.style.help'),
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
      30)

    // Toogle settings blocks on provider change
    .registerSetting( () => {      
      if($('.select-tilesProvider')[0]){
        currentTilesProvider = $('.select-tilesProvider')[0].value;
      }
      toggleSettingBlocks();
    },
    0)
});

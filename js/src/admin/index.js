import app from 'flarum/admin/app';

app.initializers.add('jeromegillard/osm', () => {

  let currentTilesProvider = app.data.settings["jeromegillard-osm.tilesProvider"];

  console.log('[jeromegillard/osm] Hello, admin!');
  app.extensionData
    .for('jeromegillard-osm')
    .registerSetting(
      {
        setting: 'jeromegillard-osm.tilesProvider',
        label: app.translator.trans('jeromegillard-osm.admin.settings.tiles_provider.label'),
        help: app.translator.trans('jeromegillard-osm.admin.settings.tiles_provider.help'),
        type: 'select',
        options: {
          // The key in this object is what the setting will be stored as in the database, the value is the label the admin will see (remember to use translations if they make sense in your context).
          'osm': 'OpenStreetMap', 
          'mapbox': 'Mapbox',
        },
        default: 'osm',
        className: 'select-mapbox'
      },
      30
    )
    .registerSetting(function () {
        if($('.select-mapbox')[0]){
          currentTilesProvider = $('.select-mapbox')[0].value;
        }

        if(currentTilesProvider == 'osm'){
          return(
            <div className="Form-group">
                <div class="helpText">{app.translator.trans('jeromegillard-osm.admin.settings.osm.help')} | <a href="https://operations.osmfoundation.org/policies/tiles" target="_blank">{app.translator.trans('jeromegillard-osm.admin.settings.tiles_provider.tile_usage_policy')}.</a></div>
              </div>
            )
        }

        else if(currentTilesProvider == 'mapbox'){
          return(
            <div className="Form-group">
                <label>{app.translator.trans('jeromegillard-osm.admin.settings.mapbox.key')}</label>
                <div class="helpText">{app.translator.trans('jeromegillard-osm.admin.settings.mapbox.help')} | <a href="https://docs.mapbox.com/help/getting-started/attribution/" target="_blank">{app.translator.trans('jeromegillard-osm.admin.settings.tiles_provider.tile_usage_policy')}.</a></div>
                <input type="string" class="FormControl" bidi={this.setting('jeromegillard-osm.mapbox.key')}/>
              </div>
            )
        }
      },
      10 // Optional: Priority
    )
});

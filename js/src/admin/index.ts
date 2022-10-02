import app from 'flarum/admin/app';

app.initializers.add('jeromegillard/flarum-osm', () => {
  console.log('[jeromegillard/flarum-osm] Hello, admin!');
  app.extensionData
    .for('jeromegillard-osm')
    .registerSetting(
      {
        setting: 'jeromegillard-osm.test', // This is the key the settings will be saved under in the settings table in the database.
        label: app.translator.trans('jeromegillard-osm.admin.settings.intro'), // The label to be shown letting the admin know what the setting does.
        type: 'string', // What type of setting this is, valid options are: boolean, text (or any other <input> tag type), and select. 
      },
      30 // Optional: Priority
    )
});

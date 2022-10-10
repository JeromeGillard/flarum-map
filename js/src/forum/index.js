import app from 'flarum/forum/app';
import Post from 'flarum/components/Post';
import Page from 'flarum/components/Page';
import { extend } from 'flarum/common/extend';
import TextEditor from 'flarum/common/components/TextEditor';
import TextEditorButton from 'flarum/common/components/TextEditorButton';
import mapFile from './components/mapFile';
import insertAtCursor from './components/mapBBCode';
import { createMap, getMapConfig, getTileLayer } from './components/mapConfigHelper';

app.initializers.add('jeromegillard/osm', () => {
  app.store.models.files = mapFile;

  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    let mapConf = getMapConfig();
    items.add(
      'bbcode',
      <TextEditorButton onclick={() => insertAtCursor(mapConf.tilesProvider, mapConf.currentStyle, mapConf.zoom)} icon={'fas fa-map'}>
        {app.translator.trans('jeromegillard-map.forum.text_editor.bbcode_tooltip')}
      </TextEditorButton>
    );
  });

});

extend(Page.prototype, 'oncreate', function(){
  console.log("Post.onCreate");

  if(this.attrs.routeName == 'page'){
    console.log("Post.onCreate page", this.attrs.id);
    createMap(this.attrs.id);
  }
});
extend(Post.prototype, 'oncreate', function(){
  console.log("Post.onCreate");
  this.pid = this.attrs.post.id();
  createMap(this.pid);
});

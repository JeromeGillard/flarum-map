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

// Render maps in posts
extend(Post.prototype, 'oncreate', function(){
  createMap(this.attrs.post.id());
});

// Render maps in pages (fof/pages)
extend(Page.prototype, 'oncreate', function(){
  const pid = this.attrs.id;
  if(this.attrs.routeName === 'page'){
    // Wait for the post to be rendered. Anyone has a better event?
    // With fof/links, when a user browse from a post to the page, there's no event triggered
    setTimeout(createMap, 500, pid);
  }
});

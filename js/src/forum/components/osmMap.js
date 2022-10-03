import Component from 'flarum/common/Component';
import app from 'flarum/forum/app';

export default class OSMMap extends Component {
  
  oninit(vnode) {
    super.oninit(vnode);

    this.mapboxKey = app.forum.attribute("osm.mapbox");
  }

  view() {
    /*return (
      <div>
        Count: {this.count}
        <button onclick={e => this.count++}>
          {this.attrs.buttonLabel}
        </button>
      </div>
    );*/
    return (
        <div id={'map'+this.attrs.pid}></div>
    );
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    var map = L.map('map'+ this.attrs.pid).setView([50.4631,5.7533], 13);

    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+this.mapboxKey, 
    {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/light-v9',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);
  }
}

//m.mount(document.body, <MyComponent buttonLabel="Increment" />);
import Component from 'flarum/common/Component';

export default class Counter extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.count = 0;
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
        <div id='map'>MAP!!</div>
    );
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    // We aren't actually doing anything here, but this would
    // be a good place to attach event handlers, initialize libraries
    // like sortable, or make other DOM modifications.
    //$element = this.$();
    //$button = this.$('button');

    var map = L.map('map').setView([50.4631,5.7533], 13);
  }
}

//m.mount(document.body, <MyComponent buttonLabel="Increment" />);
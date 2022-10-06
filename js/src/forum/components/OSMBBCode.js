export default function insertAtCursor(tilesProvider, style, zoom) {

  (async () => {

    let input = document.querySelector('textarea.FormControl');

    let pos = input.selectionStart
    let front = (input.value).substring(0, pos);
    let back = (input.value).substring(pos, input.value.length);
    let middle = `[osm provider=${tilesProvider??'osm'} style=${style??'street'} zoom=${zoom??13}]${app.translator.trans('jeromegillard-osm.forum.text_editor.location_placeholder')}[/osm]`;

    input.value = front+middle+back;
    pos = pos + 1;

    input.selectionStart = pos;
      input.selectionEnd = pos;
      input.focus();

    })()

}

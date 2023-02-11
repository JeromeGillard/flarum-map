export default function insertAtCursor(tilesProvider, style, zoom) {

  (async () => {

    let input = document.querySelector('textarea.FormControl');

    let pos = input.selectionStart
    let front = (input.value).substring(0, pos);
    let back = (input.value).substring(pos, input.value.length);
    let middle = `[map provider=${tilesProvider??'osm'} style=${style??'street'} zoom=${zoom??13} title='${app.translator.trans('jeromegillard-map.forum.text_editor.marker_title_placeholder')}' desc='${app.translator.trans('jeromegillard-map.forum.text_editor.marker_description_placeholder')}']${app.translator.trans('jeromegillard-map.forum.text_editor.location_placeholder')}[/map]`;

    input.value = front+middle+back;
    pos = pos + 1;

    input.selectionStart = pos;
      input.selectionEnd = pos;
      input.focus();

    })()

}

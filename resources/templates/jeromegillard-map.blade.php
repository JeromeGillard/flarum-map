<div class="mapFile-container">
    <div class="mapFile-placeholder" oncreate="createMap(99);"></div>
    <div class="ButtonGroup mapFile" data-fof-upload-download-uuid="{@uuid}" data-map-url="{@url}">
        <div class="Button hasIcon Button--icon Button--primary"><i class="fas fa-download"></i></div>
        <div class="Button">
            {SIMPLETEXT1}
        </div>
        <div class="Button">
            <xsl:value-of select="@size"/>
        </div>
    </div>
</div>


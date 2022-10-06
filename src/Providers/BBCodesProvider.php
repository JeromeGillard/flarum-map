<?php

namespace JeromeGillard\FlarumOSM\Providers;

use s9e\TextFormatter\Configurator;

class BBCodesProvider
{
	public function __construct(Configurator $config)
    {
        $config->BBCodes->addCustom(
            '[osm provider={TEXT2} style={TEXT3} zoom={TEXT4}]{TEXT1}[/osm]',
            '<div class="osm-location-map"
              data-map-location="{TEXT1}"
              data-map-provider="{TEXT2}"
              data-map-style="{TEXT3}"
              data-map-zoom="{TEXT4}">
                {TEXT1}
              </div>'
        );
    }
}

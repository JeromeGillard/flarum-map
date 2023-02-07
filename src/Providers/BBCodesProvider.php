<?php

namespace JeromeGillard\FlarumMap\Providers;

use s9e\TextFormatter\Configurator;

// Register custom BBCode
class BBCodesProvider
{

	public function __construct(Configurator $config)
    {
        $config->BBCodes->addCustom(
            '[map provider={TEXT2} style={TEXT3} zoom={TEXT4} title={TEXT5} desc=[TEXT6]]{TEXT1}[/map]',
            '<div class="bbcode-map"
              data-map-location="{TEXT1}"
              data-map-provider="{TEXT2}"
              data-map-style="{TEXT3}"
              data-map-zoom="{TEXT4}"
              data-map-title="{TEXT5}"
              data-map-desc="{TEXT6}">
                {TEXT1}
              </div>'
        );
    }
}

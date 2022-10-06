<?php

namespace JeromeGillard\FlarumOSM\Providers;

use Flarum\Foundation\AbstractServiceProvider;
use FoF\Upload\Helpers\Util;
use JeromeGillard\FlarumOSM\Templates\OSMTemplate;
use Flarum\Settings\SettingsRepositoryInterface;

class OSMProvider extends AbstractServiceProvider
{    
	

    public function register()
    {
        /** @var Util $util */
        $util = $this->container->make(Util::class);

        $util->addRenderTemplate($this->container->make(OSMTemplate::class));

        // display a map based on location query results
        // https://nominatim.openstreetmap.org/search?q=nonceveux&format=json
    }
}
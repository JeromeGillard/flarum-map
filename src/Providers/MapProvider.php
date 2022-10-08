<?php

namespace JeromeGillard\FlarumMap\Providers;

use Flarum\Foundation\AbstractServiceProvider;
use FoF\Upload\Helpers\Util;
use JeromeGillard\FlarumMap\Templates\MapTemplate;
use Flarum\Settings\SettingsRepositoryInterface;

class MapProvider extends AbstractServiceProvider
{    
    public function register()
    {
        /** @var Util $util */
        $util = $this->container->make(Util::class);

        // register our fof-upload template
        $util->addRenderTemplate($this->container->make(MapTemplate::class));
    }
}
<?php

namespace JeromeGillard\FlarumOSM\Templates;

class MardownOSMTemplate extends AbstractTemplate
{
    /**
     * @var string
     */
    protected $tag = 'markdown-osm';

    /**
     * {@inheritdoc}
     */
    public function name(): string
    {
        return $this->trans('flarum-osm.admin.templates.osm');
    }

    /**
     * {@inheritdoc}
     */
    public function description(): string
    {
        return $this->trans('flarum-osm.admin.templates.osm.file_description');
    }

    /**
     * {@inheritdoc}
     */
    public function preview(): string
    {
        return '![Map description]()';
    }
}
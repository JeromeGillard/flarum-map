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
        return $this->trans('jeromegillard-osm.admin.templates.markdown-osm');
    }

    /**
     * {@inheritdoc}
     */
    public function description(): string
    {
        return $this->trans('jeromegillard-osm.admin.templates.markdown-osm_description');
    }

    /**
     * {@inheritdoc}
     */
    public function preview(): string
    {
        return '![Map description]()';
    }
}
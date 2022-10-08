<?php

namespace JeromeGillard\FlarumOSM\Templates;

use FoF\Upload\Templates\AbstractTextFormatterTemplate;

/*
 * This class handles the fof-upload formatter
 */ 
class OSMTemplate extends AbstractTextFormatterTemplate
{
    /**
     * @var string
     */
    protected $tag = 'jeromegillard-osm';

    /**
     * The human readable name of the template.
     *
     * @return string
     */
    public function name(): string
    {
        return $this->trans('jeromegillard-osm.admin.templates.osm');
    }

    /**
     * {@inheritdoc}
     */
    public function description(): string
    {
        return $this->trans('jeromegillard-osm.admin.templates.osm.file_description');
    }

    /**
     * The xsl template to use with this tag.
     *
     * @return string
     */
    public function template(): string
    {
        return $this->getView('fof-upload.templates::jeromegillard-osm');
    }

    /**
     * The bbcode to be parsed.
     *
     * @return string
     */
    public function bbcode(): string
    {
        return '[upl-file uuid={IDENTIFIER} size={SIMPLETEXT2} url={URL}]{SIMPLETEXT1}[/upl-file]';
    }
}
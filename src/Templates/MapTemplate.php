<?php

namespace JeromeGillard\FlarumMap\Templates;

use FoF\Upload\Templates\AbstractTextFormatterTemplate;

/*
 * This class handles the fof-upload formatter
 */
class MapTemplate extends AbstractTextFormatterTemplate
{
    /**
     * @var string
     */
    protected $tag = 'jeromegillard-map';

    /**
     * The human readable name of the template.
     *
     * @return string
     */
    public function name(): string
    {
        return $this->trans('jeromegillard-map.admin.templates.map');
    }

    /**
     * {@inheritdoc}
     */
    public function description(): string
    {
        return $this->trans('jeromegillard-map.admin.templates.file_description');
    }

    /**
     * The xsl template to use with this tag.
     *
     * @return string
     */
    public function template(): string
    {
        return $this->getView('fof-upload.templates::jeromegillard-map');
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

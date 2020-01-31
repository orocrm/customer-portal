<?php

namespace Oro\Bundle\CustomerBundle\Migrations\Schema\v1_22_3;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Types\Type;
use Oro\Bundle\MigrationBundle\Migration\Migration;
use Oro\Bundle\MigrationBundle\Migration\QueryBag;

class ChangeUrlsLength implements Migration
{
    /**
     * {@inheritdoc}
     */
    public function up(Schema $schema, QueryBag $queries)
    {
        $table = $schema->getTable('oro_cus_pagestate');
        $column = $table->getColumn('page_id');
        if ($column->getLength() !== 10920) {
            $column
                ->setType(Type::getType(Type::STRING))
                ->setOptions(['length' => 10920, 'notnull' => true]);
        }
    }
}

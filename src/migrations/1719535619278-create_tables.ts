import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTables1719535619278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const playersTable = await queryRunner.getTable('players');
    if (!playersTable) {
      await queryRunner.createTable(
        new Table({
          name: 'players',
          schema: 'football',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            { name: 'name', type: 'varchar' },
            { name: 'age', type: 'int' },
            { name: 'price', type: 'decimal' },
            { name: 'nationality', type: 'varchar' },
            { name: 'teamId', type: 'int' },
          ],
        }),
        true,
      );
    }

    await queryRunner.createTable(
      new Table({
        name: 'teams',
        schema: 'football',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'football.players',
      new TableForeignKey({
        columnNames: ['teamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'football.teams',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('football.players');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('teamId') !== -1,
      );
      await queryRunner.dropForeignKey('football.players', foreignKey);
    }

    await queryRunner.dropTable('players', true);

    await queryRunner.dropTable('teams', true);
  }
}

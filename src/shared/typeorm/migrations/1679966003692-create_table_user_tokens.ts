import { number } from "joi";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableUserTokens1679966003692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'userToken',
          columns: [
            {
              name: 'id',
              type: 'serial',
              isPrimary: true,
            },
            {
              name: 'token',
              type: 'uuid',
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',

            },
            {
              name: 'userId',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'FK_TokenUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: [
                'userId'
              ],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }
          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('userToken')
    }

}

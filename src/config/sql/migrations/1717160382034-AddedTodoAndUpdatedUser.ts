import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class AddedTodoAndUpdatedUser1717160382034 implements MigrationInterface {
  name = 'AddedTodoAndUpdatedUser1717160382034'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "todo" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "userUuid" uuid NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "deadline" TIMESTAMP(3) NOT NULL, "isCompleted" boolean NOT NULL, "completedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "PK_17b57427465caa8ca57e2741db2" PRIMARY KEY ("uuid"))')
    await queryRunner.query('ALTER TABLE "user" ADD "lastCompletionDate" TIMESTAMP(3) NOT NULL')
    await queryRunner.query('CREATE INDEX "IDX_8ffce172fb81226c738cef01e3" ON "user" ("roleUuid") ')
    await queryRunner.query('ALTER TABLE "todo" ADD CONSTRAINT "FK_efdb98c58cfeb8428afdfaa3299" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "todo" DROP CONSTRAINT "FK_efdb98c58cfeb8428afdfaa3299"')
    await queryRunner.query('DROP INDEX "public"."IDX_8ffce172fb81226c738cef01e3"')
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "lastCompletionDate"')
    await queryRunner.query('DROP TABLE "todo"')
  }
}


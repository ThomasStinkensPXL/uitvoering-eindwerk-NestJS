import { MigrationInterface, QueryRunner } from "typeorm";

export class MadeSomePropsNullable1717443063462 implements MigrationInterface {
    name = 'MadeSomePropsNullable1717443063462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "completedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastCompletionDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastCompletionDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "completedAt" SET NOT NULL`);
    }

}

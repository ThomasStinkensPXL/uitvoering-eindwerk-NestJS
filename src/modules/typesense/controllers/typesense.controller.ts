import { Controller, Get, Query } from '@nestjs/common'
import { type CollectionSchema } from 'typesense/lib/Typesense/Collection.js'
import { type CollectionAliasSchema } from 'typesense/lib/Typesense/Aliases.js'
import { TypesenseImportService } from '../services/typesense-import.service.js'
import { MigrateTypesenseQueryDto } from '../dtos/migrate-typesense-query.dto.js'
import { ImportTypesenseQueryDto } from '../dtos/import-typesense-query.dto.js'
import { Permissions } from '../../permissions/permissions.decorator.js'
import { Permission } from '../../permissions/permission.enum.js'

@Controller('typesense')
export class TypesenseController {
  constructor (private readonly typesenseImportService: TypesenseImportService) {}
  @Get('migrate')
  @Permissions(Permission.ADMIN)
  async migrate (
    @Query() query: MigrateTypesenseQueryDto
  ): Promise<void> {
    await this.typesenseImportService.migrate(query.fresh, query.collections)
  }

  @Get('import')
  @Permissions(Permission.ADMIN)
  async import (
    @Query() query: ImportTypesenseQueryDto
  ): Promise<void> {
    await this.typesenseImportService.import(query.collections)
  }

  @Get('collections')
  @Permissions(Permission.ADMIN)
  async getCollections (): Promise<CollectionSchema[]> {
    return await this.typesenseImportService.retrieveCollections()
  }

  @Get('aliases')
  @Permissions(Permission.ADMIN)
  async getAliases (): Promise<CollectionAliasSchema[]> {
    return await this.typesenseImportService.retrieveAliases()
  }
}

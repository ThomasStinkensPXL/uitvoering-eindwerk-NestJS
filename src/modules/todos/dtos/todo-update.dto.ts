import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString, ValidateIf } from 'class-validator'

export class TodoUpdateDto {
  @ApiProperty({ type: Date, required: false })
  @ValidateIf(o => o.deadline !== undefined)
  @IsDateString()
  deadline?: Date

  @ApiProperty({ type: String, required: false })
  @ValidateIf(o => o.title !== undefined)
  @IsString()
  @IsNotEmpty()
  title?: string

  @ApiProperty({ type: String, required: false })
  @ValidateIf(o => o.description !== undefined)
  @IsString()
  @IsNotEmpty()
  description?: string
}

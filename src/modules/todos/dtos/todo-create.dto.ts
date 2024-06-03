import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class TodoCreateDto {
  @ApiProperty({ type: Date })
  @IsDateString()
  deadline: Date

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  description: string
}

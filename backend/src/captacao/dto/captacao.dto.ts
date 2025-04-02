import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CaptacaoDto {
  @IsString()
  @IsNotEmpty()
  public nome: string;

  @IsNumber()
  @IsNotEmpty()
  public numero: number;

  @IsDateString()
  @IsNotEmpty()
  public dataInicio: Date;
}

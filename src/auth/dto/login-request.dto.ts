import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequestDto {
  @IsEmail({}, { message: '이메일 형식에 부합해야 합니다.' })
  email: string;

  @IsString()
  @MinLength(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호를 최대 20자입니다.' })
  // 영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 알파벳과 숫자로만 구성되어야 합니다.',
  })
  password: string;
}

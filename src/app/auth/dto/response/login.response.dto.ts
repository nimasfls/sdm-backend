export class LoginResponseDto {
  id: number;

  constructor(dto: { id: number }) {
    Object.assign(this, dto);
  }
}

import { BasicDto } from './BasicDTO';

abstract class BasicDAO<T extends BasicDto> {
  dto: T;

  constructor({ dto }: { dto: T }) {
    this.dto = dto;
  }

  makeDto(data: object): T {
    return this.dto.clone(data);
  }
}

export { BasicDAO };

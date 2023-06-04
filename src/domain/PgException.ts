class PgException extends Error {
  detail: string;
  coreDetail: string;
  constructor(code: string, detail: string, coreDetail: string) {
    super(code);
    this.detail = detail;
    this.coreDetail = coreDetail;
  }

  toString() {
    return `${this.message}, ${this.detail}, ${this.coreDetail}`;
  }
}

export default PgException;

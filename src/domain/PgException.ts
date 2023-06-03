class PgException extends Error {
  detail: string;
  coreDetail: string;
  constructor(code: string, detail: string, coreDetail: string) {
    super(code);
    this.detail = detail;
    this.coreDetail = coreDetail;
  }
}

export default PgException;

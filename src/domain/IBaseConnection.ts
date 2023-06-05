interface IBaseConnection {
  connect(): Promise<boolean>;
  disconnect(): Promise<boolean>;
  ping(): Promise<boolean>;
}

export default IBaseConnection;

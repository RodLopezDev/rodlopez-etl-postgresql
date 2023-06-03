interface IBaseConnection {
  connect(): Promise<boolean>;
  disconnect(): Promise<boolean | void>;
}

export default IBaseConnection;

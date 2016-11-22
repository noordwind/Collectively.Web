import environment from '../../environment';

export default class SignalRService {
  constructor() {
    this.connection = null;
  }

  initialize() {
    if (this.connection === null) {
      this.connection = new RpcConnection(`${environment.signalRUrl}remarks`, 'formatType=json&format=text');
      this.connection.on('RemarkCreated', (message) => {
        console.log('Remark created ' + JSON.stringify(message));
      });

      this.connection.start();
    }
  }
}

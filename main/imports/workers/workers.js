import { _ } from 'meteor/underscore';

export default class Workers{
  constructor(workers) {
    this.workers = [];

    this._nextWorker = 0;
  }

  getNextWorker() {
    if(this.workers.length == 0) {
      return null;
    }

    if(this._nextWorker >= this.workers.length) {
      this._nextWorker = 0;
    }

    var worker = this.workers[this._nextWorker++];
    return worker;
  }

  processVideo(args) {
    args = _.toArray(arguments);
    args.unshift('processVideo');
    var worker = this.getNextWorker();
    if(worker) {
      return worker.call.apply(worker, args);
    } else {
      throw new Meteor.Error(500, "no worker to process");
    }
  }
}
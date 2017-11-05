import { _ } from 'meteor/underscore';
import { DDP } from 'meteor/ddp-client';

export default class Workers{
  constructor(workers) {
    this.workers = [];
    const self = this;

    workers.forEach((workerUrl) => {
      const worker = DDP.connect(workerUrl);
      Tracker.autorun(function() {
        if(worker.status().connected) {
          console.log(`Worker connected ... ${workerUrl}`);
          self.workers.push(worker);
        }
        else {
          const i = self.workers.indexOf(worker);
          if(i >= 0) {
            console.log(`Worker disconnected ... ${workerUrl}`);
            self.workers.splice(i, 1);
          }
        }
      });
    });
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
import { Meteor } from 'meteor/meteor';
import Workers from '/imports/workers/workers.js';

Meteor.startup(() => {
  // code to run on server at startup
});

var workerUrls = [
  "http://localhost:7005",
  "http://localhost:7015"
];

var workers = new Workers(workerUrls);

Meteor.methods({
  processVideo: function() {
    this.unblock();
    return workers.processVideo();
  }
});
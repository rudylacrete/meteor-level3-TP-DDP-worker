import { Meteor } from 'meteor/meteor';

Meteor.methods({
  processVideo() {
    console.log("processing video for 2 seconds");
    Meteor._sleepForMs(2000);
    return {done: true};
  }
});
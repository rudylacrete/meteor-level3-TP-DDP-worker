import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

var jobNumber = 0;

const Results = new Mongo.Collection(null);

Template.main.helpers({
  results() {
    return Results.find();
  }
});

Template.main.events({
  'click #processVideo'() {
    var jobId = ++jobNumber;
    printMessage(jobId, "processing");
    Meteor.call('processVideo', function(err, result) {
      if(err) {
        printMessage(jobId, "error processing: " + err.message);
      } else {
        printMessage(jobId, "processed: " +  JSON.stringify(result));
      }
    });
  }
});

printMessage = (jobId, message) => {
  message = "[jobId: " + jobId + "] " + message;
  Results.insert({message});
}
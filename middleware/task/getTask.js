var requireOption = require('../common').requireOption;

/**
 * Get the task for the taskid param
 *  - if there is no such task, redirect to /tasks
 *  - if there is one, put it on res.tpl.task
 */
module.exports = function (objectrepository) {

  var taskModel = requireOption(objectrepository, 'taskModel');

  return function (req, res, next) {

    taskModel.findOne({
      _id: req.param('taskid')
    }).populate('_assignedto').exec(function (err, result) {
      if ((err) || (!result)) {
        return res.redirect('/tasks');
      }

      res.tpl.task = result;
      return next();
    });
  };

};

const AdminLog = require('../models/AdminLog');

const logAction = (action, resource) => async (req, res, next) => {
  // Capture the original end method to log after response is sent
  const originalEnd = res.end;
  
  res.end = function(chunk, encoding) {
    res.end = originalEnd;
    res.end(chunk, encoding);
    
    // Only log successful actions (2xx) or specific failures if needed
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (req.admin) {
        AdminLog.create({
          adminUsername: req.admin.username,
          action,
          resource,
          details: `${action} on ${resource}${req.params.id ? ' (ID: ' + req.params.id + ')' : ''}`,
          ipAddress: req.ip
        }).catch(err => console.error('Audit Log Error:', err));
      }
    }
  };
  
  next();
};

module.exports = { logAction };

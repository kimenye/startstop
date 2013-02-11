/**
 * Application helpers
 * requires Underscore.js
 */
var ApplicationHelpers = {
  railsify_keys: function(namespace, obj) {
    var self      = this,
        curr_keys = _.keys(obj);

    return _.reduce(curr_keys, function(new_obj, curr_key) {
      var new_key = (self.is_primary_key(curr_key) ? curr_key : namespace + '[' + curr_key + ']');

      new_obj[new_key] = obj[curr_key];
      return new_obj;
    }, {});
  },

  // returns if k equals "id" or "_id"
  is_primary_key: function(k) {
    return k == 'id' || k == '_id';
  },

  current_tab : function() {
      return Ext.Viewport.getActiveItem().getTabBar().getActiveTab().getTitle()
  }
};

// alias helpers to ApplicationHelpers for easier access. or don't.
var helpers = ApplicationHelpers;
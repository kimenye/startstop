/**
 * Application helpers
 * requires Underscore.js
 */
var ApplicationHelpers = {
  /**
   * Railsify object's keys to play nice with default Rails controller setup.
   * Rails default controller setup expects params submitted via PUT / POST as:
   *
   *  (POST)                 {'my_model[attr1]' : 'value1', ... etc. }
   *  (PUT)  {'_id' : '1234', 'my_model[attr1]' : 'value2', ... etc. }
   *
   * In Sencha Touch land, the platform will bind a model's data to a
   * form if the model's attributes and input names directly correspond. For
   * example:
   *
   *    // model ...
   *    Ext.define('App.model.MyModel', {
   *      extend: 'Ext.data.Model',
   *
   *      fields: [
   *        {name: '_id',   type: 'auto'},
   *        {name: 'attr1', type: 'string'}
   *      ],
   *      // ... etc.
   *    });
   *
   *    // view (form) ...
   *    Ext.define('App.view.MyModels.New', {
   *      extend: 'Ext.form.Panel',
   *      xtype: 'newmymodel',
   *      // ... more code
   *      config: {
   *        items: [
   *          {
   *            xtype: 'fieldset',
   *            items: [
   *              {
   *                name: 'attr1',
   *                label: 'Attribute 1',
   *                xtype: 'textfield'
   *              },
   *              // ... more code
   *            ]
   *          }
   *        ]
   *      }
   *    });
   *
   * Unfortunately, under this setup, our params will be submitted in the
   * following format (note that non-id attributes are not namespaced):
   *
   *  (new records)                      {'attr1' : 'value1', ... etc. }
   *  (existing records) {'_id' : '1234', 'attr1' : 'value1', ... etc. }
   *
   * Which you can certainly use, but the standard Rails setup expects
   * attributes to be namespaced (except for the id / _id), so you'll have to
   * modify the controller to make everything work properly.
   *
   * Use this helper to make the ST2 platform play nice with the default Rails
   * controller setup. With it, we can do the following given the ST2 model and
   * form view setup described above:
   *
   *    // given params = {'attr1' : 'value1'}
   *    // in Sencha Touch 2 create API call:
   *    Ext.Ajax.request({
   *      url: '/my_models.json',
   *      method: 'POST',
   *      params: helpers.railsify_keys('my_model', params),
   *      ...
   *
   *    // params set to {'my_model[attr1]' : 'value1'} // <= hooray!
   *
   *    // -- and --
   *
   *    // given params = {'_id' : '1234', 'attr1' : 'value2'}
   *    // in Sencha Touch 2 update API call:
   *    Ext.Ajax.request({
   *      url: '/my_models/' + params._id + '.json',
   *      method: 'PUT',
   *      params: helpers.railsify_keys('my_model', params),
   *      ...
   *
   *    // params set to {'_id' : '1234', 'my_model[attr1]' : 'value2'} // <= hooray again!
   *    // and note _id is not namespaced
   *
   * Now, in the Rails controller, we can keep everything as we normally do:
   *
   *    def create
   *      if @my_model = MyModel.create(params[:my_model])
   *        # celerate!
   *      else
   *        # sad pig :(
   *      end
   *    end
   *
   *    def update
   *      @my_model = MyModel.find(params[:_id])
   *      if @my_model.update_attributes(params[:my_model]
   *        # celerate!
   *      else
   *        # sad pig :(
   *      end
   *    end
   */
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
  }
};

// alias helpers to ApplicationHelpers for easier access. or don't.
var helpers = ApplicationHelpers;
/**
 * @author zhiheng.li
 * @since 2017/2/23
 * @Description 表单指令
 * 存在bug：helpError需要ui.bootstrap小于2.0.0版本才能使用
 */

var module = angular.module('json-form', ['json-form.template']);

/**
  文件验证指令

  这个指令使用来验证file类型的input
*/
function validationFile() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$validators.file = function(modelValue) {
        return modelValue == null;
      }
    }
  }
}

// export
module.directive('validationFile', validationFile);

/**
  URL验证指令
  这个指令是用来验证异步输入框请求使用$asyncValidators;This directive validates an input against an endpoint asynchronously
  如：注册用户名验证用户名是否存在
*/
function validationUrl($http, $q) {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ngModel) {
      if (attrs.validationUrl && attrs.validationUrl.length > 0){
        ngModel.$asyncValidators.validationurl = function(modelValue, viewValue) {
          return $http.post(attrs.validationUrl, { validate: viewValue }).then(
            function(response) {
                if (!response.data.data.valid) {
                    return $q.reject(response.data.message);
                }
                return true;
            });
        }
      }
    }
  }
}

// export
module.directive('validationUrl', ['$http', '$q', validationUrl]);

/**
 Json表单指令
 这个指令生产一个具于bootstrap表单
*/
function JSONForm() {
	return {
		restrict: 'E',
    require: 'ngModel',
		templateUrl: 'src/json-form.html',
		scope: {
      ngModel: '=',
			schema: '=formSchema',
      valid: '=?formValid',
			jsonForm: '=?formCtrl',
			readOnly: '@?formReadonly',
      persistValues: '@?formPersistValues'
		},
		link: function(scope, element, attributes, ctrl) {
      // shortcuts（快捷链）
      var model = scope.ngModel;

      // auxiliars（配套）
      scope.focus = {};
      scope.disabled = {};
      scope.visible = {};
      scope.required = {};

      // read only（只读）
      if (scope.readOnly === 'true')
        scope.readOnly = true;
      else
        scope.readOnly = false;

      // persist values when hiding/disabling a field当隐藏/禁用时存留一个字段值
      if (scope.persistValues === 'true')
        scope.persistValues = true;
      else
        scope.persistValues = false;

      // checks if a property is undefined or null, and fills it with a default value
      // 检查如果一个属性是undefined或者为空，取的是默认值
      var defaults = function(item, prop, val){
      	if (item[prop] == null || typeof item[prop] == 'undefined')
      		item[prop] = val;
      }
      // initialize all the items
      // 初始化所有的items
      function initSchema(){
        angular.forEach(scope.schema,function(item, index) {
          //console.log('label===='+item.label+'name====='+item.name+'==type=='+item.type);

          // 判断name和lable为空时的处理
          if (typeof item.name == 'undefined')
          {
              throw "name 必须定义不能为空,请检查json配置！";
          }

          if (typeof item.label == 'undefined')
          {
            item.label = item.name[0].toUpperCase() + item.name.slice(1);
          }

          if (item.updateOn == 'immediate')
          {
            item.updateOn = 'default';
          }

          if (item.type=='radio'){
            if (item.default){
                scope.ngModel[item.name] = item.default;
            } else{
                scope.ngModel[item.name] = Object.keys(item.options)[0];
            }
          }



          if (item.type=='checkboxs'){
            var array = [];
            if (item.default){
              array.push(item.default);
              scope.ngModel[item.name] = array;
            } else{
              scope.ngModel[item.name] = [];
            }
          }

          // 填充 undefined 或者 null的属性为默认配置
          defaults (item, 'order', index);
          defaults (item, 'visible', true);
          defaults (item, 'enabled', true);
          defaults (item, 'required', false);
          defaults (item, 'pattern', /(.*)$/);
          defaults (item, 'feedback', false);
          defaults (item, 'validationUrl', '');
          defaults (item, 'placeholder', item.type == 'file' ? '没有选择文件...' : '');
          defaults (item, 'minLength', '');
          defaults (item, 'maxLength', '');
          defaults (item, 'min', '');
          defaults (item, 'max', '');
          defaults (item, 'accept', '*');
          defaults (item, 'options', null);
          defaults (item, 'typeahead', []);
          defaults (item, 'default', item.type == 'checkbox' ? false : null);
          defaults (item, 'rows', 5);
          defaults (item, 'classes', null);
          defaults (item, 'helpMessage', '');
          defaults (item, 'errorMessage', null);
          defaults (item, 'debounce', item.validationUrl.length > 0 ? 200 : 0);
          defaults (item, 'updateOn', 'default');

          // 固定警告类型
          item.default = item.default === "" ? null : item.default;
          item.visible = item.visible === "true" ? true : item.visible === "false" ? false : item.visible;
          item.enabled = item.enabled === "true" ? true : item.enabled === "false" ? false : item.enabled;
          item.required = item.required === "true" ? true : item.required === "false" ? false : item.required;
          item.pattern = new RegExp(item.pattern);
          try {
            item.errorMessage = JSON.parse(item.errorMessage);
          } catch (e) {}
          try {
            if (typeof item.options == 'string')
            {
              item.options = JSON.parse(item.options);
            }
          } catch (e) {
            item.options = null;
          }
          try {
            if (typeof item.typeahead == 'string')
            {
              item.typeahead = item.typeahead.split(',');
            }
          } catch (e) {
            item.typeahead = [];
          }
          try {
            if (typeof item.validators == 'string')
            {
              item.validators = JSON.parse(validators);
            }
          } catch (e) {
            item.validators = {};
          }

          // 填充默认的值

          if (typeof scope.ngModel[item.name] == 'undefined' && item.default != null)
          {

            scope.ngModel[item.name] = item.default;
          }
        });
      }
      //
      function bindingValue(prop){
        // 定义正则
        var refRegex = /(.*)\[/;
        var valRegex = /\[(.*)\]$/;
        var negRegex = /^!(.*)$/;
        // 判断标识
        var negated = false;
        // 验证prop value(index)
        if (refRegex.test(prop) && valRegex.test(prop)) {
          // extract names
          var reference = refRegex.exec(prop);
          var value = valRegex.exec(prop);
          // 检查有效性
          if (reference.length > 1 && value.length > 1) {
            var refName = reference[1];
            // check if negated
            if (negRegex.test(refName)) {
              negated = true;
              refName = negRegex.exec(refName)[1];
            }
            var refValue = scope.ngModel[refName];
            value = value[1];
            if (typeof refValue != 'undefined' && typeof value != 'undefined') {
              var ret = value == refValue;
              return negated? !ret: ret;
            }
          }
        }
        // check if negated
        if (negRegex.test(prop)) {
          var propName = negRegex.exec(prop)[1];
          return !scope.ngModel[propName];
        }
        return scope.ngModel[prop];
      }

      function toBoolean(value) {
        return value == true || typeof value == "string" && bindingValue(value)
      }
      // 初始化
      initSchema();


      // 复选框checkbox逻辑,checkbox切换对数组添加与删除

     scope.toggleSelection =function(item,groupName) {
       var idx = scope.ngModel[item.name].indexOf(groupName);
      // 未选中删除
       if(idx > -1) {
         scope.ngModel[item.name].splice(idx,1);
       } // 选中添加
       else {
         scope.ngModel[item.name].push(groupName);
       }
     }



			// 生成一个随机密码
      scope.generatePassword = function(item){
      	for(var password = "", chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        		password.length < 10;
        		password += chars.charAt(Math.floor(Math.random() * chars.length)));
        scope.ngModel[item.name] = password;
      }

      scope.togglePassword = function(item){
        item.showPassword = !item.showPassword;
      }

      // 返回是否应禁用item（如：radio配置此选项只能显示一个radio）
      scope.isDisabled = function(item){

        if (scope.persistValues !== 'true' && scope.persistValues !== true)
          scope.persistValues = false;

        if (scope.readOnly !== 'true' && scope.readOnly !== true)
          scope.readOnly = false;

        if (scope.readOnly)
          return true;

        var value = toBoolean(item.enabled);
        var prev = typeof scope.disabled[item.name] == 'undefined' ? !value : !!scope.disabled[item.name];
        var disabled = scope.disabled[item.name] = !value;

        if (!scope.persistValues)
        {
          if (disabled)
          {
            delete scope.ngModel[item.name];
          } else if (prev != disabled){
            if (item.default != null) {
            	scope.ngModel[item.name] = item.default;
            }
            scope.jsonForm[item.name].$setPristine();
          }
        }

        return scope.disabled[item.name];
      }

      // 返回项是否应该可见
      scope.isVisible = function(item){

        if (scope.persistValues !== 'true' && scope.persistValues !== true)
          scope.persistValues = false;

        var value = toBoolean(item.visible);
        var prev = typeof scope.visible[item.name] == 'undefined' ? value : !!scope.visible[item.name];
        var visible = scope.visible[item.name] = value;

        if (!scope.persistValues)
        {
          if (!visible)
          {
            delete scope.ngModel[item.name];
          } else if (prev != visible) {
            if (item.default != null) {
          	   scope.ngModel[item.name] = item.default;
            }
            scope.jsonForm[item.name].$setPristine();
          }
        }

        return scope.visible[item.name];
      }

      // Returns whether an item should be required or not
      scope.isRequired = function(item){

        var value = toBoolean(item.required);
        var prev = typeof scope.required[item.name] == 'undefined' ? value : !!scope.required[item.name];
        var required = scope.required[item.name] = value;

        if (required && prev != required) {
          scope.jsonForm[item.name].$setDirty();
        }

        return required;
      }

      // Check if item is an <input>
      scope.isInput = function(item){
      	return  item.type == 'text' ||
                item.type == 'password' ||
                item.type == 'password-show' ||
                item.type == 'password-generate' ||
                item.type == 'number' ||
                item.type == 'date' ||
                item.type == 'datetime-local' ||
                item.type == 'time' ||
                item.type == 'week' ||
                item.type == 'month' ||
                item.type == 'url' ||
                item.type == 'email';
      }

      scope.getType = function(item) {
        var type = item.type == 'password-show' || item.type == 'password-generate' ? 'password' : item.type;
        if (item.showPassword && type == 'password')
          return 'text';
        return type;
      }

      // 在一个item里得到所有的class
      scope.getClass = function(item){

        if (scope.readOnly)
          return '';

      	// 一个class数组应用于item
      	var classes = [];

      	// 默认item的class
      	if (typeof item.classes == 'string' && item.classes.length > 0)
      	{
      		classes.push(item.classes);
      	}

      	// item发生错误的时候
      	if (scope.jsonForm[item.name].$invalid && scope.jsonForm[item.name].$dirty && !scope.focus[item.name] && item.type != 'file')//!scope.jsonForm[item.name].$valid && !scope.focus[item.name])
      	{
          if (scope.isRequired(item))
          {
            classes.push('has-error');
          } else {
            classes.push('has-warning');
          }
      	}
        // 如果item.name是挂起的状态或者item.name是使用的话
        if (scope.jsonForm[item.name].$pending && scope.jsonForm[item.name].$dirty)
        {
          classes.push('is-pending');
        }

        if (scope.focus[item.name])
        {
          classes.push('has-focus');
        }

        // 返回所有适用的class
      	return classes.join(' ');
      }

      // 相关的错误
      scope.getError = function(item) {

        // 没有预定义的错误信息
      	if (item.errorMessage === null)
      	{
      		return '';
      	}

        // 有仅只有一条错误信息
      	if (typeof item.errorMessage == 'string') {
      		return item.errorMessage;
      	}

        // 有几条errorMessage
      	if (typeof item.errorMessage == 'object') {


          // 得到map的errors
      		var errors = scope.jsonForm[item.name].$error;

          // 遍历的errors
      		for (var error in errors)
      		{
            // 在error里如果有一条errorMessage，则返回
      			if (error in item.errorMessage)
      				return item.errorMessage[error];
      		}
      	}

        return '';
      }


      // 确定条件是boolean
      scope.readOnly = scope.readOnly == "true" || scope.readOnly == true;
      scope.persistValues = scope.persistValues == "true" || scope.persistValues == true;

      // File utils
      scope.files = {};
      scope.resetFile = function(item) {
        delete scope.ngModel[item.name];
      }
      scope.hasFile = function(item) {
        return typeof scope.ngModel[item.name] != 'undefined';
      }
      scope.onFileSelect = function(item, $files) {
        if ($files.length > 0){
          var file = $files[0];
          scope.ngModel[item.name] = file;
        }
      }
      scope.getFileName = function(item) {
        var file = scope.ngModel[item.name];

        if (typeof file == 'string')
        {
          return file;
        } else if (typeof file == 'object' && file != null)
        {
          return file.name || '';
        }
        return item.placeholder || '';
      }

      // 验证表单
      var oldSchema = null;
      scope.$watch(function(){
        if (oldSchema !== scope.schema) {
          initSchema();
        }
        if (scope.schema) {
          scope.valid = true;
          Object.keys(scope.schema)
          .forEach(function(key){
            var item = scope.schema[key];
            var form = scope.jsonForm[item.name];

            var isRequired = scope.isRequired(item);
            var isEnabled = !scope.isDisabled(item);
            var isVisible = scope.isVisible(item);
            var isInvalid = typeof form != 'undefined' && form.$invalid;
            var isPending = typeof form != 'undefined' && form.$pending;

            if(isRequired && isEnabled && isVisible && isInvalid || isPending){
              scope.valid = false;
            }
          });
        }
        oldSchema = scope.schema;
      })
    }
	}
}

// export
module.directive('jsonForm', JSONForm);

/*
  JSON Form service
 此服务提供了一种以编程方式使用JSON表单的方法。该服务可以作为一个常规的依赖注入，通过调用.open（）它显示在一个模式的形式。
 */
function JSONFormService($uibModal){
  return {
    open: function(schema, modalOptions){

      if (typeof schema != 'object')
        throw 'Invalid schema!';

      var options = modalOptions || {};

      if (!options.text)
        options.text = {};

      options.template = "<div class=\"modal-header\" ng-if=\"header\"><h2 class=\"modal-title\">{{ header }}</h2></div><div class=\"modal-body\"><json-form ng-model=\"model\" form-schema=\"schema\" form-valid=\"isValid\"></json-form></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-disabled=\"!isValid\" ng-click=\"$close(model)\" tabindex=\"100\">{{ ok }}</button><button class=\"btn btn-default\" ng-click=\"$dismiss()\" tabindex=\"101\">{{ cancel }}</button></div>";
      options.controller = ['$scope', function($scope) {
        $scope.schema = schema;
        $scope.model = {};
        $scope.ok = options.text.ok || "Ok";
        $scope.cancel = options.text.cancel || "Cancel";
        $scope.header = options.text.header || "";
      }];

      return $uibModal.open(options).result;
    }
  }
}

// export
module.service('jsonForm', ['$uibModal', JSONFormService]);

/**
 * @author zhiheng.li
 * @since 2017/2/28
 * @Description 表单DEMO
 */

angular.module("jsonFormApp", ['json-form','ngAnimate', 'ui.bootstrap', 'ngFileUpload','checklist-model']).controller('MainCtrl', ["$scope", "jsonForm","formConfig","$filter", function ($scope, jsonForm,formConfig,$filter) {

  /**
   * 弹窗Demo
   * @type {[*]}

  var schema = [{type: "text", label: "First Name"}, {
    type: "text",
    label: "Last Name"
  }];
  var modalOptions  = {text: {header: "What's your name?"}};
  $scope.prompt = function () {
    $("*[tabindex]").each(function () {
      $(this).attr("_tabindex", $(this).attr("tabindex")), $(this).attr("tabindex", "-1")
    });
    var promise = jsonForm.open(schema, modalOptions);
    promise.then(function (data) {
      $scope.greeting = "Hello, " + data.first_name + " " + data.last_name + "!", $("*[_tabindex]").each(function () {
        $(this).attr("tabindex", $(this).attr("_tabindex"))
      })
    })
  },
   */
  /**
   * 表单配置demo
   * @type {[*]}
   */
  $scope.mySchema = formConfig.config();

  var today = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
  console.log("today"+today);
  $scope.model = {};
  console.log($scope.model);
  $scope.showModel = function () {
    var b = {};
    for (var c in $scope.model)"form" != c && ($scope.model[c] instanceof File ? b[c] = "File <" + $scope.model[c].name + ">" : $scope.model[c] instanceof Date ? b[c] = "Date <" + $scope.model[c].toString() + ">" : b[c] = $scope.model[c]);
    return JSON.stringify(b).replace(/\{/g, "{\n  ").replace(/\}/g, "\n}").replace(/,/g, ",\n  ").replace(/>"/g, ">").replace(/"File/g, " File").replace(/"Date/g, " Date")
  }

  $scope.showSchema = function () {
    switch ($scope.model.form) {
      case"basic":
        return '[{\n    "label": "Basic Sample",\n    "type": "title",\n},\n{\n    "label": "First name",\n    "name": "first_name",\n    "type": "text",\n    "required": true,\n},\n{\n    "label": "Last name",\n    "name": "last_name",\n    "type": "text",\n    "required": true,\n},\n{\n    "label": "Country",\n    "name": "country",\n    "type": "text",\n    "typeahead": "Afghanistan,Albania,Algeria...",\n},\n{\n    "label": "Email",\n    "name": "email",\n    "type": "email",\n    "placeholder": "blabla@mulesoft.com",\n    "required": "subscribe",\n    "errorMessage": {\n	"required": "Email is required",\n	"email": "Invalid email"\n    }\n},\n{\n    "label": "Suscribe to newsletter",\n    "name": "subscribe",\n    "type": "checkbox",\n},\n{\n    "label": "How did you find us?",\n    "name": "find_us",\n    "type": "select",\n    "options": {\n        "website": "Our website",\n        "tv ad": "TV Ad",\n        "word of mouth": "Word of mouth",\n        "other": "Other"\n    },\n    "default": "website",\n},\n{\n    "label": "Leave a comment",\n    "name": "comment",\n    "type": "textarea",\n    "rows": 3,\n    "visible": "find_us[other]"\n}]';
      case"bindings":
        return '[{\n    "label": "Checkbox Bindings",\n    "type": "title"\n},\n{\n    "label": "Some field",\n    "type": "text",\n    "name": "some_field",\n    "required": "is_required",\n    "helpMessage": "Leave this blank..."\n},\n{\n    "label": "Toggle required",\n    "type": "checkbox",\n    "name": "is_required"\n},\n{\n    "label": "Some other field",\n    "name": "some_other_field",\n    "type": "text",\n    "enabled": "is_enabled"\n},\n{\n    "label": "Toggle enabled",\n    "type": "checkbox",\n    "name": "is_enabled"\n},\n{\n    "type": "text",\n    "label": "Yet another field",\n    "name": "yet_another_field",\n    "visible": "is_visible"\n},\n{\n    "label": "Toggle visible",\n    "type": "checkbox",\n    "name": "is_visible",\n    "default": true\n},\n{\n    "label": "Select Bindings",\n    "type": "title"\n},\n{\n    "label": "Which one?",\n    "type": "select",\n    "name": "pick",\n    "options": \n{\n    \n    "first": "First",\n    \n    "second": "Second",\n    \n    "third": "Third"\n    },\n    "default": "first"\n},\n{\n    "label": "First",\n    "type": "text",\n    "name": "first",\n    "enabled": "pick[first]",\n    "default": "I\'m enabled!"\n},\n{\n    "label": "Second",\n    "type": "text",\n    "name": "second",\n    "enabled": "pick[second]",\n    "default": "I\'m enabled!"\n},\n{\n    "label": "Third",\n    "type": "text",\n    "name": "third",\n    "enabled": "pick[third]",\n    "default": "I\'m enabled!"\n}]';
      case"errors":
        return '[{\n    "type": "title",\n    "label": "Tooltips & Errors"\n},\n{\n    "type": "number",\n    "name": "numeric",\n    "helpMessage": "Try entering a non-numeric value",\n    "errorMessage": "Invalid input!",\n    "required": true\n},\n{\n    "type": "text",\n    "name": "length",\n    "label": "Text Length",\n    "minLength": 3,\n    "maxLength": 10,\n    "helpMessage": "Try entering a 2 letters value",\n    "errorMessage": "Input is too short!",\n    "required": true\n},\n{\n    "type": "number",\n    "name": "multiple",\n    "label": "Multiple Messages",\n    "helpMessage": "Try entering a number...",\n    "errorMessage": {\n        "number": "Input should be numeric!",\n        "min": "That\'s too low!",\n        "max": "That\'s too high!",\n        "required": "Input is required!"\n    },\n    "min": 10,\n    "max": 100,\n    "required": true\n}]';
      case"errors":
        return '[{\n    "type": "title",\n    "label": "Tooltips & Errors"\n},\n{\n    "type": "number",\n    "name": "numeric",\n    "helpMessage": "Try entering a non-numeric value",\n    "errorMessage": "Invalid input!",\n    "required": true\n},\n{\n    "type": "text",\n    "name": "length",\n    "label": "Text Length",\n    "minLength": 3,\n    "maxLength": 10,\n    "helpMessage": "Try entering a 2 letters value",\n    "errorMessage": "Input is too short!",\n    "required": true\n},\n{\n    "type": "number",\n    "name": "multiple",\n    "label": "Multiple Messages",\n    "helpMessage": "Try entering a number...",\n    "errorMessage": {\n        "number": "Input should be numeric!",\n        "min": "That\'s too low!",\n        "max": "That\'s too high!",\n        "required": "Input is required!"\n    },\n    "min": 10,\n    "max": 100,\n    "required": true\n}]';
      case"passwords":
        return '[{\n    "label": "Simple Password",\n    "type": "title"\n},\n{\n    "label": "Password",\n    "name": "password",\n    "type": "password"\n},\n{\n    "label": "Show Password",\n    "type": "title"\n},\n{\n    "label": "Password 2",\n    "name": "password2",\n    "type": "password-show"\n},\n{\n    "label": "Generate Password",\n    "type": "title"\n},\n{\n    "label": "Password 3",\n    "name": "password3",\n    "type": "password-generate"\n}]';
      case"dates":
        return '[{\n    "label": "Date Fields",\n    "type": "title"\n},\n{\n    "type": "date",\n    "name": "date",\n    "default": new Date()\n},\n{\n    "type": "datetime-local",\n    "label": "Date & Time",\n    "name": "datetime",\n    "default": new Date()\n},\n{\n    "type": "time",\n    "name": "time",\n    "default": new Date()\n},\n{\n    "type": "week",\n    "name": "week",\n    "default": new Date()\n},\n{\n    "type": "month",\n    "name": "month",\n    "default": new Date()\n}]';
      case"model":
        return '[{\n    "label": "Model Options",\n    "type": "title"\n},\n{\n    "label": "Update on blur",\n    "type": "text",\n    "name": "blur",\n    "updateOn": "blur"\n},\n{\n    "label": "Update immediate",\n    "type": "text",\n    "name": "immediate",\n    "updateOn": "immediate"\n},\n{\n    "label": "Debounce 500ms",\n    "type": "text",\n    "name": "debounce",\n    "debounce": 500\n}]';
      case"files":
        return '[{\n    "label": "Upload Files",\n    "type": "title",\n    "visible": "form[files]"\n},\n{\n    "type": "file",\n    "name": "image",\n    "placeholder": "Select an image file...",\n    "accept": "image/*",\n    "required": true,\n    "visible": "form[files]"\n},\n{\n    "type": "file",\n    "name": "video",\n    "placeholder": "Select a video file...",\n    "accept": "video/*",\n    "required": true,\n    "visible": "form[files]"\n},\n{\n    "type": "file",\n    "name": "anything",\n    "placeholder": "Select any file...",\n    "required": true,\n    "visible": "form[files]"\n}]';
      case"async":
        return '[{\n    "label": "Async Validators",\n    "type": "title"\n},\n{\n    "type": "text",\n    "name": "async",\n    "label": "Validate me",\n    "minLength": 1,\n    "validationUrl": "http://example.com/validate",\n    "feedback": true,\n    "placeholder": "Type something...",\n    "required": true,\n    "errorMessage": "Invalid input!"\n}]'
    }
  };

}]);

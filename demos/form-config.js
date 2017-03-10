/**
 * @author zhiheng.li
 * @since 2017/3/3
 * @Description 配置文件
 */
angular.module("jsonFormApp").factory('formConfig', ['$filter',function ($filter) {
  var factory = {};
  factory.config = function () {
    return [
      {label: "JSON Form", type: "title", name: "title_json_form"},
      {
        label: "选择一个示例",
        name: "form",
        type: "select",
        options: {
          basic: "基础示例",
          bindings: "Bindings",
          errors: "工具提示与错误",
          passwords: "密码",
          dates: "日期组",
          model: "模型选项",
          files: "文件上传",
          async: "异步验证"
        },
        "default": "basic"
        // 基础示例DEMO
      }, {label: "基础示例", type: "title", visible: "form[basic]", name: "title_basic"}, {
        label: "第一个名称",
        name: "first_name",
        type: "text",
        required: !0,
        visible: "form[basic]"
      }, {label: "最后一个名称", name: "last_name", type: "text", required: !0, visible: "form[basic]"}, {
        label: "国家",
        name: "country",
        type: "text",
        typeahead: "Afghanistan,Albania,Algeria,American Samoa,Andorra,Angola,Anguilla,Antarctica,Antigua And Barbuda,Argentina,Armenia,Aruba,Australia,Austria,Azerbaijan,Bahamas,Bahrain,Bangladesh,Barbados,Belarus,Belgium,Belize,Benin,Bermuda,Bhutan,Bolivia,Bosnia And Herzegovina,Botswana,Bouvet Island,Brazil,British Indian Ocean Territory,Brunei Darussalam,Bulgaria,Burkina Faso,Burundi,Cambodia,Cameroon,Canada,Cape Verde,Cayman Islands,Central African Republic,Chad,Chile,China,Christmas Island,Cocos (keeling) Islands,Colombia,Comoros,Congo,Congo, The Democratic Republic Of The,Cook Islands,Costa Rica,Cote D'ivoire,Croatia,Cuba,Cyprus,Czech Republic,Denmark,Djibouti,Dominica,Dominican Republic,East Timor,Ecuador,Egypt,El Salvador,Equatorial Guinea,Eritrea,Estonia,Ethiopia,Falkland Islands (malvinas),Faroe Islands,Fiji,Finland,France,French Guiana,French Polynesia,French Southern Territories,Gabon,Gambia,Georgia,Germany,Ghana,Gibraltar,Greece,Greenland,Grenada,Guadeloupe,Guam,Guatemala,Guinea,Guinea-bissau,Guyana,Haiti,Heard Island And Mcdonald Islands,Holy See (vatican City State),Honduras,Hong Kong,Hungary,Iceland,India,Indonesia,Iran, Islamic Republic Of,Iraq,Ireland,Israel,Italy,Jamaica,Japan,Jordan,Kazakstan,Kenya,Kiribati,Korea, Democratic People's Republic Of,Korea, Republic Of,Kosovo,Kuwait,Kyrgyzstan,Lao People's Democratic Republic,Latvia,Lebanon,Lesotho,Liberia,Libyan Arab Jamahiriya,Liechtenstein,Lithuania,Luxembourg,Macau,Macedonia, The Former Yugoslav Republic Of,Madagascar,Malawi,Malaysia,Maldives,Mali,Malta,Marshall Islands,Martinique,Mauritania,Mauritius,Mayotte,Mexico,Micronesia, Federated States Of,Moldova, Republic Of,Monaco,Mongolia,Montserrat,Montenegro,Morocco,Mozambique,Myanmar,Namibia,Nauru,Nepal,Netherlands,Netherlands Antilles,New Caledonia,New Zealand,Nicaragua,Niger,Nigeria,Niue,Norfolk Island,Northern Mariana Islands,Norway,Oman,Pakistan,Palau,Palestinian Territory, Occupied,Panama,Papua New Guinea,Paraguay,Peru,Philippines,Pitcairn,Poland,Portugal,Puerto Rico,Qatar,Reunion,Romania,Russian Federation,Rwanda,Saint Helena,Saint Kitts And Nevis,Saint Lucia,Saint Pierre And Miquelon,Saint Vincent And The Grenadines,Samoa,San Marino,Sao Tome And Principe,Saudi Arabia,Senegal,Serbia,Seychelles,Sierra Leone,Singapore,Slovakia,Slovenia,Solomon Islands,Somalia,South Africa,South Georgia And The South Sandwich Islands,Spain,Sri Lanka,Sudan,Suriname,Svalbard And Jan Mayen,Swaziland,Sweden,Switzerland,Syrian Arab Republic,Taiwan, Province Of China,Tajikistan,Tanzania, United Republic Of,Thailand,Togo,Tokelau,Tonga,Trinidad And Tobago,Tunisia,Turkey,Turkmenistan,Turks And Caicos Islands,Tuvalu,Uganda,Ukraine,United Arab Emirates,United Kingdom,United States,United States Minor Outlying Islands,Uruguay,Uzbekistan,Vanuatu,Venezuela,Viet Nam,Virgin Islands, British,Virgin Islands, U.s.,Wallis And Futuna,Western Sahara,Yemen,Zambia,Zimbabwe",
        visible: "form[basic]"
      }, {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "admin@qishon.com",
        required: "subscribe",
        visible: "form[basic]",
        helpMessage: "尝试进入一个数量低于10,高于100,非数字值,或把它空白",
        errorMessage: {required: "电子邮箱是必须的", email: "无效的电子邮箱"}
      }, {
        label: "性别",
        name: "sex",
        type: "radio",
        options:{
          man: "男",
          woman: "女"
        },
        helpMessage: "默认男的",
        visible: "form[basic]"
      },{
        label: "游泳",
        name: "interest",
        type: "checkboxs",
        helpMessage: "默认乒乓球",
        groups:[{name:'pingpong',label:"乒乓球"},{name:"swimming",label:"游泳"},{name:"basketball",label:"篮球"}],
        visible: "form[basic]",
        "default":"basketball"
      },{
        label: "订阅通讯",
        name: "subscribe",
        type: "checkbox",
        visible: "form[basic]"
      }, {
        label: "怎么找到我们?",
        name: "find_us",
        type: "select",
        options: {website: "我们的网站", "tv ad": "TV Ad", "word of mouth": "Word of mouth", other: "Other"},
        "default": "website",
        visible: "form[basic]"
      }, {
        label: "留下您的评论",
        name: "comment",
        type: "textarea",
        rows: 3,
        visible: "find_us[other]"
      }, {label: "Checkbox Bindings", type: "title", visible: "form[bindings]", name: "title_checkbox_bindings"}, {
        label: "一些字段",
        type: "text",
        name: "some_field",
        required: "is_required",
        helpMessage: "离开这个空白,点击下面的复选框",
        visible: "form[bindings]"
      }, {
        label: "需要切换",
        type: "checkbox",
        name: "is_required",
        visible: "form[bindings]"
      }, {
        label: "其他的一些字段",
        name: "some_other_field",
        type: "text",
        enabled: "is_enabled",
        visible: "form[bindings]"
      }, {label: "开关启动", type: "checkbox", name: "is_enabled", visible: "form[bindings]"}, {
        type: "text",
        label: "另一个字段",
        name: "yet_another_field",
        visible: "is_visible"
      }, {
        label: "切换可见项",
        type: "checkbox",
        name: "is_visible",
        visible: "form[bindings]",
        "default": !0
      }, {label: "Select Bindings", type: "title", visible: "form[bindings]", name: "title_select_bindings"}, {
        label: "选择哪一个？",
        type: "select",
        name: "pick",
        options: {first: "第一个", second: "第二个", third: "第三个"},
        "default": "first",
        visible: "form[bindings]"
      }, {
        label: "第一个",
        type: "text",
        name: "first",
        enabled: "pick[first]",
        visible: "form[bindings]",
        "default": "I'm enabled!"
      }, {
        label: "第二个",
        type: "text",
        name: "second",
        enabled: "pick[second]",
        visible: "form[bindings]",
        "default": "I'm enabled!"
      }, {
        label: "第三个",
        type: "text",
        name: "third",
        enabled: "pick[third]",
        visible: "form[bindings]",
        "default": "启动!"
      }, {type: "title", label: "工具提示 & 错误", visible: "form[errors]", name: "title_tooltips_errors"}, {
        type: "number",
        name: "numeric",
        helpMessage: "尝试输入一个非数字值",
        errorMessage: "无效的输入值!",
        required: !0,
        visible: "form[errors]"
      }, {
        type: "text",
        name: "length",
        label: "文本长度",
        minLength: 3,
        maxLength: 10,
        helpMessage: "试着输入2字母的值",
        errorMessage: "input 太短了!",
        required: !0,
        visible: "form[errors]"
      }, {
        type: "number",
        name: "multiple",
        label: "多个消息",
        helpMessage: "尝试进入一个数量低于10,高于100,非数字值,或把它空白",
        errorMessage: {
          number: "输入应该是数字!",
          min: "值字太小了!",
          max: "值太大了!",
          required: "input是必须的!"
        },
        min: 10,
        max: 100,
        required: !0,
        visible: "form[errors]"
      }, {label: "密码示例", type: "title", visible: "form[passwords]", name: "title_passwords"}, {
        label: "密码",
        name: "password",
        type: "password",
        visible: "form[passwords]"
      }, {label: "显示密码", type: "title", visible: "form[passwords]", name: "title_passwords2"}, {
        label: "密码 2",
        name: "password2",
        type: "password-show",
        visible: "form[passwords]"
      }, {label: "自动生成密码", type: "title", visible: "form[passwords]", name: "title_passwords_generate"}, {
        label: "密码 3",
        name: "password3",
        type: "password-generate",
        visible: "form[passwords]"
      }, {label: "日期字段", type: "title", visible: "form[dates]", name: "title_data_field"}, {
        type: "date",
        name: "date",
        "default": new Date,
        visible: "form[dates]"
      }, {
        type: "datetime-local",
        label: "日期 & 时间",
        name: "datetime",
        "default": new Date,
        visible: "form[dates]"
      }, {type: "time", name: "time", "default": new Date, visible: "form[dates]"}, {
        type: "week",
        name: "week",
        "default": new Date,
        visible: "form[dates]"
      }, {type: "month", name: "month", "default": new Date, visible: "form[dates]"}, {
        label: "模型选择",
        type: "title",
        visible: "form[model]",
        name: "title_model_option"
      }, {
        label: "Update on blur",
        type: "text",
        name: "blur",
        updateOn: "blur",
        visible: "form[model]"
      }, {
        label: "立即更新",
        type: "text",
        name: "immediate",
        updateOn: "immediate",
        visible: "form[model]"
      }, {
        label: "Debounce 500ms",
        type: "text",
        name: "debounce",
        debounce: 500,
        visible: "form[model]"
      }, {label: "上传文件", type: "title", visible: "form[files]", name: "title_upload_file"}, {
        type: "file",
        name: "image",
        placeholder: "请选择一个图片格式文件...",
        accept: "image/*",
        required: !0,
        visible: "form[files]"
      }, {
        type: "file",
        name: "video",
        placeholder: "请选择一个视频格式文件...",
        accept: "video/*",
        required: !0,
        visible: "form[files]"
      }, {
        type: "file",
        name: "anything",
        placeholder: "选择任何格式...",
        required: !0,
        visible: "form[files]"
      }, {label: "异步验证", type: "title", visible: "form[async]", name: "title_async_validate"}, {
        type: "text",
        name: "async",
        label: "验证",
        minLength: 1,
        validationUrl: "http://mocksvc.mulesoft.com/mocks/47ebab6f-616c-4feb-baf5-5a74f42dba52/validate",
        feedback: !0,
        placeholder: "Type something...",
        required: !0,
        visible: "form[async]",
        errorMessage: "无效的输入值!"
      }

    ];
  }
  return factory;
}])
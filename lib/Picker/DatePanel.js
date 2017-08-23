'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Picker = require('./Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _DatePanel = require('./DatePanel.css');

var _DatePanel2 = _interopRequireDefault(_DatePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by work on 17/3/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var DatePanel = function (_React$Component) {
  _inherits(DatePanel, _React$Component);

  function DatePanel(props) {
    _classCallCheck(this, DatePanel);

    var _this = _possibleConstructorReturn(this, (DatePanel.__proto__ || Object.getPrototypeOf(DatePanel)).call(this, props));

    _initialiseProps.call(_this);

    var year = parseInt(new Date().getFullYear(), 10);
    var minY = typeof _this.props.minYear === 'number' ? _this.props.minYear : year - 100;
    var maxY = typeof _this.props.maxYear === 'number' ? _this.props.maxYear : year + 100;
    _this.defValue = _this.props.defaultIndex ? _this.props.defaultIndex : [parseInt(new Date().getFullYear(), 10) - minY, parseInt(new Date().getMonth(), 10), parseInt(new Date().getDate(), 10) - 1];
    _this.yearItems = [];
    _this.monthItems = [];
    _this.dayItems = [];
    for (var y = minY; y <= maxY; y++) {
      _this.yearItems.push(y);
    }
    for (var m = 1; m <= 12; m++) {
      _this.monthItems.push(m);
    }
    var defY = _this.yearItems[_this.defValue[0]];
    var defM = _this.monthItems[_this.defValue[1]];
    var totalDays = new Date(defY, defM, 0).getDate();
    for (var d = 1; d <= totalDays; d++) {
      _this.dayItems.push(d);
    }
    var defD = _this.dayItems[_this.defValue[2]];
    _this.state = {
      year: defY,
      month: defM,
      day: defD
    };
    return _this;
  }

  _createClass(DatePanel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        {
          className: _DatePanel2.default.shadow,
          style: { display: this.props.show ? 'block' : 'none' }
        },
        React.createElement(
          'div',
          { className: _DatePanel2.default.panel },
          React.createElement(
            'div',
            { className: _DatePanel2.default.top },
            React.createElement(
              'span',
              null,
              this.state.year
            ),
            React.createElement(
              'small',
              null,
              '\u5E74'
            ),
            React.createElement(
              'span',
              null,
              this.state.month
            ),
            React.createElement(
              'small',
              null,
              '\u6708'
            ),
            React.createElement(
              'span',
              null,
              this.state.day
            ),
            React.createElement(
              'small',
              null,
              '\u65E5'
            )
          ),
          React.createElement(
            'div',
            { className: _DatePanel2.default.mid },
            React.createElement(
              'div',
              { className: _DatePanel2.default.label },
              '\u9009\u62E9' + this.props.label
            ),
            React.createElement(
              'div',
              { className: _DatePanel2.default.box },
              React.createElement(_Picker2.default, {
                options: this.yearItems,
                onChange: function onChange(value) {
                  return _this2.handleSetDay(value, _this2.state.month);
                },
                defaultIndex: this.defValue[0],
                show: this.props.show
              }),
              React.createElement(
                'p',
                null,
                '\u5E74'
              ),
              React.createElement(_Picker2.default, {
                options: this.monthItems,
                onChange: function onChange(value) {
                  return _this2.handleSetDay(_this2.state.year, value);
                },
                defaultIndex: this.defValue[1],
                show: this.props.show
              }),
              React.createElement(
                'p',
                null,
                '\u6708'
              ),
              React.createElement(_Picker2.default, {
                options: this.dayItems,
                onChange: function onChange(value) {
                  return _this2.setState({ day: value });
                },
                defaultIndex: this.defValue[2],
                show: this.props.show
              }),
              React.createElement(
                'p',
                null,
                '\u65E5'
              )
            )
          ),
          React.createElement(
            'div',
            { className: _DatePanel2.default.action },
            React.createElement(
              'div',
              {
                className: _DatePanel2.default.cancel,
                onClick: function onClick() {
                  _this2.props.onCancel();
                }
              },
              '\u53D6\u6D88'
            ),
            React.createElement(
              'div',
              {
                className: _DatePanel2.default.confirm,
                onClick: function onClick() {
                  var value = {
                    show: _this2.state.year + '\u5E74' + _this2.addZero(_this2.state.month) + '\u6708' + _this2.addZero(_this2.state.day) + '\u65E5',
                    pass: _this2.state.year + '-' + _this2.addZero(_this2.state.month) + '-' + _this2.addZero(_this2.state.day)
                  };
                  _this2.props.onConfirm(value); //eslint-disable-line
                }
              },
              '\u786E\u5B9A'
            )
          )
        )
      );
    }
  }]);

  return DatePanel;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleSetDay = function (y, m) {
    _this3.dayItems = [];
    var totalDays = new Date(y, m, 0).getDate();
    for (var d = 1; d <= totalDays; d++) {
      _this3.dayItems.push(d);
    }
    _this3.setState({ year: y, month: m });
  };

  this.addZero = function (str) {
    var string = str;
    if (typeof string !== 'string') {
      string = string.toString();
    }
    string = string.length <= 1 ? '0' + string : string;
    return string;
  };
};

DatePanel.propTypes = {
  show: React.PropTypes.bool.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  minYear: React.PropTypes.number,
  maxYear: React.PropTypes.number,
  defaultIndex: React.PropTypes.number,
  onConfirm: React.PropTypes.func.isRequired
};

exports.default = DatePanel;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Picker = require('./Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _DoublePicker = require('./DoublePicker.css');

var _DoublePicker2 = _interopRequireDefault(_DoublePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by work on 17/2/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/**
 * Created by mac on 17/1/4.
 */


var DoublePicker = function (_React$Component) {
  _inherits(DoublePicker, _React$Component);

  function DoublePicker(props) {
    _classCallCheck(this, DoublePicker);

    var _this = _possibleConstructorReturn(this, (DoublePicker.__proto__ || Object.getPrototypeOf(DoublePicker)).call(this, props));

    _this.current = _this.props.defaultIndex ? _this.props.defaultIndex : 0;
    _this.state = {
      firstOpen: true,
      leftValue: _this.props.options.left.items[_this.current],
      rightValue: _this.props.options.right.items[_this.current]
    };
    return _this;
  }

  _createClass(DoublePicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var left = this.props.options.left;
      var right = this.props.options.right;
      return React.createElement(
        'div',
        {
          className: _DoublePicker2.default.shadow,
          style: { display: this.props.show ? 'block' : 'none' }
        },
        React.createElement(
          'div',
          { className: _DoublePicker2.default.panel },
          React.createElement(
            'div',
            { className: _DoublePicker2.default.top },
            React.createElement(
              'span',
              null,
              this.state.leftValue
            ),
            React.createElement(
              'span',
              null,
              this.state.rightValue
            )
          ),
          React.createElement(
            'div',
            { className: _DoublePicker2.default.mid },
            React.createElement(
              'div',
              { className: _DoublePicker2.default.label },
              '\u9009\u62E9' + this.props.label
            ),
            React.createElement(
              'div',
              { className: _DoublePicker2.default.box },
              React.createElement(_Picker2.default, { options: left.items, onChange: function onChange(value) {
                  return _this2.setState({ leftValue: value });
                } }),
              React.createElement(_Picker2.default, { options: right.items, onChange: function onChange(value) {
                  return _this2.setState({ rightValue: value });
                } })
            )
          ),
          React.createElement(
            'div',
            { className: _DoublePicker2.default.action },
            React.createElement(
              'div',
              {
                className: _DoublePicker2.default.cancel,
                onClick: function onClick() {
                  _this2.props.onCancel();
                }
              },
              '\u53D6\u6D88'
            ),
            React.createElement(
              'div',
              {
                className: _DoublePicker2.default.confirm,
                onClick: function onClick() {
                  return _this2.props.onConfirm(_this2.state.leftValue + _this2.state.rightValue);
                }
              },
              '\u786E\u5B9A'
            )
          )
        )
      );
    }
  }]);

  return DoublePicker;
}(React.Component);

DoublePicker.propTypes = {
  show: React.PropTypes.bool.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.object.isRequired,
  defaultIndex: React.PropTypes.number,
  onConfirm: React.PropTypes.func.isRequired
};

exports.default = DoublePicker;
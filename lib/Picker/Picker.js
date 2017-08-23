'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Picker = require('./Picker.css');

var _Picker2 = _interopRequireDefault(_Picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by work on 17/2/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Picker = function (_React$Component) {
  _inherits(Picker, _React$Component);

  function Picker(props) {
    _classCallCheck(this, Picker);

    var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this, props));

    _this.reSetScroll = function (options) {
      if (_this.out) {
        clearTimeout(_this.out);
      }
      var target = _this.refs.options;
      var defaultScroll = target.scrollTop;
      _this.current = Math.round(target.scrollTop / 50);
      var length = options.length;
      if (_this.current <= 1) {
        _this.current = 1;
      } else if (_this.current > length - 1) {
        _this.current = length;
      }
      var scroll = _this.current * 50;
      var differ = defaultScroll - scroll;
      target.style.transition = 'transform 100ms linear';
      target.style.webkitTransition = 'transform 100ms linear';
      target.style.transform = 'translateY(' + differ + 'px)';
      target.style.webkitTransform = 'translateY(' + differ + 'px)';
      _this.out = setTimeout(function () {
        target.style.transition = null;
        target.style.webkitTransition = null;
        target.style.transform = 'translateY(0)';
        target.style.webkitTransform = 'translateY(0)';
        target.scrollTop = scroll;
      }, 80);
      var value = _this.props.options[_this.current - 1];
      if (value !== _this.value) {
        _this.value = value;
        _this.props.onChange(value);
      }
      _this.touchEnd = false;
    };

    _this.state = {
      firstOpen: true
    };
    _this.touchEnd = false;
    _this.scrollEnd = false;
    _this.timeOut = null;
    _this.out = null;
    _this.value = '';
    return _this;
  }

  _createClass(Picker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.options.length !== this.props.options.length) {
        this.reSetScroll(nextProps.options);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.show === true) {
        if (this.state.firstOpen) {
          if (this.props.defaultIndex !== undefined) {
            this.refs.options.scrollTop = (this.props.defaultIndex + 1) * 50;
          } else {
            this.refs.options.scrollTop = 50;
          }
          this.setState({ firstOpen: false }); //eslint-disable-line
        }
        this.reSetScroll(this.props.options);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeOut);
      clearTimeout(this.out);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        {
          className: _Picker2.default.panel,
          onScroll: function onScroll() {
            if (_this2.reset) {
              _this2.reset = false;
              return;
            }
            _this2.scrollEnd = false;
            if (_this2.timeOut) {
              clearTimeout(_this2.timeOut);
            }
            _this2.timeOut = setTimeout(function () {
              _this2.scrollEnd = true;
              if (_this2.scrollEnd) {
                if (_this2.touchEnd) {
                  _this2.reset = true;
                  _this2.reSetScroll(_this2.props.options);
                }
              }
            }, 80);
          },
          onTouchStart: function onTouchStart() {
            _this2.touchEnd = false;
          },
          onTouchEnd: function onTouchEnd() {
            _this2.touchEnd = true;
            if (_this2.scrollEnd && _this2.touchEnd) {
              _this2.reset = true;
              _this2.reSetScroll(_this2.props.options);
            }
          }
        },
        React.createElement('div', {
          className: _Picker2.default.line1,
          style: { backgroundColor: this.props.color ? this.props.color : '#3cb198' }
        }),
        React.createElement('div', {
          className: _Picker2.default.line2,
          style: { backgroundColor: this.props.color ? this.props.color : '#3cb198' }
        }),
        React.createElement(
          'div',
          { style: { width: '100%', height: '150px', overflowX: 'hidden' } },
          React.createElement(
            'div',
            {
              ref: 'options',
              className: _Picker2.default.options
            },
            React.createElement('div', { className: _Picker2.default.option }),
            React.createElement('div', { className: _Picker2.default.option }),
            this.props.options.map(function (item, index) {
              return React.createElement(
                'div',
                {
                  className: _Picker2.default.option,
                  key: index
                },
                item
              );
            }),
            React.createElement('div', { className: _Picker2.default.option }),
            React.createElement('div', { className: _Picker2.default.option })
          )
        )
      );
    }
  }]);

  return Picker;
}(React.Component);

Picker.propTypes = {
  options: React.PropTypes.array.isRequired,
  defaultIndex: React.PropTypes.number,
  color: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool
};
exports.default = Picker;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SinglePicker = require('./SinglePicker.css');

var _SinglePicker2 = _interopRequireDefault(_SinglePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by work on 17/2/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/**
 * Created by mac on 17/1/4.
 */

var SinglePicker = function (_React$Component) {
  _inherits(SinglePicker, _React$Component);

  function SinglePicker(props) {
    _classCallCheck(this, SinglePicker);

    var _this = _possibleConstructorReturn(this, (SinglePicker.__proto__ || Object.getPrototypeOf(SinglePicker)).call(this, props));

    _this.reSetScroll = function () {
      var target = _this.refs.options;
      var defaultScroll = target.scrollTop;
      _this.current = Math.round(target.scrollTop / 50);
      var length = _this.props.options.length;
      if (_this.current <= 1) {
        _this.current = 1;
      } else if (_this.current > length - 1) {
        _this.current = length;
      }
      var scroll = _this.current * 50;
      var differ = defaultScroll - scroll;
      // try {
      //   target.style = `transform: translateY(${differ}px);`;
      target.style.transition = 'transform 200ms ease';
      target.style.webkitTransition = 'transform 200ms ease';
      target.style.transform = 'translateY(' + differ + 'px)';
      target.style.webkitTransform = 'translateY(' + differ + 'px)';
      // Object.defineProperty(target, {
      //   set: (newValue) => {
      //     this.style = newValue;
      //   }
      // });
      // } catch (err) {
      //   alert(err);
      // }
      _this.out = setTimeout(function () {
        // target.style = 'transform: translateY(0px);';
        // target.style.transform = 'translateY(0px);';
        target.style.transition = null;
        target.style.webkitTransition = null;
        target.style.transform = 'translateY(0)';
        target.style.webkitTransform = 'translateY(0)';
        target.scrollTop = scroll;
      }, 150);
      // target.scrollTop = scroll;
      var value = _this.props.options[_this.current - 1];
      if (value !== _this.state.value) {
        console.log('haha');
        _this.setState({ value: value });
      }
      _this.touchEnd = false;
    };

    _this.current = _this.props.defaultIndex ? _this.props.defaultIndex : 0;
    _this.state = {
      firstOpen: true,
      value: _this.props.options[_this.current]
    };
    _this.touchEnd = false;
    _this.scrollEnd = false;
    _this.timeOut = null;
    return _this;
  }

  _createClass(SinglePicker, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.firstOpen) {
        if (this.props.defaultIndex !== undefined) {
          this.refs.options.scrollTop = (this.props.defaultIndex + 1) * 50;
        } else {
          this.refs.options.scrollTop = 50;
        }
        this.setState({ firstOpen: false }); //eslint-disable-line
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeOut);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        {
          className: _SinglePicker2.default.shadow,
          style: { display: this.props.show ? 'block' : 'none' },
          onScroll: function onScroll() {
            _this2.scrollEnd = false;
            if (_this2.timeOut !== null) {
              clearTimeout(_this2.timeOut);
            }
            _this2.timeOut = setTimeout(function () {
              _this2.scrollEnd = true;
              if (_this2.scrollEnd && _this2.touchEnd) {
                _this2.reSetScroll();
              }
            }, 80);
          },
          onTouchStart: function onTouchStart() {
            _this2.touchEnd = false;
          },
          onTouchEnd: function onTouchEnd() {
            _this2.touchEnd = true;
            if (_this2.scrollEnd && _this2.touchEnd) {
              _this2.reSetScroll();
            }
          }
        },
        React.createElement(
          'div',
          { className: _SinglePicker2.default.panel },
          React.createElement(
            'div',
            { className: _SinglePicker2.default.top },
            this.state.value || '',
            React.createElement(
              'small',
              { style: { fontSize: '0.3em' } },
              this.props.unit || ''
            )
          ),
          React.createElement(
            'div',
            { className: _SinglePicker2.default.box },
            React.createElement(
              'div',
              { className: _SinglePicker2.default.label },
              '\u9009\u62E9' + this.props.label
            ),
            React.createElement('div', { className: _SinglePicker2.default.line1 }),
            React.createElement('div', { className: _SinglePicker2.default.line2 }),
            React.createElement(
              'div',
              {
                ref: 'options',
                className: _SinglePicker2.default.options
              },
              React.createElement('div', { className: _SinglePicker2.default.option }),
              React.createElement('div', { className: _SinglePicker2.default.option }),
              this.props.options.map(function (item, index) {
                return React.createElement(
                  'div',
                  {
                    className: _SinglePicker2.default.option,
                    key: index
                  },
                  item
                );
              }),
              React.createElement('div', { className: _SinglePicker2.default.option }),
              React.createElement('div', { className: _SinglePicker2.default.option })
            )
          ),
          React.createElement(
            'div',
            { className: _SinglePicker2.default.action },
            React.createElement(
              'div',
              {
                className: _SinglePicker2.default.cancel,
                onClick: function onClick() {
                  _this2.props.onCancel();
                }
              },
              '\u53D6\u6D88'
            ),
            React.createElement(
              'div',
              {
                className: _SinglePicker2.default.confirm,
                onClick: function onClick() {
                  return _this2.props.onConfirm(_this2.props.options[_this2.current - 1]);
                }
              },
              '\u786E\u5B9A'
            )
          )
        )
      );
    }
  }]);

  return SinglePicker;
}(React.Component);

SinglePicker.propTypes = {
  show: React.PropTypes.bool.isRequired,
  unit: React.PropTypes.string.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  defaultIndex: React.PropTypes.number,
  onConfirm: React.PropTypes.func.isRequired
};

exports.default = SinglePicker;
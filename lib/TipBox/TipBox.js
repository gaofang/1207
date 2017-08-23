'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TipBox = require('./TipBox.css');

var _TipBox2 = _interopRequireDefault(_TipBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by work on 17/2/21.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/**
 * Created by work on 16/11/24.
 */


var TipBox = function (_React$Component) {
  _inherits(TipBox, _React$Component);

  function TipBox() {
    _classCallCheck(this, TipBox);

    return _possibleConstructorReturn(this, (TipBox.__proto__ || Object.getPrototypeOf(TipBox)).apply(this, arguments));
  }

  _createClass(TipBox, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: _TipBox2.default.shade, style: { display: this.props.isOpen ? 'block' : 'none' } },
        React.createElement(
          'div',
          {
            className: _TipBox2.default.box,
            style: {
              height: this.props.height,
              width: this.props.width,
              marginLeft: '-' + this.props.width / 2 + 'px',
              marginTop: '-' + this.props.height / 2 + 'px'
            }
          },
          React.createElement(
            'div',
            { className: _TipBox2.default.btn, onClick: this.props.onClose },
            React.createElement('div', { className: _TipBox2.default.line1 }),
            React.createElement('div', { className: _TipBox2.default.line2 })
          ),
          React.createElement(
            'div',
            { className: _TipBox2.default.container },
            this.props.children
          )
        )
      );
    }
  }]);

  return TipBox;
}(React.Component);

TipBox.propTypes = {
  children: React.PropTypes.element,
  isOpen: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  height: React.PropTypes.number,
  width: React.PropTypes.number
};

exports.default = TipBox;
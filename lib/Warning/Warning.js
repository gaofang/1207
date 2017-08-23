'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mark = require('./mark.png');

var _mark2 = _interopRequireDefault(_mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Warning = function (_React$Component) {
  _inherits(Warning, _React$Component);

  function Warning() {
    _classCallCheck(this, Warning);

    return _possibleConstructorReturn(this, (Warning.__proto__ || Object.getPrototypeOf(Warning)).apply(this, arguments));
  }

  _createClass(Warning, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        open: this.props.open,
        message: this.props.message,
        duration: this.props.duration
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.open) {
        this.setAutoHideTimer();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (this.props.open && nextProps.open && nextProps.message !== this.props.message) {
        this.setState({
          open: false
        });

        clearTimeout(this.timerOneAtTheTimeId);
        this.timerOneAtTheTimeId = setTimeout(function () {
          _this2.setState({
            message: nextProps.message,
            open: true
          });
        }, 400);
      } else {
        var open = nextProps.open;

        this.setState({
          open: open !== null ? open : this.state.open,
          message: nextProps.message
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var height = this.refs.panel.offsetHeight;
      var width = this.refs.panel.offsetWidth;
      this.refs.panel.style.marginTop = -height / 2 + 'px';
      this.refs.panel.style.marginLeft = -width / 2 + 'px';
      if (prevState.open !== this.state.open) {
        if (this.state.open) {
          this.setAutoHideTimer();
        } else {
          clearTimeout(this.timerAutoHideId);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timerAutoHideId);
      clearTimeout(this.timerOneAtTheTimeId);
    }

    // Timer that controls delay before snackbar auto hides

  }, {
    key: 'setAutoHideTimer',
    value: function setAutoHideTimer() {
      var _this3 = this;

      var duration = this.props.duration;

      if (duration > 0) {
        clearTimeout(this.timerAutoHideId);
        this.timerAutoHideId = setTimeout(function () {
          if (_this3.props.open !== null && _this3.props.closeHandler) {
            _this3.props.closeHandler('timeout');
          } else {
            _this3.setState({ open: false });
          }
        }, duration);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var message = this.props.message;

      var styles = {
        panel: {
          zIndex: '9999',
          position: 'fixed',
          top: '50%',
          left: '50%',
          fontSize: '14px',
          overflow: 'hidden',
          color: '#fff',
          padding: '15px',
          borderRadius: '5px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: this.state.open ? 'block' : 'none',
          width: '4rem',
          marginLeft: '-2rem'
        },
        img: {
          display: 'block',
          margin: '0 auto',
          width: '32px',
          height: '32px',
          marginBottom: '10px'
        },
        pre: {
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          lineHeight: '24px',
          textAlign: 'center',
          color: '#fff'
        }
      };
      return React.createElement(
        'div',
        { style: styles.panel, ref: 'panel' },
        React.createElement('img', { src: _mark2.default, alt: '', style: styles.img }),
        React.createElement(
          'pre',
          { style: styles.pre },
          message
        )
      );
    }
  }]);

  return Warning;
}(React.Component);

Warning.propTypes = {
  message: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool.isRequired,
  duration: React.PropTypes.number.isRequired,
  closeHandler: React.PropTypes.func.isRequired
};

exports.default = Warning;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toast = function (_React$Component) {
  _inherits(Toast, _React$Component);

  function Toast() {
    _classCallCheck(this, Toast);

    return _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).apply(this, arguments));
  }

  _createClass(Toast, [{
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

    // Timer that controls delay before click-away events are captured (based on when animation completes)
    // setTransitionTimer() {
    // 	this.timerTransitionId = setTimeout(() => {
    // 		this.timerTransitionId = undefined;
    // 	}, 400);
    // }

  }, {
    key: 'render',
    value: function render() {
      var message = this.props.message;

      var duration = this.props.duration - 400;
      var styles = {
        background: {
          zIndex: '9999',
          top: '0%',
          position: 'fixed',
          fontSize: '0.28rem',
          height: '0.7rem',
          lineHeight: '0.7rem',
          overflow: 'hidden',
          width: '100%',
          color: this.props.color || '#fff',
          padding: '0 0.3rem',
          backgroundColor: this.props.bgColor || 'rgba(0,0,0,0.7)',
          textAlign: 'center',
          // borderRadius: '10%',
          display: this.state.open ? 'block' : 'none',
          animation: 'fadeOut .3s linear ' + duration + 'ms',
          animationFillMode: 'forwards'
        }
      };
      return React.createElement(
        'div',
        { style: styles.background },
        message
      );
    }
  }]);

  return Toast;
}(React.Component);

Toast.propTypes = {
  message: React.PropTypes.string,
  open: React.PropTypes.bool,
  duration: React.PropTypes.number,
  closeHandler: React.PropTypes.func,
  bgColor: React.PropTypes.string,
  color: React.PropTypes.string
};

exports.default = Toast;
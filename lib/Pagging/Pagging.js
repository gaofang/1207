'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDocumentTitle = require('react-document-title');

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagging = function (_React$Component) {
  _inherits(Pagging, _React$Component);

  function Pagging(props) {
    _classCallCheck(this, Pagging);

    var _this = _possibleConstructorReturn(this, (Pagging.__proto__ || Object.getPrototypeOf(Pagging)).call(this, props));

    _this.firstUpdate = true;
    _this.style = {
      pagging: {
        height: '100%',
        overflowY: 'auto',
        width: '100%',
        WebkitOverflowScrolling: 'touch'
      }
    };
    return _this;
  }

  _createClass(Pagging, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.restoreScrollTop();
      if (typeof this.props.titleName === 'string') {
        this.setDocumentTitleForIos(this.props.titleName);
      }

      var that = this;
      window.onunload = function () {
        if (that && that.saveScrollTop) {
          that.saveScrollTop();
        }
      };
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.firstUpdate) {
        this.restoreScrollTop();
        this.firstUpdate = false;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.saveScrollTop();
    }
  }, {
    key: 'setDocumentTitleForIos',
    value: function setDocumentTitleForIos(title) {
      if (/ip(hone|od|ad)/i.test(window.navigator.userAgent)) {
        document.title = title;
        var iframe = document.createElement('iframe');
        iframe.src = '/favicon.ico';
        iframe.style.display = 'none';
        iframe.onload = function () {
          setTimeout(function () {
            iframe.remove();
          }, 0);
        };
        document.body.appendChild(iframe);
      }
    }
  }, {
    key: 'saveScrollTop',
    value: function saveScrollTop() {
      var paggingName = this.props.paggingName;

      if (paggingName) {
        var scrollBox = this.refs[paggingName + 'Pagging'];
        var scrollTop = scrollBox.scrollTop;
        var storage = window.localStorage;
        if (storage) {
          storage.setItem(paggingName + 'Pagging', scrollTop);
        }
      }
    }
  }, {
    key: 'restoreScrollTop',
    value: function restoreScrollTop() {
      var paggingName = this.props.paggingName;

      if (paggingName) {
        var storage = window.localStorage;
        var scrollTop = storage.getItem(paggingName + 'Pagging');
        if (scrollTop) {
          var scrollBox = this.refs[paggingName + 'Pagging'];
          scrollBox.scrollTop = scrollTop;
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          titleName = _props.titleName,
          paggingName = _props.paggingName;

      var paggingStyle = Object.assign({}, this.style.pagging, this.props.backColor ? { backgroundColor: this.props.backColor } : {});
      if (typeof titleName === 'string') {
        return React.createElement(
          _reactDocumentTitle2.default,
          { title: titleName },
          React.createElement(
            'div',
            { style: paggingStyle, ref: paggingName + 'Pagging' },
            this.props.children
          )
        );
      }
      return React.createElement(
        'div',
        { style: paggingStyle, ref: paggingName + 'Pagging' },
        this.props.children
      );
    }
  }]);

  return Pagging;
}(React.Component);

Pagging.propTypes = {
  paggingName: React.PropTypes.string,
  titleName: React.PropTypes.string,
  children: React.PropTypes.element,
  backColor: React.PropTypes.string
};

exports.default = Pagging;
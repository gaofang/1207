import DocumentTitle from 'react-document-title';
class Pagging extends React.Component {
  constructor(props) {
    super(props);
    this.firstUpdate = true;
    this.style = {
      pagging: {
        height: '100%',
        overflowY: 'auto',
        width: '100%',
        WebkitOverflowScrolling: 'touch'
      }
    };
  }

  componentDidMount() {
    this.restoreScrollTop();
    if (typeof this.props.titleName === 'string') {
      this.setDocumentTitleForIos(this.props.titleName);
    }

    const that = this;
    window.onunload = () => {
      if (that && that.saveScrollTop) {
        that.saveScrollTop();
      }
    };
  }

  componentDidUpdate() {
    if (this.firstUpdate) {
      this.restoreScrollTop();
      this.firstUpdate = false;
    }
  }

  componentWillUnmount() {
    this.saveScrollTop();
  }

  setDocumentTitleForIos(title) {
    if (/ip(hone|od|ad)/i.test(window.navigator.userAgent)) {
      document.title = title;
      const iframe = document.createElement('iframe');
      iframe.src = '/favicon.ico';
      iframe.style.display = 'none';
      iframe.onload = () => {
        setTimeout(() => {
          iframe.remove();
        }, 0);
      };
      document.body.appendChild(iframe);
    }
  }

  saveScrollTop() {
    const {paggingName} = this.props;
    if (paggingName) {
      const scrollBox = this.refs[`${paggingName}Pagging`];
      const scrollTop = scrollBox.scrollTop;
      const storage = window.localStorage;
      if (storage) {
        storage.setItem(`${paggingName}Pagging`, scrollTop);
      }
    }
  }

  restoreScrollTop() {
    const {paggingName} = this.props;
    if (paggingName) {
      const storage = window.localStorage;
      const scrollTop = storage.getItem(`${paggingName}Pagging`);
      if (scrollTop) {
        const scrollBox = this.refs[`${paggingName}Pagging`];
        scrollBox.scrollTop = scrollTop;
      }
    }
  }

  render() {
    const {titleName, paggingName} = this.props;
    const paggingStyle = Object.assign({},
      this.style.pagging, this.props.backColor ? {backgroundColor: this.props.backColor} : {});
    if (typeof titleName === 'string') {
      return (
        <DocumentTitle title={titleName}>
          <div style={paggingStyle} ref={`${paggingName}Pagging`}>
            {this.props.children}
          </div>
        </DocumentTitle>
      );
    }
    return (
      <div style={paggingStyle} ref={`${paggingName}Pagging`}>
        {this.props.children}
      </div>
    );
  }
}

Pagging.propTypes = {
  paggingName: React.PropTypes.string,
  titleName: React.PropTypes.string,
  children: React.PropTypes.element,
  backColor: React.PropTypes.string
};

export default Pagging;
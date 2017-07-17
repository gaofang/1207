import mark from './mark.png';
class Warning extends React.Component {

  componentWillMount() {
    this.setState({
      open: this.props.open,
      message: this.props.message,
      duration: this.props.duration
    });
  }

  componentDidMount() {
    if (this.state.open) {
      this.setAutoHideTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open && nextProps.open &&
      (nextProps.message !== this.props.message)) {
      this.setState({
        open: false
      });

      clearTimeout(this.timerOneAtTheTimeId);
      this.timerOneAtTheTimeId = setTimeout(() => {
        this.setState({
          message: nextProps.message,
          open: true
        });
      }, 400);
    } else {
      const open = nextProps.open;

      this.setState({
        open: open !== null ? open : this.state.open,
        message: nextProps.message
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const height = this.refs.panel.offsetHeight;
    const width = this.refs.panel.offsetWidth;
    this.refs.panel.style.marginTop = `${- height / 2}px`;
    this.refs.panel.style.marginLeft = `${- width / 2}px`;
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHideId);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    clearTimeout(this.timerOneAtTheTimeId);
  }

  // Timer that controls delay before snackbar auto hides
  setAutoHideTimer() {
    const duration = this.props.duration;

    if (duration > 0) {
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(() => {
        if (this.props.open !== null && this.props.closeHandler) {
          this.props.closeHandler('timeout');
        } else {
          this.setState({open: false});
        }
      }, duration);
    }
  }

  render() {
    const {
      message
    } = this.props;
    const styles = {
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
    return (
      <div style={styles.panel} ref="panel">
        <img src={mark} alt="" style={styles.img}/>
        <pre style={styles.pre}>{message}</pre>
      </div>
    );
  }
}

Warning.propTypes = {
  message: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool.isRequired,
  duration: React.PropTypes.number.isRequired,
  closeHandler: React.PropTypes.func.isRequired
};

export default Warning;
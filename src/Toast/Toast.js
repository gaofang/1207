class Toast extends React.Component {

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

  // Timer that controls delay before click-away events are captured (based on when animation completes)
  // setTransitionTimer() {
  // 	this.timerTransitionId = setTimeout(() => {
  // 		this.timerTransitionId = undefined;
  // 	}, 400);
  // }

  render() {
    const {
      message
    } = this.props;
    const duration = this.props.duration - 400;
    const styles = {
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
        animation: `fadeOut .3s linear ${duration}ms`,
        animationFillMode: 'forwards'
      }
    };
    return (
      <div style={styles.background}>
        {message}
      </div>
    );
  }
}

Toast.propTypes = {
  message: React.PropTypes.string,
  open: React.PropTypes.bool,
  duration: React.PropTypes.number,
  closeHandler: React.PropTypes.func,
  bgColor: React.PropTypes.string,
  color: React.PropTypes.string
};

export default Toast;
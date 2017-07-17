/**
 * Created by work on 17/2/13.
 */
import styles from './Picker.css';
class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstOpen: true
    };
    this.touchEnd = false;
    this.scrollEnd = false;
    this.timeOut = null;
    this.out = null;
    this.value = '';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.length !== this.props.options.length) {
      this.reSetScroll(nextProps.options);
    }
  }

  componentDidUpdate() {
    if (this.props.show === true) {
      if (this.state.firstOpen) {
        if (this.props.defaultIndex !== undefined) {
          this.refs.options.scrollTop = (this.props.defaultIndex + 1) * 50;
        } else {
          this.refs.options.scrollTop = 50;
        }
        this.setState({firstOpen: false});  //eslint-disable-line
      }
      this.reSetScroll(this.props.options);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
    clearTimeout(this.out);
  }

  reSetScroll = (options) => {
    if (this.out) {
      clearTimeout(this.out);
    }
    const target = this.refs.options;
    const defaultScroll = target.scrollTop;
    this.current = Math.round(target.scrollTop / 50);
    const length = options.length;
    if (this.current <= 1) {
      this.current = 1;
    } else if (this.current > length - 1) {
      this.current = length;
    }
    const scroll = this.current * 50;
    const differ = defaultScroll - scroll;
    target.style.transition = 'transform 100ms linear';
    target.style.webkitTransition = 'transform 100ms linear';
    target.style.transform = `translateY(${differ}px)`;
    target.style.webkitTransform = `translateY(${differ}px)`;
    this.out = setTimeout(() => {
      target.style.transition = null;
      target.style.webkitTransition = null;
      target.style.transform = 'translateY(0)';
      target.style.webkitTransform = 'translateY(0)';
      target.scrollTop = scroll;
    }, 80);
    const value = this.props.options[this.current - 1];
    if (value !== this.value) {
      this.value = value;
      this.props.onChange(value);
    }
    this.touchEnd = false;
  };

  render() {
    return (
      <div
        className={styles.panel}
        onScroll={() => {
          if (this.reset) {
            this.reset = false;
            return;
          }
          this.scrollEnd = false;
          if (this.timeOut) {
            clearTimeout(this.timeOut);
          }
          this.timeOut = setTimeout(() => {
            this.scrollEnd = true;
            if (this.scrollEnd) {
              if (this.touchEnd) {
                this.reset = true;
                this.reSetScroll(this.props.options);
              }
            }
          }, 80);
        }}
        onTouchStart={() => {
          this.touchEnd = false;
        }}
        onTouchEnd={() => {
          this.touchEnd = true;
          if (this.scrollEnd && this.touchEnd) {
            this.reset = true;
            this.reSetScroll(this.props.options);
          }
        }}
      >
        <div
          className={styles.line1}
          style={{backgroundColor: this.props.color ? this.props.color : '#3cb198'}}
        ></div>
        <div
          className={styles.line2}
          style={{backgroundColor: this.props.color ? this.props.color : '#3cb198'}}
        ></div>
        <div style={{width: '100%', height: '150px', overflowX: 'hidden'}}>
          <div
            ref='options'
            className={styles.options}
          >
            <div className={styles.option}></div>
            <div className={styles.option}></div>
            {
              this.props.options.map((item, index) => {
                return (
                  <div
                    className={styles.option}
                    key={index}
                  >{item}</div>
                );
              })
            }
            <div className={styles.option}></div>
            <div className={styles.option}></div>
          </div>
        </div>
      </div>
    );
  }
}
Picker.propTypes = {
  options: React.PropTypes.array.isRequired,
  defaultIndex: React.PropTypes.number,
  color: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool
};
export default Picker;
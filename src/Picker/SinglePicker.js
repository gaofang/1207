/**
 * Created by work on 17/2/13.
 */
/**
 * Created by mac on 17/1/4.
 */

import styles from './SinglePicker.css';
class SinglePicker extends React.Component {
  constructor(props) {
    super(props);
    this.current = this.props.defaultIndex ? this.props.defaultIndex : 0;
    this.state = {
      firstOpen: true,
      value: this.props.options[this.current]
    };
    this.touchEnd = false;
    this.scrollEnd = false;
    this.timeOut = null;
  }

  componentDidUpdate() {
    if (this.state.firstOpen) {
      if (this.props.defaultIndex !== undefined) {
        this.refs.options.scrollTop = (this.props.defaultIndex + 1) * 50;
      } else {
        this.refs.options.scrollTop = 50;
      }
      this.setState({firstOpen: false});  //eslint-disable-line
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  reSetScroll = () => {
    const target = this.refs.options;
    const defaultScroll = target.scrollTop;
    this.current = Math.round(target.scrollTop / 50);
    const length = this.props.options.length;
    if (this.current <= 1) {
      this.current = 1;
    } else if (this.current > length - 1) {
      this.current = length;
    }
    const scroll = this.current * 50;
    const differ = defaultScroll - scroll;
    // try {
    //   target.style = `transform: translateY(${differ}px);`;
    target.style.transition = 'transform 200ms ease';
    target.style.webkitTransition = 'transform 200ms ease';
    target.style.transform = `translateY(${differ}px)`;
    target.style.webkitTransform = `translateY(${differ}px)`;
    // Object.defineProperty(target, {
    //   set: (newValue) => {
    //     this.style = newValue;
    //   }
    // });
    // } catch (err) {
    //   alert(err);
    // }
    this.out = setTimeout(() => {
      // target.style = 'transform: translateY(0px);';
      // target.style.transform = 'translateY(0px);';
      target.style.transition = null;
      target.style.webkitTransition = null;
      target.style.transform = 'translateY(0)';
      target.style.webkitTransform = 'translateY(0)';
      target.scrollTop = scroll;
    }, 150);
    // target.scrollTop = scroll;
    const value = this.props.options[this.current - 1];
    if (value !== this.state.value) {
      console.log('haha');
      this.setState({value});
    }
    this.touchEnd = false;
  };

  render() {
    return (
      <div
        className={styles.shadow}
        style={{display: this.props.show ? 'block' : 'none'}}
        onScroll={() => {
          this.scrollEnd = false;
          if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
          }
          this.timeOut = setTimeout(() => {
            this.scrollEnd = true;
            if (this.scrollEnd && this.touchEnd) {
              this.reSetScroll();
            }
          }, 80);
        }}
        onTouchStart={() => { this.touchEnd = false; }}
        onTouchEnd={() => {
          this.touchEnd = true;
          if (this.scrollEnd && this.touchEnd) {
            this.reSetScroll();
          }
        }}
      >
        <div className={styles.panel}>
          <div className={styles.top}>
            {this.state.value || ''}
            <small style={{fontSize: '0.3em'}}>{this.props.unit || ''}</small>
          </div>
          <div className={styles.box}>
            <div className={styles.label}>
              {`选择${this.props.label}`}
            </div>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
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
          <div className={styles.action}>
            <div
              className={styles.cancel}
              onClick={() => { this.props.onCancel(); }}
            >
              取消
            </div>
            <div
              className={styles.confirm}
              onClick={() => this.props.onConfirm(this.props.options[this.current - 1])}
            >
              确定
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SinglePicker.propTypes = {
  show: React.PropTypes.bool.isRequired,
  unit: React.PropTypes.string.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  defaultIndex: React.PropTypes.number,
  onConfirm: React.PropTypes.func.isRequired
};

export default SinglePicker;
/**
 * Created by work on 17/2/13.
 */
/**
 * Created by mac on 17/1/4.
 */
import Picker from './Picker';
import styles from './DoublePicker.css';
class DoublePicker extends React.Component {
  constructor(props) {
    super(props);
    this.current = this.props.defaultIndex ? this.props.defaultIndex : 0;
    this.state = {
      firstOpen: true,
      leftValue: this.props.options.left.items[this.current],
      rightValue: this.props.options.right.items[this.current]
    };
  }

  render() {
    const left = this.props.options.left;
    const right = this.props.options.right;
    return (
      <div
        className={styles.shadow}
        style={{display: this.props.show ? 'block' : 'none'}}
      >
        <div className={styles.panel}>
          <div className={styles.top}>
            <span>{this.state.leftValue}</span>
            <span>{this.state.rightValue}</span>
          </div>
          <div className={styles.mid}>
            <div className={styles.label}>
              {`选择${this.props.label}`}
            </div>
            <div className={styles.box}>
              <Picker options={left.items} onChange={(value) => this.setState({leftValue: value})} />
              <Picker options={right.items} onChange={(value) => this.setState({rightValue: value})} />
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
              onClick={() => this.props.onConfirm(this.state.leftValue + this.state.rightValue)}
            >
              确定
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DoublePicker.propTypes = {
  show: React.PropTypes.bool.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.object.isRequired,
  defaultIndex: React.PropTypes.number,
  onConfirm: React.PropTypes.func.isRequired
};

export default DoublePicker;
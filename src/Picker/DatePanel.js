/**
 * Created by work on 17/3/15.
 */
import Picker from './Picker';
import styles from './DatePanel.css';
class DatePanel extends React.Component {
  constructor(props) {
    super(props);
    const year = parseInt(new Date().getFullYear(), 10);
    const minY = (typeof this.props.minYear === 'number') ? this.props.minYear : (year - 100);
    const maxY = (typeof this.props.maxYear === 'number') ? this.props.maxYear : (year + 100);
    this.defValue = this.props.defaultIndex ? this.props.defaultIndex
      : [(parseInt(new Date().getFullYear(), 10) - minY), (parseInt(new Date().getMonth(), 10)),
        (parseInt(new Date().getDate(), 10) - 1)];
    this.yearItems = [];
    this.monthItems = [];
    this.dayItems = [];
    for (let y = minY; y <= maxY; y ++) {
      this.yearItems.push(y);
    }
    for (let m = 1; m <= 12; m ++) {
      this.monthItems.push(m);
    }
    const defY = this.yearItems[this.defValue[0]];
    const defM = this.monthItems[this.defValue[1]];
    const totalDays = new Date(defY, defM, 0).getDate();
    for (let d = 1; d <= totalDays; d++) {
      this.dayItems.push(d);
    }
    const defD = this.dayItems[this.defValue[2]];
    this.state = {
      year: defY,
      month: defM,
      day: defD
    };
  }

  handleSetDay = (y, m) => {
    this.dayItems = [];
    const totalDays = new Date(y, m, 0).getDate();
    for (let d = 1; d <= totalDays; d++) {
      this.dayItems.push(d);
    }
    this.setState({year: y, month: m});
  };
  addZero = (str) => {
    let string = str;
    if (typeof string !== 'string') {
      string = string.toString();
    }
    string = string.length <= 1 ? `0${string}` : string;
    return string;
  };

  render() {
    return (
      <div
        className={styles.shadow}
        style={{display: this.props.show ? 'block' : 'none'}}
      >
        <div className={styles.panel}>
          <div className={styles.top}>
            <span>{this.state.year}</span>
            <small>年</small>
            <span>{this.state.month}</span>
            <small>月</small>
            <span>{this.state.day}</span>
            <small>日</small>
          </div>
          <div className={styles.mid}>
            <div className={styles.label}>
              {`选择${this.props.label}`}
            </div>
            <div className={styles.box}>
              <Picker
                options={this.yearItems}
                onChange={(value) => this.handleSetDay(value, this.state.month)}
                defaultIndex={this.defValue[0]}
                show={this.props.show}
              />
              <p>年</p>
              <Picker
                options={this.monthItems}
                onChange={(value) => this.handleSetDay(this.state.year, value)}
                defaultIndex={this.defValue[1]}
                show={this.props.show}
              />
              <p>月</p>
              <Picker
                options={this.dayItems}
                onChange={(value) => this.setState({day: value})}
                defaultIndex={this.defValue[2]}
                show={this.props.show}
              />
              <p>日</p>
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
              onClick={() => {
                const value = {
                  show: `${this.state.year}年${this.addZero(this.state.month)}月${this.addZero(this.state.day)}日`,
                  pass: `${this.state.year}-${this.addZero(this.state.month)}-${this.addZero(this.state.day)}`
                };
                this.props.onConfirm(value); //eslint-disable-line
              }}
            >
              确定
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DatePanel.propTypes = {
  show: React.PropTypes.bool.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  minYear: React.PropTypes.number,
  maxYear: React.PropTypes.number,
  defaultIndex: React.PropTypes.number,
  onConfirm: React.PropTypes.func.isRequired
};

export default DatePanel;
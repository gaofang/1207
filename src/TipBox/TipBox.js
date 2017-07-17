/**
 * Created by work on 17/2/21.
 */
/**
 * Created by work on 16/11/24.
 */
import styles from './TipBox.css';

class TipBox extends React.Component {

  render() {
    return (
      <div className={styles.shade} style={{display: this.props.isOpen ? 'block' : 'none'}}>
        <div
          className={styles.box}
          style={{
            height: this.props.height,
            width: this.props.width,
            marginLeft: `-${this.props.width / 2}px`,
            marginTop: `-${this.props.height / 2}px`
          }}
        >
          <div className={styles.btn} onClick={this.props.onClose}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
          </div>
          <div className={styles.container}>
            {
              this.props.children
            }
          </div>
        </div>
      </div>
    );
  }
}

TipBox.propTypes = {
  children: React.PropTypes.element,
  isOpen: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  height: React.PropTypes.number,
  width: React.PropTypes.number
};

export default TipBox;
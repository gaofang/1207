/**
 * Created by work on 16/10/26.
 */
import loadingIco from './dataLoad.png';
import loadingIcoBlue from './dataLoadBlue.png';
import styles from './Dataloading.css';
class DataLoading extends React.Component {
  render() {
    return (<div>
      <div className={styles.container}>
        <img src={this.props.theme === 'blue' ? loadingIcoBlue : loadingIco} alt=""/>
      </div>
      <div className={styles.tips}>数据加载中...</div>
    </div>);
  }
}
DataLoading.propTypes = {
  theme: React.PropTypes.string
};
export default DataLoading;
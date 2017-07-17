/**
 * Created by work on 17/7/17.
 */
import DataLoading from '../src/DataLoading/DataLoading';
export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    if (true) {
      return (
        <DataLoading/>
      );
    }
    return (
      <div>
        <button>test btn</button>
      </div>
    );
  }
}
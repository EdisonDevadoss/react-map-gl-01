import React, {PureComponent} from 'react';
import moment from 'moment';


const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {


  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {settings} = this.props;

    const getWeek=(number)=>{
      let date = moment('2019').add(number, 'weeks');
      return date.format('DD-MM-YYYY')
    }

    return (
      <Container>
        <h3>Interactive GeoJSON</h3>
        <p>
          Map showing cfs units <b>{getWeek(settings.week)}</b>. Hover over a
          state to see details.
        </p>
        <hr />

        <div key={'week'} className="input">
          <label>Week</label>
          <input
            type="range"
            value={settings.week}
            min={0}
            max={53}
            step={1}
            onChange={evt => this.props.onChange('week', evt.target.value)}
          />
        </div>
      </Container>
    );
  }
}

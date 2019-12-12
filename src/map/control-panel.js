import React, { PureComponent } from 'react';
import moment from 'moment';

const defaultContainer = ({ children }) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const { settings } = this.props;

    const getDate = (number) => {
      let date = moment('2019').add(number - 1, 'months');
      return date.format('MMM-YYYY')
    }

    return (
      <Container>
        <h3>Events by state</h3>
        <p>
          Map showing the number of CISF events for the month of
        <b>{getDate(settings.month)}</b>. Hover over a state to see details.
      </p>
        <hr />

        <div key={'month'} className="input">
          <label>Month</label>
          <input type="range" value={settings.month} min={1} max={12} step={1} onChange={evt => this.props.onChange('month', evt.target.value)} />
        </div>
      </Container>
    );
  }
}

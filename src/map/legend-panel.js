import React, { PureComponent } from 'react';

const defaultContainer = ({ children }) => <div className="legend-panel">{children}</div>;

const colors = [

  [
    0, '#F2F12D'
  ],
  [
    1, '#EED322'
  ],
  [
    2, '#E6B71E'
  ],
  [
    3, '#DA9C20'
  ],
  [
    4, '#CA8323'
  ],
  [
    5, '#B86B25'
  ],
  [
    6, '#A25626'
  ],
  [
    7, '#8B4225'
  ],
  [
    8, '#723122'
  ]

]

export default class LegenPanel extends PureComponent {

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    return (
      <Container>
        <label>Events</label>
        {
          colors.map((vaue) => {
            return (<div key={vaue[0]} className="input">
              <label>{vaue[0]}
              </label>
              <input className="legend-input" type="color" value={vaue[1]} disabled={true}
              // onChange={this._onColorChange.bind(this, name)}
              />
            </div>
            )
          })
        }
      </Container>
    );
  }
}

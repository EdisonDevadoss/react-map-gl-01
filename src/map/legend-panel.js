import React, {PureComponent} from 'react';
import moment from 'moment';


const defaultContainer = ({children}) => <div className="legend-panel">{children}</div>;

const categories = ['Low', 'Medium', 'High'];

export default class LegenPanel extends PureComponent {
  constructor(props){
    super(props);
    this.state ={
      color: {
       Low: '#FFFF00',
       Medium: '#00ff00',
       High: '#d53e4f'
     }
    }
  }

  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {settings} = this.props;
    const {color} = this.state;

    return (
      <Container>
      {categories.map((vaue)=>{
        return(
        <div key={vaue} className="input">
          <label>{vaue} </label>
          <input
            className="legend-input"
            type="color"
            value={color[vaue]}
            disabled={true}
            // onChange={this._onColorChange.bind(this, name)}
          />
        </div>
      )
      })}
      </Container>
    );
  }
}

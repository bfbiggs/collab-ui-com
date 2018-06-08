import React from 'react';

export default class ParentContainer extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div><h1>{title}</h1></div>
    );
  }

}

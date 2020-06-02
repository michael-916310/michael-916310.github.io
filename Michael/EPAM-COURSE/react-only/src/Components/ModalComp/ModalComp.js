import React from 'react';
import ReactDOM from 'react-dom';
import './ModalComp.scss';

export class ModalComp extends React.Component{
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.modalRoot = document.getElementById('modal-root');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

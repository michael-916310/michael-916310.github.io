import React from 'react';
import {ModalComp} from './../ModalComp/ModalComp';
import  './Modal2ButtonsComp.scss';

export function Modal2ButtonsComp(props){

  return(
    <ModalComp>
      <div className='modal-2-buttons__background'>
        <div className='modal-2-buttons__outer-container'>
          <div>
            {props.message}
          </div>
          <div className='modal-2-buttons__button-container'>
            <input 
              className='modal-2-buttons__action-button' 
              type="button" 
              value={props.actionButtonName}
              onClick={props.onActionClick}/>
            <input 
              className='modal-2-buttons__action-button' 
              type="button" 
              value="CLOSE"
              onClick={props.onCloseClick}
            />
          </div>
        </div>
      </div>
    </ModalComp>
  )
}
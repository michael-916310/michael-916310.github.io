import React from 'react';
import {ModalComp} from './../ModalComp/ModalComp';
import './SpinnerComp.scss'

export function SpinnerComp(props) {
    if (props.isLoading) {
      return (
      <ModalComp>
      <div className='spinner-comp-background'>
        <img  src='/img/load.gif' alt='spinner' />
      </div>
    </ModalComp>
      )
    } else {
      return null;
    }
}
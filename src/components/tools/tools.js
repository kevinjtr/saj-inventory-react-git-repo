import React from 'react'
import {CircularProgress} from '@mui/material';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getQueryStringParams = query => {
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce((params, param) => {
                    let [key, value] = param.split('=');
                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                    return params;
                }, {}
            )
        : {}
  };

export const contains = (target, pattern) => {
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
}

export const LoadingCircle = () => {
    return(
        <CircularProgress key={uuidv4()}/>
    )
}

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

export const ALERT = {
	SUCCESS: {success:{active:true,text:`Action was completed [${moment(new Date()).format('L HH:mm:ss')}].`},error:{active:false,text:''}},
	FAIL: (text=null) => { return {success:{active:true,text:''},error:{active:true,text:`${text ? text : 'Could not complete action'} [${moment(new Date()).format('L HH:mm:ss')}].`}}},
	RESET: {success:{active:false,text:''},error:{active:false,text:''}},
}
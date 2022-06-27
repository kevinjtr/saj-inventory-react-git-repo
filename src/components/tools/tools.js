import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
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

export function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
    
    return (
        <MaskedInput
        {...other}
        ref={(ref) => {
            inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
        />
    );
    }
    
TextMaskCustom.propTypes = {
inputRef: PropTypes.func.isRequired,
};

export function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    
    return (
        <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
            onChange({
            target: {
                name: props.name,
                value: values.value,
            },
            });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
        />
    );
    }
    
NumberFormatCustom.propTypes = {
inputRef: PropTypes.func.isRequired,
name: PropTypes.string.isRequired,
onChange: PropTypes.func.isRequired,
};

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

export const ALERT = {
	SUCCESS: {success:{active:true,text:`Action was completed [${moment(new Date()).format('L HH:mm:ss')}].`},error:{active:false,text:''}},
	FAIL: (text=null) => { return {success:{active:true,text:''},error:{active:true,text:`${text ? text : 'Could not complete action'} [${moment(new Date()).format('L HH:mm:ss')}].`}}},
	RESET: {success:{active:false,text:''},error:{active:false,text:''}},
}
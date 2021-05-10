import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';


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
        <CircularProgress />
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
    
import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';

import RawIcon, { IconSize } from '../system-icons/RawIcon';
import Tooltip from '../tooltip/Tooltip';
import { blurOnBubbling } from './script';
import Text from '../text/Text';

const IconButton = React.forwardRef(
  (
    {
      variant = 'surface',
      size = 'normal',
      type = 'button',
      tooltip = null,
      tooltipPlacement = 'top',
      src,
      onClick = null,
      tabIndex = 0,
      disabled = false,
      isImage = false,
      className = '',
    }: {
      variant?: string;
      size?: IconSize;
      type?: 'button' | 'submit' | 'reset';
      tooltip?: string;
      tooltipPlacement?: string;
      src: string;
      onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
      tabIndex?: number;
      disabled?: boolean;
      isImage?: boolean;
      className?: string;
    },
    elementRef: React.Ref<HTMLButtonElement>,
  ) => {
    const btn = (
      <button
        ref={elementRef}
        className={`ic-btn ic-btn-${variant} ${className}`}
        onMouseUp={(e) => blurOnBubbling(e, `.ic-btn-${variant}`)}
        onClick={onClick}
        // eslint-disable-next-line react/button-has-type
        type={type}
        tabIndex={tabIndex}
        disabled={disabled}
      >
        <RawIcon size={size} src={src} isImage={isImage} />
      </button>
    );
    if (tooltip === null) return btn;
    return (
      <Tooltip placement={tooltipPlacement} content={<Text variant="b2">{tooltip}</Text>}>
        {btn}
      </Tooltip>
    );
  },
);

IconButton.propTypes = {
  variant: PropTypes.oneOf(['surface', 'primary', 'positive', 'caution', 'danger']),
  size: PropTypes.oneOf(['normal', 'small', 'extra-small']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  isImage: PropTypes.bool,
  className: PropTypes.string,
};

export default IconButton;

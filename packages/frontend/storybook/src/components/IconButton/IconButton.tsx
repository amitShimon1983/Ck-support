import { IButtonStyles } from '@fluentui/react';
import { IconButton as FluentIconButton } from '@harmon.ie/collabria-frontend-shared';
import React, { FunctionComponent } from 'react';
interface IconButtonProps {
  id?: string;
  onClick?: () => void;
  iconProps?: { iconName: string };
  title?: string;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
  menuProps?: any;
  styles?: IButtonStyles;
}

export const IconButton: FunctionComponent<IconButtonProps> = ({
  onClick,
  iconProps,
  title,
  ariaLabel,
  disabled,
  styles,
  className,
  menuProps,
  id,
  ...rest
}) => {
  return (
    <FluentIconButton
      id={id}
      className={className}
      disabled={disabled}
      onClick={onClick}
      iconProps={iconProps}
      title={title}
      ariaLabel={ariaLabel}
      styles={styles}
      menuProps={menuProps}
      {...rest}
    />
  );
};

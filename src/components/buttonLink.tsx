import Button, { ButtonTypeMap } from "@material-ui/core/Button";
import { ExtendButtonBaseTypeMap } from "@material-ui/core/ButtonBase";
import { OverrideProps } from "@material-ui/core/OverridableComponent";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

// The usage of React.forwardRef will no longer be required for react-router-dom v6.
// see https://github.com/ReactTraining/react-router/issues/6056
const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link innerRef={ref as any} {...props} />
);

interface ButtonLinkProps
  extends OverrideProps<
    ExtendButtonBaseTypeMap<ButtonTypeMap<{}, typeof AdapterLink>>,
    typeof AdapterLink
  > {}

const ButtonLink: React.FC<ButtonLinkProps> = ({ children, ...otherProps }) => {
  return (
    <Button {...otherProps} component={AdapterLink}>
      {children}
    </Button>
  );
};

export default ButtonLink;

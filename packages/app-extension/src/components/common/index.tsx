import { walletAddressDisplay } from "@coral-xyz/common";
import type { CustomTheme } from "@coral-xyz/themes";
import { HOVER_OPACITY, styles, useCustomTheme } from "@coral-xyz/themes";
import { Box, Button, Checkbox as _Checkbox, Typography } from "@mui/material";
import type { BigNumber } from "ethers";
import { ethers } from "ethers";

import { TextField } from "../../plugin/Component";

export { TextField };
export { walletAddressDisplay } from "@coral-xyz/common";

const useStyles = styles((theme: CustomTheme) => ({
  leftLabel: {
    color: theme.custom.colors.fontColor,
    fontSize: "16px",
    lineHeight: "16px",
    fontWeight: 500,
  },
  rightLabel: {
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.custom.colors.fontColor,
  },
  button: {
    width: "100%",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: theme.custom.colors.primaryButton,
    "&.Mui-disabled": {
      opacity: 0.5,
      backgroundColor: theme.custom.colors.primaryButton,
    },
    "&:hover": {
      backgroundColor: theme.custom.colors.primaryButton,
    },
  },
  primaryButton: {
    "&:hover": {
      opacity: HOVER_OPACITY,
      background: `${theme.custom.colors.primaryButton} !important`,
      backgroundColor: `${theme.custom.colors.primaryButton} !important,`,
    },
  },
  negativeButton: {
    "&:hover": {
      opacity: HOVER_OPACITY,
      background: `${theme.custom.colors.negative} !important`,
      backgroundColor: `${theme.custom.colors.negative} !important,`,
    },
  },
  header: {
    color: theme.custom.colors.fontColor,
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "32px",
  },
  checkBox: {
    color: theme.custom.colors.primaryButton,
    width: "18px",
    height: "18px",
    "&.Mui-disabled": {
      opacity: 0.5,
    },
  },
  checkBoxRoot: {
    padding: 0,
  },
  checkBoxChecked: {
    color: `${theme.custom.colors.primaryButton} !important`,
    background: "white",
  },
  subtext: {
    color: theme.custom.colors.subtext,
  },
  checkFormButton: {
    display: "flex",
    marginTop: "8px",
    "&:hover": {
      backgroundColor: "transparent !important",
      background: "transparent !important",
      opacity: 0.8,
    },
  },
}));

export function WalletAddress({ publicKey, name, style, nameStyle }: any) {
  const theme = useCustomTheme();
  return (
    <div
      style={{
        display: "flex",
        ...style,
      }}
    >
      <Typography style={{ ...nameStyle, marginRight: "8px" }}>
        {name}
      </Typography>
      {publicKey && (
        <Typography style={{ color: theme.custom.colors.secondary }}>
          ({walletAddressDisplay(publicKey)})
        </Typography>
      )}
    </div>
  );
}

export function TokenInputField({
  decimals,
  ...props
}: {
  decimals: number;
} & React.ComponentProps<typeof TextField>) {
  // Truncate token input fields to the native decimals of the token to prevent
  // floats
  const handleTokenInput = (
    amount: string,
    decimals: number,
    setValue: (
      displayAmount: string | null,
      nativeAmount: BigNumber | null
    ) => void
  ) => {
    if (amount !== "") {
      const decimalIndex = amount.indexOf(".");
      const truncatedAmount =
        decimalIndex >= 0
          ? amount.substring(0, decimalIndex) +
            amount.substring(decimalIndex, decimalIndex + decimals + 1)
          : amount;
      setValue(
        truncatedAmount,
        ethers.utils.parseUnits(truncatedAmount, decimals)
      );
    } else {
      setValue(null, null);
    }
  };

  return (
    <TextField
      {...props}
      // Override default TextField setValue with function to truncate decimal inputs
      setValue={(amount: string) => {
        handleTokenInput(amount, decimals, props.setValue);
      }}
    />
  );
}

export function SubtextParagraph({
  children,
  style,
  onClick,
}: {
  children: any;
  onClick?: any;
  style?: React.CSSProperties;
}) {
  const classes = useStyles();
  return (
    <p
      className={classes.subtext}
      style={{ fontWeight: 500, marginTop: "8px", ...style }}
      onClick={onClick}
    >
      {children}
    </p>
  );
}

export function Header({
  text,
  style = {},
}: {
  text: string;
  style?: React.CSSProperties;
}) {
  const classes = useStyles();
  return (
    <Typography className={classes.header} style={style}>
      {text}
    </Typography>
  );
}

export function HeaderIcon({
  icon,
  style,
}: {
  icon: any;
  style?: React.CSSProperties;
}) {
  return (
    <Box
      style={{
        display: "block",
        height: "56px",
        width: "56px",
        margin: "8px auto 16px auto",
        ...style,
      }}
    >
      {icon}
    </Box>
  );
}

export function Checkbox({
  checked,
  setChecked = () => {},
  ...checkboxProps
}: {
  checked: boolean;
  setChecked?: (value: boolean) => void;
} & React.ComponentProps<typeof _Checkbox>) {
  const classes = useStyles();
  return (
    <_Checkbox
      disableRipple
      className={classes.checkBox}
      checked={checked}
      onChange={() => setChecked(!checked)}
      classes={{
        checked: classes.checkBoxChecked,
        root: classes.checkBoxRoot,
      }}
      {...checkboxProps}
    />
  );
}

export function CheckboxForm({
  checked,
  setChecked,
  label,
}: {
  checked: boolean;
  setChecked: (value: boolean) => void;
  label: string | React.ReactNode;
}) {
  const classes = useStyles();
  return (
    <Button
      className={classes.checkFormButton}
      style={{
        padding: 0,
        textTransform: "none",
      }}
      onClick={() => setChecked(!checked)}
      disableRipple
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Checkbox
          checked={checked}
          setChecked={setChecked}
          sx={{ padding: 0 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginLeft: "10px",
        }}
      >
        <Typography className={classes.subtext}>{label}</Typography>
      </div>
    </Button>
  );
}

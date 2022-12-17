
export default function Card(theme: any) {
    return {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: theme.customShadows.card,
            borderRadius: Number(theme.shape.borderRadius) * 2,
            position: 'relative',
            zIndex: 0,
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: { variant: 'h6' },
          subheaderTypographyProps: { variant: 'body2' },
        },
        styleOverrides: {
          root: {
            padding: theme.spacing(3, 3, 3, 3),
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: theme.spacing(3),
          },
        },
      },
    };
  }
  
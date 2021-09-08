import tinycolor from "tinycolor2";

export namespace Theme {
    type Colors = {
        cardBackground: string
        cardBorder: string
        cardHoverBackground: string
        cardHoverBorder: string
        cardActiveBackground: string
        cardActiveBorder: string
        cardGhostBackground: string
    }

    type Factory = (primaryColor: string) => Colors;

    export const getLight: Factory = (primaryColor) => ({
        cardBackground: "white",
        cardBorder: "$deepBlue3",
        cardHoverBackground: "rgba(0,0,0,.05)",
        cardHoverBorder: "rgba(0,0,0,.15)",
        cardActiveBackground: "rgba(0,0,0,.03)",
        cardActiveBorder: "$primary",
        cardGhostBackground: "$deepBlue2",
    });

    export const getDark: Factory = (primaryColor) => ({
        cardBackground: "$deepBlue2",
        cardBorder: "$deepBlue3",
        cardHoverBackground: 'rgba(255,255,255,.12)',
        cardHoverBorder: tinycolor(primaryColor).setAlpha(.6),
        cardActiveBackground: 'rgba(255,255,255,.07)',
        cardActiveBorder: tinycolor(primaryColor).setAlpha(.4),
        cardGhostBackground: "$deepBlue1",
    })
}
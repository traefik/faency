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

    export const light: Colors = {
        cardBackground: "white",
        cardBorder: "$deepBlue3",
        cardHoverBackground: "rgba(0,0,0,.05)",
        cardHoverBorder: "rgba(0,0,0,.15)",
        cardActiveBackground: "rgba(0,0,0,.03)",
        cardActiveBorder: "$primary",
        cardGhostBackground: "$deepBlue2",
    }

    export const dark: Colors = {
        cardBackground: "$deepBlue2",
        cardBorder: "$deepBlue3",
        cardHoverBackground: "rgba(255,255,255,.12)",
        cardHoverBorder: "$primary",
        cardActiveBackground: "rgba(255,255,255,.07)",
        cardActiveBorder: "$primary",
        cardGhostBackground: "$deepBlue1",
    }
}
type CardTheme = {
    cardBackground: string
    cardBorder: string
    cardHoverBackground: string
    cardHoverBorder: string
    cardGhostBackground: string
}

export const light: CardTheme = {
    cardBackground: "white",
    cardBorder: "$deepBlue3",
    cardHoverBackground: "rgba(0,0,0,.05)",
    cardHoverBorder: "rgba(0,0,0,.15)",
    cardGhostBackground: "$deepBlue2",
}

export const dark: CardTheme = {
    cardBackground: "$deepBlue2",
    cardBorder: "$deepBlue3",
    cardHoverBackground: "rgba(255,255,255,.1)",
    cardHoverBorder: "$primary",
    cardGhostBackground: "$deepBlue1",
}


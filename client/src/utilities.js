
export default function getColorByIndex(index) {

    let colors = [ '#f5bf03', '#8ee7df', '#f7df68', '#f48027', '#bdc394' ]

    return colors[index % colors.length]
} 

/* Identifiers for nav tabs */
export const HOME_TAB = "home_tab"
export const PLANTS_TAB = "plants_tab"
export const GARDEN_TAB = "garden_tab"

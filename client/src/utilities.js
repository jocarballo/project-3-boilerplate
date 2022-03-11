
export default function getColorByIndex(index) {

    let colors = [ '#f5bf03', '#8ee7df', '#f7df68', '#f48027', '#bdc394' ]

    return colors[index % colors.length]
} 

// 0 => 0/5 => 0
// 1 => 1/5 => 1
// 2 => 2/5 => 2
// ..
// 5 => 5/5 => 0
// 6 => 6/5 => 1
// 7 => 7/5 => 2



/* Identifiers for nav tabs */
export const HOME_TAB = "home_tab"
export const PLANTS_TAB = "plants_tab"
export const GARDEN_TAB = "garden_tab"
export const ASK_A_BOTANIC_TAB = "question_tab"
export const EVENTS_TAB = "events_tab"
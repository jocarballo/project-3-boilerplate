
export default function getColorByIndex(index) {

    let colors = [ '#f5bf03', '#8ee7df', '#f7df68', '#f48027', '#bdc394' ]

    return colors[index % colors.length]

} 

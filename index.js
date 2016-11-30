import * as aframe from 'aframe'
import 'kframe/dist/k-frame'
import * as d3 from 'd3'

window.addEventListener('load', function() {
    document.querySelector('a-scene').addEventListener('loaded', main)
})

function main() {

    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('keydown', handleKeyDown)

    let data = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
    ]

    let scene = d3.select('a-scene')

    let i = 0
    let boxes = scene
        .select('#keyboard')
        .selectAll('a-entity')
        .data(data)
        .enter()

    let rows = boxes.append('a-entity')
        .selectAll('.key')
        .data(d => d)
        .enter()

    let keys = rows.append('a-entity')
        .attr('class', 'key')
        .attr('data-key', d => d)
        .attr('position', function(d, i, j) {
            let row = data.indexOf(d3.select(this.parentNode).datum())
            return `${2.5 * i} ${-1 * row} ${2.5 * row}`
        })
        .each(function() {
            this.baseYPosition = this.getAttribute('position').y
        })

    let buttons = keys.append('a-box')
        .attr('color', '#4CC3D9')
        .attr('depth', 2)
        .attr('width', 2)
        .attr('height', 0.3)

    let letters = keys.append('a-plane')
        .attr('color', '#000000')
        .attr('rotation', '-90 0 0')
        .attr('text', d => `text: ${d}`)
        .attr('position', '0 0.2 0')
        .attr('curveSegments', 1)

}

function handleKeyUp(event) {
    let key = document.querySelector(`[data-key="${event.key.toUpperCase()}"]`)
    if (!key) {
        return
    }
    key.setAttribute('position', 'y', key.baseYPosition)
}

function handleKeyDown(event) {
    let key = document.querySelector(`[data-key="${event.key.toUpperCase()}"]`)
    if (!key) {
        return
    }
    key.setAttribute('position', 'y', key.baseYPosition - 1)
}

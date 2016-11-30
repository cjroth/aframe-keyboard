import * as AFRAME from 'aframe'
import './kframe/components/text'
import './kframe/components/sun-sky/dist/aframe-sun-sky.min.js'
import * as d3 from 'd3'

import { default as CanvasTextEditor } from './canvas-text-editor/lib/CanvasTextEditor'
import { default as Document } from './canvas-text-editor/lib/Document'

window.addEventListener('load', function() {
    // document.querySelector('a-scene').addEventListener('loaded', main)
    main()
})

function main() {

    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keypress', handleKeyPress)

    let canvas = document.querySelector('#app')
    let doc = new Document('What\'s on your mind?')
    let editor = new CanvasTextEditor(doc, {
        canvas,
        backgroundColor: '#fff',
        textColor: '#000',
        selectionColor: 'yellow',
        focusColor: 'green',
        fontFamily: 'Verdana'
    })

    window.editor = editor

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
        .attr('color', '#ffffff')
        .attr('opacity', 0.5)
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
    if (key) {
        key.setAttribute('position', 'y', key.baseYPosition)
    }
    window.editor.dispatchEvent('keyup', event)
}

function handleKeyDown(event) {
    let key = document.querySelector(`[data-key="${event.key.toUpperCase()}"]`)
    if (key) {
        key.setAttribute('position', 'y', key.baseYPosition - 1)
    }
    window.editor.dispatchEvent('keydown', event)
}

function handleKeyPress(event) {
    window.editor.dispatchEvent('keypress', event)
}

AFRAME.registerComponent('sun-position-setter', {
  init: function () {
    var skyEl = this.el;
    var orbitEl = this.el.sceneEl.querySelector('#orbit');
    orbitEl.addEventListener('componentchanged', function changeSun (evt) {
      var sunPosition;
      var phi;
      var theta;
      if (evt.detail.name !== 'rotation') { return; }
      sunPosition = orbitEl.getComputedAttribute('rotation');
      if(sunPosition === null) { return; }
      theta = Math.PI * (- 0.5);
      phi = 2 * Math.PI * (sunPosition.y / 360 - 0.5);
      skyEl.setAttribute('material', 'sunPosition', {
        x: Math.cos(phi),
        y: Math.sin(phi) * Math.sin(theta),
        z: -1
      });
    });
  }
});

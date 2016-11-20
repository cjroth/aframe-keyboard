function main(globals) {

    const d3 = globals.d3
    const _ = globals._

	let colors = d3.schemeCategory20

	let scene = d3.select('a-scene')

	let width = scene.attr('width')
	let height = scene.attr('height')

    let data = generateData(10, 10, 10, 20)

	let boxes = scene
	    .selectAll('a-box')
	    .filter('.box')
	    .data(data)
	    .enter()
		.append('a-box')
		    .attr('class', 'box')
			.attr('color', d => colors[d.value])
			.attr('depth', 1)
			.attr('height', d => d.y)
			.attr('width', 1)
			.attr('position', d => `${d.x} ${d.y / 2} ${d.z}`)

    setInterval(function() {

        scene
            .selectAll('a-box')
            .filter('.box')
            .attr('color', d => colors[_.random(0, 19)])

    }, 100)


    function generateData(x, y, z, max) {

        let data = []

        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                data.push({
                    x: i,
                    y: i + j,
                    z: j,
                    value: _.random(0, max - 1)
                })
            }
        }

        return data

    }

}

import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { flamegraph } from 'd3-flame-graph';
import 'd3-flame-graph/dist/d3-flamegraph.css';
import { convertToMergedFlameGraph } from 'cpuprofile-to-flamegraph';


export default function FlameGraph({ profile }: any) {
	const chartRef = useRef<HTMLDivElement>(null);
	const flameGraphData = useMemo(() => {
		if (profile) {
			return convertToMergedFlameGraph(profile)
		}
		return null
	}, [profile])

	useEffect(() => {
		if (chartRef.current && flameGraphData) {

			const chart = flamegraph().width(960)

			d3.select(chartRef.current)
				.datum(flameGraphData)
				.call(chart)
		}
	}, [flameGraphData])

	return (
		<div ref={chartRef}>
		</div>
	)
}

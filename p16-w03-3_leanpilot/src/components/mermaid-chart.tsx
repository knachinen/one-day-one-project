"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

interface MermaidChartProps {
	chart: string;
}

export default function MermaidChart({ chart }: MermaidChartProps) {
	const chartRef = useRef<HTMLDivElement>(null);
	const [svg, setSvg] = useState("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (chartRef.current) {
			mermaid.initialize({ startOnLoad: false, theme: "neutral" });
			try {
				mermaid.render("mermaid-chart", chart).then(({ svg }) => {
					setSvg(svg);
				});
			} catch (e: any) {
				setError(`Error rendering Mermaid chart: ${e.message}`);
			}
		}
	}, [chart]);

	if (error) {
		return <pre className="text-red-500">{error}</pre>;
	}

	return (
		<div
			ref={chartRef}
			className="mermaid flex justify-center"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Mermaid.js output is trusted SVG and needs to be injected this way.
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}

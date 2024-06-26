import { Dom, Vector } from '../../core';
import { Grid } from '../../designer-extension';

export class LineGrid implements Grid {
	public static create(size: Vector): LineGrid {
		const path = Dom.svg('circle', {
			class: 'sqd-line-grid-path',
			r: '1',
			cx: '1',
			cy: '1'
		});
		return new LineGrid(size, path);
	}

	private constructor(public readonly size: Vector, public readonly element: SVGPathElement) {}

	public setScale(_: number, scaledSize: Vector) {
		Dom.attrs(this.element, {
			d: `M ${scaledSize.x} 0 L 0 0 0 ${scaledSize.y}`
		});
	}
}

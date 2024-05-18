import assert from 'yav-list-common/utils/assert';

export const inRange = (val: number, max: number, min: number) => {
  assert(max >= min);
  return Math.max(min, Math.min(val, max));
};

export default function move(el: HTMLElement, { x = 0, y = 0 }, { maxY, minY = 0 }: {
  maxY: number;
  minY?: number;
  maxX?: number; // not impl
  minX?: number; // not impl
}) {
  const { transform } = el.ownerDocument.defaultView.getComputedStyle(el);
  if (transform === 'none') {
    el.style.transform = `translate(0px, ${inRange(y, maxY, minY)}px)`;
    return;
  }

  let nextTransform = '';
  const reg = /(\w+)\(([^)]*)\)/g;
  for (let match = reg.exec(transform); match; match = reg.exec(transform)) {
    const [_, name, val] = match;
    switch (name) {
    // you will always get 'matrix' in computed style
    case 'matrix':
    case 'matrix3d': {
      const matrix = val.split(',');
      const addDelta = (i: number, delta: number, max: number, min: number) => {
        if (delta === 0) return;
        const t = parseFloat(matrix[i]);
        const nextT = inRange(t + delta, max, min);
        matrix[i] = `${nextT}`;
      };
      addDelta(name === 'matrix' ? 4 : 12, x, 0, 0); // not impl
      addDelta(name === 'matrix' ? 5 : 13, y, maxY, minY);
      nextTransform = `${nextTransform} ${name}(${matrix.join(', ')})`;
      break;
    }
    default:
      nextTransform = `${nextTransform} ${name}(${val})`;
      break;
    }

    el.style.transform = nextTransform;
  }
}

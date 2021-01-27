import React from 'react';

const initialElements = [
  {
    id: 'provider-1',
    data: { label: 'Node 1' },
    position: { x: 340, y: 150 },
    type: 'ShapeNode',
  },
  {
    id: 'provider-2',
    data: { label: 'Node 2', fillStyle: 'outlined', fillColor: 'dark' },
    position: { x: 160, y: 300 },
    type: 'ShapeNode',
  },
  {
    id: 'provider-3',
    data: { label: 'Node 3', fillStyle: 'dashed', fillColor: 'light' },
    position: { x: 560, y: 300 },
    type: 'ShapeNode',
  },
  {
    id: 'provider-4',
    data: { label: 'Node 4sssssss', fillStyle: 'filled', fillColor: 'red' },
    position: { x: 560, y: 480 },
    type: 'ShapeNode',
  },
  {
    id: 'provider-e3-4',
    source: 'provider-3',
    target: 'provider-4',
    animated: true,
    type: 'smoothstep',
  },
];

export default initialElements;

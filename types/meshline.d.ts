declare module "meshline" {
  export const MeshLine: any;
  export const MeshLineMaterial: any;
}

// types/meshline.d.ts

// 1. Agar TypeScript mengenali file model 3D (.glb)
declare module '*.glb' {
  const value: string;
  export default value;
}

// 2. Agar TypeScript mengenali komponen meshLine di JSX
import { Object3DNode, MaterialNode } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}

// Opsi Alternatif (Jika cara di atas masih error, gunakan yang 'any' di bawah ini):
/*
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
*/
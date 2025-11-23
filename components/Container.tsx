// app/components/Container.tsx
import { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    // max-w-6xl untuk batasan lebar desktop
    // mx-auto untuk menengahkan
    // px-4 (padding horizontal) untuk mobile, sm:px-6 dan lg:px-8 untuk desktop
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {children}
    </div>
  );
};

export default Container;
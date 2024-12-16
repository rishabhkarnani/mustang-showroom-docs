import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export default function MustangModel({ color, wheelType, ...props }) {
    const { scene } = useGLTF('/assets/mustang.glb'); // Ensure the path to your GLB file is correct

    useEffect(() => {
        // Apply color to the car body
        scene.traverse((child) => {
            if (child.isMesh && child.name.includes('Body')) {
                child.material.color.set(color);
            }
        });

        // Log all mesh names to find the wheels
        scene.traverse((child) => {
            if (child.isMesh) {
                console.log('Mesh name:', child.name); // Log mesh names to identify wheels
            }
        });

        // Apply material to wheels based on the selected type
        scene.traverse((child) => {
            if (child.isMesh && child.name.includes('Wheel')) {
                if (wheelType === 'Alloy A') {
                    child.material.color.set('#AAAAAA'); // Alloy A color
                } else if (wheelType === 'Alloy B') {
                    child.material.color.set('#888888'); // Alloy B color
                } else if (wheelType === 'Sport Rims') {
                    child.material.color.set('#555555'); // Sport Rims color
                } else if (wheelType === 'Classic Chrome') {
                    child.material.color.set('#CCCCCC'); // Classic Chrome color
                } else {
                    child.material.color.set('#000000'); // Default Standard Wheels color
                }
            }
        });
    }, [color, wheelType]);

    return <primitive object={scene} {...props} />;
}

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import MustangModel from './components/MustangModel';
import { jsPDF } from 'jspdf';

function App() {
    const [color, setColor] = useState('#ffffff'); // Default car body color
    const [wheelType, setWheelType] = useState('Standard'); // Default alloy wheel type
    const [engine, setEngine] = useState('V6'); // Default engine type
    const [warranty, setWarranty] = useState('Standard'); // Default warranty type
    const [stripes, setStripes] = useState(false); // Default stripes off
    const [detailing, setDetailing] = useState('None'); // Default detailing option

    // HDR and shiny colors
    const colors = [
        '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
        '#ffffff', '#ff5733', '#33ff57', '#3357ff', '#d4af37', '#e0115f',
        '#0099ff', '#00cc00', '#ff9900', '#cc00ff', '#00ffcc', '#ff0066',
        '#6600ff', '#33cc33', '#cc3333', '#ff3399', '#3399ff', '#99ff33',
        '#101820', '#FFD700', '#1E90FF', '#FF4500'
    ];

    const wheelTypes = ['Standard', 'Alloy A', 'Alloy B', 'Sport Rims', 'Classic Chrome'];
    const engineOptions = ['V6', 'V8', 'Electric'];
    const warrantyOptions = ['Standard', 'Extended', 'Premium'];
    const detailingOptions = ['None', 'Gloss Finish', 'Matte Finish'];

    const handleSave = () => {
        const userName = prompt("Enter your name for the invoice:");
        if (!userName) {
            alert("Name is required to generate the invoice.");
            return;
        }

        // Get current date
        const currentDate = new Date().toLocaleDateString();

        // Calculate estimated price
        const basePrice = 30000; // Base price of the car
        const wheelPrice = wheelType === 'Standard' ? 0 : 1500;
        const stripePrice = stripes ? 200 : 0;
        const colorPrice = 500; // Flat price for custom colors
        const enginePrice = engine === 'V6' ? 0 : engine === 'V8' ? 3000 : 5000; // Price for engine upgrades
        const warrantyPrice = warranty === 'Standard' ? 0 : warranty === 'Extended' ? 1000 : 2000;
        const detailingPrice = detailing === 'None' ? 0 : detailing === 'Gloss Finish' ? 500 : 800;

        const totalPrice = basePrice + wheelPrice + colorPrice + stripePrice + enginePrice + warrantyPrice + detailingPrice;

        // Create PDF
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Rishabh Mustang Showroom Quote', 10, 20);
        doc.setFontSize(12);
        doc.text(`Date: ${currentDate}`, 10, 30);
        doc.text(`Customer Name: ${userName}`, 10, 40);

        // Add customization details
        doc.setFontSize(14);
        doc.text('Customization Details:', 10, 60);
        doc.setFontSize(12);
        doc.text(`- Selected Color: ${color}`, 10, 70);
        doc.text(`- Alloy Wheels: ${wheelType}`, 10, 80);
        doc.text(`- Racing Stripes: ${stripes ? 'Included' : 'Not Included'}`, 10, 90);
        doc.text(`- Engine Type: ${engine}`, 10, 100);
        doc.text(`- Warranty Package: ${warranty}`, 10, 110);
        doc.text(`- Detailing: ${detailing}`, 10, 120);

        // Add pricing details
        doc.setFontSize(14);
        doc.text('Pricing Breakdown:', 10, 140);
        doc.setFontSize(12);
        doc.text(`- Base Price: $${basePrice.toLocaleString()}`, 10, 150);
        doc.text(`- Alloy Wheels: $${wheelPrice.toLocaleString()}`, 10, 160);
        doc.text(`- Racing Stripes: $${stripePrice.toLocaleString()}`, 10, 170);
        doc.text(`- Special Color Customization: $${colorPrice.toLocaleString()}`, 10, 180);
        doc.text(`- Engine Upgrade: $${enginePrice.toLocaleString()}`, 10, 190);
        doc.text(`- Warranty Package: $${warrantyPrice.toLocaleString()}`, 10, 200);
        doc.text(`- Detailing: $${detailingPrice.toLocaleString()}`, 10, 210);
        doc.setFontSize(14);
        doc.text(`Total Estimated Price: $${totalPrice.toLocaleString()}`, 10, 230);

        // Save PDF
        doc.save('Mustang_Customization_Quote.pdf');
        alert('Invoice generated successfully!');
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header
                style={{
                    backgroundColor: '#111',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '10px 0',
                }}
            >
                <div
                    style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ffff00, #ff00ff, #00ffff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradientAnimation 4s infinite',
                    }}
                >
                    Rishabh Karnani
                </div>
            </header>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex' }}>
                {/* Left Section for 3D Model */}
                <div
                    style={{
                        flex: 3,
                        backgroundColor: '#333',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    {/* Tagline Above the Car */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '10%',
                            textAlign: 'center',
                            color: '#FFD700',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textShadow: '0 0 10px #FFD700, 0 0 20px #FFD700',
                            animation: 'taglineGlow 3s infinite alternate',
                        }}
                    >
                        Mustang Power Unleashed
                    </div>

                    <Canvas
                        camera={{
                            position: [0, 100, 600],
                            fov: 40,
                        }}
                    >
                        {/* Lighting */}
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[0, 300, 300]} intensity={2} castShadow />

                        {/* Environment */}
                        <Environment preset="studio" />

                        {/* Mustang Model */}
                        <MustangModel
                            scale={[10000, 10000, 10000]}
                            position={[0, -100, 0]}
                            color={color}
                            wheelType={wheelType}
                            stripes={stripes}
                        />

                        {/* Orbit Controls */}
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={Math.PI / 2}
                        />
                    </Canvas>
                </div>

                {/* Right Section for Customization */}
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#222', color: '#fff', borderLeft: '2px solid #ccc' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Customize Your Mustang</h2>

                    {/* Color Selection */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3>Select Color:</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {colors.map((presetColor) => (
                                <button
                                    key={presetColor}
                                    style={{
                                        backgroundColor: presetColor,
                                        width: '30px',
                                        height: '30px',
                                        border: '1px solid black',
                                        cursor: 'pointer',
                                        borderRadius: '5px'
                                    }}
                                    onClick={() => setColor(presetColor)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Alloy Wheel Selection */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3>Select Alloy Wheels:</h3>
                        <select
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                backgroundColor: '#333',
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                            value={wheelType}
                            onChange={(e) => setWheelType(e.target.value)}
                        >
                            {wheelTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Engine Selection */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3>Select Engine:</h3>
                        <select
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                backgroundColor: '#333',
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                            value={engine}
                            onChange={(e) => setEngine(e.target.value)}
                        >
                            {engineOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Warranty Selection */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3>Select Warranty:</h3>
                        <select
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                backgroundColor: '#333',
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                            value={warranty}
                            onChange={(e) => setWarranty(e.target.value)}
                        >
                            {warrantyOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Detailing Selection */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3>Select Detailing:</h3>
                        <select
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                backgroundColor: '#333',
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                            value={detailing}
                            onChange={(e) => setDetailing(e.target.value)}
                        >
                            {detailingOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Racing Stripes Selection */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3>Racing Stripes:</h3>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                checked={stripes}
                                onChange={() => setStripes(!stripes)}
                            />
                            Add Racing Stripes
                        </label>
                    </div>

                    {/* Save Customization Button */}
                    <div style={{ marginBottom: '20px' }}>
                        <button
                            onClick={handleSave}
                            style={{
                                padding: '10px 20px',
                                cursor: 'pointer',
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                width: '100%',
                            }}
                        >
                            Save Customizations
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS Animation */}
            <style>
                {`
                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes taglineGlow {
                    0% {
                        text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
                    }
                    100% {
                        text-shadow: 0 0 20px #FFD700, 0 0 30px #FFD700;
                    }
                }
                `}
            </style>
        </div>
    );
}

export default App;

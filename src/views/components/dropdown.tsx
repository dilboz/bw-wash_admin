import { useEffect, useRef, useState } from "react";

export default function Dropdown({
    options = [],
    onSelect,
    placeholder = "Select an option",
    isActive = false
}: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);

        if (isOpen) {
            setSelectedOption(null);
        }
    };

    const handleSelect = (value: any) => {
        setSelectedOption(value);
        onSelect(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                dropdownRef.current &&
                !(dropdownRef as any).current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} style={{ position: "relative", width: '300px' }}>
            <div
                style={{
                    padding: "8px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: isActive == (selectedOption as any)?.id ? "1px solid blue" : "1px solid #ccc",
                    cursor: "pointer",
                    width: '100%',
                }}
                onClick={handleToggle}
            >
                {(selectedOption as any)?.name || placeholder}
            </div>
            {isOpen && (
                <ul
                    style={{
                        width: "100%",
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        zIndex: 1,
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px",
                        listStyle: "none",
                        marginTop: "4px",
                    }}
                >
                    {options?.map((option: any) => (
                        <li
                            key={option.id}
                            style={{ cursor: "pointer", width: "100%" }}
                            onClick={() => handleSelect(option)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

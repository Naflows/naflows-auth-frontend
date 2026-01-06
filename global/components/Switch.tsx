import React, { useEffect, useState } from "react";


const Switch = ({
    label, checked,
    onChange, description,
    mandatory = false,
    additionalClass = "",
    loading = false,
    disabled = false,
}: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description: string | React.ReactNode;
    mandatory?: boolean;
    additionalClass?: string;
    loading?: boolean;
    disabled?: boolean;
}) => {
    const [ch, setChecked] = useState<boolean>(checked ? checked : false);

    useEffect(() => {
        if (!disabled) {
            onChange(ch ? ch : false);
        }
    }, [ch, onChange, disabled]);


    return (
        <div className={`nass_switch ${additionalClass}`} onClick={() => {
            if (!disabled) {
                setChecked(!ch);
            }
        }}>
            <div className={`nass_switch__container ${ch ? "nass_switch__container--checked" : ""}`}>
                <div className="nass_switch__toggle"></div>
            </div>

            <div className="nass_switch__label">
                <h5>
                    <span>{label}</span>
                    <span className={`nass_switch__label__state ${ch ? "nass_switch__label__state--on" : "nass_switch__label__state--off"}`}>{ch ? "On" : "Off"}</span>

                    {loading && (
                        <div className="loader__container">
                            <div className="small-loader"></div>
                        </div>
                    )}

                    {mandatory && <span className={`nass_switch__label__mandatory ${!ch ? "nass_switch__label__mandatory--inactive" : ""}`}>*</span>}
                </h5>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Switch;
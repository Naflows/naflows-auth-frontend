import { useState } from "react";


const GlobalDisclaimer = ({
    title,
    message,
    content,
    allowHidden = false,
    maxWidth = false,
    fixed = false,
    classes = ""
}: {
    title: string,
    message: string,
    content?: React.ReactNode,
    allowHidden?: boolean,
    maxWidth?: boolean,
    fixed?: boolean,
    classes?: string,
}) => {

    const [hide, setHide] = useState<boolean>(false);

    return (
        <div className={`global__nass__disclaimer ${classes} ${fixed ? "fixed" : ""} ${maxWidth ? "max-width" : ""}`} style={{ display: hide ? "none" : "flex" }}>
            <div className="global__disclaimer__set__content">
                <div className="global__disclaimer__header">
                    <h4>{title}</h4>
                    {allowHidden && <div className="global__disclaimer__hide">
                        <button className="tertiary-button " onClick={() => setHide(!hide)}>Ok, got it</button>
                    </div>}
                </div>
                <p style={{
                    display: message ? "block" : "none"
                }}>{message}</p>
            </div>

            {content &&
                <div className="global__disclaimer__content">
                    {content}
                </div>}
        </div>
    );
}


export default GlobalDisclaimer;
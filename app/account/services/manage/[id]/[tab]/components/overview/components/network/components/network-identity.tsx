import { ServicesCompleteBodyProps } from "@/types/ServicesCompleteProps";
import { ServicesForUserProps } from "@/types/ServicesForUserProps";

const IpAdressSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
    </svg>
);

const DnsSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path d="M5.507 4.048A3 3 0 0 1 7.785 3h8.43a3 3 0 0 1 2.278 1.048l1.722 2.008A4.533 4.533 0 0 0 19.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008Z" />
        <path fillRule="evenodd" d="M1.5 10.5a3 3 0 0 1 3-3h15a3 3 0 1 1 0 6h-15a3 3 0 0 1-3-3Zm15 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm2.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.5 15a3 3 0 1 0 0 6h15a3 3 0 1 0 0-6h-15Zm11.25 3.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM19.5 18a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
    </svg>

)


const ServiceNetworkIdentity = ({
    service
}: {
    service: ServicesForUserProps | ServicesCompleteBodyProps | null
}) => {
    return (
        <div id="left">
            <div className="service__actions__field__header">
                <h3 className="service__actions__field__title">Identity</h3>
                <p className="service__actions__field__description">Naflows will identify your service by its network configuration - make sure to configure it properly.</p>
            </div>
            <div className="network__components">
                <div className="network__component">
                    <div className="network__component__header">
                        <IpAdressSvg />

                        <h4>IP Address</h4>
                    </div>
                    <div className="network__component__body">
                        <div className="information__container">
                            {
                                service?.ip_address && service.ip_address.length > 0 ? service?.ip_address.map((ip) => (
                                    <div className="component" key={ip}>
                                        <p className="network__component__value">{ip || "Not configured"}</p>
                                        <button className="primary-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z" /></svg>
                                        </button>
                                    </div>
                                )) : <p className="network__component__value">Not configured</p>
                            }
                        </div>
                        <button className="primary-button width-100-auto inactive">
                            Register new IP
                        </button>
                    </div>
                </div>
                <div className="network__component">
                    <div className="network__component__header">
                        <DnsSvg />
                        <h4>DNS Name</h4>
                    </div>
                    <div className="network__component__body">
                        <div className="information__container">
                            <div className="component">
                                <p className="network__component__value">{service?.dns || "Not configured"}</p>
                                <button className="primary-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z" /></svg>
                                </button>
                            </div>
                        </div>
                        <button className="primary-button width-100-auto inactive">
                            Register new DNS
                        </button>
                    </div>
                </div>
            </div>

            <div className="footer__informations">
                Looking for connection to the NASS? Make sure to check our <a href="https://docs.naflows.com/nass/getting-started/connecting-to-nass" target="_blank" rel="noreferrer">documentation</a> for detailed instructions on how to connect your service to the NASS securely and efficiently.
            </div>
        </div>
    )
}

export default ServiceNetworkIdentity;
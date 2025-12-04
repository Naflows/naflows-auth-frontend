import { useEffect, useRef, useState } from "react";
import AddUserRight from "./add-rights";
import ServiceRights from "./small-right";
import { ServicesForUserProps, ServiceUser } from "@/types/ServicesForUserProps";
import { createdAtToAgo } from "@/app/account/sub-components/notifications/methods/createdAtToAgo";
import CopyButton from "@/global/components/CopyButton";




const RightComponent = ({ rights, type, service, userInfo, setCurrentRights }: { rights: ServiceUser["rights"], type: "SERVICE_BY_NASS" | "TUNNELING_BY_INSTANCE", service: ServicesForUserProps | null, userInfo: ServiceUser, setCurrentRights: React.Dispatch<React.SetStateAction<ServiceUser["rights"]>> }) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const [top, setTop] = useState<string>("0px");
    const [left, setLeft] = useState<string>("0px");
    const [clicked, setClicked] = useState<boolean>(false);

    const handleButtonClick = () => {
        const buttonElement = buttonRef.current;
        if (!buttonElement) {
            console.warn("Button element is not available.");
            return;
        }
        const element = document.getElementById(`add-right-button-${type}-${userInfo.id}`);

        if (element) {
            const rect = element.getBoundingClientRect();
            setTop(`${rect.bottom + 2}px`);
            setLeft(`${rect.left}px`);
        }
        setClicked(prev => !prev);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                clicked &&
                buttonRef.current &&
                popupRef.current &&
                !buttonRef.current.contains(event.target as Node) &&
                !popupRef.current.contains(event.target as Node)
            ) {
                setClicked(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [clicked]);

    return (
        <div className={`nass__rights__container ${rights.length === 0 ? "empty" : ""}`}>
            {clicked && (
                <div
                    ref={popupRef}
                    style={{
                        position: "absolute",
                        top: top,
                        left: left,
                    }}
                >
                    <AddUserRight service={service} type={type} currentRights={rights} userID={userInfo.id} setCurrentRights={setCurrentRights} setClicked={setClicked} />
                </div>
            )}


            <span className="rights__container__title">
                <span id="right-type-title">

                    {type === "TUNNELING_BY_INSTANCE" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M5.507 4.048A3 3 0 0 1 7.785 3h8.43a3 3 0 0 1 2.278 1.048l1.722 2.008A4.533 4.533 0 0 0 19.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008Z" />
                        <path fillRule="evenodd" d="M1.5 10.5a3 3 0 0 1 3-3h15a3 3 0 1 1 0 6h-15a3 3 0 0 1-3-3Zm15 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm2.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.5 15a3 3 0 1 0 0 6h15a3 3 0 1 0 0-6h-15Zm11.25 3.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM19.5 18a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
                    </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                    }
                    {type === "SERVICE_BY_NASS" ? "NASS Rights" : "Instance Rights"}
                </span>
                <div
                    ref={buttonRef}
                    className="user__item__right add-button"
                    title="Add Right"
                    onClick={handleButtonClick}
                    id={`add-right-button-${type}-${userInfo.id}`}
                >
                    <span>Add</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                </div>
            </span>
            <div className="list">
                {rights.map((right) => {
                    console.log("Rendering right:", right, "for type:", type);
                    if (right.type === type) {
                        return (
                            <ServiceRights key={right.id} id={right.id} name={right.name} hue={right.hue} />
                        );
                    }
                    return null; // Add explicit return for false condition
                })}
            </div>
        </div>
    );
};


const UserActions = ({ user }: { user: ServiceUser }) => {
    return (
        <div className="user__additional__content">
            <div className="user__item__dates">
                <span className="user__item__joined">Joined: {createdAtToAgo(user.joined_on)}</span>
                <span className="user__item__last-updated">Last Updated: {createdAtToAgo(user.last_updated)}</span>
            </div>

            <div className="user__actions">
                <button className={`user__action__manage secondary-button ${!user.you_can_manage || user.you ? "inactive" : ""}`}>Manage</button>
                <button className={`user__action__remove tertiary-button danger-button ${!user.you_can_manage || user.you ? "inactive" : ""}`}>Expulse</button>
            </div>
        </div>
    )
}

const ListedUser = ({ user, service }: { user: ServiceUser, service: ServicesForUserProps | null }) => {

    const [isLessThan1400px, setIsLessThan1400px] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLessThan1400px(window.innerWidth < 1400);
        };

        // Initial check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [currentRights, setCurrentRights] = useState<ServiceUser["rights"]>(user.rights);

    return (
        <div key={user.id} className={`user__item ${service?.created_by === user.id ? "owner__item" : ""}`}>
            {service?.created_by === user.id && (
                <span className="owner__badge" title="Service Owner">
                    Owner
                </span>
            )}
            <div className="user__head__component">
                <div className="user__item__info">
                    <div className="profile__picture">
                        <img src={user.profile_picture} alt={user.username} className="user__item__avatar" />
                    </div>
                    <div className="item__info__header">
                        <span className="user__item__username">{user.username}</span>
                        <span className="user__item__email">{user.email}</span>
                        <span className="user__item__uid">
                            <span className="user__item__id">{user.id}</span>
                            <CopyButton textToCopy={user.id} className="user__item__copy-button" />
                        </span>
                    </div>
                </div>
                {isLessThan1400px && <UserActions user={user} />}
            </div>
            <div className="user__item__rights">


                <>
                    {(
                        <RightComponent rights={currentRights} type="SERVICE_BY_NASS" service={service} userInfo={user} setCurrentRights={setCurrentRights} />
                    )}
                    {(
                        <RightComponent rights={currentRights} type="TUNNELING_BY_INSTANCE" service={service} userInfo={user} setCurrentRights={setCurrentRights} />
                    )}
                </>

            </div>



            {!isLessThan1400px && <UserActions user={user} />}
        </div>
    )
}

export default ListedUser;


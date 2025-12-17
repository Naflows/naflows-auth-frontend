import { Log } from "@/types/Logs.type";
import switchLogSVG from "../utils/switch-log-icon";
import { dateToTimespan } from "@/scripts/utils/dateToTimespan";

function hoverProfilePicture(log: Log, el: React.MouseEvent<HTMLTableCellElement>, setHoveredLog: React.Dispatch<React.SetStateAction<Log | null>>) {
    setHoveredLog(log);
    const hoverElement = document.querySelector(".log__hover__content") as HTMLDivElement;
    if (hoverElement) {
        hoverElement.style.display = "flex";
        const rect = el.currentTarget.getBoundingClientRect();
        hoverElement.style.position = "fixed";
        hoverElement.style.top = `${rect.top}px`;
        hoverElement.style.left = `${rect.right + 5}px`;
        hoverElement.style.zIndex = "1000";
    }
}

export default function SingleLog({
    log, i,
    setHoveredLog
}: {
    log: Log;
    i: number;
    setHoveredLog: React.Dispatch<React.SetStateAction<Log | null>>;
}) {
    return (
        <tr key={log.id} className={`log__entry status--${log.level.toLowerCase()}`}
            style={{
                animationDelay: `${i * 0.05}s`
            }}
        >
            <td className="log__icon">
                {switchLogSVG(log.type)}

            </td>


            <td className={`log__user ${log.metadata && log.metadata.userData ? "known" : "unknown"}`} id={`log__user__${log.id}`} onMouseEnter={(el: React.MouseEvent<HTMLTableCellElement>) => {
                hoverProfilePicture(log, el, setHoveredLog);
            }} onMouseLeave={() => {
                setHoveredLog(null);
            }}>
                {log.metadata && log.metadata.userData ? (
                    <>
                        {log.metadata.userData.picture && (
                            <img
                                src={log.metadata.userData.picture}
                                alt={`${log.metadata.userData.first_name ?? ""} ${log.metadata.userData.last_name ?? ""}`}
                                style={{ width: 32, height: 32, borderRadius: "50%", marginRight: 8 }}
                            />
                        )}

                    </>

                ) : (
                    <span>Unknown User</span>
                )}
            </td>
            <td className="log__message">
                <span>{log.message}</span>
                <span>
                    {log.metadata?.message ? log.metadata.message : "No metadata"}
                </span>
            </td>
            <td className="log__timestamp">
                <span>{dateToTimespan(log.created_at)}</span>
                <span>{new Date(log.created_at).toLocaleString()}</span>
            </td>
        </tr>
    )
}
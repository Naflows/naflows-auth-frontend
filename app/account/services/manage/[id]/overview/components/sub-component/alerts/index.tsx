import '@/public/root/pages/services/components/service-alerts.scss';
import { ServicesForUserProps } from '@/types/ServicesForUserProps';

function switchTitle(hasAlert: boolean) {
  switch (hasAlert) {
    case false:
      return "Your service is running smoothly. No alerts at this time.";
    case true:
      return "Naflows is unable to publicy launch your service due to existing alerts. Please review them below.";
  }
}
function switchSvg(hasAlert: boolean) {
  switch (hasAlert) {
    case false:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case true:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      );
  }
}


const ServiceAlerts = ({ service }: { service: ServicesForUserProps }) => {

  const hasAlerts = service && service.alerts && service.alerts.length > 0;
  const amountOfErrorsOrWarnings = service && service.alerts ? service.alerts.filter(alert => alert.type === "error" || alert.type === "warning").length : 0;
  const sortedAlerts = service && service.alerts ? [...service.alerts].sort((a, b) => {
    const priority = { "error": 3, "warning": 2, "info": 1, "success": 0 };
    return priority[b.type] - priority[a.type];
  }) : [];


  return (


    hasAlerts && (
      <div className="user__body__section">
        <div className="service__alerts__section">
          <h4 className={`global__alert ${amountOfErrorsOrWarnings > 0 ? "error-warning" : "info"}`}>
            {switchSvg(amountOfErrorsOrWarnings > 0)}
            <span>
              {switchTitle(amountOfErrorsOrWarnings > 0)}
            </span>
          </h4>
          <div className="alerts__content">
            {sortedAlerts && sortedAlerts.length > 0 && (
              sortedAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`service__alert service__alert--${alert.type}`}
                >
                  <div className="alert__body">
                    <div className="alert__header">
                      <strong>{alert.title}</strong>
                    </div>
                    <p className="instructions">
                      {alert.instructions}
                    </p>
                  </div>
                  <button className="primary-button" onClick={() => {
                    window.location.href = alert.link || "#";
                  }}>
                    Take Action
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    )


  );
};

export default ServiceAlerts;
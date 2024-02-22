import ReactGA4 from 'react-ga4'
// React GA4 event helper
export const TrackGoogleAnalyticsEvent = (
    category:string,
    event_name:string,
    data?: Record<string, any>
) => {
    console.log("GA event:", category, ":", event_name, ":");

    let event_params = {
        category,
        ...data
    };
    // Send GA4 Event
    ReactGA4.event(event_name, event_params);
};


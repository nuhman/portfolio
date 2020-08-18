const logEvents = (category, label) => {
    console.log(`gtag('event', 'click', {'event_category': ${category}, 'event_label': ${label}});`);
    gtag('event', 'click', {'event_category': category, 'event_label': label});
}
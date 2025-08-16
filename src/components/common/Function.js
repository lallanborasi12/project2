export const DataLayer = ({ event, stage }) => {
  if (window.dataLayer) {
    let currentTime = new Date().toISOString();
    let siteUrl = window.location.href;
    window.dataLayer.push({
      event: event,
      stage: stage,
      currentTime: currentTime,
      siteUrl: siteUrl,
    });
    // console.log(window.dataLayer);
    // console.log(event);
  }
};

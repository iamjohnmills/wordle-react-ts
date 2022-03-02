const EventBus = {
  on(event: CustomEvent, callback: () => void): void  {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event: CustomEvent, data): void {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event: CustomEvent, callback: () => void): void  {
    document.removeEventListener(event, callback);
  },
};

export default EventBus;

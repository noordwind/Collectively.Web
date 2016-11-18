export default class ScriptLoadingService {
  load(url) {
    // TODO: Handle rejection.
    return new Promise((resolve) => {
      const script = document.createElement('script');
      if (resolve) script.onload = resolve;
      script.src = url;
      document.head.appendChild(script);
    });
  }
}

class Tabs  {

    constructor(options = {}) 
    {

      const defaultOptions = {
        activeTab: 0,
        tablinksClass: "tablink",
        containerId: "tab-container",
      };

      this.settings = { ...defaultOptions, ...options };
      this.container = document.getElementById(this.settings.containerId);
      this.links = document.querySelectorAll(this.settings.tablinksClass);

      if (!this.container) {
        console.error("Tab container not found");
        return;
      }

      if (!this.links) {
        console.error("Tab links not found");
        return;
      }

      console.log(this.links);
      // Add event listeners
      this.links.forEach((link, index) => {
        link.addEventListener("click", (event) => {
          
          event.preventDefault();

          alert("Tab clicked");
        });
      });

    }
}
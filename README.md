
# JS library for quickly loading tabs
This library is currently working with tab click and prefetching when the user hovers over the link.
But it is still work in progress.


## Roadmap
- ~~Prefetching. Fetch the content when the user hovers the mouse over the links~~
- ~~Update url when a tab is clicked~~
- ~~Maybe add a loading animation~~
- Load correct tab on pageload
- Increase the speed more. Maybe use serviceworker to cache content of the tabs.


## Usage/Examples

```javascript
<script src="src/tabs.js"></script>

 const Tabmenu = new Tabs({
            tablinksClass: ".tablink",
            containerId: "tabcontent",
            activeTab: 0
        });
```

## Options

| Option        | Parameters   | Description                                           |
|---------------|--------------|-------------------------------------------------------|
| tablinksclass |              | Class of the tablinks                                 |
| containerid   |              | DOM ID of the container that will show the tabcontent |
| activetab     |              | Not yet implemented.                                  |
| prefetching   | True / false | If prefetching should be enabled. Default is true.    |
| loadinganimation   | True / false | Show loading animation. Default is true.    |

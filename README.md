
# JS library for quickly loading tabs
This library is currently working with tab click and prefetching when the user hovers over the link.
But it is still work in progress.


## Roadmap
- ~~ Prefetching. Fetch the content when the user hovers the mouse over the links~~
- ~~ update url when a tab is clicked ~~
- Load correct tab on pageload
- Maybe add a loading animation
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

